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
            <el-input v-model.trim="listQuery.keyword" class="input-width" placeholder="请输入名称" clearable></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button size="mini" class="btn-add" @click="handleAdd()" style="margin-left: 20px">添加</el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="roleTable"
                :data="list"
                style="width: 100%;"
                tooltip-effect="dark"
                @selection-change="handleSelectionChange"
                v-loading="listLoading" border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column type='index' label="序号" align="center" width="80" :index='indexMethod' ></el-table-column>
        <el-table-column label="基地名称" width="160" align="center">
          <template slot-scope="scope">{{scope.row.baseName}}</template>
        </el-table-column>
        <el-table-column label="审核原因" align="center">
          <template slot-scope="scope">{{scope.row.auditReason}}</template>
        </el-table-column>
        <el-table-column label="审核状态" align="center">
          <template slot-scope="scope">{{scope.row.auditStatus | formDataState}}</template>
        </el-table-column>
        <el-table-column label="审核人" align="center">
          <template slot-scope="scope">{{scope.row.auditor}}</template>
        </el-table-column>
        <el-table-column label="基地联系人" align="center">
          <template slot-scope="scope">{{scope.row.baseContact}}</template>
        </el-table-column>
         <el-table-column label="基地电话" align="center">
          <template slot-scope="scope">{{scope.row.basePhone}}</template>
        </el-table-column>
         <el-table-column label="基地照片" width="120" align="center">
          <template slot-scope="scope">
            <img class="global-image" :src="scope.row.basePic" alt="">
          </template>
        </el-table-column>
         <el-table-column label="基地编码" align="center">
          <template slot-scope="scope">{{scope.row.baseSn}}</template>
        </el-table-column>
         <el-table-column label="主要产品" align="center">
          <template slot-scope="scope">{{scope.row.mainProducts}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-row>
              <el-button size="mini"
                        type="text"
                        @click="handleMessage(scope.$index, scope.row)">
                查看
              </el-button>
              <el-button size="mini"
                        type="text"
                        @click="handleUpdate(scope.$index, scope.row)">
                编辑
              </el-button>
              <el-button size="mini"
                        type="text"
                        @click="handleDelete(scope.$index, scope.row)">删除
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
        :current-page.sync="listQuery.pageNum"
        :page-size="listQuery.pageSize"
        :page-sizes="[10,15,20]"
        :total="total">
      </el-pagination>
    </div>
    <el-dialog
      :title="isEdit?'编辑内容':'添加数据'"
      :visible.sync="dialogVisible"
      width="40%">
      <el-form :model="role"
              :rules='rules'
               ref="roleForm"
               label-width="150px" size="small">
        <el-form-item prop="baseName" label="基地名称：">
          <el-input v-model="role.baseName" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item prop="baseContact" label="基地联系人：">
          <el-input v-model="role.baseContact" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item prop="basePhone" label="基地电话：">
          <el-input v-model="role.basePhone" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="基地账号：" prop="userName">
        <el-input v-model="role.userName" style="width: 250px" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="基地密码：" prop="password">
        <el-input type="password" class="input-width" style="width: 250px" v-model="role.password">
        </el-input>
      </el-form-item>
      <el-form-item label="基地照片：">
          <SingleUpload v-if="dialogVisible" :list="isEdit?[role.basePic]:[]" :limit="1" :type="4003" v-model="role.basePic" />
      </el-form-item>
        <el-form-item prop="mainProducts" label="主要产品：">
          <el-input v-model="role.mainProducts" style="width: 250px" type="textarea" :rows="3"></el-input>
        </el-form-item>
        <el-form-item label="基地介绍：">
          <el-input v-model="role.baseIntroduction"
                    type="textarea"
                    :rows="5"
                    style="width: 250px"
                    ></el-input>
        </el-form-item>
        <el-form-item prop="area" label="所在地区：">
          <VDistpicker v-model="defultAddress"></VDistpicker>
        </el-form-item>
        <el-form-item prop="address" label="地址：">
          <el-input v-model="role.address" style="width: 250px"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm('roleForm')" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import {fetchList,createRole,deleteRole,updateRole,deleteHomeAdvertise} from '@/api/base';
  import {formatDate} from '@/utils/date';
  import SingleUpload from '@/components/Upload/upload'
  import VDistpicker from '@/components/VdIstpicker/index';
  import regular from "@/utils/regular";
  import awayHintForm from "@/utils/hintForm"
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    keyword:null
  };
  const defaultRole = {
    	address: "",
      area: "",
      areaNo: 0,
      auditReason: "",
      auditStatus: 0,
      auditTime: "",
      auditor: "",
      baseContact: "",
      baseIntroduction: "",
      baseName: "",
      basePhone: "",
      basePic: "",
      baseSn: "",
      city: "",
      createdBy: "",
      createdTime: "",
      id: "",
      lat: 0,
      lon: 0,
      mainProducts: "",
      note: "",
      password: "",
      province: "",
      recommender: "",
      state: 1,
      updatedBy: "",
      updatedTime: "",
      userName: ""
  };
  export default {
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        list: null,
        total: null,
        listLoading: false,
        dialogVisible: false,
        role: Object.assign({}, defaultRole),
        isEdit: false,
        defultAddress:{
            province:null,
            city: null,
            area:null,
        },
        operates: [
          {
            label: "删除",
            value: 0
          }
        ],
        operateType:null,
        multipleSelection: [],
        rules:{
            address:[{ required: true, message: '请输入地址', trigger: 'blur'}],
            area:[{ required: true, message: '请选择地区', trigger:["blur",'change']}],
            baseContact:[{ required: true, validator:regular.FormValidate.Form().validateContacts, trigger: 'blur'}],
            baseName:[{ required: true,validator:regular.FormValidate.Form().validateCharacter, trigger: 'blur'}],
            basePhone:[{ required: true, validator:regular.FormValidate.Form().validatePhone, trigger: "blur" }],
            mainProducts:[{ required: true, message: '请输入主要产品', trigger: 'blur'}],
            userName:[{required: true,validator:regular.FormValidate.Form().validatePhone, trigger: 'blur'}],
            password:[{required: true,validator:regular.FormValidate.Form().validatePsdReg, trigger: 'blur'}]
        }
      }
    },
    components:{
      VDistpicker,
      SingleUpload
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
      formDataState(time){
        if(time==1){
          return '未审核'
        }else if(time==2){
          return '审核通过'
        }else{
          return '审核未通过'
        }
      }
    },
    methods: {
      indexMethod (index) {
        let curpage = this.listQuery.pageNum
        let limitpage = this.listQuery.pageSize
        return (index+1) + (curpage-1)*limitpage
      },
      handleSelectionChange(val){
        this.multipleSelection = val;
      },
      handleMessage(index,row){
        this.$router.push({path: '/cms/baseMessage', query: {id: row.id}})
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
      handleAdd() {
        this.dialogVisible = true;
        awayHintForm(this.$refs.roleForm)
        this.isEdit = false;
        this.role = Object.assign(this.defultAddress,defaultRole);
      },
      handleDelete(index, row) {
        this.$confirm('是否要删除该数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let ids = [];
          ids.push(row.id);
          let params=new URLSearchParams();
          params.append("id",ids);
          deleteRole(params).then(response => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getList();
          });
        });
      },
      handleUpdate(index, row) {
        this.dialogVisible = true;
        awayHintForm(this.$refs.roleForm)
        this.isEdit = true;
        this.role = Object.assign(this.defultAddress,row)
        this.role.state = 1;
        console.log(this.role)
      },
      handleDialogConfirm(formName) {
          if (this.isEdit) {
            this.$refs[formName].validate((valid) =>{
              if(valid){
                if(typeof(this.role.basePic)!=='string'){
                  this.role.basePic = this.role.basePic[0]
                }
                updateRole(this.role.id,this.role).then(response => {
                  this.$message({
                    message: '修改成功！',
                    type: 'success'
                  });
                  this.dialogVisible =false;
                  this.getList();
                })
              }
            })
          } else {
             this.$refs[formName].validate((valid) =>{
              if(typeof(this.role.basePic)!=='string'){
                  this.role.basePic = this.role.basePic[0]
                }
               if(valid){
                  createRole(this.role).then(response => {
                  this.$message({
                    message: '添加成功！',
                    type: 'success'
                  });
                  this.dialogVisible =false;
                  this.getList();
                });
               }
             })
          }
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
      },
      getList() {
        this.listLoading = true;
        fetchList(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data.list;
          this.total = response.data.total
        });
      }
    }
  }
</script>
<style>
</style>
