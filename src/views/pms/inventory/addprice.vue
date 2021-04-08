<template> 
  <div class="app-container">
    <el-button type="primary">
        <span v-on:click="back">返回</span>
    </el-button>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button
          class="btn-add"
          @click="handleAdd()"
          size="mini">
          添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="roleTable"
                :data="list"
                style="width: 100%;"
                v-loading="listLoading" border>
        <el-table-column type='index' label="序号" align="center" width="80" :index='indexMethod' ></el-table-column>
        <el-table-column label="库存" width="80" align="center">
          <template slot-scope="scope">{{scope.row.pmsSkuStockAudit.stock}}</template>
        </el-table-column>
        <el-table-column label="审核状态" align="center">
          <template slot-scope="scope">{{scope.row.pmsSkuStockAudit.auditStatus | verifyStatusFilter}}</template>
        </el-table-column>
        <el-table-column label="审核人" width="80" align="center">
          <template slot-scope="scope">{{scope.row.pmsSkuStockAudit.auditor}}</template>
        </el-table-column>
        <el-table-column label="审核时间" align="center">
          <template slot-scope="scope">{{scope.row.pmsSkuStockAudit.auditedTime | formatDateTime}}</template>
        </el-table-column>
        <el-table-column label="创建人" align="center">
          <template slot-scope="scope">{{scope.row.pmsSkuStockAudit.createdBy}}</template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template slot-scope="scope">{{scope.row.pmsSkuStockAudit.createdTime |formatDateTime}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-row>
                <el-button size="mini"
                      type="text"
                      :disabled="scope.row.pmsSkuStockAudit.auditStatus | formAuditStatus"
                      @click="handleShowAudit(scope.row.pmsSkuStockAudit)">
                      审核
                </el-button>
                <el-button size="mini"
                       type="text"
                       :disabled="scope.row.pmsSkuStockAudit.auditStatus | formAuditStatus"
                       @click="handleDelete(scope.row.pmsSkuStockAudit)">删除
                </el-button>
                </el-row>
          </template>
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
    <el-dialog
      :title="isEdit?'审核':'添加'"
      :visible.sync="dialogVisibleis"
      width="40%">
      <el-form
            :model="addData"
            :rules="rules"
            ref="roleFormis"
            label-width="150px" size="small">
        <el-form-item prop="verifyStatus" v-if="showStatus" label="审核：">
          <el-radio-group v-model="addData.auditStatus">
            <el-radio :label="1">审核通过</el-radio>
            <el-radio :label="2">审核不通过</el-radio>
          </el-radio-group>
        </el-form-item>
         <el-form-item prop="note" v-if="showStatus" label="审核意见：">
          <el-input v-model="addData.note" style="width: 250px"
            type="textarea"
            :rows="5">
          </el-input>
        </el-form-item>
         <el-form-item prop="stock" v-if="showInput" label="商品库存：">
          <el-input v-model="addData.stock" style="width: 250px"></el-input>
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
  import SingleUpload from '@/components/Upload/upload'
  import {handleInventory,createRole,handleEditAuditData,deleteRole} from '@/api/inventory';
  import {formatDate} from '@/utils/date';
  import regular from "@/utils/regular";
  import awayHintForm from "@/utils/hintForm"
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    skuStockCode:null
  };
  const defaultUpdata = {
      auditedTime: null,
      auditor: null,
      createdBy: null,
      createdTime: null,
      deleted: null,
      id: null,
      skuCode:null,
      note:null,
      auditStatus:1,
      stock:null
  };
  export default {
    name: 'roleList',
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        list: null,
        total: null,
        isEdit: false,
        skuStockCode:null,
        dialogVisibleis:false,
        showStatus:false,
        showInput:false,
        addData:Object.assign({}, defaultUpdata),
        rules:{
            stock:[{ required: true, validator:regular.FormValidate.Form().valiminPoint, trigger: 'blur'}]
        }
      }
    },
    created() {
        this.listQuery.skuStockCode = this.$route.query.skuCode
        this.skuStockCode = this.$route.query.skuCode
        this.getList();
    },
    components:{
        SingleUpload
    },
    filters: {
      formatDateTime(time) {
        if (time == null || time === '') {
          return '';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      },
      verifyStatusFilter(value) {
        if (value === 0) {
          return '未审核';
        } else if(value ==1) {
          return '审核通过';
        }else{
          return '审核不通过';
        }
      },
      formAuditStatus(value) {
        if (value === 1) {
          return true;
        } else {
          return false;
        }
      }
    },
    methods: {
      back(){
          this.$router.go(-1);//返回上一层
      },
      indexMethod (index) {
        let curpage = this.listQuery.pageNum
        let limitpage = this.listQuery.pageSize
        return (index+1) + (curpage-1)*limitpage
      },
      handleDelete(row) {
        this.$confirm('是否要删除该数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params=new URLSearchParams();
          params.append("id",row.id);
          deleteRole(row.id,params).then(response => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getList();
          });
        });
      },
      handleShowAudit(row) {
        this.dialogVisibleis = true;
        this.showInput = false;
        awayHintForm(this.$refs.roleFormis)
        this.showStatus =true;
        this.isEdit= true;
        this.addData.id = row.id
      },
      handleAdd() {
        this.isEdit= false;
        awayHintForm(this.$refs.roleFormis)
        this.dialogVisibleis = true;
        this.showInput = true;
        this.showStatus =false;
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
      handleEditAudit(formName){
         if (this.isEdit) {
            this.$refs[formName].validate((valid) =>{
              if(valid){
                let params = new URLSearchParams()
                params.append('auditStatus',this.addData.auditStatus)
                params.append('id',this.addData.id)
                handleEditAuditData(this.addData.id,params).then(response => {
                  this.$message({
                    message: '审核成功！',
                    type: 'success'
                  });
                  this.dialogVisibleis =false;
                  this.getList();
                })
              }
            })
         }else {
           this.$refs[formName].validate((valid) =>{
               if(valid){
                let data = Object.assign(this.addData,{skuCode:this.skuStockCode})
                createRole(data).then(response => {
                  this.$message({
                    message: '添加成功！',
                    type: 'success'
                  });
                  this.dialogVisibleis =false;
                  this.getList();
                });
               }
             })
         }
      },
      getList() {
        this.listLoading = true;
        let lists = Object.assign(this.listQuery,{skuStockCode:this.skuStockCode})
        handleInventory(lists).then(response => {
          this.listLoading = false;
          this.list = response.data.list;
          this.total = response.data.total;
        });
      }
    }
  }
</script>
<style></style>
