<template>
  <div>
    <!-- 添加入口 -->
    <el-button type="primary" icon="el-icon-plus" style="margin: 10px 10px" @click="showDialog">
      添加
    </el-button>
    <!-- 表格模块  -->
    <el-table :data="list" style="width: 100%" border>
      <el-table-column type="index" label="序号" width="100px" align="center" />
      <el-table-column prop="tmName" label="品牌名称" width="width" align="center" />
      <el-table-column prop="logoUrl" label="品牌Logo" width="width" align="center">
        <template slot-scope="{ row, $index }">
          <!-- {{ row }}-{{ $index }} -->
          <!-- eslint-disable-next-line vue/html-self-closing -->
          <img :src="row.logoUrl" alt="" style="width: 150px; height: 80px" />
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width" align="center">
        <template slot-scope="{ row, $index }">
          <el-button type="warning" size="mini" icon="el-icon-edit" @click="updateTradeMark">
            修改
          </el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete">删除</el-button>
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
    <!-- dialog -->

    <el-dialog title="添加品牌" :visible.sync="dialogFormVisible">
      <el-form style="width: 80%">
        <el-form-item label="活动名称" label-width="100px">
          <el-input v-model="form" autocomplete="off" />
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon" />
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'TradeMark',
  data() {
    return {
      page: 1,
      limit: 10,
      total: 0,
      list: [],
      dialogFormVisible: false,
      imageUrl: '',
      form: ''
    }
  },
  mounted() {
    this.getPageList()
  },
  methods: {
    // 改变每页条数
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`
      this.limit = val
      this.getPageList()
    },
    // 跳转页面
    handleCurrentChange(pager) {
      // console.log(`当前页: ${pager}`)
      this.page = pager
      this.getPageList()
    },
    // 获取所有的tradeMark数据
    async getPageList() {
      const result = await this.$API.tradeMark.reqTradeMarkList(this.page, this.limit)
      // console.log(result)
      if (result.code === 200) {
        this.total = result.data.total
        this.list = result.data.records
      }
    },
    // 上传图片
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    // 上传图片校验
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 添加品牌
    showDialog() {
      this.dialogFormVisible = true
    },
    // 修改品牌
    updateTradeMark() {
      this.dialogFormVisible = true
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
