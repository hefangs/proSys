<template>
  <div>
    <el-form ref="form" label-width="80px" :model="spu">
      <el-form-item label="Spu名称">
        <el-input v-model="spu.spuName" placeholder="请输入Spu名称" />
      </el-form-item>
      <el-form-item label="品牌">
        <el-select v-model="spu.tmId" value="" placeholder="请选择品牌">
          <el-option
            v-for="item in tradeMarkList"
            :key="item.id"
            :label="item.tmName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="Spu描述" placeholder="请输入描述">
        <el-input v-model="spu.description" type="textarea" rows="4" />
      </el-form-item>
      <el-form-item label="Spu图片">
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          :file-list="spuImageList"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
        >
          <i class="el-icon-plus" />
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select v-model="attrIdAndName" :placeholder="`还有${unSelectSaleAttr.length}未选择`">
          <el-option
            v-for="item in unSelectSaleAttr"
            :key="item.id"
            :label="item.name"
            :value="`${item.id}:${item.name}`"
          />
        </el-select>
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!attrIdAndName"
          @click="addSaleAttr"
        >
          添加销售属性
        </el-button>
        <el-table style="width: 100%" border :data="spu.spuSaleAttrList">
          <el-table-column type="index" label="序号" width="80px" align="center" />
          <el-table-column prop="saleAttrName" label="属性名" width="width" />
          <el-table-column prop="prop" label="属性值名称列表" width="width">
            <template slot-scope="{ row, $index }">
              <el-tag
                v-for="tag in row.spuSaleAttrValueList"
                :key="tag.id"
                closable
                :disable-transitions="false"
                @close="handleClose(row, $index)"
              >
                {{ tag.saleAttrValueName }}
              </el-tag>
              <el-input
                v-if="row.inputVisible"
                ref="saveTagInput"
                v-model="row.inputValue"
                class="input-new-tag"
                size="small"
                @keyup.enter.native="$event.target.blur"
                @blur="handleInputConfirm(row)"
              />
              <el-button v-else class="button-new-tag" size="small" @click="showInput(row)">
                添加
              </el-button>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ $index }">
              <el-button type="danger" icon="el-icon-delete" @click="handleDeleteAttr($index)" />
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addOrUpdateSpu">确定</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SpuForm',
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      // spu属性初始化的时候是一个空的对象,在修改SPU的时候，会想服务器发请求，返回SPU信息（对象），在修改的时候可以利用服务器返回的这个对象收集最新的数据提交给服务器
      // 添加SPU，如果是添加SPU的时候并没有向服务器发请求，数据收集到哪里呀[SPU]，收集数据的时候有哪些字段呀，看文档
      spu: {
        category3Id: 0, // 三级分类的id
        description: '', // 描述
        spuName: '', // spu名称
        tmId: '', // 平台的id
        // 收集SPU图片的信息
        spuImageList: [
          // {
          //   id: 0,
          //   imgName: "string",
          //   imgUrl: "string",
          //   spuId: 0,
          // },
        ],
        // 平台属性与属性值收集
        spuSaleAttrList: [
          // {
          //   baseSaleAttrId: 0,
          //   id: 0,
          //   saleAttrName: "string",
          //   spuId: 0,
          //   spuSaleAttrValueList: [
          //     {
          //       baseSaleAttrId: 0,
          //       id: 0,
          //       isChecked: "string",
          //       saleAttrName: "string",
          //       saleAttrValueName: "string",
          //       spuId: 0,
          //     },
          //   ],
          // },
        ]
      },
      tradeMarkList: [], // 存储品牌信息
      spuImageList: [], // 存储SPU图片的数据
      saleAttrList: [], // 销售属性的数据（项目全部的销售属性）
      attrIdAndName: '' // 收集未选择的销售属性的id-----
    }
  },
  computed: {
    // 过滤出未选择的销售属性
    unSelectSaleAttr() {
      const result = this.saleAttrList.filter(item1 => {
        return this.spu.spuSaleAttrList.every(item2 => {
          return item1.name !== item2.saleAttrName
        })
      })
      return result
    }
  },
  methods: {
    // 取消
    // 给父组件传递scene
    cancel() {
      this.$emit('changeSceneSpu', { scene: 0, flag: '' })
      Object.assign(this._data, this.$options.data())
    },
    // 初始化spuForm数据
    async initSpuData(spu) {
      // 获取spu属性信息
      const resultSpu = await this.$API.spu.reqSpu(spu.id)
      // console.log(resultSpu)
      if (resultSpu.code === 200) {
        this.spu = resultSpu.data
      }
      // 获取品牌信息
      const resultTradeMark = await this.$API.spu.reqTradeMarkList()
      // console.log(resultTradeMark)
      if (resultTradeMark.code === 200) {
        this.tradeMarkList = resultTradeMark.data
      }
      // 获取spu图片信息
      const resultSpuImage = await this.$API.spu.reqSpuImageList(spu.id)
      // console.log(resultSpuImage)
      if (resultSpuImage.code === 200) {
        const listArr = resultSpuImage.data
        // 由于照片墙显示图片需要有name与url字段
        // 而服务器返回的字段imgName，imgUrl，需要把服务器返回的数据进行修改
        listArr.forEach(item => {
          item.name = item.imgName
          item.url = item.imgUrl
        })
        this.spuImageList = listArr
      }
      // 获取全平台销售属性
      const resultSale = await this.$API.spu.reqBaseSaleAttrList()
      // console.log(resultSale)
      if (resultSale.code === 200) {
        this.saleAttrList = resultSale.data
      }
    },
    // 删除标签
    handleClose(row, index) {
      row.spuSaleAttrValueList.splice(index, 1)
    },
    // 显示input
    showInput(row) {
      // 增加2个响应式数据：inputVisible和inputValue
      this.$set(row, 'inputVisible', true)
      this.$set(row, 'inputValue', '')
      this.$nextTick(() => {
        this.$refs.saveTagInput.focus()
      })
    },
    // input失焦事件
    handleInputConfirm(row) {
      const { baseSaleAttrId, inputValue } = row // 解构出销售属性当中收集数据
      const newSaleAttrValue = { baseSaleAttrId, saleAttrValueName: inputValue } // 新增的销售属性值
      if (inputValue.trim() === '') {
        this.$notify.error('属性值不能为空') // 新增的销售属性值的名称不能为空
        return
      }
      const result = row.spuSaleAttrValueList.some(
        // eslint-disable-next-line
        item => item.saleAttrValueName == inputValue // 属性值不能重复,
      )
      if (result) {
        this.$notify.error('属性值不能重复')
        return
      }
      row.spuSaleAttrValueList.push(newSaleAttrValue) // 新增
      row.inputVisible = false // 修改inputVisible为false，不就显示button
    },
    // 删除图片
    handleRemove(fileList, file) {
      this.spuImageList = file
      // console.log(file)
      // console.log(fileList)
    },
    // 预览图片
    handlePictureCardPreview(file) {
      // console.log(file)
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 添加图片
    handleSuccess(fileList, file, response) {
      // console.log(file)
      // console.log(fileList)
      // console.log(response)
      this.spuImageList = response
    },
    // 添加销售属性
    addSaleAttr() {
      const [baseSaleAttrId, saleAttrName] = this.attrIdAndName.split(':')
      const newSaleAttr = { baseSaleAttrId, saleAttrName, spuSaleAttrValueList: [] }
      this.spu.spuSaleAttrList.push(newSaleAttr)
      this.attrIdAndName = ''
    },
    // 删除属性
    handleDeleteAttr(index) {
      this.spu.spuSaleAttrList.splice(index, 1)
    },
    // 保存数据
    async addOrUpdateSpu() {
      this.spu.spuImageList = this.spuImageList.map(item => {
        return {
          // 携带参数：对于图片，需要携带imageName与imageUrl字段
          imgName: item.name,
          imgUrl: (item.response && item.response.data) || item.imgUrl
        }
      })
      const result = await this.$API.spu.reqAddOrUpdateSpu(this.spu)
      // eslint-disable-next-line
      if (result.code == 200) {
        // this.$emit('changeSceneSpu', { scene: 0, flag: this.spu.id ? '修改' : '添加' })
        if (!this.spu.id) {
          this.$notify.success('添加成功')
          this.$emit('changeSceneSpu', { scene: 0, flag: '添加' })
        } else {
          this.$notify.success('修改成功')
          this.$emit('changeSceneSpu', { scene: 0, flag: '修改' })
        }
      }
      Object.assign(this._data, this.$options.data())
    },
    // 添加属性：初始化数据2个api请求
    async addSpuData(category3Id) {
      // category3Id 由父组件addSpu函数传递
      this.spu.category3Id = category3Id
      // 获取品牌信息
      const resultTradeMark = await this.$API.spu.reqTradeMarkList()
      // console.log(resultTradeMark)
      if (resultTradeMark.code === 200) {
        this.tradeMarkList = resultTradeMark.data
      }
      // 获取全平台销售属性
      const resultSale = await this.$API.spu.reqBaseSaleAttrList()
      // console.log(resultSale)
      if (resultSale.code === 200) {
        this.saleAttrList = resultSale.data
      }
    }
  }
}
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
