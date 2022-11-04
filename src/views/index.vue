<template>
  <div id="index" ref="appRef">
    <div class="bg">
      <dv-loading v-if="loading">Loading...</dv-loading>
      <div v-else class="host-body">
        <div class="d-flex jc-center">
          <dv-decoration-10 class="dv-dec-10" />
          <div class="d-flex jc-center">
            <dv-decoration-8 class="dv-dec-8" :color="decorationColor" />
            <div class="title">
              <span class="title-text">设备运转平台</span>
              <dv-decoration-6 class="dv-dec-6" :reverse="true" :color="['#50e3c2', '#67a1e5']" />
            </div>
            <dv-decoration-8 class="dv-dec-8" :reverse="true" :color="decorationColor" />
          </div>
          <dv-decoration-10 class="dv-dec-10-s" />
        </div>

        <!-- 第二行 -->
        <div class="d-flex jc-between px-2">
          <div class="d-flex aside-width">
            <div class="react-left ml-4 react-l-s">
              <span class="react-left"></span>
              <span class="text">设备基本信息</span>
            </div>
            <div class="react-left ml-3">
              <span class="text">设备数据</span>
            </div>
          </div>
          <div class="d-flex aside-width">
            <div class="react-right bg-color-blue mr-3">
              <span class="text fw-b">设备报警信息</span>
            </div>
            <div class="react-right mr-4 react-l-s">
              <span></span>
              <!-- 时间 -->
              <span class="text">{{ dateYear }} {{ dateWeek }} {{ dateDay }}</span>
            </div>
          </div>
        </div>

        <div class="body-box">
          <!-- 第三行数据 -->
          <div class="content-box">
            <div>
              <!-- 设备信息 -->
              <dv-border-box-12>
                <centerLeft1 :deviceDetailObjct='deviceDetailObjct' />
              </dv-border-box-12>
            </div>
            <div>
              <dv-border-box-12>
                <centerLeft3 :productDetailObjec='productDetailObject' />
              </dv-border-box-12>
            </div>
          </div>
          <!--  设备 -->
          <div class="devict">
            <devict :productDetailObjec='productDetailObject'></devict>
          </div>
          <!-- 表单 -->
          <div class="altre">
            <div class="tabel">
              <dv-border-box-12>
                <el-form :inline="true" class="demo-form-inline">
                  <el-form-item label="时间：">
                    <el-date-picker ref="saveDateInput" v-model="timer" type="datetimerange" range-separator="至"
                      start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss"
                      @focus='offTimer' @blur="onTimer">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="deviceLog">查询</el-button>
                    <el-button type="primary" @click="reset">重置</el-button>
                  </el-form-item>
                </el-form>
                <div class="tab-padd">
                  <el-table :header-cell-style="{ color: 'white' }" :data="devictTable">
                    <el-table-column prop="trigTime" label="通知时间" align="center" width="150px"> </el-table-column>
                    <el-table-column prop="typeName" label="通知名称" align="center" width="80px"> </el-table-column>
                    <el-table-column prop="message" label="信息" align="center">
                    </el-table-column>
                  </el-table>
                  <gem-pagination v-if="devictTable" :total="productPagination.total"
                    :page.sync="productPagination.pageNo" :limit.sync="productPagination.pageSize"
                    @pagination="deviceLog"></gem-pagination>
                </div>
              </dv-border-box-12>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import drawMixin from "../utils/drawMixin";
import { formatTime } from '../utils/index.js'
import centerLeft1 from '@/components/centerLeft1'
import Historicaldata from '@/components/Historicaldata'
import centerLeft2 from '@/components/centerLeft2'
import centerLeft3 from '@/components/centerLeft3'
import devict from '@/components/devict/index.vue'
import Api from "@/Api/apis";
import gemPagination from '@/components/gem-pagination.base'
export default {
  mixins: [drawMixin],
  data () {
    return {
      timing: null,
      loading: true,
      dateDay: null,
      dateYear: null,
      dateWeek: null,
      weekday: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
      decorationColor: ['#568aea', '#000000'],
      devictTable: [],
      deviceDetailObjct: {},
      timer: this.$getRecentDays(7, 'yyyy-MM-dd hh:mm:ss'),
      // 分页
      productPagination: {
        total: 0,
        pageNo: 1,
        pageSize: 13,
        pageSizeOptions: [5, 10, 13],
      },
      displayInfo: {},
      listPropHistoryList: [],
      productDetailObject: {},
      interval: null,
      timerTrue: true
    }
  },
  components: {
    centerLeft1,
    centerLeft2,
    devict,
    Historicaldata,
    centerLeft3,
    gemPagination,

  },
  mounted () {
    this.timeFn()
    this.cancelLoading()
    this.productDetail()
    this.getDeviceDetail()
    this.timers()
  },
  beforeDestroy () {
    clearInterval(this.timing)
  },
  methods: {
    timeFn () {
      this.timing = setInterval(() => {
        this.dateDay = formatTime(new Date(), 'HH: mm: ss')
        this.dateYear = formatTime(new Date(), 'yyyy-MM-dd')
        this.dateWeek = this.weekday[new Date().getDay()]
      }, 1000)
    },
    cancelLoading () {
      setTimeout(() => {
        this.loading = false
      }, 500)
    },
    // 产品详情
    productDetail () {
      Api.productDetail(77).then(res => {
        this.productDetailObject = JSON.parse(res.data.data.modelInfo)
      })
    },
    // 设备基本信息
    getDeviceDetail () {
      Api.deviceDetail(2151).then(res => {
        this.deviceDetailObjct = res.data.data
        this.deviceLog()
      })
    },
    // 表单
    deviceLog () {
      const param = {
        notifyName: "",
        pageNo: this.productPagination.pageNo,
        pageSize: this.productPagination.pageSize,
        thingCode: this.deviceDetailObjct.code,
        thingTypeCode: this.deviceDetailObjct.thingTypeCode,
        trigTimeEnd: this.timer[1],
        trigTimeStart: this.timer[0]
      }
      Api.deviceLog(param).then(res => {
        this.devictTable = res.data.page.records
        this.productPagination.total = res.data.page.total
      })
    },
    // 重置
    reset () {
      this.timer = this.$getRecentDays(7, 'yyyy-MM-dd hh:mm:ss')
      this.deviceLog()
    },

    timers () {
      let than = this
      if (!this.interval) {
        this.interval = setInterval(function () {
          than.timer = than.$getRecentDays(7, 'yyyy-MM-dd hh:mm:ss')
        }, 1000);
      }

    },
    // 表单重置定时器
    offTimer () {
      if (this.interval) {
        window.clearInterval(this.interval)
        this.interval = null
      }
    },
    onTimer () {
      this.timers()
    }
  },
  watch: {
    timer (val) {
      this.deviceLog()
    }
  },
}
</script>

<style lang="scss" scoped>
@import "@/common/scss/index.scss";
.Basic-information {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  color: #c8d94a !important;
  P {
    width: 50%;
    margin: 3px 0;
  }
}
.demo-form-inline {
  padding: 10px 0 0 0;
}
.altre {
  // .Information {
  //   width: 100%;
  //   height: 18%;
  // }
  .tabel {
    width: 100% !important;
    // height: 82% !important;
    .tab-padd {
      padding: 0 10px;
    }
  }
}
</style>
