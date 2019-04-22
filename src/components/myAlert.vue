<template>
  <el-dialog :visible.sync="showAlert" :show-close="false" :close-on-click-modal="false" center width="30%" class="my-alert">
    <span>{{ title }}</span>
    <div slot="footer" class="dialog-footer">
      <div class="footer-btn confirm" @click="$emit('confirm', false)">{{ confirmText }}</div>
      <div class="footer-btn" @click="$emit('cancel', false)">{{ cancelText }}</div>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    showAlert: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '确定要进行此操作吗？'
    },
    confirmText: {
      type: String,
      default: '确认'
    },
    cancelText: {
      type: String,
      default: '取消'
    }
  },
  methods: {}
}
</script>
<style lang="scss">
.my-alert {
  color: rgba(31, 37, 82, 0.5);
  .el-dialog {
    min-width: 200px;
    border-radius: 12px;
    .dialog-footer {
      display: flex;
      margin: 0 10px;
      .footer-btn {
        flex: 1;
        padding: 15px 0 30px;
        cursor: pointer;
        &:hover {
          color: #1F2552;
        }
      }
      .confirm {
        color:rgba(255, 0, 0, 0.5);
        margin-right:12px;
        &:hover {
          color: red;
        }
      }
    }
    .el-dialog__footer {
      padding: 0;
    }
  }
}
</style>

