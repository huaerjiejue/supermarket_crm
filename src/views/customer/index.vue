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
        <el-button type="primary" @click="handleQuery">查询</el-button>
        <el-button @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="listLoading"
      :data="filteredList"
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
          <el-tag :type="scope.row.levels | statusFilter">{{ scope.row.levels }}</el-tag>
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
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
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
  computed: {
    filteredList() {
      if (!this.list) return []
      return this.list.filter(item => {
        const nameMatch = !this.queryForm.name ||
          item.author.toLowerCase().includes(this.queryForm.name.toLowerCase())
        const contactMatch = !this.queryForm.contact ||
          item.tele.includes(this.queryForm.contact)
        const levelMatch = !this.queryForm.level ||
          item.levels === this.queryForm.level
        return nameMatch && contactMatch && levelMatch
      })
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
    handleQuery() {
      // 不需要重新获取数据，直接使用计算属性filteredList进行过滤
      this.listLoading = true
      setTimeout(() => {
        this.listLoading = false
      }, 200)
    },
    handleReset() {
      this.queryForm.name = ''
      this.queryForm.contact = ''
      this.queryForm.level = ''
      this.fetchData()
    }
  }
}
</script>
