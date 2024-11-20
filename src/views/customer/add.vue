<template>
  <div class="app-container">
    <h2 class="title">增加用户</h2>
    <el-form :model="form" class="add-form">
      <el-form-item label="姓名">
        <el-input v-model="form.name" placeholder="输入姓名" />
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input v-model="form.contact" placeholder="输入联系方式" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
        <el-button @click="handleCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { add_customer } from '@/api/customer'

export default {
  data() {
    return {
      form: {
        name: '',
        contact: '',
        date: ''
      }
    }
  },
  methods: {
    async handleSubmit() {
      try {
        this.form.date = new Date()
        await add_customer(this.form)
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        this.$router.push({ path: '/customer/list' })
      } catch (error) {
        this.$message({
          message: '添加失败',
          type: 'error'
        })
      }
    },
    handleCancel() {
      this.$router.push({ path: '/customer/list' })
    }
  }
}
</script>
