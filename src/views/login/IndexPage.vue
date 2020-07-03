<template>
  <main>
    <div class="main-wrapper">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1440 451"
        style="opacity: 1;"
      >
        <g
          transform="translate(-30, -10)"
          stroke="none"
          stroke-width="1"
          fill="none"
          fill-rule="evenodd"
        >
          <g opacity="0.3">
            <g class="groupLeft">
              <g class="group-left1" style="transform: translateX(14.7292px);">
                <rect
                  fill="#FFFFFF"
                  transform="translate(41.000000, 169.000000) rotate(-27.000000) translate(-41.000000, -169.000000) "
                  x="11"
                  y="139"
                  width="60"
                  height="60"
                  rx="2"
                ></rect>
              </g>
            </g>
            <g class="groupLeft">
              <g class="group-left2" style="transform: translateX(-14.7292px);">
                <polygon
                  stroke="#FFFFFF"
                  stroke-width="2"
                  transform="translate(139.000000, 17.500000) rotate(45.000000) translate(-139.000000, -17.500000) "
                  points="139 77 152 100 126 100"
                ></polygon>
              </g>
            </g>
            <g class="groupRight">
              <g class="group-left3" style="transform: translateX(22.0938px);">
                <polygon
                  id="Polygon"
                  stroke="#FFFFFF"
                  transform="translate(180.000000, 446.000000) rotate(-67.000000) translate(-180.000000, -446.000000) "
                  points="180 439 188 453 172 453"
                ></polygon>
              </g>
            </g>
            <g class="groupLeft">
              <g class="group-left4" style="transform: translateX(-22.0938px);">
                <circle
                  id="Oval"
                  stroke="#FFFFFF"
                  stroke-width="3"
                  fill="#FFFFFF"
                  cx="256"
                  cy="357"
                  r="10"
                ></circle>
              </g>
            </g>
          </g>
          <g
            transform="translate(1219.000000, 69.000000)"
            stroke="#FFFFFF"
          >
            <g class="groupLeft">
              <g class="group-right1" style="transform: translateX(-7.36458px);">
                <rect
                  stroke-width="2"
                  opacity="0.3"
                  transform="translate(47.000000, 343.000000) rotate(-45.000000) translate(-47.000000, -343.000000) "
                  x="15"
                  y="311"
                  width="64"
                  height="64"
                  rx="2"
                ></rect>
              </g>
            </g>
            <g class="groupRight">
              <g class="group-right2" style="transform: translateX(29.4583px);">
                <circle
                  stroke-width="3"
                  fill="#FFFFFF"
                  opacity="0.4"
                  cx="155"
                  cy="13"
                  r="13"
                ></circle>
              </g>
            </g>
            <g class="groupLeft">
              <g class="group-right3" style="transform: translateX(-22.0938px);">
                <circle
                  stroke-width="2"
                  opacity="0.4"
                  cx="211"
                  cy="225"
                  r="8"
                ></circle>
              </g>
            </g>
          </g>
        </g>
      </svg>
      <div class="login-wrapper">
        <div class="notes">
          <h4>Humorous jokes</h4>
          <p>{{note.detail}}</p>
          <span @click="handleNotePraise" :class="praiseActive ? 'active' : ''"><i class="ico icon-praise"></i>{{note.praise}}</span>
        </div>
        <div class="login-box">
          <div class="login-item">
            <h3>Sign In</h3>
            <el-input
              placeholder="用户名/邮箱/手机号"
              prefix-icon="el-icon-user"
              v-model="email">
            </el-input>
            <el-input
              placeholder="请输入密码"
              prefix-icon="el-icon-lock"
              show-password
              v-model="password">
            </el-input>
            <m-slider-verify :verify.sync="sliderVerify"/>
            <el-button type="primary" :loading="loading" @click="handleSubmit">登录</el-button>
            <el-button :loading="loading" @click="handleSubmit">游客一键登录</el-button>
            <p>没有账户？<span @click="handleRegister">注册</span></p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { apiGetNoteRandom, apiPutNotePraise, apiLogin } from '@/api/http_url'
import MSliderVerify from '@/components/MSliderVerify'

export default {
  name: 'IndexPage',
  data () {
    return {
      note: {},
      praiseActive: false,
      email: '',
      password: '',
      sliderVerify: false,
      loading: false
    }
  },
  created () {
    document.title = 'Login' + '_Globm Blog'
    this.getNote()
  },
  methods: {
    getNote () {
      apiGetNoteRandom().then(res => {
        this.note = res
      })
    },
    handleNotePraise () {
      apiPutNotePraise({ id: this.note.id }).then(_ => {
        ++this.note.praise
        this.praiseActive = true
      })
    },
    handleSubmit () {
      if (this.paramsVerify()) {
        const data = {
          email: this.email,
          password: this.password
        }
        apiLogin(data).then(res => {
          this.$store.dispatch('SET_TOKEN', res).then(_ => {
            this.$notice.success('登录成功')
            this.$router.replace(this.$route.query.path || '/')
          })
        }).catch(err => {
          this.$notice.error(err.msg)
        })
      }
    },
    paramsVerify () {
      if (!this.email) {
        this.$notice('请输入邮箱')
        return false
      }
      if (!this.$store.state.regular.email.test(this.email)) {
        this.$notice('邮箱格式不正确')
        return false
      }
      if (!this.password) {
        this.$notice('请输入密码')
        return false
      }
      if (!this.$store.state.regular.password.test(this.password)) {
        this.$notice('密码格式不正确')
        return false
      }
      if (!this.sliderVerify) {
        this.$notice('请先进行滑块校验')
        return false
      }
      return true
    },
    handleRegister () {
      this.$notice('注册功能暂未开发，如有需要请联系博主')
    }
  },
  components: {
    MSliderVerify
  }
}
</script>

