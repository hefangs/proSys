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
          range-separator="--"
          start-placeholder="开始月份"
          end-placeholder="结束月份"
          size="mini"
        />
      </div>
    </div>
    <div>
      <el-row :gutter="10">
        <el-col :span="16">1</el-col>
        <el-col :span="8">2</el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      activeName: '销售额'
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
  width: 240px;
  margin: 0 10px;
}
.right span {
  margin: 0 10px;
}
</style>
