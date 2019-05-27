/* 可选择行的表格弹框组件：
   需要父组件回传的值：
   dialogStatus：弹框的开合状态。
   title：弹框的标题。
   placeholder：search input框的提示文字。
   selectRow：默认选中的行，可以不定义，但是每次弹框关闭之后，选中的行信息会清空。如果想要选中的行信息不受弹框开合状态的影响，那需要在close的回调中将选中的行信息返回给父组件。
   tableData：当前页的表格内容信息
   tableData.header：表格的header头，列名。
   tableData.data：表格数据。
   pagination：表格的分页信息。
   pagination.total：数据总数。
   pagination.currentPage：当前页。
   pagination.pageSize：每页条数。
   btnText：确认按钮的显示文字。
   私有数据：
   tableVisible：弹框的开合状态。（为什么要定义两个，因为要保证父子组件双向绑定状态值）
   searchVal：search input框的输入值。
   multipleSelection：选中的行。
   */
<template>
  <el-dialog :visible.sync="tableVisible" :title="title" class="table-dialog" width="50%" center @close="closeDialog">
    <div class="search">
      <el-input v-model="searchVal" :placeholder="placeholder" clearable style="width: 200px" />
      <el-button type="primary" icon="el-icon-search" round plain @click="searchData">搜索</el-button>
    </div>
    <el-table
      v-loading="loading"
      ref="multipleTable"
      :data="tableData.data"
      :row-key="(val) => { return val.id }"
      element-loading-text="拼命加载中"
      highlight-current-row
      style="width: 100%"
      border
      @selection-change="handleSelectionChange">
      <el-table-column
        :reserve-selection="true"
        type="selection"
        width="55"
        align="center"/>
      <el-table-column
        v-for="(item, index) in tableData.header"
        :key="index"
        :label="item"
        :prop="index"
        min-width="80"
        align="center"/>
    </el-table>
    <el-row class="data-pagination">
      <el-pagination
        :total="Number(pagination.total)"
        :current-page="Number(pagination.currentPage)"
        :page-size="Number(pagination.pageSize)"
        layout="total, prev, pager, next"
        background
        @current-change="handleCurrentChange"/>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" style="width:300px" @click="confirm">{{ btnText }}</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'SelectDialog',
  props: {
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
    selectRow: {
      type: Array,
      default: () => {
        return []
      }
    },
    tableData: {
      type: Object,
      default: () => {
        return {
          header: [],
          data: []
        }
      }
    },
    pagination: {
      type: Object,
      default: () => {
        return {
          total: '',
          currentPage: '',
          pageSize: ''
        }
      }
    },
    btnText: {
      type: String,
      default: '确定'
    }
  },
  data() {
    return {
      tableVisible: false,
      searchVal: '',
      multipleSelection: [],
      loading: true
    }
  },
  watch: {
    dialogStatus(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.tableVisible = newVal
        if (newVal) { // 有默认选中的行
          if (this.selectRow.length) {
            this.multipleSelection = this.selectRow
            this.rowMultipleChecked()
          } else {
            if (this.$refs.multipleTable !== undefined) { // 防止报错
              // 清空选中状态
              this.$refs.multipleTable.clearSelection()
            }
          }
        }
      }
    },
    tableData(newVal, oldVal) {
      this.loading = false
      if (newVal !== oldVal) {
        // 每次翻页都遍历，是否有选中的行
        this.rowMultipleChecked()
      }
    }
  },
  mounted() {
    this.tableVisible = this.dialogStatus
  },
  methods: {
    // 用于多选表格，切换某一行的选中状态，如果使用了第二个参数，则是设置这一行选中与否（selected 为 true 则选中）
    rowMultipleChecked() {
      this.multipleSelection.forEach(row => {
        this.$refs.multipleTable.toggleRowSelection(row, true)
      })
    },
    // 翻页
    handleCurrentChange(val) {
      this.currentPage = val
      this.$emit('toPage', this.currentPage)
    },
    // 搜索，将搜索条件传递给父组件
    searchData() {
      this.$emit('searchVal', this.searchVal)
    },
    // 确认，将选择的值传递给父组件
    confirm() {
      this.$emit('confirm', this.multipleSelection)
    },
    // 关闭弹框时，向父组件传递状态，确保父子组件的弹框状态一致
    closeDialog(val) {
      this.$emit('close', this.multipleSelection)
    },
    // 赋值选中的数据
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>
<style lang="scss">
.table-dialog {
  .el-dialog {
    min-width: 400px;
    max-width: 600px;
    border-radius: 12px;
    .dialog-footer {
      text-align: center;
    }
    .el-dialog__footer {
      padding-top: 0;
      padding-bottom: 20px;
    }
    .search {
      margin-bottom: 10px;
    }
    .data-pagination {
      text-align: right;
      margin-top: 10px;
    }
  }
}
</style>
