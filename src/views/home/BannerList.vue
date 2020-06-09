<template>
  <div class="banner">
    <div class="banner-box">
      <div class="bg-wrapper" @mouseenter="enterBgBanner" @mousemove="moveBgBanner" @mouseleave="leaveBgBanner">
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
      </div>
      <div class="text-wrapper">
        <div class="logo-wrapper">
          <i class="left"></i>
          <i class="right"></i>
          <i class="top"></i>
          <i class="bottom"></i>
          <img src="../../assets/img/logo.png" alt="logo">
        </div>
        <p class="detail">
          Globm Blog 旨在锻炼自己的能力,向全栈进军！并将遇到的一些问题进行整理,还添加了一些实用的小工具
        </p>
        <div class="btn-wrapper">
          <span>实用工具</span>
          <span>博客 Blog</span>
        </div>
        <div class="gitBtn-wrapper">
          <a href="javascript:void(0)" target="_blank">
            <img src="../../assets/img/ico/github.png" alt="">
            <span>Star</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Banner',
  data () {
    return {
      clientX: 0
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    enterBgBanner (e) {
      this.clientX = e.clientX
      document.querySelectorAll('.bg-wrapper .groupLeft').forEach(item => {
        item.style.transform = 'translateX(30px)'
      })
      document.querySelectorAll('.bg-wrapper .groupRight').forEach(item => {
        item.style.transform = 'translateX(-30px)'
      })
    },
    moveBgBanner (e) {
      const num = this.clientX > e.clientX ? -30 : 30
      document.querySelectorAll('.bg-wrapper .groupLeft').forEach(item => {
        item.style.transform = `translateX(${num}px)`
      })
      document.querySelectorAll('.bg-wrapper .groupRight').forEach(item => {
        item.style.transform = `translateX(${num}px)`
      })
      this.clientX = e.clientX
    },
    leaveBgBanner () {
      document.querySelectorAll('.bg-wrapper .groupLeft').forEach(item => {
        item.style.transform = 'translateX(0px)'
      })
      document.querySelectorAll('.bg-wrapper .groupRight').forEach(item => {
        item.style.transform = 'translateX(0px)'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .banner {
    height: 682px - 64px;
    background: #2f54eb;
    color: #fff;
    position: relative;
    .banner-box {
      position: absolute;
      width: 100%;
      transform: translate(0px);
      height: 100%;
      display: flex !important;
      justify-content: center;
      align-items: center;
      text-align: center;
      overflow: hidden;
      .bg-wrapper{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
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
      }
      .text-wrapper{
        padding: 0 24px;
        position: relative;
        .logo-wrapper{
          width: 160px;
          height: 160px;
          margin: 0 auto;
          position: relative;
          .left{
            position: absolute;
            height: 264px;
            width: 1px;
            top: -52px;
            left: 5px;
            background: #fff;
            animation: .5s transLineLeft;
            @keyframes transLineLeft {
              from{
                height: 0;
                width: 1px;
                top: -52px;
                left: 5px;
                opacity: 0;
              }
              to{
                height: 264px;
                width: 1px;
                top: -52px;
                left: 5px;
                opacity: 1;
              }
            }
          }
          .right{
            position: absolute;
            height: 264px;
            width: 1px;
            top: -52px;
            left: 33px;
            background: #fff;
            animation: .7s transLineRight;
            @keyframes transLineRight {
              from{
                height: 0;
                width: 1px;
                top: -52px;
                left: 33px;
                opacity: 0;
              }
              to{
                height: 264px;
                width: 1px;
                top: -52px;
                left: 33px;
                opacity: 1;
              }
            }
          }
          .top{
            position: absolute;
            width: 264px;
            height: 1px;
            bottom: 5px;
            left: -52px;
            background: #fff;
            animation: .5s transLineTop;
            @keyframes transLineTop {
              from{
                width: 0;
                height: 1px;
                bottom: 5px;
                left: -52px;
                opacity: 0;
              }
              to{
                width: 264px;
                height: 1px;
                bottom: 5px;
                left: -52px;
                opacity: 1;
              }
            }
          }
          .bottom{
            position: absolute;
            width: 264px;
            height: 1px;
            bottom: 33px;
            left: -52px;
            background: #fff;
            animation: .7s transLineBottom;
            @keyframes transLineBottom {
              from{
                width: 0;
                height: 1px;
                bottom: 33px;
                left: -52px;
                opacity: 0;
              }
              to{
                width: 264px;
                height: 1px;
                bottom: 33px;
                left: -52px;
                opacity: 1;
              }
            }
          }
          img{
            display: block;
            width: 100%;
            height: 100%;
            vertical-align: middle;
            position: absolute;
            animation: 2s transLogoImg;
            @keyframes transLogoImg {
              0%{
                opacity: 0;
                transform: translateX(500px) rotateZ(360deg);
              }
              40%{
                transform: translate(80px, 0) rotateZ(-30deg);
              }
              70%{
                transform: translate(0, 0) rotateZ(-30deg);
              }
              100%{
                opacity: 1;
              }
            }
          }
          .write-box{
            position: absolute;
            bottom: 30px;
            left: 5px;
            height: 30px;
            width: 30px;
            background: red;
          }
        }
        .detail{
          font-size: 16px;
          line-height: 32px;
          font-weight: 400;
          max-width: 557px;
          margin: 80px auto 64px;
        }
        .btn-wrapper{
          span{
            min-width: 136px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            border-radius: 20px;
            display: inline-block;
            font-size: 16px;
            box-sizing: content-box;
            cursor: pointer;
            transform: translateY(0);
            touch-action: manipulation;
            transition: box-shadow .3s cubic-bezier(.215,.61,.355,1),
                        transform .3s cubic-bezier(.215,.61,.355,1),
                        color .3s cubic-bezier(.215,.61,.355,1),
                        border .3s cubic-bezier(.215,.61,.355,1),
                        background .3s cubic-bezier(.215,.61,.355,1);
            border: 1px solid #fff;
            &:hover{
              transform: translateY(-4px);
              box-shadow: 0 4px 12px rgba(16,45,164,.55);
            }
            &:first-child{
              background: #fff;
              color: #2f54eb;
            }
            &:last-child{
              color: #fff;
              margin-left: 24px;
              &:hover{
                background: #fff;
                color: #2f54eb;
              }
            }
          }
        }
        .gitBtn-wrapper{
          margin-top: 24px;
          a{
            background-color: #eee;
            border: 1px solid #d5d5d5;
            padding: 1px 5px 1px 4px;
            color: #333;
            border-radius: 3px;
            &:hover{
              background-color: #ddd;
              color: #597ef7;
            }
            img{
              width: 14px;
              height: 14px;
              vertical-align: middle;
              margin-right: 4px;
              display: inline-block;
            }
            span{
              font-size: 12px;
              font: bold 11px/14px 'Helvetica Neue',Helvetica,Arial,sans-serif;
            }
          }
        }
      }
    }
  }
</style>
