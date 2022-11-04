<template>
  <div class="demo-box">
    <dv-border-box-12>
      <div class="wall">
        <div class="door-border">
          <div class="door-frame">
            <div v-if="writing" class="counter">
              <devictDateil></devictDateil>
            </div>
            <div class="door" ref="door">
              <div class="door-face-0">
                <!-- 齿轮运转 -->
                <div v-if="!writing" id="level">
                  <div id="content"></div>
                </div>
              </div>
              <div class="door-face-2"></div>
              <div class="door-face-1">
                <div class="btn btn-primary btn-ghost btn-shine">设备运转</div>
              </div>
              <div class="door-face-3"></div>
            </div>
          </div>
        </div>
        <div class="door-sensor">
          <el-tooltip class="item" effect="dark" :content="flag ? '打开' : '关闭'" placement="top">
            <el-button  @click="fnOpenDoor(1)" :disabled="disabledflag" v-if="flag"
              icon="iconfont icon-qianmen" circle></el-button>
            <el-button  @click="fnOpenDoor(2)" :disabled="disabledflag" v-else
              icon="iconfont icon-menjin" circle></el-button>
          </el-tooltip>
        </div>
      </div>
    </dv-border-box-12>
  </div>

</template>

<script>
import { mapState } from 'vuex'
import Api from "@/Api/apis";
import devictDateil from '@/components/devictDateil.vue'
export default {
  props: {
    productDetailObjec: {
      type: Object
    }
  },
  data () {
    return {
      // percentDoor: 0,
      eleDoor: null,
      eleLight: null,
      flag: true,
      time: null,
      disabledflag: false,
      value2: '',
      writing: false,
      devictpropValue: null,
      // 分页
      productPagination: {
        total: 0,
        pageNo: 1,
        pageSize: 13,
        pageSizeOptions: [5, 10, 13],
      },
    }
  },
  methods: {
    fnOpenDoor (e) {
      this.eleDoor = this.$refs['door']
      let percentDoor = 0
      if (e == 1) {
        this.disabledflag = true
        this.time = setInterval(() => {
          percentDoor++

          if (percentDoor == 90) {
            clearInterval(this.time)
            this.time = null
            this.flag = false
            this.writing = true
            this.disabledflag = false
          }
          this.eleDoor.style.transform =
            'rotateY(' + (-90 * percentDoor) / 100 + 'deg)'
        }, 10)
      } else {
        percentDoor = 90
        this.writing = false
        this.disabledflag = true
        this.time = setInterval(() => {
          percentDoor--

          if (percentDoor == 0) {
            clearInterval(this.time)
            this.time = null
            this.flag = true

            this.disabledflag = false
          }
          // 门打开
          this.eleDoor.style.transform =
            'rotateY(' + (-85 * percentDoor) / 100 + 'deg)'
        }, 10)
      }
    },
    modelDataProp () {
      const param = {
        propCode: 'door_open',
        thingCode: "M2210EPLT001",
        thingTypeCode: "MCU2210M001",
      }
      Api.modelDataProp(param).then(res => {
        this.devictpropValue = res.data.data.propValue
        if (this.devictpropValue) {
          return this.fnOpenDoor(1)
        } else {
          return this.fnOpenDoor(2)
        }
      })
    },
  },

  components: {
    devictDateil
  },
  computed: {
    ...mapState(['men'])
  },

  created () {
    this.modelDataProp()
  },
}
</script>

<style lang="scss" scoped>
@import "@/common/css/mixin.scss";
@import "@/common/css/variable.scss";
@import "@/common/css/devict.scss";
.demo-box {
  @include width-height(100%, 100%);
  overflow: hidden;
  position: relative;
  z-index: 1;
  .wall {
    @include position-absolute(0, 0, 46px, 0);
    // border-bottom: $main-border-bottom;
    // margin: auto;
    // box-shadow: 0 -200px #768bb6;
    .door-border {
      @include position-absolute(28px, 40px, 0, 40px);
      border: $main-border-bottom;
      // border-bottom: 0;
      .door-frame {
        @include position-absolute(10px, 9px, 0, 9px);
        border: $main-border-bottom;
        border-bottom: 0;
        // background-color: #0c2e59;
        perspective: 1200px;
        .counter {
          padding: 20px;
          height: 100%;
          // background-color: red
        }
        .door {
          @include position-absolute(0, 0, 0, 0);
          transform-style: preserve-3d;
          transform-origin: left;
          transform: rotateY(0deg);
          backface-visibility: hidden;
          .door-face-1,
          .door-face-0 {
            @include position-absolute(-3px, -3px, -3px, -3px);
            .btn {
              @include position-absolute-bottom(5px, 0, 0);
              @include width-height(165px, 60px);
              line-height: 60px;
              margin: 100px auto;
              text-align: center;
              --hue: 190;
              position: relative;
              color: white;
              background-color: hsl(var(--hue), 100%, 41%);
              border: 1px solid hsl(var(--hue), 100%, 41%);
              outline: transparent;
              overflow: hidden;
              cursor: pointer;
              user-select: none;
              white-space: nowrap;
              box-shadow: 0 0 20px 10px hsla(var(--hue), 100%, 41%, 0.5);
              transition: 0.25s;

              &:hover {
                background: hsl(var(--hue), 100%, 31%);
              }

              &-primary {
                --hue: 187;
              }

              &-ghost {
                color: hsl(var(--hue), 100%, 41%);
                background-color: transparent;
                border-color: hsl(var(--hue), 100%, 41%);

                &:hover {
                  color: white;
                }
              }

              &-shine {
                color: white;

                &::before {
                  position: absolute;
                  content: "";
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                  background: linear-gradient(
                    120deg,
                    transparent,
                    hsla(var(--hue), 100%, 41%, 0.5),
                    transparent
                  );
                  transform: translateX(-100%);
                  transition: 0.6s;
                }

                &:hover {
                  background: transparent;
                  box-shadow: 0 0 20px 10px hsla(var(--hue), 100%, 41%, 0.5);
                }

                &:hover::before {
                  transform: translateX(100%);
                }
              }
            }
          }
          .door-face-1 {
            transform: translateZ(0);
          }
          .door-face-0 {
            transform: translateZ(-12px);
          }
          .door-face-2,
          .door-face-3 {
            border: $main-border-bottom;
            border-radius: 2px;
          }
          .door-face-2 {
            @include position-absolute-bottom(0, -3px, -3px);
            height: 6px;
            transform: translate3D(0, -7.5px, -6px) rotateX(90deg);
          }
          .door-face-3 {
            @include position-absolute-left(-3px, 0px, -3px);
            width: 6px;
            transform: translate3D(7.5px, 0, -6px) rotateY(90deg);
          }
        }
      }
    }
    .door-sensor {
      @include position-absolute-right(50%, 5px);
      .icon-qianmen {
        font-size: 30px;
      }
    }
  }
}
</style>
