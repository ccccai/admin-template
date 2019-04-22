<style lang="less" scoped>
  @import '../../styles/dialog.less';
.search {
    margin-bottom: 20px;
}
.data-pagination {
  text-align: right;
  margin: 40px 0 30px;
}
</style>
<template>
  <el-dialog :visible.sync="tableVisible" title="选择推荐人" custom-class="dialog" width="70%" center>
    <div class="search">
      <el-input v-model="searchName" placeholder="请输入姓名" clearable style="width: 200px" />
      <el-button type="primary" icon="el-icon-search" round plain @click="searchList">搜索</el-button>
    </div>
    <el-table v-loading="listLoading" :data="list" element-loading-text="拼命加载中" border stripe highlight-current-row style="width: 100%">
      <el-table-column width="80" align="center" label="姓名">
        <template slot-scope="scope">
          <span>{{ scope.row.full_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别" width="60" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.sex }}</span>
        </template>
      </el-table-column>
      <el-table-column width="110" align="center" label="手机">
        <template slot-scope="scope">
          <span>{{ scope.row.mobile_number }}</span>
        </template>
      </el-table-column>
      <el-table-column width="80" align="center" label="职位">
        <template slot-scope="scope">
          <span>{{ scope.row.work_detail.enterprise_position }}</span>
        </template>
      </el-table-column>
      <el-table-column width="280px" align="center" label="公司">
        <template slot-scope="scope">
          <span>{{ scope.row.work_detail.enterprise_name }}</span>
        </template>
      </el-table-column>
      <el-table-column width="80" align="center" label="商会职务">
        <template slot-scope="scope">
          <span>{{ scope.row.coc_position }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="150">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="select(scope.row)">选择为推荐人</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row class="data-pagination">
      <el-pagination :total="total" :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" background @current-change="handleCurrentChange" />
    </el-row>
  </el-dialog>
</template>
<script>
export default {
  name: 'SelectDialog',
  props: {
    isshow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tableVisible: false,
      searchName: '',
      list: [],
      listLoading: false,
      currentPage: 1,
      pageSize: 20,
      total: 20
    }
  },
  created() {
    this.tableVisible = this.isshow
    this.getMembersList()
  },
  methods: {
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      this.getMembersList({ page: val, limit: 10 })
    },
    searchList() {
      this.getMembersList()
    },
    select(row) {
      this.$emit('selectRefereeBack', row)
      this.tableVisible = false
    },
    setVisible() {
      this.tableVisible = true
    },
    getMembersList(paramsinit = { page: 1, limit: 10 }) {
      this.listLoading = true
      const params = paramsinit
      if (this.searchName) {
        params.full_name = this.searchName
      }
      this.$request.httpRequest({
        method: 'post',
        url: this.API.GetMemberInfo,
        params: params,
        success: data => {
          this.list = data.member_info_list
          this.total = data.member_count
          this.listLoading = false
        }
      })
    }
  }
}

</script>
