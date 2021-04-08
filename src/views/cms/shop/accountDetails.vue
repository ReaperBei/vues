<template> 
  <div class="app-container">
    <!-- <el-card class="filter-container" shadow="never">
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
          <el-form-item label="输入搜索：">
            <el-input v-model.trim="listQuery.keyword" class="input-width" placeholder="请输入营销中心/电话号码" clearable></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card> -->
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <!-- <el-button size="mini" class="btn-add" @click="handleAdd()" style="margin-left: 20px">添加</el-button> -->
    </el-card>
    <div class="table-container">
      <el-table ref="roleTable"
                :data="list"
                style="width: 100%;"
                v-loading="listLoading" border>
        <el-table-column type='index' label="序号" align="center" width="80" :index='indexMethod' ></el-table-column>
        <el-table-column label="流水号" align="center">
          <template slot-scope="scope">{{scope.row.serialNumber}}</template>
        </el-table-column>
        <el-table-column label="本次交易金额" align="center">
          <template slot-scope="scope">{{scope.row.money}}</template>
        </el-table-column>
        <el-table-column label="流水号" align="center">
          <template slot-scope="scope">{{scope.row.serialNumber}}</template>
        </el-table-column>
        <el-table-column label="金额" align="center">
          <template slot-scope="scope">{{scope.row.total}}</template>
        </el-table-column>
        <el-table-column label="交易类型" align="center">
          <template slot-scope="scope">{{scope.row.type | formatDateType}}</template>
        </el-table-column>
        <el-table-column label="收入类型" align="center">
          <template slot-scope="scope">{{scope.row.count | formatDateCount}}</template>
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
  import {hanaleLook} from '@/api/shop';
  import {formatDate} from '@/utils/date';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10
  };
  export default {
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        list: null,
        total: null,
        dialogVisible: false,
      }
    },
    created() {
      this.getList();
    },
    filters: {
      formatDateTime(time) {
        if (time == null || time === '') {
          return '';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      },
      formatDateType(value) {
       if(value==1){
           return '入账'
       }else if(value==2){
           return '体现'
       }
      },
      formatDateCount(value) {
        if(value==1){
           return '收入'
       }else if(value==2){
           return '支出'
       }
      },
    },
    methods: {
      indexMethod (index) {
        let curpage = this.listQuery.pageNum
        let limitpage = this.listQuery.pageSize
        return (index+1) + (curpage-1)*limitpage
      },
      selected(data) {
        for(var obj in data) {
          this.role[obj] = data[obj].value
        }
      },
      handleResetSearch() {
        this.listQuery = Object.assign({}, defaultListQuery);
      },
      handleSearchList() {
        this.listQuery.pageNum = 1;
        this.getList();
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
        Object.assign(this.listQuery,{storeId:this.$route.query.id})
        hanaleLook(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data.list; 
          this.total = response.data.total;
        });
      }
    }
  }
</script>
<style></style>
