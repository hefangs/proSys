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
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :file-list="spuImageList"
        >
          <i class="el-icon-plus" />
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select v-model="attrId" :placeholder="`还有${unSelectSaleAttr.length}未选择`">
          <el-option
            v-for="item in unSelectSaleAttr"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
        <el-button type="primary" icon="el-icon-plus" :disabled="!attr">添加销售属性</el-button>
        <el-table style="width: 100%" border :data="spu.spuSaleAttrList">
          <el-table-column type="index" label="序号" width="80px" align="center" />
          <el-table-column prop="saleAttrName" label="属性名" width="width" />
          <el-table-column prop="prop" label="属性值名称列表" width="width">
            <template slot-scope="{ row, $index }">
              <el-tag
                v-for="tag in row.spuSaleAttrValueLists"
                :key="tag.id"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)"
              >
                {{ tag.saleAttrValueName }}
              </el-tag>
              <el-input
                v-if="row.inputVisible"
                ref="saveTagInput"
                v-model="row.inputValue"
                class="input-new-tag"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
              />
              <el-button v-else class="button-new-tag" size="small" @click="showInput">
                添加
              </el-button>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <el-button type="danger" icon="el-icon-delete" />
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">确定</el-button>
        <el-button @click="goScene">取消</el-button>
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
      // spu属性信息
      spu: {
        category3Id: 0,
        description: '',
        spuImageList: [
          {
            id: 0,
            imgName: '',
            imgUrl: '',
            spuId: 0
          }
        ],
        spuName: '',
        spuSaleAttrList: [
          {
            baseSaleAttrId: 0,
            id: 0,
            saleAttrName: '',
            spuId: 0,
            spuSaleAttrValueList: [
              {
                baseSaleAttrId: 0,
                id: 0,
                isChecked: 'string',
                saleAttrName: '',
                saleAttrValueName: '',
                spuId: 0
              }
            ]
          }
        ],
        tmId: 0
      },
      tradeMarkList: [], // 品牌信息
      spuImageList: [], // spu图片信息
      saleAttrList: [], // 销售属性
      attrId: '' // 收集未选择的销售属性id
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
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 给父组件传递scene
    goScene() {
      this.$emit('changeScene', 0)
    },
    // 初始化spuForm数据
    async initSpuData(spu) {
      // 获取spu属性信息
      const resultSpu = await this.$API.spu.reqSpu(spu.id)
      if (resultSpu.code === 200) {
        this.spu = resultSpu.data
      }
      // 获取品牌信息
      const resultTradeMark = await this.$API.spu.reqTradeMarkList()
      if (resultTradeMark.code === 200) {
        this.tradeMarkList = resultTradeMark.data
      }
      // 获取spu图片信息
      const resultSpuImage = await this.$API.spu.reqSpuImageList(spu.id)
      if (resultSpuImage.code === 200) {
        const listArr = resultSpuImage.data
        listArr.forEach(item => {
          item.name = item.imgName
          item.url = item.imgUrl
        })
        this.spuImageList = listArr
      }
      // 获取全平台销售属性
      const resultSale = await this.$API.spu.reqBaseSaleAttrList()
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
