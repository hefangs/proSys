<!-- eslint-disable vue/html-self-closing -->
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
        <template slot-scope="{ row }">
          <!-- {{ row }}-{{ $index }} -->
          <!-- eslint-disable-next-line vue/html-self-closing -->
          <img :src="row.logoUrl" alt="" style="width: 150px; height: 80px" />
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width" align="center">
        <template slot-scope="{ row }">
          <el-button type="warning" size="mini" icon="el-icon-edit" @click="updateTradeMark(row)">
            修改
          </el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteTradeMark(row)">
            删除
          </el-button>
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

    <el-dialog :title="tmForm.id ? '修改品牌' : '新增品牌'" :visible.sync="dialogFormVisible">
      <el-form ref="ruleForm" style="width: 80%" :model="tmForm" :rules="rules">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input v-model="tmForm.tmName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon" />
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTradeMark">确 定</el-button>
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
      tmForm: {
        tmName: '',
        logoUrl: ''
      },
      // dialog的验证规则
      rules: {
        tmName: [
          { required: true, message: '请输入品牌名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'change' }
        ],
        logoUrl: [{ required: true, message: '请选择图片', trigger: 'change' }]
      }
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
      this.getPageList(this.page)
    },
    // 获取所有的tradeMark数据
    async getPageList(pager = 1) {
      this.page = pager
      const result = await this.$API.tradeMark.reqTradeMarkList(this.page, this.limit)
      // console.log(result)
      if (result.code === 200) {
        this.total = result.data.total
        this.list = result.data.records
      }
    },
    // 上传图片
    handleAvatarSuccess(res, file) {
      // console.log(res.data)
      this.tmForm.logoUrl = res.data
    },
    // 上传图片校验
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$notify.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$notify.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 添加品牌
    showDialog() {
      this.dialogFormVisible = true
      // 每次添加都清除数据
      this.tmForm = { tmName: '', logoUrl: '' }
    },
    // 修改品牌
    updateTradeMark(row) {
      this.dialogFormVisible = true
      // 这里不能直接对服务器返回的数据进行操作，需要浅拷贝一下
      // 不要直接操作数据，这些数据是在表格当中进行展示的
      this.tmForm = { ...row }
    },
    // dialog对话框中的【添加】按钮
    addOrUpdateTradeMark() {
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          this.dialogFormVisible = false
          const result = await this.$API.tradeMark.reqAddOrUpdateTradeMark(this.tmForm)
          if (result.code === 200) {
            if (this.tmForm.id) {
              this.$notify({
                // title: '成功',
                message: '修改品牌成功',
                type: 'success'
              })
            } else {
              this.$notify({
                // title: '成功',
                message: '新增品牌成功',
                type: 'success'
              })
            }
          }
          this.getPageList(this.tmForm.id ? this.page : 1)
        } else {
          console.log('error submit!!!')
          return false
        }
      })
    },
    // 删除品牌
    deleteTradeMark(row) {
      this.$confirm(`你确定删除品牌：${row.tmName}？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        // eslint-disable-next-line space-before-function-paren
        .then(async () => {
          const result = await this.$API.tradeMark.removeTradeMark(row.id)
          if (result.code === 200) {
            this.$notify({
              type: 'success',
              message: '删除成功!'
            })
            this.getPageList(this.list.length > 1 ? this.page : this.page - 1)
          }
        })
        .catch(() => {
          this.$notify({
            type: 'warning',
            message: '已取消删除'
          })
        })
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
