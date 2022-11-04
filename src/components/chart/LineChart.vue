<template>
  <div class="LineChart" ref="LineChart"></div>
</template>

<script>
import Api from "@/Api/apis";
export default {
  props: {
    modelInfo: {
      type: Object
    }
  },
  data () {
    return {
      // 分页
      productPagination: {
        total: 0,
        pageNo: 1,
        pageSize: 10,
        pageSizeOptions: [5, 10, 13],
      },
      yAxisChartData: [],
      xAxisChartData: [],
      chartMap:{}
    }
  },
  methods: {
    LineChart () {
    let myChart = this.chartMap["LineChart"];
      if (typeof myChart === "undefined" || myChart === null) {
       myChart = this.$echarts.init(this.$refs['LineChart']);
        this.$set(this.chartMap, "LineChart", myChart);
      }

      var option;
      option = {
        title: {
          text: this.modelInfo.name,
          textStyle: {
            //文字颜色
            color: '#fff',
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontFamily: 'sans-serif',
            fontSize: 18
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.xAxisChartData,
          axisLine: {
            show: true,
            lineStyle: {
              color: "#fff",
              width: 0,
              type: "solid"
            }
          },
        },
        yAxis: {
          type: 'value',
          axisLabel: {//y轴文字的配置
            // textStyle: {
              color: "#fff",
              margin: 15
            // },
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top:"30px",
          containLabel: true
        },
        series: [
          {
            data: this.yAxisChartData,
            type: 'line',
            areaStyle: {},
            itemStyle: {
              // normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0,color: 'rgba(0, 153, 239, 0.8)'}, {
                  offset: 1,color: 'rgba(66, 187, 255, 1)'}]),
                opacity: 1,
              // }
            }
          }
        ]
      };

      option && myChart.setOption(option);
    },
    historyList () {
      this.xAxisChartData = []
      this.yAxisChartData = []
      const param = {
        eventTimeEnd: this.$getRecentDays(1, 'yyyy-MM-dd hh:mm:ss')[1],
        eventTimeStart: this.$getRecentDays(1, 'yyyy-MM-dd hh:mm:ss')[0],
        pageNo: this.productPagination.pageNo,
        pageSize: this.productPagination.pageSize,
        propCode: this.modelInfo.code,
        thingCode: "M2210EPLT001",
        thingTypeCode: "MCU2210M001",
      }
      Api.listPropHistory(param).then(res => {
        let LineChartData = res.data.page.records
        LineChartData.forEach(element => {
          this.xAxisChartData.push(element.eventTime)
          this.yAxisChartData.push(element.propValue)
          this.LineChart()
        });
      })
    },
    setInter () {
      this.timer = setInterval(() => {
        this.historyList()
      }, 10000)
    }
  },
  mounted () {
    this.historyList()
    this.setInter()
  },
  beforeDestroy () {
    clearInterval(this.timer);
    this.timer = null;
  },
}
</script>

<style>
.LineChart {
  width: 49%;
  height: 120px;
}
</style>