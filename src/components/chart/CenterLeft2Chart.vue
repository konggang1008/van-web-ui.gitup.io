<template>
  <div class="card">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{modelInfo.name}}</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="history(modelInfo.code)">历史</el-button>
      </div>
      <div class="devictstate">
        <div>
          <h1>{{modelInfoObjcet ? modelInfoObjcet.propValue : '无'}}</h1><span>{{modelInfo.dataType.unit}}</span>
        </div>
        <p>
          <span>{{modelInfo.code}}</span>
          <span>{{modelInfoObjcet ? modelInfoObjcet.eventTime : '无'}}</span>
        </p>
      </div>
    </el-card>
    <el-dialog :append-to-body="true" :title="`${modelInfo.name}【${modelInfo.code}】`"
      :visible.sync="historyDialogVisible">
      <!-- <span>这是一段信息</span> -->
      <el-date-picker v-model="historytimer" type="datetimerange" range-separator="至" start-placeholder="开始日期"
        end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss">
      </el-date-picker>
      <el-table :data="historyTabel">
        <el-table-column prop="eventTime" label="最新时间" align="center">
        </el-table-column>
        <el-table-column prop="propValue" label="最新值" align="center">
          <template slot-scope="scope">

            <span>{{scope.row.propValue}}</span>

          </template>
        </el-table-column>
      </el-table>
      <gem-pagination :total="productPagination.total" :page.sync="productPagination.pageNo"
        :limit.sync="productPagination.pageSize" @pagination="historyList"></gem-pagination>
      <span slot="footer" class="dialog-footer">
        <el-button @click="historyDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="historyDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
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
      modelInfoObjcet: {},
      historyDialogVisible: false,
      historytimer: [],
      // 分页
      productPagination: {
        total: 0,
        pageNo: 1,
        pageSize: 10,
        pageSizeOptions: ['5', '10', '20', '50', '100'],
      },
      historyTabel: []
    }
  },
  methods: {
    modelDataProp () {
      const param = {
        propCode: this.modelInfo.code,
        thingCode: "M2210EPLT001",
        thingTypeCode: "MCU2210M001"
      }
      Api.modelDataProp(param).then(res => {
        this.modelInfoObjcet = res.data.data
        if (this.modelInfo.code == 'door_open') {
          this.$store.commit('men', res.data.data)
        } else if (this.modelInfo.code == 'shaking') {
          this.$store.commit('zhen', res.data.data)
        } else if (this.modelInfo.code == 'temperature') {
          this.$store.commit('wendu', res.data.data)
        }else if(this.modelInfo.code == 'humidity'){
          this.$store.commit('shidu', res.data.data)
        }else if(this.modelInfo.code == 'pressure'){
          this.$store.commit('qiya', res.data.data)
        }else if(this.modelInfo.code == 'light'){
          this.$store.commit('guang', res.data.data)
        }else if(this.modelInfo.code == 'lights_red'){
          this.$store.commit('deng', res.data.data)
        }else if(this.modelInfo.code == 'fan'){
          this.$store.commit('fenshao', res.data.data)
        }
      })
    },

    history (code) {
      this.deCode = code
      this.historyDialogVisible = true
      this.historytimer = this.$getRecentDays(1, 'yyyy-MM-dd hh:mm:ss')
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
      let applist = []
      Api.listPropHistory(param).then(res => {
        // console.log(res);
        this.historyTabel = res.data.page.records
        this.productPagination.total = res.data.page.total

      })
    },
    setInter () {
      this.timer = setInterval(() => {
        this.modelDataProp()
      }, 10000)
    }
  },
  mounted () {
    this.modelDataProp()
    this.setInter()
  },
  beforeDestroy () {
    clearInterval(this.timer);
    this.timer = null;
  },
  watch: {
    historytimer: {
      handler (val) {
        this.historyList()
      },
    }
  }
}
</script>

<style lang='scss' scoped>
.devictstate {
  h1 {
    display: inline-block;
    padding: 20px 0;
  }
  p {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
  }
}
.card {
  width: 49%;
}
::v-deep .el-card {
  background-color: transparent;
  color: white;
  margin-top: 10px;
  border: 1px solid #2c477b;
}
::v-deep .el-card__header {
  padding: 10px;
}
::v-deep .el-card__body {
  padding: 0;
}
::v-deep .el-dialog {
  margin: 30px auto !important;
}
</style>