<template>
  <el-card>
    <div slot="header" class="header">
      <div class="search-header">
        <span>线上热门搜索</span>
        <i class="el-icon-more" />
      </div>
    </div>
    <div>
      <el-row :gutter="10">
        <el-col :span="12">
          <LineCharts />
        </el-col>
        <el-col :span="12">
          <LineCharts />
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import LineCharts from './LineCharts'
export default {
  name: 'Search',
  components: {
    LineCharts
  }
}
</script>

<style scoped>
.header {
  border-bottom: 1px solid #eee;
}
.search-header {
  display: flex;
  justify-content: space-between;
}
</style>