<style lang="scss" scoped>
  main{
    height: calc(100vh - 64px);
    .main-wrapper{
      position: relative;
      min-height: 629px;
      height: 100%;
      background-color: #2f54eb;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='800' viewBox='0 0 200 200'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='88' y1='88' x2='0' y2='0'%3E%3Cstop offset='0' stop-color='%23064e77'/%3E%3Cstop offset='1' stop-color='%230a7dbe'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='75' y1='76' x2='168' y2='160'%3E%3Cstop offset='0' stop-color='%231a2f84'/%3E%3Cstop offset='0.09' stop-color='%23213ba5'/%3E%3Cstop offset='0.18' stop-color='%232542ba'/%3E%3Cstop offset='0.31' stop-color='%232848ca'/%3E%3Cstop offset='0.44' stop-color='%232b4cd6'/%3E%3Cstop offset='0.59' stop-color='%232d50df'/%3E%3Cstop offset='0.75' stop-color='%232e52e6'/%3E%3Cstop offset='1' stop-color='%232f54eb'/%3E%3C/linearGradient%3E%3Cfilter id='c' x='0' y='0' width='200%25' height='200%25'%3E%3CfeGaussianBlur in='SourceGraphic' stdDeviation='12' /%3E%3C/filter%3E%3C/defs%3E%3Cpolygon fill='url(%23a)' points='0 174 0 0 174 0'/%3E%3Cpath fill='%23000' fill-opacity='.5' filter='url(%23c)' d='M121.8 174C59.2 153.1 0 174 0 174s63.5-73.8 87-94c24.4-20.9 87-80 87-80S107.9 104.4 121.8 174z'/%3E%3Cpath fill='url(%23b)' d='M142.7 142.7C59.2 142.7 0 174 0 174s42-66.3 74.9-99.3S174 0 174 0S142.7 62.6 142.7 142.7z'/%3E%3C/svg%3E");
      /*background-attachment: fixed;*/
      background-repeat: no-repeat;
      background-position: top left;
      svg{
        .groupLeft,.groupRight{
          transition: 1s ease-in-out;
        }
        @mixin transAnimation($form,$to,$time){
          animation: transAnimation $time ease-in-out infinite normal;
          @keyframes transAnimation {
            0%,100%{
              transform: translateY($form);
            }
            50%{
              transform: translateY($to);
            }
          }
        }
        .group-left1{
          @include transAnimation(11px,15px,5s)
        }
        .group-left2{
          @include transAnimation(11px,28px,8s)
        }
        .group-left3{
          @include transAnimation(14px,-25px,6s)
        }
        .group-left4{
          @include transAnimation(13px,20px,9s)
        }
        .group-right1{
          @include transAnimation(20px,-16px,8s)
        }
        .group-right2{
          @include transAnimation(15px,-19px,6s)
        }
        .group-right3{
          @include transAnimation(20px,-16px,4s)
        }
      }
      .login-wrapper{
        width: 790px;
        height: 500px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -395px;
        margin-top: -250px;
        overflow: hidden;
        .notes{
          float: left;
          width: 340px;
          height: 100%;
          background: rgba(0,0,0,.4);
          padding: 40px;
          h4{
            line-height: 34px;
            height: 34px;
            font-size: 20px;
            color: #fff;
            font-weight: 400;
            margin-bottom: 24px;
          }
          p{
            color: #fff;
            line-height: 34px;
            height: 340px;
            @include multi-line-ellipsis(9);
          }
          span{
            display: inline-block;
            min-width: 120px;
            height: 40px;
            padding: 0 10px;
            color: #fff;
            text-align: center;
            line-height: 40px;
            border-radius: 24px 24px;
            border: 1px solid #fff;
            left: 40px;
            bottom: 40px;
            cursor: pointer;
            user-select: none;
            &:hover,&.active{
              color: #ff4229;
              border-color: #ff4229;
            }
            i{
              margin-right: 8px;
            }
          }
        }
        .login-box{
          float: left;
          width: 450px;
          height: 100%;
          background: #fff;
          .login-item{
            text-align: center;
            padding: 73px;
            h3{
              font-weight: normal;
              font-size: 18px;
              color: #0d3313;
              line-height: 20px;
              margin-bottom: 30px;
            }
            .el-input,.slider-verify{
              margin-bottom: 20px;
            }
            .el-button{
              width: 100%;
              letter-spacing: 5px;
              margin: 0 0 12px 0;
            }
            > p{
              color: #555555;
              line-height: 20px;
              span{
                color: $primary-color;
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }
</style>
