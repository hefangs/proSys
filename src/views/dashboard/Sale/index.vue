<template>
  <el-card class="box-card" style="margin: 10px 0px">
    <div slot="header" class="clearfix">
      <el-tabs v-model="activeName" class="tab">
        <el-tab-pane label="销售额" name="sale" />
        <el-tab-pane label="访问量" name="visit" />
      </el-tabs>

      <div class="right">
        <span @click="setDay">今日</span>
        <span @click="setWeek">本周</span>
        <span @click="setMonth">本月</span>
        <span @click="setYear">本年</span>
        <el-date-picker
          v-model="date"
          class="date"
          type="daterange"
          range-separator="-"
          start-placeholder="开始月份"
          end-placeholder="结束月份"
          value-format="yyyy-MM-dd"
        />
      </div>
    </div>
    <div>
      <el-row :gutter="10">
        <el-col :span="18">
          <div ref="charts" class="charts" />
        </el-col>
        <el-col :span="6" class="right">
          <h3>门店{{ title }}排名</h3>
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
            <li>
              <span class="rad">7</span>
              <span>肯德基</span>
              <span class="rvalue">777777</span>
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
import dayjs from 'dayjs'
import * as echarts from 'echarts'
export default {
  name: '',
  data() {
    return {
      activeName: 'sale',
      myCharts: null,
      date: []
    }
  },
  computed: {
    title() {
      return this.activeName === 'sale' ? '销售额' : '访问量'
    }
  },
  watch: {
    title() {
      this.myCharts.setOption({
        title: {
          text: this.title + '趋势'
        }
      })
    }
  },
  mounted() {
    this.myCharts = echarts.init(this.$refs.charts)
    this.myCharts.setOption({
      title: {
        text: this.title + '趋势 '
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
  },
  methods: {
    setDay() {
      const day = dayjs().format('YYYY-MM-DD')
      this.date = [day, day]
    },
    setWeek() {
      const start = dayjs().day(1).format('YYYY-MM-DD')
      const end = dayjs().day(7).format('YYYY-MM-DD')
      this.date = [start, end]
    },
    setMonth() {
      const start = dayjs().startOf('month').format('YYYY-MM-DD')
      const end = dayjs().endOf('month').format('YYYY-MM-DD')
      this.date = [start, end]
    },
    setYear() {
      const start = dayjs().startOf('year').format('YYYY-MM-DD')
      const end = dayjs().endOf('year').format('YYYY-MM-DD')
      this.date = [start, end]
    }
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
  width: 280px;
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
