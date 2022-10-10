<template>
  <div>
    <!-- table -->
    <el-table style="width: 100%" border :data="list">
      <el-table-column type="index" label="序号" width="80" align="center" />
      <el-table-column prop="skuName" label="名称" width="width" />
      <el-table-column prop="skuDesc" label="描述" width="width" />
      <el-table-column prop="prop" label="默认图片" width="width">
        <template slot-scope="{ row }">
          <img :src="row.skuDefaultImg" alt="" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column prop="price" label="价格(元)" width="100" align="center" />
      <el-table-column prop="weight" label="重量(Kg)" width="100" align="center" />
      <el-table-column prop="prop" label="操作" width="width" align="center">
        <template slot-scope="{ row }">
          <el-button
            v-if="row.isSale == 0"
            type="success"
            icon="el-icon-bottom"
            size="mini"
            @click="sale(row)"
          />
          <el-button
            v-else
            type="success"
            icon="el-icon-top"
            size="mini"
            @click="cancelSale(row)"
          />
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="developing" />
          <el-button type="info" icon="el-icon-info" size="mini" @click="getSkuInfo(row)" />
          <el-button type="danger" icon="el-icon-delete" size="mini" />
        </template>
      </el-table-column>
    </el-table>
    <!-- Pagination -->
    <el-pagination
      :current-page="page"
      :page-sizes="[10, 20, 50]"
      :page-size="limit"
      layout="total,prev, pager, next, jumper,->,sizes"
      :total="total"
      align="center"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <!-- drawer -->
    <el-drawer :visible.sync="show" :show-close="false" size="40%" :before-close="close">
      <el-row>
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{ skuInfo.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{ skuInfo.skuDesc }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="16">{{ skuInfo.price }}元</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">平台属性</el-col>
        <el-col :span="16">
          <template>
            <el-tag
              v-for="attr in skuInfo.skuAttrValueList"
              :key="attr.id"
              type="success"
              style="margin-right: 10px"
            >
              {{ attr.attrId }}-{{ attr.valueId }}
            </el-tag>
          </template>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">商品图片</el-col>
        <el-col :span="16">
          <el-carousel height="300px" class="a">
            <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
              <img :src="item.imgUrl" />
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: 'Sku',
  data() {
    return {
      page: 1,
      limit: 10,
      total: 0,
      list: [],
      skuInfo: {},
      show: false
    }
  },
  mounted() {
    this.getSkuList()
  },
  methods: {
    handleSizeChange(val) {
      this.limit = val
      this.getSkuList()
    },
    handleCurrentChange(val) {
      this.page = val
      this.getSkuList(this.page)
    },
    async getSkuList() {
      const { page, limit } = this
      const result = await this.$API.sku.reqSkuList(page, limit)
      // console.log(result.data.records)
      // eslint-disable-next-line
      if (result.code == 200) {
        this.list = result.data.records
        this.total = result.data.total
      }
    },
    // 上架
    async sale(sku) {
      const result = await this.$API.sku.reqSale(sku.id)
      // eslint-disable-next-line
      if (result.code == 200) {
        this.$notify.success('上架成功')
        // eslint-disable-next-line
        sku.isSale = 1
      }
    },
    // 下架
    async cancelSale(sku) {
      const result = await this.$API.sku.reqCancelSale(sku.id)
      // eslint-disable-next-line
      if (result.code == 200) {
        this.$notify.success('下架成功')
        // eslint-disable-next-line
        sku.isSale = 0
      }
    },
    developing() {
      this.$notify.info('正在开发中')
    },
    // 获取sku详情
    async getSkuInfo(sku) {
      this.show = true
      const result = await this.$API.sku.reqSkuById(sku.id)
      // eslint-disable-next-line
      if (result.code == 200) {
        this.skuInfo = result.data
      }
    },
    // 处理数据回显问题
    close(done) {
      this.skuInfo = {}
      done()
    }
  }
}
</script>

<style>
.a {
  border: 1px gray solid;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.el-carousel__button {
  width: 10px;
  height: 10px;
  background: brown;
  border-radius: 50%;
}
</style>

<style scoped>
.el-row .el-col-5 {
  font-size: 18px;
  text-align: right;
}
.el-col {
  margin: 10px 10px;
}
</style>
