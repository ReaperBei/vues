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
          <el-form-item label="输入搜索：">
            <el-input v-model.trim="listQuery.keyword" class="input-width" placeholder="请输入门店名字" clearable></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <!-- <el-button size="mini" class="btn-add" @click="handleAdd()">添加数据</el-button> -->
    </el-card>
    <div class="table-container">
      <el-table ref="homeAdvertiseTable"
                :data="list"
                style="width: 100%;"
                @selection-change="handleSelectionChange"
                v-loading="listLoading" border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column type='index' label="序号" align="center" width="80" :index='indexMethod' ></el-table-column>
        <el-table-column label="门店名字" width="180" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="门店电话" width="110" align="center">
          <template slot-scope="scope">{{scope.row.phone}}</template>
        </el-table-column>
        <el-table-column label="经营范围" align="center">
          <template slot-scope="scope">{{scope.row.businessScope}}</template>
        </el-table-column>
                <el-table-column label="审核人" align="center">
          <template slot-scope="scope">{{scope.row.auditor}}</template>
        </el-table-column>
        <el-table-column label="审核状态" width="120" align="center">
          <template slot-scope="scope">{{scope.row.auditStatus | formDataState}}</template>
        </el-table-column>
        <el-table-column label="审核原因" align="center">
          <template slot-scope="scope">{{scope.row.auditReason}}</template>
        </el-table-column>
        <el-table-column label="审核时间" align="center">
          <template slot-scope="scope">{{scope.row.auditTime | formatTime}}</template>
        </el-table-column>
        <el-table-column width="120" label="营业执照" align="center">
          <template slot-scope="scope">
            <img class="global-image" :src="scope.row.businessLicense" alt="">
          </template>
        </el-table-column>
        <el-table-column label="门店照片" width="120" align="center">
          <template slot-scope="scope"><img class="global-image" :src="scope.row.storePic"></template>
        </el-table-column>
        <el-table-column label="操作" width="160" align="center">
          <template slot-scope="scope">
            <el-row>
                <el-button size="mini"
                        type="text"
                        :disabled="scope.row.auditStatus | disableStatus"
                       @click="handleAudit(scope.$index, scope.row)">审核
                </el-button>
                <el-button size="mini"
                            type="text"
                          @click="handleMessage(scope.$index, scope.row)">查看
                </el-button>
            </el-row>
            <el-row>
                <el-button size="mini"
                      type="text"
                       @click="handleUpdate(scope.$index, scope.row)">编辑
                </el-button>
                <el-button size="mini"
                          type="text"
                          @click="handleDelete(scope.$index, scope.row)">删除
                </el-button>
            </el-row>
            <el-row>
                <el-button size="mini"
                      type="text"
                       @click="handleIntegral(scope.row.id)">积分明细
                </el-button>
                <el-button size="mini"
                          type="text"
                          @click="handleOrder(scope.row)">订单列表
                </el-button>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="batch-operate-container">
      <el-select
        size="small"
        v-model="operateType" placeholder="批量操作">
        <el-option
          v-for="item in operates"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button
        style="margin-left: 20px"
        class="search-button"
        @click="handleBatchOperate()"
        type="primary"
        size="small">
        确定
      </el-button>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :page-size="listQuery.pageSize"
        :page-sizes="[10,15,20]"
        :current-page.sync="listQuery.pageNum"
        :total="total">
      </el-pagination>
    </div>
    <el-dialog
      :visible.sync="dialogVisibleis"
      width="40%">
      <el-form :model="listAudit"
               ref="roleFormis"
               :rules="rules"
               label-width="150px" size="small">
        <el-form-item prop="auditStatus" label="审核：">
          <el-radio-group v-model="listAudit.auditStatus">
            <el-radio :label="1">审核通过</el-radio>
            <el-radio :label="2">未审不通过</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="detail" label="审核意见：">
          <el-input v-model="listAudit.detail"
                    type="textarea"
                    :rows="5"
                    style="width: 250px"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleis = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleEditAudit('roleFormis')" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import {fetchList,deleteHomeAdvertise,deleteRole,handleShowAudit} from '@/api/shop';
  import {formatDate} from '@/utils/date';
  import awayHintForm from "@/utils/hintForm"
  const defaultListQuery = {
    keyword: null,
    pageNum: 1,
    pageSize: 10
  };
  const defaultListAudit = {
    auditStatus:1,
    detail:null,
    id:null
  };
  export default {
    name: 'homeAdvertiseList',
    data() {
       var checkAge = (rule, value, callback) => {
        if (value==0) {
          return callback(new Error('请选择审核'));
        }else {
          callback();
        }
      };
      return {
        listQuery: Object.assign({}, defaultListQuery),
        listAudit:Object.assign({},defaultListAudit),
        list: null,
        total: null,
        listLoading: false,
        dialogVisibleis:false,
        multipleSelection: [],
        operates: [
          {
            label: "删除",
            value: 0
          }
        ],
        rules:{
            auditStatus:[{ required: true,validator: checkAge, trigger: 'blur'}],
            detail:[{ required: true,message: '请输入备注', trigger: 'blur'}]
        },
        operateType: null
      }
    },
    created() {
      this.getList();
    },
    filters:{
      formatTime(time){
        if(time==null||time===''){
          return '';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      },
      formDataState(time){
        if(time==0){
          return '未审核'
        }else if(time==1){
          return '审核通过'
        }else{
          return '审核未通过'
        }
      },
      disableStatus(value){
        if(value==1){
          return true
        }else{
          return false
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
      handleSelectionChange(val){
        this.multipleSelection = val;
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
      handleDelete(index,row){
        this.$confirm('是否要删除该条数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let ids = [];
          ids.push(row.id)
          let params=new URLSearchParams();
          params.append("id",ids);
          deleteRole(params).then(response=>{
            this.getList();
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          });
        })
      },
      handleBatchOperate(){
        if (this.multipleSelection < 1) {
          this.$message({
            message: '请选择一条记录',
            type: 'warning',
            duration: 1000
          });
          return;
        }
        let ids = [];
        for (let i = 0; i < this.multipleSelection.length; i++) {
          ids.push(this.multipleSelection[i].id);
        }
        if(this.operateType===0){
          //删除
          this.deleteHomeAdvertise(ids);
        }else {
          this.$message({
            message: '请选择批量操作类型',
            type: 'warning',
            duration: 1000
          });
        }
      },
      handleAudit(index,row){
        awayHintForm(this.$refs.roleFormis)
        this.dialogVisibleis = true
        this.listAudit.id = row.id
      },
      handleEditAudit(formName){
           this.$refs[formName].validate((valid) =>{
              if(valid){
                handleShowAudit(this.listAudit.id,this.listAudit).then(response => {
                  this.$message({
                    message: '审核成功',
                    type: 'success'
                  });
                    this.dialogVisibleis =false;
                    this.getList();
                })
              }
            })
      },
      handleMessage(index,row){
        this.$router.push({path: '/cms/shopMessage', query: {id: row.id}})
      },
      handleUpdate(index,row){
        this.$router.push({path: '/cms/redactShop', query: {id: row.id}})
      },
      handleIntegral(row){
        this.$router.push({path: '/cms/integralDetail', query: {id: row}})
      },
      handleOrder(row){
        this.$router.push({path: '/cms/shopOrder', query: {storeSn: row.storeSn}})
      },
      getList() {
        this.listLoading = true;
        fetchList(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data.list;
          this.total = response.data.total;
        })
      },
      deleteHomeAdvertise(ids){
        this.$confirm('是否要删除该条数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params=new URLSearchParams();
          params.append("id",ids);
          deleteHomeAdvertise(params).then(response=>{
            this.getList();
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          });
        })
      }
    }
  }
</script>
<style>
</style>
