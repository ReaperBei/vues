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
          <el-form-item label="请输入姓名：">
            <el-input v-model.trim="listQuery.keyword" class="input-width" placeholder="请输入姓名" clearable></el-input>
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
      <el-table :data="list"
                style="width: 100%;"
                v-loading="listLoading" border>
        <el-table-column type='index' label="序号" align="center" width="80" :index='indexMethod' ></el-table-column>
        <el-table-column label="真实姓名" width="160" align="center">
          <template slot-scope="scope">{{scope.row.username}}</template>
        </el-table-column>
        <el-table-column label="性别" width="80" align="center">
          <template slot-scope="scope">
            {{scope.row.gender | judgeGender}}
          </template>
        </el-table-column>
        <el-table-column label="名额" width="120" align="center">
          <template slot-scope="scope">{{scope.row.places}}</template>
        </el-table-column>
        <el-table-column label="手机号码" align="center">
          <template slot-scope="scope">{{scope.row.phone}}</template>
        </el-table-column>
        <el-table-column label="归属营销者" align="center">
          <template slot-scope="scope">
            <div v-for="(item,index) in categoryOptions" :key="index">
              {{scope.row.attribution===item.id?item.label:null}}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="注册时间" width="160" align="center">
          <template slot-scope="scope">{{scope.row.createTime| formatDateTime}}</template>
        </el-table-column>
        <el-table-column label="操作" width="160" align="center">
          <template slot-scope="scope">
            <el-row>
              <el-button size="mini"
                        type="text"
                        @click="handleUpdate(scope.$index, scope.row)">
                编辑
              </el-button>
              <el-button size="mini"
                        type="text"
                        @click="handleDelete(scope.row.id)">删除
              </el-button>
            </el-row>
            <el-row>
              <el-button size="mini"
                        type="text"
                        @click="handleAccount(scope.row.id)">
                账户明细
              </el-button>
              <el-button size="mini"
                        type="text"
                        @click="handleIntegralDetail(scope.row.id)">积分明细
              </el-button>
            </el-row>
            <el-row>
              <el-button size="mini"
                        type="text"
                        @click="handleCopies(scope.row.id)">
                份数记录
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
      :title="isEdit?'编辑内容':'添加内容'"
      :visible.sync="dialogVisible"
      width="40%">
      <el-form 
              :model="role"
               ref="roleForm"
               :rules="rules"
               label-width="150px" size="small">
        <el-form-item prop="username" label="真实姓名：">
          <el-input v-model="role.username" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item prop="phone" label="手机号码：">
          <el-input v-model="role.phone" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item prop="attribution" label="归属运营中心：">
           <el-select v-model="role.attribution" style="width: 250px" placeholder="全部" clearable class="input-width">
              <el-option v-for="(item,index) in categoryOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.id">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item prop="places" label="运营者占用份数：">
          <el-select v-model="role.places" style="width: 250px" placeholder="全部" clearable class="input-width">
              <el-option v-for="(item,index) in placesList"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
        </el-form-item>
         <el-form-item prop="gender" label="性别：">
            <el-radio-group v-model="role.gender">
                <el-radio :label="1">男</el-radio>
                <el-radio :label="2">女</el-radio>
            </el-radio-group>
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
  // createRole,updateRole,updateStatus,deleteRole
  import upload from '@/components/Upload/upload'
  import {fetchList,createRole,deleteRole,updateRole,handelDatacode} from '@/api/operator';
  import {formatDate} from '@/utils/date';
  import regular from "@/utils/regular";
   import awayHintForm from "@/utils/hintForm"
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    keyword:null
  };
  const defaultRole = {
    attribution: null,
    gender: null,
    phone: null,
    username: null,
    places:null
  };
  export default {
    name: 'roleList',
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        list: null,
        total: null,
        isEdit:false,
        categoryOptions:[],
        listLoading: false,
        dialogVisible: false,
        role: Object.assign({}, defaultRole),
        icon:"el-input__icon el-icon-view",
        rules:{
            nickname:[{ required: true, message: '请输入昵称', trigger: 'blur'}],
            phone:[{ required: true, validator:regular.FormValidate.Form().validatePhone, trigger: 'blur'}],
            username:[{ required: true,validator:regular.FormValidate.Form().validateContacts, trigger: 'blur'}],
            attribution:[{ required: true,message: '请输入归属运营中心',trigger: ["blur",'change']}],
            places:[{ required: true,message: '请选择运营者占用份数', trigger: ['blur',"change"]}]
        },
        placesList:[{
          value: 1,
          label: '1'
        }, {
          value: 2,
          label: '2'
        },{
          value: 3,
          label: '3'
        }],
      }
    },
    created() {
      this.handelDatacode();
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
      judgeGender(time){
        if (time === 0) {
          return '未知';
        } else if (time == 1) {
          return '男';
        }else{
          return '女';
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
      handelDatacode(){
          handelDatacode().then(response => {
            let cateList = response.data;
            for(let i=0;i<cateList.length;i++){
              let cate = cateList[i];
              this.categoryOptions.push({label:cate.name,id:cate.id});
            }
          })
      },
      handleStatusChange(index, row) {
        this.$confirm('是否要修改该状态?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          updateStatus(row.id, {status: row.status,id:row.id}).then(response => {
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消修改'
          });
          this.getList();
        });
      },
      handleAllDelete(idarr) {
        this.$confirm('是否要删除该数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params=new URLSearchParams();
          params.append("id",idarr);
          handleAllDelete(params).then(response => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getList();
          });
        });
      },
      handleDelete(ids) {
        this.$confirm('是否要删除该数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params=new URLSearchParams();
          params.append("id",ids);
          deleteRole(ids,params).then(response => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getList();
          });
        });
      },
      handleShowMessage(index, row){
        this.$router.push({path: '/cms/memberMessage', query: {id: row.id}})
      },
      handleAccount(row){
        this.$router.push({path: '/cms/account', query: {id: row}})
      },
      handleIntegralDetail(row){
        this.$router.push({path: '/cms/operatorIntegral', query: {id: row}})
      },
      handleCopies(row){
        this.$router.push({path: '/cms/copies', query: {id: row}})
      },
      handleAdd() {
        this.dialogVisible = true;
        this.isEdit = false;
        this.role = Object.assign({},defaultRole);
        awayHintForm(this.$refs.roleForm)
      },
      handleUpdate(index, row) {
        this.dialogVisible = true;
        this.isEdit = true;
        this.role = Object.assign({},row);
        awayHintForm(this.$refs.roleForm)
      },
      handleDialogConfirm(formName) {
          if (this.isEdit) {
            this.$refs[formName].validate((valid) =>{
              if(valid){
                updateRole(this.role).then(response => {
                  let scus = null
                  if(response.data.code==200){
                    scus = 'success'
                  }else {
                    scus = 'error'
                  }
                  this.$message({
                    message: response.data.message,
                    type: scus
                  });
                  this.showArea = false;
                  this.dialogVisible =false;
                  this.getList();
                })
              }
            })
          } else {
             this.$refs[formName].validate((valid) =>{
               if(valid){
                 console.log(this.role)
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
      getList() {
        this.listLoading = true;
        fetchList(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data.list
          this.total = response.data.total;
        });
      }
    }
  }
</script>
<style></style>
