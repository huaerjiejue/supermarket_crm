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
      <el-form-item label="促销活动">
        <el-input v-model="queryForm.promotion" placeholder="输入促销活动" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQuery">查询</el-button>
        <el-button @click="handleReset">重置</el-button>
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
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
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
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/consumption'

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
      listLoading: true
    }
  },
  created() {
    console.log('created')
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.listLoading = true
      try {
        const response = await getList()
        this.list = response.data.items
      } catch (error) {
        console.error('获取数据失败:', error)
      } finally {
        this.listLoading = false
      }
    },
    handleQuery() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items.filter(item => {
          return (
            (!this.queryForm.name || item.name.includes(this.queryForm.name)) &&
            (!this.queryForm.consumption_time || item.consumption_time.includes(this.queryForm.consumption_time)) &&
            (!this.queryForm.promotion || item.promotion.includes(this.queryForm.promotion))
          )
        })
        this.listLoading = false
      }).catch(error => {
        console.error('查询失败:', error)
        this.listLoading = false
      })
    },
    handleReset() {
      this.queryForm.name = ''
      this.queryForm.consumption_time = ''
      this.queryForm.promotion = ''
      this.fetchData()
    }
  }
}
</script>
