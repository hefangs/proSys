<template>
  <div>
    <el-form ref="form" label-width="100px">
      <el-form-item label="Spu名称">
        {{ 1 }}
      </el-form-item>
      <el-form-item label="Sku名称">
        <el-input placeholder="Sku名称" />
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input placeholder="价格（元）" />
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input placeholder="重量（千克）" />
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input type="textarea" placeholder="规格描述" rows="4" />
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form ref="form" :inline="true" label-width="100px">
          <el-form-item label="屏幕尺寸">
            <el-select placeholder="请选择" value="">
              <el-option label="label" value="value" />
            </el-select>
          </el-form-item>
          <el-form-item label="无线通信">
            <el-select placeholder="请选择" value="">
              <el-option label="label" value="value" />
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form ref="form" :inline="true" label-width="100px">
          <el-form-item label="颜色">
            <el-select placeholder="请选择" value="">
              <el-option label="label" value="value" />
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table style="width: 100%" border>
          <el-table-column prop="prop" label="label" width="80" type="selection" />
          <el-table-column prop="prop" label="图片" width="width" />
          <el-table-column prop="prop" label="名称" width="width" />
          <el-table-column prop="prop" label="操作" width="width" />
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SkuForm'
}
</script>

<style scoped></style>
