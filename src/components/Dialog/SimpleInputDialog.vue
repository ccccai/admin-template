/* 简单的，仅定义一个input输入框的弹框组件。
  需要父组件回传的值：
  sign：用来判断input弹框组件是用于哪个功能，用于同一个页面调用多次弹框组件，但功能不同的情况，不需要区可不传。
  dialogStatus：弹框的开合状态。
  title：弹框的标题。
  placeholder：input输入框的提示文字。
  btnText：确认按钮的显示文字。
  组件私有数据：
  inputVisible：弹框的开合状态。（保证父子组件双向绑定开合状态值）
  inputVal：input输入框的输入值。
*/
<template>
  <el-dialog :title="title" :visible.sync="inputVisible" :show-close="false" center width="30%" class="input-dialog" @close="closeDialog">
    <el-input v-model="inputVal" :placeholder="placeholder" clearable/>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" round @click="confirm">{{ btnText }}</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    sign: {
      type: String,
      default: ''
    },
    dialogStatus: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '请输入内容'
    },
    btnText: {
      type: String,
      default: '确定'
    }
  },
  data() {
    return {
      inputVal: '',
      inputVisible: false
    }
  },
  watch: {
    dialogStatus(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.inputVal = ''
        this.inputVisible = newVal
      }
    }
  },
  mounted() {
    this.inputVisible = this.dialogStatus
  },
  methods: {
    closeDialog(val) {
      this.$emit('close', false)
    },
    confirm() {
      if (!this.inputVal) {
        this.$message.error('请输入内容')
        return
      }
      this.$emit('inputVal', {
        sign: this.sign,
        inputVal: this.inputVal
      })
    }
  }
}
</script>
<style lang="scss">
.input-dialog {
  .el-dialog {
    min-width: 200px;
    max-width: 390px;
    border-radius: 12px;
    .dialog-footer {
      text-align: center;
    }
    .el-dialog__footer {
      padding-bottom: 30px;
    }
  }
}
</style>
