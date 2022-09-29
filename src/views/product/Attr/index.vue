<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CategorySelect @getCategoryId="getCategoryId" />
    </el-card>
    <el-card style="margin: 20px 0px">
      <div v-show="isShowTable">
        <!-- 添加属性入口 -->
        <el-button
          type="primary"
          icon="el-icon-plus"
          style="margin-bottom: 20px"
          :disabled="!category3Id"
          @click="addAttr"
        >
          添加属性
        </el-button>
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
          <el-table-column prop="prop" label="操作" width="300px" align="center">
            <template slot-scope="{ row }">
              <el-button type="warning" size="mini" icon="el-icon-edit" @click="updateAttr(row)" />
              <el-button type="danger" size="mini" icon="el-icon-delete" />
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="!isShowTable">
        <!-- 添加属性、修改属性 -->
        <el-form ref="form" :inline="true" label-width="80px" :model="attrInfo">
          <el-form-item label="属性名">
            <el-input v-model="attrInfo.attrName" placeholder="请输入属性名" />
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!attrInfo.attrName"
          @click="addAttrValue"
        >
          添加属性值
        </el-button>
        <el-button @click="isShowTable = true">取消</el-button>
        <el-table style="width: 100%; margin: 20px 0px" border :data="attrInfo.attrValueList">
          <el-table-column type="index" label="序号" width="80px" align="center" />
          <el-table-column prop="prop" label="属性值名称" width="width">
            <template slot-scope="{ row }">
              <el-input
                v-if="row.flag"
                v-model="row.valueName"
                placeholder="请输入属性值名称"
                size="mini"
                @blur="toLook(row)"
                @keyup.native.enter="toLook(row)"
              />
              <span v-else style="display: block" @click="row.flag = true">
                {{ row.valueName }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{}">
              <el-button type="danger" icon="el-icon-edit" />
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary">保存</el-button>
        <el-button @click="isShowTable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
export default {
  name: 'Attr',
  data() {
    return {
      category1Id: '',
      category2Id: '',
      category3Id: '',
      // 获取平台属性数据
      attrList: [],
      isShowTable: true,
      // 收集的新增属性或者修改属性
      attrInfo: {
        // 属性名
        attrName: '',
        // 属性值
        attrValueList: [
          // {
          //   attrId: 0,
          //   valueName: ''
          // }
        ],
        categoryId: 0, // 三级分类id
        categoryLevel: 3
      }
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
    },
    // 添加属性值
    addAttrValue() {
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id,
        valueName: '',
        flag: true // flag用来切换编辑模式和展示模式
      })
    },
    // 添加属性操作
    addAttr() {
      // 隐藏table
      this.isShowTable = false
      // 清空上次属性
      this.attrInfo = {
        attrName: '',
        attrValueList: [],
        categoryId: this.category3Id,
        categoryLevel: 3
      }
    },
    // 修改属性
    updateAttr(row) {
      this.isShowTable = false
      this.attrInfo = cloneDeep(row)
    },
    // 增加一个flag设置input和span切换效果，失焦和enter都能生效
    toLook(row) {
      // eslint-disable-next-line
      if (row.valueName.trim() == '') {
        this.$notify.error('属性值名称不能为空')
        return
      }
      const isRepeat = this.attrInfo.attrValueList.some(item => {
        if (row !== item) {
          // eslint-disable-next-line
          return row.valueName == item.valueName
        }
      })
      if (isRepeat) {
        this.$notify.error('属性值名称已存在')
        return
      }
      row.flag = false
    }
  }
}
</script>

<style scoped></style>
