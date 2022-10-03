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
        <el-select placeholder="placeholder" value="">
          <el-option label="label" value="value" />
        </el-select>
        <el-button type="primary" icon="el-icon-plus">添加销售属性</el-button>
        <el-table style="width: 100%" border>
          <el-table-column type="index" label="序号" width="80px" align="center" />
          <el-table-column prop="prop" label="属性名" width="width" />
          <el-table-column prop="prop" label="属性值名称列表" width="width" />
          <el-table-column prop="prop" label="操作" width="width" />
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
            imgName: 'string',
            imgUrl: 'string',
            spuId: 0
          }
        ],
        spuName: '',
        spuSaleAttrList: [
          {
            // baseSaleAttrId: 0,
            // id: 0,
            // saleAttrName: 'string',
            // spuId: 0,
            // spuSaleAttrValueList: [
            //   {
            //     baseSaleAttrId: 0,
            //     id: 0,
            //     isChecked: 'string',
            //     saleAttrName: 'string',
            //     saleAttrValueName: 'string',
            //     spuId: 0
            //   }
            // ]
          }
        ],
        tmId: 0
      },
      tradeMarkList: [], // 品牌信息
      spuImageList: [], // spu图片信息
      saleAttrList: [] // 销售属性
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

<style scoped></style>
