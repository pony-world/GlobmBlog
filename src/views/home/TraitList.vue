<template>
  <div class="TraitList">
    <div class="summary">
      <div class="summary-box">
        <h2>三大功能</h2>
        <div class="content" ref="summary" :class="summaryShow ? 'show' : ''">
          <div class="column">
            <div class="column-box">
              <div class="point-box">
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
              </div>
              <router-link tag="div" to="/tool" class="ico-box">
                <img src="../../assets/img/ico/tool-ico.png" alt="">
              </router-link>
            </div>
            <span>实用工具</span>
          </div>
          <div class="column">
            <div class="column-box">
              <div class="point-box">
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
              </div>
              <router-link tag="div" to="/blog" class="ico-box">
                <img src="../../assets/img/ico/blog-ico.png" alt="">
              </router-link>
            </div>
            <span>博客 Blog</span>
          </div>
          <div class="column">
            <div class="column-box">
              <div class="point-box">
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
              </div>
              <router-link tag="div" to="/ui" class="ico-box">
                <img src="../../assets/img/ico/ui-ico.png" alt="">
              </router-link>
            </div>
            <span>UI 组件</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TraitList',
  data () {
    return {
      summaryShow: true
    }
  },
  created () {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll () {
      const refArr = [
        { ref: 'summary', show: 'summaryShow' }
      ]
      const that = this
      refArr.forEach(({ ref, show }) => {
        that.getScroll(ref, 100).then(_ => {
          that[show] = true
        }).catch(_ => {
          that[show] = false
        })
      })
    },
    getScroll (div, offset = 0) {
      const dom = this.$refs[div]
      if (dom) {
        const d = dom.offsetTop
        const a = d + offset
        const b = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        const c = document.documentElement.clientHeight || document.body.clientHeight
        if (b + c > a) {
          return Promise.resolve()
        } else {
          return Promise.reject(a)
        }
      }
    }
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style lang="scss" scoped>
  .TraitList{
    .summary{
      .summary-box{
        max-width: 1200px;
        margin: 0 auto;
        text-align: center;
        padding: 80px 24px;
        h2{
          font-size: 26px;
          letter-spacing: 2px;
          line-height: 45px;
          color: #555;
          margin-bottom: 64px;
          font-weight: 500;
        }
        .content{
          transform: translate(0, 300px);
          opacity: 0;
          transition: .3s;
          &.show{
            transform: translate(0, 0);
            opacity: 1;
          }
          &:after{
            content: '';
            display: block;
            clear: both;
          }
          .column{
            float: left;
            width: calc(100% / 3);
            &:nth-child(1) .ico-box{
              box-shadow: 0 16px 32px rgba(237,64,64,.1);
              &:hover{
                transform: translateY(-4px);
                box-shadow: 0 16px 32px rgba(237,64,64,.3);
              }
            }
            &:nth-child(2) .ico-box{
              box-shadow: 0 16px 32px rgba(47,84,235,.1);
              &:hover{
                transform: translateY(-4px);
                box-shadow: 0 16px 32px rgba(47,84,235,.3);
              }
            }
            &:nth-child(3) .ico-box{
              box-shadow: 0 16px 32px rgba(182, 172, 7, 0.1);
              &:hover{
                transform: translateY(-4px);
                box-shadow: 0 16px 32px rgba(182, 172, 7,.3);
              }
            }
            &:nth-child(1) .point-box{
              i{
                border-color: rgb(237,64,64);
                background: rgb(237,64,64);
              }
            }
            &:nth-child(2) .point-box{
              i{
                border-color: rgb(47,84,235);
                background: rgb(47,84,235);
              }
            }
            &:nth-child(3) .point-box{
              i{
                border-color: rgb(182, 172, 7);
                background: rgb(182, 172, 7);
              }
            }
            .column-box{
              position: relative;
              width: 180px;
              height: 180px;
              margin: 0 auto;
              &:hover{
                .point-box{
                  opacity: 1;
                  i:nth-child(1){
                    transform: translate(-90px, -25px);
                  }
                  i:nth-child(2){
                    transform: translate(35px, -12px);
                  }
                  i:nth-child(3){
                    transform: translate(-120px, 120px);
                  }
                  i:nth-child(4){
                    transform: translate(-100px, 165px);
                  }
                  i:nth-child(5){
                    transform: translate(95px, -2px);
                  }
                  i:nth-child(6){
                    transform: translate(90px, 160px);
                  }
                  i:nth-child(7){
                    transform: translate(110px, 40px);
                  }
                }
              }
              .point-box{
                position: absolute;
                width: 0;
                left: 50%;
                top: 0;
                opacity: 0;
                z-index: 0;
                transition: .3s;
                i{
                  position: absolute;
                  z-index: 0;
                  display: inline-block;
                  transition: .3s;
                  &:nth-child(1){
                    opacity: .4;
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    border: solid 1px;
                    background: transparent;
                    transform: translate(0, 90px);
                  }
                  &:nth-child(2){
                    opacity: .4;
                    width: 4px;
                    height: 4px;
                    border-radius: 50%;
                    border: solid 1px;
                    transform: translate(0, 90px);
                  }
                  &:nth-child(3){
                    opacity: .4;
                    width: 4px;
                    height: 4px;
                    border-radius: 50%;
                    transform: translate(0, 90px);
                  }
                  &:nth-child(4){
                    opacity: .4;
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    transform: translate(0, 90px);
                  }
                  &:nth-child(5){
                    opacity: .4;
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    transform: translate(0, 90px);
                  }
                  &:nth-child(6){
                    opacity: .4;
                    width: 21px;
                    height: 21px;
                    border-radius: 50%;
                    transform: translate(0, 90px);
                  }
                  &:nth-child(7){
                    opacity: .4;
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    transform: translate(0, 90px);
                  }
                }
              }
              .ico-box{
                width: 100%;
                height: 100%;
                border-radius: 50%;
                cursor: pointer;
                transition: .3s;
                img{
                  display: block;
                  margin: 0 auto;
                  padding: 58px 0;
                }
              }
            }
            span{
              display: block;
              margin-top: 56px;
              font-size: 18px;
              color: #555;
            }
          }
        }
      }
    }
  }
</style>
