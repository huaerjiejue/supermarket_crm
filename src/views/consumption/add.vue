<template>
  <div class="app-container">
    <h2 class="title">增加用户</h2>
    <el-form :model="form" class="add-form">
      <el-form-item label="姓名">
        <el-input v-model="form.name" placeholder="输入姓名" />
      </el-form-item>
      <el-form-item label="消费金额">
        <el-input v-model="form.cost" placeholder="输入消费金额" />
      </el-form-item>
      <el-form-item label="促销方式">
        <el-select v-model="form.promotion" placeholder="选择促销方式">
          <el-option
            v-for="option in promotionOptions"
            :key="option.promotion"
            :label="option.label"
            :value="option.promotion"
          />
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
import { getPromotionOptions } from '@/api/promotion'

export default {
  data() {
    return {
      form: {
        name: '',
        cost: '',
        promotion: ''
      },
      promotionOptions: []
    }
  },
  created() {
    this.fetchPromotionOptions()
  },
  methods: {
    async fetchPromotionOptions() {
      this.listLoading = true
      try {
        const response = await getPromotionOptions()
        this.promotionOptions = response.data.items
      } catch (error) {
        console.error('获取促销方式失败:', error)
      } finally {
        this.listLoading = false
      }
    },
    handleSubmit() {
      console.log(this.form) // TODO: 提交表单
    },
    handleCancel() {
      this.$router.push({ path: '/consumption/list' })
    }
  }
}
</script>
