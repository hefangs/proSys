<template>
  <div>
    <div class="header">
      <span>搜索用户数</span>
      <i class="el-icon-info" />
    </div>
    <div class="main">
      <span class="main-title">1111</span>
      <span>11.11</span>
      <i class="el-icon-caret-top" />
    </div>
    <div class="footer">
      <div ref="charts" class="charts" />
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'LineCharts',
  mounted() {
    const lineCharts = echarts.init(this.$refs.charts)
    lineCharts.setOption({
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line'
        }
      ]
    })
  }
}
</script>

<style scoped>
.el-icon-info {
  font-size: 18px;
  color: gray;
  padding-left: 8px;
}
.el-icon-caret-top {
  color: green;
  font-size: 20px;
  padding-left: 8px;
}
.main {
  margin-top: 10px;
}
.main-title {
  margin-right: 20px;
}
.charts {
  width: 100%;
  height: 180px;
}
</style>
