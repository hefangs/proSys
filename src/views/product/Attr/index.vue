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
            <template slot-scope="{ row, $index }">
              <el-input
                v-if="row.flag"
                :ref="$index"
                v-model="row.valueName"
                placeholder="请输入属性值名称"
                size="mini"
                @blur="toLook(row)"
                @keyup.native.enter="toLook(row)"
              />
              <span v-else style="display: block" @click="toEdit(row, $index)">
                {{ row.valueName }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <el-popconfirm
                :title="`你确定要删除:${row.valueName} ?`"
                @onConfirm="deleteAttrValue($index)"
              >
                <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini" />
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="addOrUpdateAttr">保存</el-button>
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
      // 新增属性值的时候也要自动聚焦
      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus()
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
      // 由于数据接口当中存在对象里面套数组，而数组里面又套着对象，因此需要深拷贝解决此类问题
      this.attrInfo = cloneDeep(row)
      // 修改属性的时候也需要加上一个flag，通过$set来实现flag是一个响应式的数据
      this.attrInfo.attrValueList.forEach(item => {
        this.$set(item, 'flag', false)
      })
      // console.log(row.attrValueList)
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
    },
    // 点击span切换编辑模式
    toEdit(row, index) {
      row.flag = true
      // 切换input节点，自动获取焦点
      // 点击span的时候不能保证立马获取到input节点，重排和重绘是需要花费时间的
      // $nextTick可以保证执行时候input节点是肯定存在的
      this.$nextTick(() => {
        this.$refs[index].focus()
      })
    },
    // 气泡确认框：确认操作
    deleteAttrValue(index) {
      // 这里的删除只是前台做了删除操作，没有发送请求，后面点击保存才会去发送请求
      this.attrInfo.attrValueList.splice(index, 1)
    },
    // 保存操作：添加或者修改操作进行保存
    async addOrUpdateAttr() {
      // 过滤掉空的属性值&删除编辑和添加属性值带上的flag（flag不需要提交到服务器）
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(item => {
        if (item.valueName !== '') {
          delete item.flag
          return true
        }
      })
      const result = await this.$API.attr.reqAddOrUpdateAttr(this.attrInfo)
      // console.log(result)
      if (result.code === 200) {
        this.$notify.success('添加成功')
        // 显示table
        this.isShowTable = true
        // 重新刷新平台数据
        this.getAttrList()
      } else {
        this.$notify.error('添加失败')
      }
    }
  }
}
</script>

<style scoped></style>
