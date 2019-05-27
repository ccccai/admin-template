/* 定义一个或多个input输入框的弹框组件。
  用法：
  input输入框的数量以字段number的值为准。
  input输入框的输入数据与字段inputVal绑定，长度应与number值相等。
  可选择设置input输入框的初始化值，以字段originVal的值为准，长度应与number值相等，下标一一对应inputVal的下标。
  可为input输入框添加小标题，以字段subTitle的值为准，长度应与number值相等，下标一一对应inputVal的下标。
  需要父组件回传的值：
  sign：用来判断input弹框组件是用于哪个功能，用于同一个页面调用多次弹框组件，但功能不同的情况，不需要区可不传。
  dialogStatus：弹框的开合状态。
  title：弹框的标题。
  subTitle：input输入框小标题
  number：input输入框的数量。默认一个。
  inputType： input输入框的类型，默认text类型。
  originVal： input输入框的初始值，默认没有。
  btnText：确认按钮的显示文字。
  组件私有数据：
  inputVisible：弹框的开合状态。（保证父子组件双向绑定开合状态值）
  inputVal：input输入框的输入值。
*/
<template>
  <el-dialog :title="title" :visible.sync="inputVisible" center width="30%" class="input-dialog" @close="closeDialog">
    <div v-for="(item, index) in inputVal" :key="index" class="multiple-input">
      <template v-if="subTitle[index]">
        <div v-if="subTitle[index]" class="sub-title">{{ subTitle[index] }}：</div>
        <el-input v-model="inputVal[index]" :type="inputType[index] ? inputType[index] : 'text'" :placeholder="`请输入${subTitle[index]}`" clearable/>
      </template>
      <el-input v-else v-model="inputVal[index]" :type="inputType[index] ? inputType[index] : 'text'" :placeholder="placeholder" clearable/>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" round @click="confirm">{{ btnText }}</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    sign: { // 用来判断input弹框组件是用于哪个功能，用于同一个页面调用多次弹框组件，但功能不同的情况
      type: String,
      default: ''
    },
    dialogStatus: {
      type: Boolean,
      default: false
    },
    number: {
      type: Number,
      default: 1
    },
    title: {
      type: String,
      default: ''
    },
    subTitle: {
      type: Array,
      default: () => {
        return []
      }
    },
    inputType: {
      type: Array,
      default: () => {
        return []
      }
    },
    originVal: {
      type: Array,
      default: () => {
        return []
      }
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
      inputVal: [],
      inputVisible: false
    }
  },
  watch: {
    dialogStatus(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.number = Number(this.number)
        if (this.originVal.length) {
          this.inputVal = this.originVal
        } else if (this.number > 1) {
          this.inputVal = []
          for (let i = 0; i < this.number; i++) {
            this.inputVal[i] = ''
          }
        } else if (this.number <= 1) {
          this.number = 1
          this.inputVal = []
        }
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
      if (this.inputVal.some(item => !item)) {
        this.$message.error('请将内容填写完整')
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
    .multiple-input {
      margin-bottom: 20px;
      .sub-title {
        margin-bottom: 8px;
      }
      &:last-child {
        margin-bottom: 0px;
      }
    }
  }
}
</style>
