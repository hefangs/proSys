<template>
  <div>
    <!-- 添加入口 -->
    <el-button type="primary" icon="el-icon-plus" style="margin: 10px 10px">添加</el-button>
    <!-- 表格模块  -->
    <el-table :data="data" style="width: 100%" border>
      <el-table-column prop="prop" label="序号" width="100px" align="center" />
      <el-table-column prop="prop" label="品牌名称" width="width" align="center" />
      <el-table-column prop="prop" label="品牌Logo" width="width" align="center" />
      <el-table-column prop="prop" label="操作" width="width" align="center" />
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      style="margin-top: 20px; text-align: center"
      :current-page="currentPage4"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, prev, pager, next,jumper, -> ,sizes"
      :total="100"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  name: 'TradeMark'
}
</script>

<style scoped></style>
