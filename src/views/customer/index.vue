<template>
  <div class="app-container">
    <h2 class="title">客户信息管理</h2>
    <el-form :inline="true" :model="queryForm" class="query-form">
      <el-form-item label="姓名">
        <el-input v-model="queryForm.name" placeholder="输入姓名" />
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input v-model="queryForm.contact" placeholder="请输入联系方式" />
      </el-form-item>
      <el-form-item label="等级">
        <el-select v-model="queryForm.level" placeholder="选择等级" clearable>
          <el-option label="普通会员" value="普通会员" />
          <el-option label="白银会员" value="白银会员" />
          <el-option label="黄金会员" value="黄金会员" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="Query">查询</el-button>
        <el-button @click="Reset">重置</el-button>
        <el-button type="success" class="add-button" @click="Add">添加用户</el-button>
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
          {{ scope.row.author }}
        </template>
      </el-table-column>
      <el-table-column label="联系方式" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.tele }}</span>
        </template>
      </el-table-column>
      <el-table-column label="消费总额" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.cost }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="等级" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="$options.filters.levelFilter(scope.row.level)">{{ scope.row.level }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="注册日期" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/customer'

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
        contact: '',
        level: ''
      },
      list: null,
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
        const response = await getList()
        this.list = response.data.items
      } catch (error) {
        console.error('获取数据失败:', error)
      } finally {
        this.listLoading = false
      }
    },
    Query() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items.filter(item => {
          return (
            (!this.queryForm.name || item.author.includes(this.queryForm.name)) &&
            (!this.queryForm.contact || item.tele.includes(this.queryForm.contact)) &&
            (!this.queryForm.level || item.level === this.queryForm.level)
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
      this.queryForm.contact = ''
      this.queryForm.level = ''
      this.fetchData()
    },
    Add() {
      this.$router.push({ path: '/customer/add' })
    }
  }
}
</script>
<style scoped>
.add-button {
  margin-left: 50px;
}
</style>
