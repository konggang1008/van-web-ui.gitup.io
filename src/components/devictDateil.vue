<template>
  <div class="detail">
    <div class="hrader">
      <div class="breathe-div"></div>
    </div>
    <div class="middle">
      <div class="wangguan">
        <div class="top-bottom"></div>
      </div>

      <div class="fangshanya">
        <div class="top-bottom"></div>
      </div>
      <div class="dendai">
        <div class="top-bottom"></div>
      </div>
      <div class="power-supplys">
        <img src="@/assets/bianyaqi.jpg" alt="" class="bianyaqi">
      </div>
      <img src="@/assets/电路板 (1).png" alt="" class="dianlu" />
      <div class="Open">
      </div>
      <div class="fangshan">
        <div class="box2">
          <div id="nob1" ref="nob1"></div>
          <div class="nob" id="nob2" ref="nob2"></div>
          <div class="nob" id="nob3" ref="nob3"></div>
          <div class="nob" id="nob4" ref="nob4"></div>
        </div>
      </div>
      <div class="power-supply">
        <img src="@/assets/bianyaqi.jpg" alt="" class="bianyaqi">
      </div>
      <img :src="baImgSrc" alt="" @click="toggle()" class="gunbi">
      <div class="gateway">
        <el-tooltip class="item" effect="dark" content="网关" placement="top">
          <i class="iconfont icon-tongyiwangguan"></i>
        </el-tooltip>
      </div>
      <div class="dianluben">
        <div class="top-bottom"></div>
      </div>
      <div class="wendu">
        <div class="top-bottom"></div>
      </div>
      <div class="dengpao">
        <div class="top-bottom"></div>
      </div>
      <!-- <div class="shidu">
        <div class="top-bottom"></div>
      </div> -->
      <div class="zhenduan">
        <div class="top-bottom"></div>
      </div>
      <!-- <div class="qiya">
        <div class="top-bottom"></div>
      </div> -->
    </div>
    <div class="footer">
      <div>
        <el-tooltip class="item" effect="dark" :content="'温度'+wendu.propValue" placement="top">
          <i class="iconfont icon-wendu">{{wendu.propValue}}</i>
        </el-tooltip>
      </div>
      <div>
        <el-tooltip class="item" effect="dark" :content="'湿度'+shidu.propValue" placement="top">
          <i class="iconfont icon-wenshidu">{{shidu.propValue}}</i>
        </el-tooltip>
      </div>
      <div>
        <el-tooltip class="item" effect="dark" :content="zhen.propValue ? '震动触发' : '震动无触发'" placement="top">
          <i class="iconfont icon-changanzhizhendong">{{zhen.propValue ? '震动触发' : '震动无触发'}}</i>
        </el-tooltip>
      </div>
      <div>
        <el-tooltip class="item" effect="dark" :content="'气压'+shidu.propValue" placement="top">
          <i class="iconfont icon-qiya">{{qiya.propValue}}</i>
        </el-tooltip>
      </div>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      interval: null,
      i: 1,
      on: false,
      baImgSrc: require('@/assets/off.gif')
    }
  },
  methods: {
    change3 (num) {
      this.$refs.nob2.style.transform = "rotate(" + this.i * 360 + "deg)";
      this.$refs.nob2.style.transition = "transform " + num + "ms linear";
      let num2 = this.i * 360 + 240;
      this.$refs.nob3.style.transform = "rotate(" + num2 + "deg)";
      nob3.style.transition = "transform " + num + "ms linear";
      let num3 = this.i * 360 + 120;
      this.$refs.nob4.style.transform = "rotate(" + num3 + "deg)";
      this.$refs.nob4.style.transition = "transform " + num + "ms linear";
      this.i++;
    },
    timer () {
      let than = this
      this.interval = setInterval(function () {
        than.change3(1000);
      }, 1000);
    },
    toggle () {
      if (this.on == true) {
        // 关闭
        this.baImgSrc = require('@/assets/off.gif')
      } else {
        // 打开
        this.baImgSrc = require('@/assets/on.gif');
      }
      // 取反
      this.on = !this.on;
    }
  },
  mounted () {
    if (this.fenshao.propValue == 'true') {
      this.timer()
    }
    if (this.deng.propValue == 'true') {
      this.on = this.deng.propValue
      this.toggle()
    }
  },
  computed: {
    ...mapState(['wendu', 'shidu', 'zhen', 'qiya', 'men', 'fenshao', 'baogang', 'guang', 'deng'])
  }
}
</script>

