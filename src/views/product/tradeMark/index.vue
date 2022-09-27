<template>
  <div>
    <!-- 添加入口 -->
    <el-button type="primary" icon="el-icon-plus" style="margin: 10px 10px">添加</el-button>
    <!-- 表格模块  -->
    <el-table :data="list" style="width: 100%" border>
      <el-table-column type="index" label="序号" width="100px" align="center" />
      <el-table-column prop="tmName" label="品牌名称" width="width" align="center" />
      <el-table-column prop="logoUrl" label="品牌Logo" width="width" align="center">
        <template slot-scope="{ row, $index }">
          <!-- {{ row }}-{{ $index }} -->
          <!-- eslint-disable-next-line vue/html-self-closing -->
          <img :src="row.logoUrl" alt="" style="width: 150px; height: 80px" />
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width" align="center">
        <template slot-scope="{ row, $index }">
          <el-button type="warning" size="mini" icon="el-icon-edit">修改</el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      style="margin-top: 20px; text-align: center"
      :current-page="page"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="limit"
      layout="total, prev, pager, next,jumper, -> ,sizes"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  name: 'TradeMark',
  data() {
    return {
      page: 1,
      limit: 10,
      total: 0,
      list: [],
      currentPage1: 5
    }
  },
  mounted() {
    this.getPageList()
  },
  methods: {
    // 改变每页条数
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`
      this.limit = val
      this.getPageList()
    },
    // 跳转页面
    handleCurrentChange(pager) {
      // console.log(`当前页: ${pager}`)
      this.page = pager
      this.getPageList()
    },
    async getPageList() {
      const result = await this.$API.tradeMark.reqTradeMarkList(this.page, this.limit)
      console.log(result)
      if (result.code === 200) {
        this.total = result.data.total
        this.list = result.data.records
      }
    }
  }
}
</script>

<style scoped></style>
