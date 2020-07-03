<template>
  <div class="TypePage">
    <div v-if="!dialogVisible">
      <MPageTitle title="分类专栏" :total="total"/>
      <div class="append-box">
        <span>可拖拽排序</span>
        <el-button type="primary" size="small" @click="openDialog({})" icon="el-icon-plus">新建</el-button>
      </div>
      <el-table
        :data="blogTypeOption"
        row-key="id"
        :rowClassName="rowStyle"
        ref="dragTable"
        style="width: 100%">
        <el-table-column
          align="center"
          width="50"
          label="拖拽"
        >
          <template>
            <div class="drag-ico">
              <i class="el-icon-rank"></i>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="类别"
        >
          <template slot-scope="scope">
            <img v-if="scope.row.logo" :src="scope.row.logo" alt="" style="width: 40px;height: 40px;vertical-align: middle;">
            <span style="display:inline-block;margin-left:8px;">{{scope.row.title}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          width="300"
          label="文章数"
        >
          <template slot-scope="scope">
            {{scope.row.blog.length}} 篇
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          width="100"
          label="文章管理">
          <template slot-scope="scope">
            <router-link :to="`/user/blog/type/article/${scope.row.id}`">
              <el-button type="text">文章管理</el-button>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          width="200"
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="openDialog(scope.row)">编辑</el-button>
            <el-button type="text" @click="handleDel(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-if="dialogVisible">
      <el-page-header @back="beforeDialogClose" content="分类专栏"/>
      <el-form :model="row"
               label-width="50px"
               label-position="left"
               hide-required-asterisk
               @submit.native.prevent
               :rules="rules"
               ref="dialogForm"
               label-suffix=":">
        <el-form-item label="图标" prop="logo">
          <MImgCard type="card" v-model="row.logo"/>
        </el-form-item>
        <el-form-item label="类别" prop="title">
          <el-input v-model="row.title"></el-input>
        </el-form-item>
        <el-form-item label="简介" prop="desc">
          <el-input v-model="row.desc" type="textarea"></el-input>
        </el-form-item>
        <el-form-item style="text-align: right">
          <el-button @click="beforeDialogClose">取消</el-button>
          <el-button type="primary" :loading="loading" @click="handleDialogSubmit">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { apiDelBlogType, apiGetBlogType, apiPostBlogType, apiPutBlogType, apiPutBlogTypeSort } from '@/api/http_url'
import Sortable from 'sortablejs'

export default {
  name: 'TypePage',
  data () {
    return {
      blogTypeOption: [],
      total: '',
      dialogVisible: false,
      row: {},
      loading: false,
      rules: {
        logo: [
          { required: true, message: '请上传图标', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '请输入类别', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请输入简介', trigger: 'blur' },
          { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
        ]
      },
      sortDisabled: false,
      sortableObj: {},
      sortTableOrder: []
    }
  },
  created () {
    this.getBlogType()
  },
  methods: {
    getBlogType () {
      apiGetBlogType().then(res => {
        this.blogTypeOption = res.rows
        this.total = res.count
        this.$nextTick(_ => {
          this.setSort()
        })
      })
    },
    rowStyle ({ row }) {
      return `row-id-${row.id}`
    },
    setSort () {
      const el = this.$refs.dragTable.$el.querySelectorAll(
        '.el-table__body-wrapper > table > tbody'
      )[0]
      this.sortableObj = Sortable.create(el, {
        sort: true,
        scroll: true,
        delay: 10,
        animation: 150,
        handle: '.drag-ico',
        dataIdAttr: 'class',
        ghostClass: 'sortable-ghost', // 排序镜像class,就是当鼠标拉起拖拽节点的时候添加该class
        chosenClass: 'sortable-chosen', // //为拖拽的节点添加一个class 开始拖拽鼠标按下去的时候 添加该class
        setData: function (dataTransfer) {
          dataTransfer.setData('Text', '')
        },
        // 拖拽结束执行,evt执向拖拽的参数
        onEnd: evt => {
          // 判断是否重新排序
          if (evt.oldIndex !== evt.newIndex) {
            if (this.sortDisabled) {
              const targetRow = this.blogTypeOption.splice(evt.oldIndex, 1)[0]
              this.blogTypeOption.splice(evt.newIndex, 0, targetRow)
            } else {
              this.sortDisabled = true
              this.sortTableOrder = this.sortableObj.toArray().map(item => {
                return item.split(' ')[1].split('row-id-')[1]
              })
              const data = {
                sort: JSON.stringify(this.sortTableOrder)
              }
              apiPutBlogTypeSort(data).then(_ => {
                this.$notice.success('操作成功')
              }).catch(err => {
                const targetRow = this.blogTypeOption.splice(evt.oldIndex, 1)[0]
                this.blogTypeOption.splice(evt.newIndex, 0, targetRow)
                this.$notice.error(err.msg)
              }).finally(_ => {
                this.sortDisabled = false
              })
            }
          }
        }
      })
    },
    openDialog (obj = {}) {
      this.row = obj
      this.dialogVisible = true
    },
    beforeDialogClose () {
      this.$refs.dialogForm.resetFields()
      this.dialogVisible = false
      this.$nextTick(_ => {
        this.setSort()
      })
    },
    handleDialogSubmit () {
      this.$refs.dialogForm.validate(async (valid) => {
        if (valid) {
          this.loading = true
          if (this.row.id) {
            await apiPutBlogType(this.row).then(_ => {
              this.dialogVisible = false
              this.$notice.success('分类修改成功')
            }).catch(err => {
              this.$notice.error(err.msg)
            })
          } else {
            await apiPostBlogType(this.row).then(_ => {
              this.getBlogType()
              this.beforeDialogClose()
              this.$notice.success('分类添加成功')
            }).catch(err => {
              this.$notice.error(err.msg)
            })
          }
          this.loading = false
        } else {
          return false
        }
      })
    },
    handleDel (id) {
      this.$confirm('此操作将删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
        apiDelBlogType({ id }).then(_ => {
          this.getBlogType()
          this.$notice.success('分类删除成功')
        }).catch(err => {
          this.$notice.error(err.msg)
        })
      }).catch(_ => {
        return false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .TypePage{
    .append-box{
      margin-bottom: 12px;
      overflow: hidden;
      line-height: 32px;
      > span{
        float: left;
        font-size: 13px;
      }
      .el-button{
        float: right;
      }
    }
    /deep/.el-table{
      .drag-ico{
        cursor: move;
      }
      .sortable-ghost{
        background: rgba(47, 84, 235, 0.1);
      }
      .sortable-chosen{
        background: rgba(47, 84, 235, 0.1);
      }
    }
  }
</style>
