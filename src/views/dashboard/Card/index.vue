<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6">
        <el-card>
          <Detail title="总销售额" count="12306">
            <template slot="charts">
              <span>周同比 &nbsp;50%</span>
              &nbsp;
              <span>日同比&nbsp;50%</span>
            </template>
            <template slot="footer">
              <span>日销售额￥1234</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="访问量" count="12306">
            <template slot="footer">
              <span>日访问量1234</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="支付笔数" count="12306">
            <template slot="footer">
              <span>转化率66%</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="运营活动效果" count="78%">
            <template slot="footer">
              <span>周同比 &nbsp;50%</span>
              &nbsp;
              <span>日同比&nbsp;50%</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Detail from './Detail'
export default {
  name: 'Card',
  components: {
    Detail
  }
}
</script>

<style scoped></style>
