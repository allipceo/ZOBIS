# ZOBIS CSV to Notion Pipeline

## 🎯 프로젝트 개요

**ZOBIS (Javis-Oriented Business Intelligence System)** 확장 모듈로, CSV 파일을 Notion DB로 자동 이관하는 파이프라인입니다.

### 📋 주요 기능
- **CSV 자동 파싱**: UTF-8 인코딩 지원
- **Notion DB 연동**: 자동 페이지 생성/업데이트
- **AI 분석 연계**: 기존 ZOBIS 시스템과 통합
- **실시간 추적**: trace_id ↔ page_id 매핑
- **배치 처리**: 3-5개씩 안전한 배치 처리
- **로깅 시스템**: 완전한 실행 추적

## 🚀 빠른 시작

### 1. 환경 설정
```bash
# 의존성 설치
pip install -r requirements.txt

# 환경 변수 설정
cp .env.example .env
# NOTION_TOKEN=your_notion_token_here
```

### 2. CSV 파일 준비
```bash
# 데이터 폴더 생성
mkdir -p data

# CSV 파일 배치 (cyber_priority_top30.csv)
# 스키마: ID, title, Risk Priority, description, link
```

### 3. 실행
```bash
# 메인 파이프라인 실행
python src/csv/main_pipeline.py
```

## 📊 스펙 및 요구사항

### 입력 데이터
- **파일**: `cyber_priority_top30.csv`
- **인코딩**: UTF-8
- **스키마**: ID, title, Risk Priority, description, link

### 출력 데이터
- **타겟 DB**: ZOBIS 개발문서 DB (ID: 5d15b3aa0f174b04bceeb22107e06a03)
- **페이지 속성**: title, Risk Priority (Number), URL
- **중복 방지**: 원본 고유키 기반 idempotent upsert

### 성능 요구사항
- **배치 크기**: 3-5개
- **재시도**: 429/5xx 지수 백오프
- **로깅**: 완전한 실행 추적

## 🏗️ 아키텍처

```
CSV 파일 → CSV Processor → Notion Integration → Notion DB
    ↓              ↓              ↓
Trace Logger ← Execution Logs ← Page Mapping
```

### 핵심 컴포넌트
1. **CSVProcessor**: CSV 파싱 및 데이터 구조화
2. **NotionIntegration**: Notion API 연동
3. **TraceLogger**: 실행 로그 및 추적
4. **MainPipeline**: 전체 파이프라인 오케스트레이션

## 📈 사용 시나리오

### 시나리오 1: 기본 CSV 이관
```python
from src.csv.main_pipeline import CSVMainPipeline

pipeline = CSVMainPipeline()
pipeline.run()
```

### 시나리오 2: 스모크 테스트
```python
# 3건 테스트
if pipeline.smoke_test():
    pipeline.run_full_pipeline()
```

### 시나리오 3: 기존 ZOBIS 연계
```python
# AI 분석 기능 추가
# 기존 ZOBIS 프로세서 활용
```

## 🔧 설정 및 커스터마이징

### 환경 변수
```bash
NOTION_TOKEN=your_notion_token
DATABASE_ID=5d15b3aa0f174b04bceeb22107e06a03
```

### 배치 크기 조정
```python
# main_pipeline.py에서 수정
results = self.csv_processor.process_batch(csv_rows, batch_size=5)
```

### 로깅 레벨 조정
```python
logging.basicConfig(level=logging.DEBUG)
```

## 📊 모니터링 및 로깅

### 실행 로그
- **위치**: `logs/trace.db`
- **테이블**: execution_logs, trace_page_mapping
- **내보내기**: JSON 형식 지원

### 추적 시스템
- **trace_id**: 각 실행별 고유 ID
- **page_id**: 생성된 Notion 페이지 ID
- **매핑**: trace_id ↔ page_id 관계 추적

## 🚨 오류 처리

### 일반적인 오류
1. **API 토큰 오류**: NOTION_TOKEN 확인
2. **DB 접근 오류**: 데이터베이스 ID 확인
3. **CSV 파싱 오류**: 파일 인코딩 및 스키마 확인

### 재시도 정책
- **429 (Rate Limit)**: 지수 백오프
- **5xx (Server Error)**: 자동 재시도
- **부분 실패**: 실패한 항목만 재시도

## 🔄 기존 ZOBIS 시스템과의 연계

### 통합 포인트
1. **AI 분석**: 기존 LLM 프로세서 활용
2. **모니터링**: 기존 실시간 모니터링 연계
3. **보안**: 기존 Secret Manager 활용
4. **배치 처리**: 기존 100건 배치 시스템 활용

### 확장 계획
- **템플릿화**: 다른 프로젝트 재사용
- **대시보드 연계**: Notion 홈 대시보드 통합
- **자동화**: 스케줄링 및 트리거 연계

## 📞 지원 및 문의

- **개발자**: 서대리 (Cursor AI)
- **스펙**: PC_001 조대표님, 서대리의 빠른 온보딩을 위해 개념 → 협업체계 → 진행 중 프로젝트 → 실행 지시문
- **버전**: V1.0
- **날짜**: 2025-01-17

---

**ZOBIS 시스템의 확장으로, CSV 데이터를 Notion으로 자동 이관하여 조대표님의 의사결정을 지원합니다!** 🚀