<template>
  <div id="centerLeft1">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span>
          <icon name="chart-bar" class="text-icon"></icon>
        </span>
        <div class="d-flex">
          <span class="fs-xl text mx-2">基本信息</span>
          <dv-decoration-3 class="dv-dec-3" />
        </div>
      </div>
      <!-- 4个主要的数据 -->
      <div class="bottom-data">
        <div class="item-box mt-2">
          
          <div v-for="(item,index) in deviceInformation" :key="index">
            <span>{{item.name}}：</span>
            <span class="devict-text">{{deviceDetailObjct[item.value] ? deviceDetailObjct[item.value] : '无'}}</span>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import Api from "@/Api/apis";
export default {
  props:{
    deviceDetailObjct:{
      type:Object
    }
  },
  data () {
    return {
      deviceInformation: [
        { name: '标识' ,value:'id'},
        { name: '名称' ,value:'name' },
        { name: '设备编码',value:'code' },
        { name: '产品名称' ,value:'thingTypeName'},
        { name: '产品标识' ,value:'thingTypeId'},
        { name: '产品编码' ,value:'thingTypeCode'},
        { name: '状态' ,value:'unionStatusName'},
        { name: '描述' ,value:'description'},
        { name: '连接方式' ,value:"connectTypeName" },
        { name: '联网方式' ,value:'internetTypeName' },
        { name: '应用传输协议' ,value:"appProtocolName" },
        { name: '传输接入协议',value:'transProtocolName' },
        { name: '认证类型' ,value:"authTypeName"},
        { name: '创建时间',value:'ctime'},
        { name: '修改时间' ,value:'utime'},
        { name: '更新人',value:'uperson' },
        { name: '网关标识',value:'id' },
        { name: '网关编码',value:'code' },
        { name: '网关名称',value:'name' },
      ],
      // deviceDetailObjct:{}
    }
  },
  components: {
    // CenterLeft1Chart
  },
  mounted () {
   
  },
  methods: {
    
  }
}
</script>

<style lang="scss" scoped>


  .bg-color-black {
    // height: 410px - 30px;
    border-radius: 10px;
  }
  .text {
    color: #c3cbde;
  }
  .dv-dec-3 {
    position: relative;
    width: 100px;
    height: 20px;
    top: -3px;
  }

  .bottom-data {
    .item-box {
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      color: #d3d6dd;
      div {
        // margin:4px 0;
        width: 50%;
        .devict-text {
          font-weight: bold;
        }
      }
    }
  }
</style>
