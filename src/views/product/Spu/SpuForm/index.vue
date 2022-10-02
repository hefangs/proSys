<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="Spu名称">
        <el-input placeholder="请输入Spu名称" />
      </el-form-item>
      <el-form-item label="品牌">
        <el-select value="" placeholder="请选择品牌">
          <el-option label="label" value="value" />
        </el-select>
      </el-form-item>
      <el-form-item label="Spu描述" placeholder="请输入描述">
        <el-input type="textarea" rows="4" />
      </el-form-item>
      <el-form-item label="Spu图片">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
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
        <el-button>取消</el-button>
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
      dialogVisible: false
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>

<style scoped></style>
