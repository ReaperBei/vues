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
        <el-form :inline="true" :model="listQuery" size="small" label-width="190px">
          <el-form-item label="请输入真实姓名/手机号码：">
            <el-input v-model="listQuery.keyword" class="input-width" placeholder="请输入真实姓名/手机号码" clearable></el-input>
          </el-form-item>
           <el-form-item label="商品分类：">
            <el-cascader
              clearable
              v-model.trim="selectProductSearch"
              :options="selectMenuList">
            </el-cascader>
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
        <el-table-column label="真实姓名" align="center">
          <template slot-scope="scope">{{scope.row.username}}</template>
        </el-table-column>
        <el-table-column label="性别" width="80" align="center">
          <template slot-scope="scope">
            {{scope.row.gender|judgeGender}}
          </template>
        </el-table-column>
        <el-table-column label="手机号码"  width="110" align="center">
          <template slot-scope="scope">{{scope.row.phone}}</template>
        </el-table-column>
        <el-table-column label="身份证" align="center">
          <template slot-scope="scope">{{scope.row.idCard}}</template>
        </el-table-column>
        <el-table-column label="归属营销者" width="160" align="center">
          <template slot-scope="scope">
            {{getType(scope.row.attribution)}}
          </template>
        </el-table-column>
        <el-table-column label="注册时间" width="160" align="center">
          <template slot-scope="scope">{{scope.row.createTime| formatDateTime}}</template>
        </el-table-column>
        <el-table-column label="是否启用" width="140" align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleStatusChange(scope.$index, scope.row)"
              :active-value="10002"
              :inactive-value="10003"
              v-model="scope.row.status">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-row>
              <el-button size="mini"
                        type="text"
                        @click="handleStudentsAccount(scope.row.id)">
                账户明细
              </el-button>
              <el-button size="mini"
                        type="text"
                        @click="handleStudentsIntegral(scope.row.id)">
                积分明细
              </el-button>
            </el-row>
          </template>
        </el-table-column>
        <!-- <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-row>
              <el-button size="mini"
                        type="text"
                        @click="handleUpdate(scope.$index, scope.row)">
                编辑
              </el-button>
              <el-button size="mini"
                        type="text"
                        @click="handleDelete(scope.row.id)">
                删除
              </el-button>
            </el-row>
          </template>
        </el-table-column> -->
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
      :title="isEdit?'编辑':'添加'"
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
        <el-form-item label="归属运营者：" prop="attribution">
              <el-cascader
              style="width: 250px"
              clearable
              v-model="selectProductCateValue"
              :options="selectMenuList"
              >
            </el-cascader>
        </el-form-item>
        <el-form-item label="身份证：" prop="idCard">
              <el-input v-model="role.idCard" style="width: 250px;" ></el-input>
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
  import {fetchList,deleteRole,updateRole,createRole,handelDatacode} from '@/api/students';
  import {formatDate} from '@/utils/date';
  import regular from "@/utils/regular";
  import awayHintForm from "@/utils/hintForm"
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    keyword:null,
    idword:null
  };
  const defaultRole = {
    id:null,
    username: null,
    phone: null,
    gender: null,
    integration:null,
    attribution:null,
    idCard:null
  };
  export default {
    name: 'roleList',
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        list: null,
        total: null,
        listLoading: false,
        dialogVisible: false,
        isEdit:false,
        selectProductCateValue:null,
        selectMenuList:[],
        selectProductSearch:[],
        childrenList:[],
        role: Object.assign({}, defaultRole),
        rules:{
            city:[{ required: true, message: '请输入城市', trigger: 'blur'}],
            gender:[{ required: true, message: '请选择性别', trigger: ["blur",'change']}],
            phone:[{ required: true, validator:regular.FormValidate.Form().validatePhone, trigger: 'blur'}],
            username:[{ required: true,validator:regular.FormValidate.Form().validateContacts, trigger: 'blur'}],
            idCard:[{ required: true,validator:regular.FormValidate.Form().validateIdentity, trigger: 'blur'}],
            attribution:[{ required: true, message: '请选择营销者', trigger: ["blur",'change']}],
        }
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
    watch: {
      selectProductCateValue: function (newValue) {
        if (newValue != null && newValue.length == 2) {
          this.role.attribution = newValue[1];
        } else {
          this.role.attribution = null;
        }
      },
      selectProductSearch: function (newValue) {
        if (newValue != null && newValue.length == 2) {
          this.listQuery.idword = newValue[1];
        } else {
          this.listQuery.idword = null;
        }
      },
      dialogVisible(vaule){
        if(vaule==false){
          this.selectProductCateValue = [];
        }
      }
    },
    methods: {
      indexMethod (index) {
        let curpage = this.listQuery.pageNum
        let limitpage = this.listQuery.pageSize
        return (index+1) + (curpage-1)*limitpage
      },
      handelDatacode(){
          handelDatacode().then(response => {
          let list = response.data;
          this.selectMenuList = [];
          for (let i = 0; i < list.length; i++) {
            let children = [];
            if (list[i].umsMarketerss != null && list[i].umsMarketerss.length > 0) {
              for (let j = 0; j < list[i].umsMarketerss.length; j++) {
                children.push({label: list[i].umsMarketerss[j].username, value: list[i].umsMarketerss[j].id});
                this.childrenList.push({label: list[i].umsMarketerss[j].username, value: list[i].umsMarketerss[j].id});
              }
            }
            this.selectMenuList.push({label: list[i].name, value: list[i].id, children: children});
            }
          })
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
      handleStudentsAccount(row){
        this.$router.push({path: '/cms/studentsAccount', query: {id: row}})
      },
      handleStudentsIntegral(row){
        this.$router.push({path: '/cms/studentsintegral', query: {id: row}})
      },
      handleDelete(ids) {
        this.$confirm('是否要删除该数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data=new URLSearchParams();
          data.append("id",ids);
          deleteRole(ids,data).then(response => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getList();
          });
        });
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
        this.role.attribution = row.attribution
      },
      handleStatusChange(index, row) {
        this.$confirm('是否要修改该状态?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          updateRole({status: row.status,id:row.id}).then(response => {
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
      handleDialogConfirm(formName) {
          if (this.isEdit) {
            this.$refs[formName].validate((valid) =>{
              if(valid){
                updateRole(this.role).then(response => {
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
      getType(str){
       let list= this.childrenList.filter((item)=>{return item.value===str})
       if(list.length)
        return list[0].label
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
<style></style>
