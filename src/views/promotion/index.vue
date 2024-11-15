<template>
  <div class="app-container">
    <h2 class="title">促销活动管理</h2>
    <el-button type="success" class="add-button" @click="Add">添加促销活动</el-button>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <!-- ID 列 -->
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>

      <!-- 促销名称 (可编辑) -->
      <el-table-column label="促销名称" width="110" align="center">
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.name"
            placeholder="请输入促销名称"
            size="small"
          />
        </template>
      </el-table-column>

      <!-- 描述 (可编辑) -->
      <el-table-column label="描述" align="center">
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.description"
            placeholder="请输入描述"
            size="small"
          />
        </template>
      </el-table-column>

      <!-- 促销类型 -->
      <el-table-column class-name="status-col" label="促销类型" width="150" align="center">
        <template slot-scope="scope">
          <el-select v-model="scope.row.discountType" size="small">
            <el-option label="满减" value="full_reduction" />
            <el-option label="折扣" value="discount" />
          </el-select>
        </template>
      </el-table-column>

      <!-- 开始时间 -->
      <el-table-column label="开始时间" width="150" align="center">
        <template slot-scope="scope">
          <el-date-picker
            v-model="scope.row.startDate"
            type="date"
            size="small"
            placeholder="选择日期"
          />
        </template>
      </el-table-column>

      <!-- 结束时间 -->
      <el-table-column label="结束时间" width="150" align="center">
        <template slot-scope="scope">
          <el-date-picker
            v-model="scope.row.endDate"
            type="date"
            size="small"
            placeholder="选择日期"
          />
        </template>
      </el-table-column>

      <!-- 操作列 -->
      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="saveRow(scope.row)"
          >保存</el-button>
          <el-button
            type="danger"
            size="small"
            @click="deleteRow(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getPromotions, deletePromotion, updatePromotion } from '@/api/promotion'

export default {
  data() {
    return {
      list: [],
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.listLoading = true
      try {
        const response = await getPromotions()
        this.list = response.data.items
      } catch (error) {
        console.error('获取数据失败:', error)
      } finally {
        this.listLoading = false
      }
    },
    Add() {
      this.$router.push({ path: '/promotion/add' })
    },
    async deleteRow(row) {
      try {
        await deletePromotion(row.id)
        this.$message.success('删除成功')
        await this.fetchData()
      } catch (error) {
        console.error('删除失败:', error)
        this.$message.error('删除失败')
      }
    },
    async saveRow(row) {
      try {
        await updatePromotion(row.id, row)
        this.$message.success('保存成功')
      } catch (error) {
        console.error('保存失败:', error)
        this.$message.error('保存失败')
      }
    }
  }
}
</script>
