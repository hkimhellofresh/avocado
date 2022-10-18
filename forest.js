var chartDom = document.getElementById('main');
var myChart = echarts.init(chartDom);
var option;

const treeDataURI =
  '\avocado.svg';
const beginYear = 2011;
const endYear = 2050;
const lineCount = 10;
// Basic option:
option = {
  color: ['#067A46'],
  xAxis: {
    axisLine: { show: false },
    axisLabel: { show: false },
    axisTick: { show: false },
    splitLine: { show: false },
    name: beginYear + '',
    nameLocation: 'middle',
    nameGap: 40,
    nameTextStyle: {
      color: 'green',
      fontSize: 30,
      fontFamily: 'Arial'
    },
    min: -2800,
    max: 2800
  },
  yAxis: {
    data: makeCategoryData(),
    show: false
  },
  grid: {
    top: 'center',
    height: 280
  },
  series: [
    {
      name: 'all',
      type: 'pictorialBar',
      symbol: 'image://' + treeDataURI,
      symbolSize: [35, 35],
      symbolRepeat: true,
      data: makeSeriesData(beginYear),
      animationEasing: 'elasticOut'
    },
    {
      name: 'all',
      type: 'pictorialBar',
      symbol: 'image://' + treeDataURI,
      symbolSize: [35, 35],
      symbolRepeat: true,
      data: makeSeriesData(beginYear, true),
      animationEasing: 'elasticOut'
    }
  ]
};

// Make fake data.
function makeCategoryData() {
  var categoryData = [];
  for (var i = 0; i < lineCount; i++) {
    categoryData.push(i + 'a');
  }
  return categoryData;
}
function makeSeriesData(year, negative) {
  // make a fake value just for demo.
  const r = (year - beginYear + 1) * 10;
  const seriesData = [];
  for (let i = 0; i < lineCount; i++) {
    let sign = negative ? -1 * (i % 3 ? 0.9 : 1) : 1 * ((i + 1) % 3 ? 0.9 : 1);
    seriesData.push({
      value:
        sign *
        (year <= beginYear + 1
          ? Math.abs(i - lineCount / 2 + 0.5) < lineCount / 5
            ? 5
            : 0
          : (lineCount - Math.abs(i - lineCount / 2 + 0.5)) * r),
      symbolOffset: i % 2 ? ['50%', 0] : undefined
    });
  }
  return seriesData;
}
// Set dynamic data.
var currentYear = beginYear;
setInterval(function () {
  currentYear++;
  if (currentYear > endYear) {
    currentYear = beginYear;
  }
  myChart.setOption({
    xAxis: {
      name: currentYear
    },
    series: [
      {
        data: makeSeriesData(currentYear)
      },
      {
        data: makeSeriesData(currentYear, true)
      }
    ]
  });
}, 800);

option && myChart.setOption(option);