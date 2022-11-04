<template>
  <div class="Historicaldata">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span>
          <icon name="chart-bar" class="text-icon"></icon>
        </span>
        <div class="d-flex">
          <span class="fs-xl text mx-2">关联信息</span>
          <dv-decoration-3 class="dv-dec-3" />
        </div>
      </div>
      <div class="bottom-data">
        <div v-for="(item,index) in deviceInformation" :key="index">
          <span>{{item.name}}：</span>
          <span class="devict-text">{{deviceDetailObjct[item.value] ? deviceDetailObjct[item.value] : '无'}}</span>
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
  data() {
    return {
      deviceInformation: [
        { name: '产品标识' ,value:'thingTypeId'},
        { name: '产品编码' ,value:'thingTypeCode'},
        { name: '产品名称' ,value:'thingTypeName'},
        { name: '网关标识' ,value:'id'},
        { name: '网关编码' ,value:'code'},
        { name: '网关名称' ,value:'name'},
      ]
    }
  },
 
}
</script>

<style lang='scss' scoped>
.Historicaldata {
  $box-width: 300px;
  $box-height: 148px;
  padding: 16px;
  height: $box-height;
  min-width: $box-width;
  border-radius: 5px;
  .bg-color-black {
    // padding: 16px;
    height: $box-height - 30px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;

  }
}
.dv-dec-3 {
  position: relative;
  width: 100px;
  height: 20px;
  top: -3px;
}
.bottom-data{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  font-size: 14px;
    div {
      width: 50%;
      margin: 5px 0;
      .devict-text {
        font-weight: bold;
      }
    }
}
</style>