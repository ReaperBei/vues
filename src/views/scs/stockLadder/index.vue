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
          <el-form-item label="请输入业务号：">
            <el-input v-model.trim="listQuery.issueNumber" clearable class="input-width" placeholder="业务号"></el-input>
          </el-form-item>
          <el-form-item label="请输入发行号：">
            <el-input v-model.trim="listQuery.orderSn" clearable class="input-width" placeholder="发行号"></el-input>
          </el-form-item>
          <el-form-item label="请输入会员ID：">
            <el-input v-model.trim="listQuery.memberId" clearable class="input-width" placeholder="会员ID"></el-input>
          </el-form-item>
          <el-form-item label="输入当前第几阶梯：">
            <el-input v-model.trim="listQuery.orderSn" clearable class="input-width" placeholder="当前第几阶梯"></el-input>
          </el-form-item>
          <el-form-item label="数据状态：">
            <el-select v-model="listQuery.status" class="input-width" placeholder="全部" clearable>
              <el-option v-for="item in statusOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <!-- <el-button size="mini" class="btn-add" @click="handleAdd()" style="margin-left: 20px">发行股权</el-button> -->
    </el-card>
    <div class="table-container">
      <el-table ref="adminTable"
                :data="list"
                style="width: 100%;"
                v-loading="listLoading" border>
        <el-table-column type='index' label="序号" align="center" width="80" :index='indexMethod' ></el-table-column>
         <el-table-column label="业务号" width="200" align="center">
          <template slot-scope="scope">{{scope.row.conversionId}}</template>
        </el-table-column>
        <el-table-column label="会员ID" width="160" align="center">
          <template slot-scope="scope">{{scope.row.memberId}}</template>
        </el-table-column>
        <el-table-column label="交易股权" width="140" align="center">
          <template slot-scope="scope">{{scope.row.equityTradingNumber}}</template>
        </el-table-column>
        <el-table-column label="支付积分" width="160" align="center">
          <template slot-scope="scope">{{scope.row.payNumber}}</template>
        </el-table-column>
        <el-table-column label="第几阶梯" width="160" align="center">
          <template slot-scope="scope">{{scope.row.ladderNumber}}</template>
        </el-table-column>
        <el-table-column label="数据状态" width="160" align="center">
          <template slot-scope="scope">{{scope.row.state | formatDateState}}</template>
        </el-table-column>
         <el-table-column label="发行号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.issueNumber}}</template>
        </el-table-column>
         <el-table-column label="本轮发行总股权数" width="160" align="center">
          <template slot-scope="scope">{{scope.row.wheelIssueEquityNumber}}</template>
        </el-table-column>
        <el-table-column label="本轮已售卖总股数" width="160" align="center">
          <template slot-scope="scope">{{scope.row.wheelSellingNumber}}</template>
        </el-table-column>
        <el-table-column label="创建时间" width="160" align="center">
          <template slot-scope="scope">{{scope.row.createTime | formatDateTime}}</template>
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
  import {fetchList} from '@/api/stockLadder';
  import {formatDate} from '@/utils/date';
  import regular from "@/utils/regular";
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    issueNumber:null,
    memberId:null
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
            label: '确认交易',
            value: 1
          },
          {
            label: '已提现',
            value: 2
          },
          {
            label: '已经核账',
            value: 3
          },
          {
            label: '准备分红',
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
      formatDateState(item){
        if(item==1){
          return '确认交易'
        }else if(item==2){
          return '已提现'
        }else if(item==3){
           return '已经核账'
        }else if(item==4){
          return '待兑现'
        }
      }
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
.input-width{
  width: 203px;
}
</style>
