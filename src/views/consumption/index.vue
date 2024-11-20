<template>
  <div class="app-container">
    <h2 class="title">客户消费管理</h2>
    <el-form :inline="true" :model="queryForm" class="query-form">
      <el-form-item label="姓名">
        <el-input v-model="queryForm.name" placeholder="输入姓名" />
      </el-form-item>
      <el-form-item label="消费时间">
        <el-date-picker v-model="queryForm.consumption_time" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" style="width: 100%;" />
      </el-form-item>
      <el-form-item label="促销方式">
        <el-select v-model="queryForm.promotion" placeholder="选择促销方式">
          <el-option
            v-for="option in promotionOptions"
            :key="option.promotion"
            :label="option.label"
            :value="option.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="Query">查询</el-button>
        <el-button @click="Reset">重置</el-button>
        <el-button type="success" class="add-button" @click="Add">添加消费</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="用户编号" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.user_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="消费金额" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.cost }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="等级" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="$options.filters.levelFilter(scope.row.level)">{{ scope.row.level }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="消费时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.consumption_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="促销活动" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.promotion }}</span>
        </template>
      </el-table-column>
    </el-table-column></el-table>
  </div>
</template>

<script>
import { getList } from '@/api/consumption'
import { getPromotionOptions } from '@/api/promotion'

export default {
  filters: {
    levelFilter(level) {
      const levelMap = {
        '普通会员': 'info',
        '白银会员': 'success',
        '黄金会员': 'warning'
      }
      return levelMap[level] || 'blue'
    }
  },
  data() {
    return {
      queryForm: {
        name: '',
        consumption_time: '',
        promotion: ''
      },
      list: null,
      promotionOptions: [],
      listLoading: true
    }
  },
  created() {
    // console.log('created')
    this.fetchData()
    this.fetchPromotionOptions()
  },
  methods: {
    async fetchData() {
      this.listLoading = true
      try {
        const response = await getList()
        this.list = response.data
      } catch (error) {
        console.error('获取数据失败:', error)
      } finally {
        this.listLoading = false
      }
    },
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
    Query() {
      this.listLoading = true
      getList().then(response => {
        // console.log('后端返回数据：', response.data)
        this.list = response.data.filter(item => {
          // console.log('过滤条件', this.queryForm)
          return (
            (!this.queryForm.name || item.name.includes(this.queryForm.name)) &&
            (!this.queryForm.consumption_time || item.consumption_time.includes(this.queryForm.consumption_time)) &&
            (!this.queryForm.promotion || item.promotion === this.queryForm.promotion)
          )
        })
        this.listLoading = false
      }).catch(error => {
        console.error('查询失败:', error)
        this.listLoading = false
      })
    },
    Reset() {
      this.queryForm.name = ''
      this.queryForm.consumption_time = ''
      this.queryForm.promotion = ''
      this.fetchData()
      this.fetchPromotionOptions()
    },
    Add() {
      this.$router.push({ path: '/consumption/add' })
    }
  }
}
</script>
<style scoped>
.add-button {
  margin-left: 50px;
}
</style>

