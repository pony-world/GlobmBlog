<template>
  <div class="StickyList">
    <div class="blog-outside-container">
      <div class="pro-container">
        <div class="main-left">
          <h3 class="title">Globm Blog 个人博客向全栈进军</h3>
          <p class="desc">
            Globm Blog 个人博客使用 后端： node + koa2 + mysql 前端： vue + element-ui 搭建完成，旨在锻炼自己的能力。通过前后端分离开发，并致力解决博客开发中面临的“贵”和“难”的问题，实现自我技术的不断进步。
          </p>
        </div>
        <div class="link-right">
          <div class="link-item">
            <div class="title">GitHub 项目源码</div>
            <div class="desc">
              博客项目源码已部署至github上，目前仅开放前端源码，后端源码因个人原因暂不开放，如有需要，请联系博主1901860654@qq.com
            </div>
            <a href="https://github.com/pony-world/GlobmBlog" target="_blank">
              立即查看
              <i class="el-icon-right"></i>
            </a>
          </div>
          <div class="link-item">
            <div class="title">CSDN 个人博客</div>
            <div class="desc">
              csdn博客与个人博客数据基本保持一致，博客浏览量为虚拟数据，如个人博客未及时回复，可在csdn对应博客进行评论
            </div>
            <a href="https://blog.csdn.net/weixin_45266125" target="_blank">
              立即查看
              <i class="el-icon-right"></i>
            </a>
          </div>
        </div>
      </div>
      <div class="bg">
        <svg>
          <g style="transform: translate(0px, -18.7419px);">
            <circle stroke="none" fill="#EBEDF0" fill-rule="evenodd" cx="-5" cy="50" r="98.5"></circle>
          </g>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StickyList'
}
</script>

<style lang="scss" scoped>
  .StickyList{
    .blog-outside-container{
      background-color: #EDF1F5;
      padding-top: 56px;
      padding-bottom: 56px;
      font-size: 14px;
      line-height: 1.5;
      color: #6F7479;
      position: relative;
      .bg{
        width: 100%;
        height: 466px;
        position: absolute;
        top: 0;
        left: 50%;
        margin-left: -50%;
      }
      .pro-container{
        position: relative;
        z-index: 10;
        width: 1200px;
        margin: 0 auto;
        overflow: hidden;
        .main-left{
          width: 60%;
          display: table-cell;
          vertical-align: middle;
          padding-right: 109px;
          color: #6F7479;
          .title{
            line-height: 30px;
            font-size: 20px;
            font-weight: 600;
            background: #EEE url(data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAAHklEQVQImWNkYGBgYGD4//8/A5wF5SBYyAr+//8PAPOCFO0Q2zq7AAAAAElFTkSuQmCC) repeat;
            text-shadow: 5px -5px #333, 4px -4px white;
            -webkit-text-fill-color: transparent;
            -webkit-background-clip: text
          }
          .desc{
            line-height: 22px;
            padding-top: 16px;
            margin-bottom: 32px;
          }
        }
        .link-right{
          padding: 32px 32px 8px;
          width: 40%;
          display: table-cell;
          vertical-align: middle;
          background: #fff;
          opacity: .8;
          .link-item{
            padding-bottom: 16px;
            .title{
              padding-top: 0;
              font-size: 15px;
              font-weight: bold;
              color: #252b3a;
              line-height: 22px;
              position: relative;
              &:after{
                content: '';
                position: absolute;
                bottom: -3px;
                left: 0;
                width: 50px;
                height: 3px;
                border-radius: 2px;
                background: linear-gradient(to right, $primary-color, #6298d7);
                animation: lineAnimation 3s linear infinite;
                @keyframes lineAnimation {
                  0%,100%{
                    width: 50px;
                  }
                  30%, 70%{
                    width: 80px;
                  }
                  50%{
                    width: 110px;
                  }
                }
              }
            }
            .desc{
              padding: 12px 0 0;
              font-weight: 400;
              color: #575d6c;
              line-height: 22px;
              word-break: break-all;
            }
            a{
              display: inline-block;
              padding: 16px 0 8px;
              font-size: 14px;
              font-weight: 400;
              color: #526ecc;
              line-height: 17px;
              transition: all .3s ease-in-out;
              &:hover{
                color: $primary-color;
                opacity: 1;
                i{
                  transform: translateX(5px);
                }
              }
            }
          }
        }
      }
    }
  }
</style>
