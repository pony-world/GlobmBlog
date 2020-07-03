<template>
    <div>
      <el-tag
        :key="tag"
        v-for="tag in dynamicTags"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)">
        {{tag}}
      </el-tag>
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      >
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput">{{text}}</el-button>
    </div>
</template>

<script>
export default {
  name: 'MTag',
  data () {
    return {
      dynamicTags: [],
      inputVisible: false,
      inputValue: ''
    }
  },
  props: {
    value: [String, Array],
    type: {
      type: String,
      default: 'string' // array, string
    },
    text: {
      type: String,
      default: '+ New Tag'
    }
  },
  watch: {
    value: {
      handler (newVal = []) {
        if (!Array.isArray(newVal)) {
          newVal = newVal.split(',')
          this.type = 'string'
        }
        this.dynamicTags = newVal
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    handleClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
      this.emit()
    },
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm () {
      const inputValue = this.inputValue
      if (inputValue) {
        if (this.dynamicTags.indexOf(inputValue) === -1) {
          this.dynamicTags.push(inputValue)
          this.emit()
        }
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    emit () {
      const val = this.type === 'array' ? this.dynamicTags : this.dynamicTags.join(',')
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-tag {
    margin: 0 5px;
  }
  .button-new-tag {
    margin-left: 5px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 5px;
    vertical-align: bottom;
  }
</style>
