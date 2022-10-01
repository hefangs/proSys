<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CategorySelect :show="!show" @getCategoryId="getCategoryId" />
    </el-card>
    <el-card>
      <div>
        <!-- 添加Spu入口 -->
        <el-button type="primary" icon="el-icon-plus" style="margin: 20px 0px">添加Spu</el-button>
        <!-- 表格 -->
        <el-table :data="data" style="width: 100%" border>
          <el-table-column type="index" label="序号" width="80px" align="center" />
          <el-table-column prop="prop" label="SPU名称" width="width" />
          <el-table-column prop="prop" label="SPU描述" width="width" />
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <el-button type="success" icon="el-icon-plus" size="mini" />
              <el-button type="warning" icon="el-icon-edit" size="mini" />
              <el-button type="info" icon="el-icon-info" size="mini" />
              <el-button type="danger" icon="el-icon-delete" size="mini" />
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
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Spu',
  data() {
    return {
      getCategoryId: '',
      getCategory2d: '',
      getCategory3d: '',
      show: true
    }
  },
  methods: {
    // 父组件的自定义事件接受1,2,3级菜单传过来的id
    // eslint-disable-next-line vue/no-dupe-keys
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
    getSpuList() {}
  }
}
</script>

<style scoped></style>
