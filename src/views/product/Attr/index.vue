<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CategorySelect @getCategoryId="getCategoryId" />
    </el-card>
    <el-card style="margin: 20px 0px">
      <!-- 添加属性入口 -->
      <el-button type="primary" icon="el-icon-plus" style="margin-bottom: 20px">添加属性</el-button>
      <!-- 表格 -->
      <el-table :data="attrList" style="width: 100%" border>
        <el-table-column type="index" label="序号" width="80px" align="center" />
        <el-table-column prop="attrName" label="属性名称" width="200px" align="center" />
        <el-table-column prop="prop" label="属性值列表" width="width">
          <template slot-scope="{ row }">
            <el-tag
              v-for="attrItem in row.attrValueList"
              :key="attrItem.id"
              type="success"
              style="margin: 2px"
            >
              {{ attrItem.valueName }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="prop" label="操作" width="400px" align="center">
          <template slot-scope="{ row }">
            <el-button type="warning" size="mini" icon="el-icon-edit" />
            <el-button type="danger" size="mini" icon="el-icon-delete" />
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Attr',
  data() {
    return {
      category1Id: '',
      category2Id: '',
      category3Id: '',
      attrList: []
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
        this.getAttrList()
      }
    },
    // 获取平台属性数据
    async getAttrList() {
      const { category1Id, category2Id, category3Id } = this
      const result = await this.$API.attr.reqAttrList(category1Id, category2Id, category3Id)
      if (result.code === 200) {
        this.attrList = result.data
      }
    }
  }
}
</script>

<style scoped></style>
