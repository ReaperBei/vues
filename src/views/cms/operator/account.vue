<template> 
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <span class="balance-text">余额￥ {{balanceList}}</span>
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
        <el-table-column label="总金额" align="center">
          <template slot-scope="scope">{{scope.row.total}}</template>
        </el-table-column>
         <el-table-column label="交易时间" align="center">
          <template slot-scope="scope">{{scope.row.createTime | formatDateTime}}</template>
        </el-table-column>
        <el-table-column label="交易类型" align="center">
          <template slot-scope="scope">{{scope.row.typex | formatDateType}}</template>
        </el-table-column>
        <el-table-column label="收入类型" align="center">
          <template slot-scope="scope">{{scope.row.counted | formatDateCount}}</template>
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
  import {handleAccount,handleBalance} from '@/api/operator';
  import {formatDate} from '@/utils/date';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    marketersId:null
  };
  export default {
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        list: null,
        total: null,
        listLoading: false,
        dialogVisible: false,
        balanceList:null
      }
    },
    created() {
      this.getList();
      this.handleBalance()
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
       if(value==0){
           return '股权分红'
       }else if(value==1){
           return '消费'
       }else if(value==2){
           return '提现'
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
      handleBalance(){
        handleBalance({marketersId:this.$route.query.id}).then(response => {
          this.balanceList= response.data
          console.log(this.balanceList)
        });
      },
      getList() {
        this.listLoading = true;
        Object.assign(this.listQuery,{marketersId:this.$route.query.id})
        handleAccount(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data.list;
          this.total = response.data.total;
        });
      }
    }
  }
</script>
<style scoped>
.balance-text{
  color: #3a8ee6;
  margin-left: 20px;
}
</style>