<style lang="scss" scoped>
@import "@/common/css/animation.scss";
@import "@/common/css/mixin.scss";
$height: 16px;
.detail {
  position: relative;
  // display: flex;
  @include direction-column;
  // flex-direction: column;
  @include width-height(100%, 100%);
  .middle {
    flex: 1;
    position: relative;
    .dianlu {
      @include position-center;
    }
  }
  .footer {
    @include space-around-wrap;
    div {
      width: 50%;
      margin-top: 10px;
    }
    .icon-wendu,
    .icon-wenshidu,
    .icon-changanzhizhendong,
    .icon-qiya {
      font-size: 30px;
    }
    .icon-wendu {
      color: red;
    }
    .icon-wenshidu {
      color: #00a0e9;
    }
    .icon-changanzhizhendong {
      color: rgb(58, 245, 12);
    }
    .icon-qiya {
      color: #d8f906;
    }
  }
}
.breathe-div {
  @include width-height(100%, 10px);
  border: 1px solid #2b92d4;
  box-shadow: 0 1px 2px rgba(107, 233, 17, 0.811);
  overflow: hidden;
  background-color: #1edf00;
  animation: breathe 1s infinite;
  animation-timing-function: ease-in-out;
  animation-direction: alternate;
}
@keyframes breathe {
  0% {
    opacity: 0.6;
    box-shadow: 0 1px 2px rgba(59, 231, 6, 0.921),
      0 1px 1px rgba(24, 241, 56, 0.904) inset;
  }
  100% {
    opacity: 1;
    border: 1px solid rgba(4, 242, 16, 0.963);
    box-shadow: 0 1px 30px #1edf00, 0 1px 20px #4adf00 inset;
  }
}
.wendu {
  @include width-height($height, 45%);
  @include position-absolute-bottome(52%, -55px);
  .top-bottom {
    transform: rotate(37deg);
  }
  .top-bottom::before {
    @include animation-top(flowbottom, 100s);
  }
}
.dengpao {
  @include position-absolute-letbottome(30%, 170px);
  @include width-height($height, 14%);
  .top-bottom {
    transform: rotate(30deg);
  }
  .top-bottom::before {
    @include animation-top(flowbottom, 30s);
  }
}
.shidu {
  @include position-absolute-bottome(48%, -30px);
  @include width-height($height, 40%);
  .top-bottom {
    transform: rotate(25deg);
  }
  .top-bottom::before {
    @include animation-top(flowbottom, 100s);
  }
}
.zhenduan {
  @include position-absolute-bottome(38%, -20px);
  @include width-height($height, 40%);
  .top-bottom {
    transform: rotate(8deg);
  }
  .top-bottom::before {
    @include animation-top(flowbottom, 100s);
  }
}
.qiya {
  @include position-absolute-bottome(32%, -35px);
  @include width-height($height, 40%);
  .top-bottom {
    transform: rotate(-25deg);
  }
  .top-bottom::before {
    @include animation-top(flowbottom, 100s);
  }
}

.wangguan {
  @include position-absolute-tole(170px, 10%);
  @include width-height($height, 21%);
  .top-bottom {
    transform: rotate(8deg);
  }
  .top-bottom::before {
    @include animation-top(flowbottom, 100s);
  }
}
.dianluben {
  @include position-absolute-bottome(25%, 230px);
  @include width-height($height, 5%);
  .top-bottom {
    transform: rotate(-30deg);
  }
  .top-bottom::before {
    @include animation-top(flowtop, 10s);
  }
}
.fangshanya {
  @include position-absolute-tole(120px, 23%);
  @include width-height($height, 21%);
  .top-bottom {
    transform: rotate(-90deg);
  }
  .top-bottom::before {
    @include animation-top(flowbottom, 100s);
  }
}
.dendai {
  @include position-absolute-tole(10%, 13%);
  @include width-height($height, 10%);
  .top-bottom {
    transform: rotate(-180deg);
  }
  .top-bottom::before {
    @include animation-top(flowbottom, 30s);
  }
}
.Open {
  @include position-absolute-right(50%, 0);
  transform: translate(-50%, 0%);
}
.iconfont {
  font-size: 20px;
}
.fan {
  @include position-absolute-letbottome(5%, -10px);
  transform: translate(0%, -50%);
  color: #1b98dd;
}
.exposure {
  @include position-absolute-letbottome(20%, 10px);
  color: red;
}
.gateway {
  @include position-absolute-tole(50%, 30px);
  transform: translate(-50%, 0%);
}
.power-supply {
  @include position-absolute-bottome(0px, 22%);
}
.power-supplys {
  @include position-absolute-tole(10%, 0);
}
.icon-tongyiwangguan {
  font-size: 100px;
  color: #1b98dd;
}
.icon-qianmen,
.icon-dianyuan,
.icon-fengshan,
.icon-puguang {
  font-size: 55px;
}
.box2 {
  @include width-height(200px, 200px);
  @include position-absolute-right(2%, 0);
  border-radius: 50%;
  border: 1px solid #1a5cd7;
}
#nob1 {
  @include width-height(50px, 50px);
  @include position-absolute-tole(35%, 38%);
  border-radius: 50%;
  background: #000;
  z-index: 3;
}
.nob {
  @include width-height(50px, 100px);
  @include position-absolute-tole(0, 78px);
  border-radius: 50%;
}
#nob2 {
  background: linear-gradient(to right, #e0eeff, #7badff);
  transform-origin: 50% bottom;
  transition: transform 1s linear;
}
#nob3 {
  transform: rotate(240deg);
  background: linear-gradient(to right, #e0eeff, #7badff);
  transform-origin: 50% bottom;
  transition: transform 1s linear;
}
#nob4 {
  transform: rotate(120deg);
  background: linear-gradient(to right, #e0eeff, #7badff);
  transform-origin: 50% bottom;
  transition: transform 1s linear;
}
.shu {
  @include width-height(20px, 300px);
  background: #1a5cd7;
  box-shadow: 2px 0 2px 2px #dedede;
  margin-left: 87px;
  position: relative;
}
.n {
  @include width-height(15px, 15px);
  position: absolute;
  border-radius: 50%;
  background: #aaa;
  color: #fff;
  left: 2.5px;
  text-align: center;
  cursor: pointer;
}
#n1 {
  top: 50px;
}
#n2 {
  top: 80px;
}
#n3 {
  top: 110px;
}
#n4 {
  top: 140px;
}
.bianyaqi {
  @include width-height(100px, 100px);
  border-radius: 20px;
}
.gunbi {
  @include width-height(100px, 130px);
  @include position-absolute-letbottome(0, 10%);
}
</style>
