<template>
  <div id="centerLeft3">
    <!-- <div class="bg-color-black"> -->
    <div class="d-flex pt-2 pl-2">
      <div class="d-flex">
        <icon name="chart-bar" class="text-icon"></icon>
        <span class="fs-xl text mx-2">设备实例</span>
        <dv-decoration-3 class="dv-dec-3" />
      </div>
      <el-switch v-model="switchHandoff" active-text="设备实例" inactive-text="可视化"></el-switch>

    </div>

    <div class="device-instance" v-show="switchHandoff">
      <template v-for="item in productDetailObjec.properties">
        <CenterLeft2Chart :modelInfo="item" :key="item.code" @historyDialogVisibleFun='historyDialogVisibleFun'>
        </CenterLeft2Chart>
      </template>
    </div>
    <div v-show="!switchHandoff" class="echarts">
      <template v-for="item in productDetailObjec.properties">
        <histogram :key="item.code" v-if="item.name == '门开关' || item.name == '震动' || item.name == '灯' || item.name == '风扇'"  :modelInfo="item"></histogram>
        <LineChart :key="item.code" v-else :modelInfo="item" ></LineChart>
      </template>
    </div>
  </div>
</template>

<script>
import CenterLeft2Chart from './chart/CenterLeft2Chart.vue'
import histogram from './chart/histogram.vue'
import LineChart from './chart/LineChart.vue'
export default {
  props: {
    productDetailObjec: {
      type: Object
    }
  },
  data () {
    return {
      switchHandoff: false,
      historyDialogVisible: false
    }
  },
  methods: {
    historyDialogVisibleFun (val) {
      this.historyDialogVisible = val
    },
    historyList () {
      const param = {
        eventTimeEnd: this.historytimer[1],
        eventTimeStart: this.historytimer[0],
        pageNo: this.productPagination.pageNo,
        pageSize: this.productPagination.pageSize,
        propCode: this.deCode,
        thingCode: "M2210EPLT001",
        thingTypeCode: "MCU2210M001",
      }
      Api.listPropHistory(param).then(res => {
        this.historyTabel = res.data.page.records
        this.productPagination.total = res.data.page.total
      })
    }
  },
  components: {
    CenterLeft2Chart,
    histogram,
    LineChart
  },
}
</script>

<style lang='scss' scoped>
.echarts {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.device-instance {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.pl-2 {
  display: flex;
  justify-content: space-between;
}

.dv-dec-3 {
  position: relative;
  width: 100px;
  height: 20px;
  top: -3px;
}
</style>