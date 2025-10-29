/**
 * ZOBIS 인포그래픽 Chart.js 공용 설정
 * 작성일: 2025-10-25
 * 용도: IG001~IG015 공통 Chart.js 옵션
 */

// 색상 팔레트
const CHART_COLORS = {
  deepBlue: '#00449E',
  brightBlue: '#0380FE',
  skyBlue: '#33A0FF',
  lightBlue: '#66B9FE',
  paleBlue: '#99D2FF',
  veryPaleBlue: '#CCE8FE',
  success: '#10b981',
  warning: '#f97316',
  danger: '#ef4444',
  info: '#3b82f6',
};

// 공용 Chart.js 옵션
const commonChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  
  plugins: {
    legend: {
      display: true,
      position: 'top',
      labels: {
        usePointStyle: true,
        padding: 15,
        font: {
          size: 13,
          weight: '600',
          family: "'Noto Sans KR', sans-serif"
        },
        color: '#111827'
      }
    },
    
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      padding: 12,
      cornerRadius: 8,
      titleFont: {
        size: 14,
        weight: 'bold',
        family: "'Noto Sans KR', sans-serif"
      },
      bodyFont: {
        size: 13,
        family: "'Noto Sans KR', sans-serif"
      },
      bodySpacing: 6,
      borderColor: '#00449E',
      borderWidth: 1
    }
  },
  
  animation: {
    duration: 800,
    easing: 'easeInOutQuart'
  }
};

// 라인 차트 기본 옵션
const lineChartDefaults = {
  ...commonChartOptions,
  
  scales: {
    x: {
      grid: {
        display: false
      },
      ticks: {
        font: {
          size: 13,
          weight: '500',
          family: "'Noto Sans KR', sans-serif"
        },
        color: '#4b5563'
      }
    },
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(0, 0, 0, 0.05)',
        lineWidth: 1
      },
      ticks: {
        font: {
          size: 12,
          family: "'Noto Sans KR', sans-serif"
        },
        color: '#4b5563'
      }
    }
  }
};

// 막대 차트 기본 옵션
const barChartDefaults = {
  ...commonChartOptions,
  
  scales: {
    x: {
      grid: {
        display: false
      },
      ticks: {
        font: {
          size: 13,
          weight: '500',
          family: "'Noto Sans KR', sans-serif"
        },
        color: '#4b5563'
      }
    },
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(0, 0, 0, 0.05)'
      },
      ticks: {
        font: {
          size: 12,
          family: "'Noto Sans KR', sans-serif"
        },
        color: '#4b5563'
      }
    }
  }
};

// 파이/도넛 차트 기본 옵션
const pieChartDefaults = {
  ...commonChartOptions,
  
  plugins: {
    ...commonChartOptions.plugins,
    legend: {
      ...commonChartOptions.plugins.legend,
      position: 'bottom'
    }
  }
};

// 레이더 차트 기본 옵션
const radarChartDefaults = {
  ...commonChartOptions,
  
  scales: {
    r: {
      beginAtZero: true,
      max: 100,
      ticks: {
        stepSize: 20,
        font: {
          size: 11,
          family: "'Noto Sans KR', sans-serif"
        },
        color: '#4b5563',
        backdropColor: 'rgba(255, 255, 255, 0.75)'
      },
      grid: {
        color: 'rgba(0, 0, 0, 0.1)'
      },
      pointLabels: {
        font: {
          size: 12,
          weight: '600',
          family: "'Noto Sans KR', sans-serif"
        },
        color: '#111827'
      }
    }
  }
};

// 유틸리티 함수: 천 단위 콤마
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// 유틸리티 함수: 통화 포맷 (억 원)
function formatCurrency(value) {
  return value + '억';
}

// 유틸리티 함수: 퍼센트 포맷
function formatPercent(value) {
  return value + '%';
}

// 그라데이션 생성 함수
function createGradient(ctx, color1, color2) {
  const gradient = ctx.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, color1);
  gradient.addColorStop(1, color2);
  return gradient;
}

// 데이터셋 기본 스타일 (라인)
function getLineDatasetStyle(color, label) {
  return {
    label: label,
    borderColor: color,
    backgroundColor: color + '20', // 20% opacity
    borderWidth: 3,
    fill: false,
    tension: 0.4,
    pointRadius: 6,
    pointHoverRadius: 8,
    pointBackgroundColor: color,
    pointBorderColor: '#fff',
    pointBorderWidth: 2
  };
}

// 데이터셋 기본 스타일 (막대)
function getBarDatasetStyle(colors, label) {
  return {
    label: label,
    backgroundColor: colors,
    borderWidth: 0,
    borderRadius: 6,
    borderSkipped: false
  };
}

