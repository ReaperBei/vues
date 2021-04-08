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
        <el-table-column label="订单号" align="center">
          <template slot-scope="scope">{{scope.row.seq}}</template>
        </el-table-column>
        <el-table-column label="积分改变数量" align="center">
          <template slot-scope="scope">{{scope.row.changeCount}}</template>
        </el-table-column>
        <el-table-column label="操作人员" align="center">
          <template slot-scope="scope">{{scope.row.operateMan}}</template>
        </el-table-column>
        <el-table-column label="操作备注" align="center">
          <template slot-scope="scope">{{scope.row.operateNote}}</template>
        </el-table-column>
         <el-table-column label="创建时间" align="center">
          <template slot-scope="scope">{{scope.row.createTime | formatDateTime}}</template>
        </el-table-column>
        <el-table-column label="积分来源" align="center">
          <template slot-scope="scope">{{scope.row.sourceType | formatDateType}}</template>
        </el-table-column>
        <el-table-column label="改变类型" align="center">
          <template slot-scope="scope">{{scope.row.changeType | formatDateCount}}</template>
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
  import {handleIntegral} from '@/api/shop';
  import {formatDate} from '@/utils/date';
  import VDistpicker from '@/components/VdIstpicker/index';
  import regular from "@/utils/regular";
  import awayHintForm from "@/utils/hintForm"
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    storeId:null
  };
  const defaultRole = {
    id:null,
    province:null,
    city: null,
    area:null,
    name: null,
    head:null,
    phone:null,
    address:null
  };
  export default {
    name: 'roleList',
    model: {
      prop: 'caddress',
      event: 'change',
    },
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        list: null,
        total: null,
        listLoading: false,
        dialogVisible: false,
        isEdit:false,
        cityName:null,
        cityList:[],
        areaList:[]
      }
    },
    components:{
      VDistpicker
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
       if(value==0){
           return '购物'
       }else if(value==1){
           return '管理员修改'
       }
      },
      formatDateCount(value) {
        if(value==0){
           return '增加'
       }else if(value==1){
           return '减少'
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
        handleIntegral(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data.list;
          this.total = response.data.total;
        });
      }
    }
  }
</script>
<style></style>
