<template>
  <div>
    <el-form :inline="true" class="demo-form-inline" :model="cForm">
      <el-form-item label="一级分类">
        <el-select v-model="cForm.category1Id" placeholder="请选择" @change="handler1">
          <el-option v-for="c1 in list1" :key="c1.id" :label="c1.name" :value="c1.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select v-model="cForm.category2Id" placeholder="请选择" @change="handler2">
          <el-option v-for="c2 in list2" :key="c2.id" :label="c2.name" :value="c2.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select v-model="cForm.category3Id" placeholder="请选择" @change="handler3">
          <el-option v-for="c3 in list3" :key="c3.id" :label="c3.name" :value="c3.id" />
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'CategorySelect',
  data() {
    return {
      list1: [], // 一级分类数据
      list2: [], // 二级分类数据
      list3: [], // 三级分类数据
      cForm: {
        category1Id: '',
        category2Id: '',
        category3Id: ''
      }
    }
  },
  mounted() {
    // 默认直接加载一级分类数据
    this.getCategory1List()
  },
  methods: {
    // 一级分类
    async getCategory1List() {
      const result = await this.$API.attr.reqCategory1List()
      // console.log(result)
      if (result.code === 200) {
        this.list1 = result.data
      }
    },
    // 一级分类的id发生改变获取对应的二级分类数据
    async handler1() {
      const { category1Id } = this.cForm
      const result = await this.$API.attr.reqCategory2List(category1Id)
      // console.log(result)
      if (result.code === 200) {
        this.list2 = result.data
      }
    },
    // 二级分类的id发生改变获取对应的三级分类数据
    async handler2() {
      const { category2Id } = this.cForm
      const result = await this.$API.attr.reqCategory3List(category2Id)
      if (result.code === 200) {
        this.list3 = result.data
      }
    },
    // 三级分类菜单
    handler3() {}
  }
}
</script>

<style scoped></style>
