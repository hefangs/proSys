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
        show: false,
        type: 'category'
      },
      yAxis: {
        show: false
        // type: 'category'
      },
      series: [
        {
          type: 'line',
          data: [17, 4, 2, 5, 10, 9, 2, 13, 22, 23],
          itemStyle: {
            opacity: 0
          },
          lineStyle: {
            color: 'purple'
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: 'purple' // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: 'white' // 100% 处的颜色
                }
              ],
              global: false // 缺省为 false
            }
          }
        }
      ],
      grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      },
      tooltip: {
        // show: true
      }
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
  height: 100%;
}
</style>
