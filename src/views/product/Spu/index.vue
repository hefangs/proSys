<!-- eslint-disable vue/html-self-closing -->
<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CategorySelect :show="scene != 0" @getCategoryId="getCategoryId" />
    </el-card>
    <el-card>
      <!-- table -->
      <div v-show="scene == 0">
        <!-- 添加Spu入口 -->
        <el-button
          type="primary"
          icon="el-icon-plus"
          style="margin: 20px 0px"
          :disabled="!category3Id"
          @click="addSpu"
        >添加Spu</el-button>
        <!-- 表格 -->
        <el-table style="width: 100%" border :data="list">
          <el-table-column type="index" label="序号" width="80px" align="center" />
          <el-table-column prop="spuName" label="SPU名称" width="width" />
          <el-table-column prop="description" label="SPU描述" width="width" />
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row }">
              <el-tooltip class="item" effect="dark" content="添加Sku" placement="bottom">
                <el-button type="success" icon="el-icon-plus" size="mini" @click="addSku(row)" />
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="修改Spu" placement="bottom">
                <el-button type="warning" icon="el-icon-edit" size="mini" @click="updateSpu(row)" />
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="查看当前Spu全部Sku列表" placement="bottom">
                <el-button type="info" icon="el-icon-info" size="mini" @click="handleSkuList(row)" />
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="删除Spu" placement="bottom">
                <el-popconfirm :title="`确定删除${row.spuName}吗？`" @onConfirm="deleteSpu(row)">
                  <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini" />
                </el-popconfirm>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination
          style="margin-top: 20px; text-align: center"
          :current-page="page"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="limit"
          layout="total, prev, pager, next,jumper, -> ,sizes"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
      <!-- 添加修改spu -->
      <SpuForm v-show="scene == 1" ref="spu" @changeSceneSpu="changeSceneSpu" />
      <!-- 添加sku -->
      <SkuForm v-show="scene == 2" ref="sku" @changeSceneSku="changeSceneSku" />
    </el-card>
    <!-- 查看当前Spu全部Sku列表 -->
    <el-dialog
      :title="`${spu.spuName}的sku列表`"
      :visible.sync="dialogTableVisible"
      :before-close="close"
    >
      <el-table v-loading="loading" :data="skuList" border style="width: 100%">
        <el-table-column prop="skuName" label="名称" width="width" />
        <el-table-column prop="price" label="价格" width="width" />
        <el-table-column prop="weight" label="重量" width="width" />
        <el-table-column label="默认图片">
          <template slot-scope="{ row }">
            <img :src="row.skuDefaultImg" alt style="width: 100px; height: 100px" />
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import SkuForm from './SkuForm'
import SpuForm from './SpuForm'
export default {
  name: 'Spu',
  components: {
    SkuForm,
    SpuForm
  },
  data() {
    return {
      category1Id: '',
      category2Id: '',
      category3Id: '',
      page: 1,
      limit: 10,
      total: 0,
      list: [],
      scene: 0, // 0默认：table，1：修改spu或者新增，2：新增sku
      dialogTableVisible: false,
      spu: {},
      skuList: [],
      loading: true
    }
  },
  methods: {
    // 父组件的自定义事件接受1,2,3级菜单传过来的id
    getCategoryId({ categoryId, level }) {
      if (level === 1) {
        this.category1Id = categoryId
        this.category2Id = ''
        this.category3Id = ''
      } else if (level === 2) {
        this.category2Id = categoryId
        this.category3Id = ''
      } else {
        this.category3Id = categoryId
        this.getSpuList()
      }
    },
    async getSpuList(pager = 1) {
      this.page = pager
      const { page, limit, category3Id } = this
      const result = await this.$API.spu.reqSpuList(page, limit, category3Id)
      // console.log(result)
      if (result.code === 200) {
        this.total = result.data.total
        this.list = result.data.records
      }
    },
    handleSizeChange(val) {
      this.limit = val
      this.getSpuList()
    },
    handleCurrentChange(page) {
      this.page = page
      this.getSpuList(this.page)
    },
    addSpu() {
      this.scene = 1
      // 通知子组件发送请求（2个api请求 ）
      this.$refs.spu.addSpuData(this.category3Id)
    },
    updateSpu(row) {
      this.scene = 1
      // 通知子组件发送请求（4个api请求 ）
      this.$refs.spu.initSpuData(row)
    },
    // 自定义事件回调
    changeSceneSpu({ scene, flag }) {
      this.scene = scene
      // eslint-disable-next-line
      if (flag == '修改') {
        this.getSpuList(this.page)
      } else {
        this.getSpuList()
      }
    },
    changeSceneSku(scene) {
      this.scene = scene
    },
    // 删除spu
    async deleteSpu(row) {
      const result = await this.$API.spu.reqDeleteSpu(row.id)
      //  eslint-disable-next-line
      if (result.code == 200) {
        this.$notify.success('删除成功')
        this.getSpuList(this.list.length > 1 ? this.page : this.page - 1)
      }
    },
    // 添加sku
    addSku(row) {
      this.scene = 2
      // 获取子组件上的方法，发送请求（3个）
      this.$refs.sku.getData(this.category1Id, this.category2Id, row)
    },
    // 查看当前Spu全部Sku列表
    async handleSkuList(spu) {
      this.dialogTableVisible = true
      this.spu = spu
      const result = await this.$API.spu.reqSkuList(spu.id)
      // console.log(result)
      // eslint-disable-next-line
      if (result.code == 200) {
        this.skuList = result.data
        this.loading = false
      }
    },
    // 关闭对话框的回调
    close(done) {
      // loading 变为真
      // 清除dialog回显效果，需要清除skuList
      this.loading = true
      this.skuList = []
      done()
    }
  }
}
</script>

<style scoped>
.item {
  margin: 4px;
}
</style>
