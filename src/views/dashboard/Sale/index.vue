<template>
  <el-card class="box-card" style="margin: 10px 0px">
    <div slot="header" class="clearfix">
      <el-tabs v-model="activeName" class="tab">
        <el-tab-pane label="销售额" name="销售额" />
        <el-tab-pane label="访问量" name="销售额" />
      </el-tabs>

      <div class="right">
        <span>今日</span>
        <span>本周</span>
        <span>本月</span>
        <span>本年</span>
        <el-date-picker
          class="date"
          type="monthrange"
          range-separator="-"
          start-placeholder="开始月份"
          end-placeholder="结束月份"
          size="mini"
        />
      </div>
    </div>
    <div>
      <el-row :gutter="10">
        <el-col :span="19">
          <div ref="charts" class="charts" />
        </el-col>
        <el-col :span="5" class="right">
          <h3>门店销售额排名</h3>
          <ul>
            <li>
              <span class="rad">1</span>
              <span>肯德基</span>
              <span class="rvalue">111111</span>
            </li>
            <li>
              <span class="rad">2</span>
              <span>肯德基</span>
              <span class="rvalue">222222</span>
            </li>
            <li>
              <span class="rad">3</span>
              <span>肯德基</span>
              <span class="rvalue">333333</span>
            </li>
            <li>
              <span class="rad">4</span>
              <span>肯德基</span>
              <span class="rvalue">444444</span>
            </li>
            <li>
              <span class="rad">5</span>
              <span>肯德基</span>
              <span class="rvalue">555555</span>
            </li>
            <li>
              <span class="rad">6</span>
              <span>肯德基</span>
              <span class="rvalue">666666</span>
            </li>
            <li>
              <span class="rad">7</span>
              <span>肯德基</span>
              <span class="rvalue">777777</span>
            </li>
          </ul>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: '',
  data() {
    return {
      activeName: '销售额'
    }
  },
  mounted() {
    const myCharts = echarts.init(this.$refs.charts)
    myCharts.setOption({
      title: {
        text: '销售额趋势'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
          ],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Direct',
          type: 'bar',
          barWidth: '60%',
          data: [10, 52, 200, 334, 390, 330, 220, 52, 200, 334, 390, 330],
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          }
        }
      ]
    })
  }
}
</script>

<style scoped>
.clearfix {
  display: flex;
  justify-content: space-between;
  position: relative;
}
.tab {
  width: 100%;
}
.right {
  position: absolute;
  right: 0;
}
.date {
  width: 240px;
  margin: 0 10px;
}
.right span {
  margin: 0 10px;
}
.charts {
  width: 100%;
  height: 300px;
}
ul {
  width: 100%;
  height: 300px;
  list-style: none;
  padding: 0;
}
ul li {
  height: 8%;
}

.rad {
  /* display: block; */
  float: left;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: black;
  color: white;
  text-align: center;
}
.rvalue {
  float: right;
}
</style>
