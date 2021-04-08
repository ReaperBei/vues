<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float:right"
          type="primary"
          @click="handleSearchList()"
          size="small">
          查询搜索
        </el-button>
        <el-button
          style="float:right;margin-right: 15px"
          @click="handleResetSearch()"
          size="small">
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="请输入会员ID：">
            <el-input v-model.trim="listQuery.memberId" clearable class="input-width" placeholder="会员ID"></el-input>
          </el-form-item>
          <el-form-item label="请输入流水号：">
            <el-input v-model.trim="listQuery.recordId" clearable class="input-width" placeholder="流水号"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
    </el-card>
    <div class="table-container">
      <el-table ref="adminTable"
                :data="list"
                style="width: 100%;"
                v-loading="listLoading" border>
        <el-table-column type='index' label="序号" align="center" width="80" :index='indexMethod' ></el-table-column>
        <el-table-column label="流水号" align="center">
          <template slot-scope="scope">{{scope.row.recordId}}</template>
        </el-table-column>
        <el-table-column label="分红金额" align="center">
          <template slot-scope="scope">{{scope.row.dividendMoney}}</template>
        </el-table-column>
         <el-table-column label="会员ID" align="center">
          <template slot-scope="scope">{{scope.row.memberId}}</template>
        </el-table-column>
         <el-table-column label="本次分红总金额" align="center">
          <template slot-scope="scope">{{scope.row.sumDividendMoney}}</template>
        </el-table-column>
                <el-table-column label="创建人" align="center">
          <template slot-scope="scope">{{scope.row.createdBy}}</template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template slot-scope="scope">{{scope.row.createdTime}}</template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :current-page.sync="listQuery.pageNum"
        :page-size="listQuery.pageSize"
        :page-sizes="[10,15,20]"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import {fetchList,createRole} from '@/api/memberEquity';
  import {formatDate} from '@/utils/date';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    memberId:null,
    recordId:null
  };
  export default {
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        list: null,
        total: null,
        listLoading: false,
        statusOptions: [
          {
            label: '开始分红',
            value: 1
          },
          {
            label: '分红成功到账',
            value: 2
          },
          {
            label: '已核账',
            value: 3
          },
          {
            label: '分红错误',
            value: 4
          },
        ],
      }
    },
    created() {
      this.getList();
    },
    filters: {
      formatDateTime(time) {
        if (time == null || time === '') {
          return ' ';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      },
    },
    methods: {
      indexMethod (index) {
        let curpage = this.listQuery.pageNum
        let limitpage = this.listQuery.pageSize
        return (index+1) + (curpage-1)*limitpage
      },
      handleSearchList() {
        this.listQuery.pageNum = 1;
        this.getList();
      },
      handleResetSearch() {
        this.listQuery = Object.assign({}, defaultListQuery);
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.getList();
      },
      getList() {
        this.listLoading = true;
        fetchList(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data.list;
          this.total = response.data.total;
        });
      }
    }
  }
</script>
<style scoped>
</style>
