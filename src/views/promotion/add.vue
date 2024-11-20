<template>
  <div class="app-container">
    <h2 class="title">添加促销</h2>
    <el-form :model="form" class="add-form">
      <el-form-item label="促销名称">
        <el-input v-model="form.name" placeholder="输入促销名称" />
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="form.description" placeholder="输入描述" />
      </el-form-item>
      <el-form-item label="促销类型">
        <el-select v-model="form.discountType" placeholder="选择促销类型">
          <el-option label="满减" value="full_reduction" />
          <el-option label="折扣" value="discount" />
        </el-select>
      </el-form-item>
      <el-form-item label="开始时间">
        <el-date-picker v-model="form.startDate" type="date" placeholder="选择开始日期" />
      </el-form-item>
      <el-form-item label="结束时间">
        <el-date-picker v-model="form.endDate" type="date" placeholder="选择结束日期" />
      </el-form-item>
      <el-form-item label="最低等级会员">
        <el-select v-model="form.minLevel" placeholder="选择最低等级会员">
          <el-option label="普通会员" value="普通会员" />
          <el-option label="白银会员" value="白银会员" />
          <el-option label="黄金会员" value="黄金会员" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
        <el-button @click="handleCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addPromotion } from '@/api/promotion'

export default {
  data() {
    return {
      form: {
        name: '',
        description: '',
        discountType: '',
        startDate: '',
        endDate: '',
        minLevel: ''
      }
    }
  },
  methods: {
    async handleSubmit() {
      try {
        await addPromotion(this.form)
        this.$message.success('添加成功')
        this.$router.push({ path: '/promotion/index' })
      } catch (error) {
        console.error('添加失败:', error)
        this.$message.error('添加失败')
      }
    },
    handleCancel() {
      this.$router.push({ path: '/promotion/index' })
    }
  }
}
</script>

<style scoped>
.add-form {
  max-width: 600px;
  margin: 0 auto;
}
</style>
