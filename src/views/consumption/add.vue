<template>
  <div class="app-container">
    <h2 class="title">增加消费</h2>
    <el-form :model="form" class="add-form">
      <el-form-item label="消费者编号">
        <el-input v-model="form.customer_id" placeholder="输入消费者编号" />
      </el-form-item>
      <el-form-item label="消费金额">
        <el-input v-model="form.cost" placeholder="输入消费金额" />
      </el-form-item>
      <el-form-item label="促销方式">
        <el-select v-model="form.promotion" placeholder="选择促销方式">
          <el-option
            v-for="option in promotionOptions"
            :key="option.label"
            :label="option.label"
            :value="option.id"
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
import { add_consumption } from '@/api/consumption'

export default {
  data() {
    return {
      form: {
        customer_id: '',
        cost: '',
        promotion: '',
        date: ''
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
        this.promotionOptions = response.data
      } catch (error) {
        console.error('获取促销方式失败:', error)
      } finally {
        this.listLoading = false
      }
    },
    handleSubmit() {
      try {
        this.form.date = new Date()
        console.log('form:', this.form)
        add_consumption(this.form)
        this.$router.push({ path: '/consumption/list' })
      } catch (error) {
        console.error('添加消费记录失败:', error)
      }
    },
    handleCancel() {
      this.$router.push({ path: '/consumption/list' })
    }
  }
}
</script>
