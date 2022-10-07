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
          <el-button type="info" icon="el-icon-info" size="mini" />
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
      list: []
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
      this.$notify.info('正在开发中！')
    }
  }
}
</script>

<style scoped></style>
