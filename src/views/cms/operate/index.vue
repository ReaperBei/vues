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
            <el-input v-model.trim="listQuery.keyword" class="input-width" placeholder="请输入营销中心/电话号码" clearable></el-input>
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
                v-loading="listLoading" border>
        <el-table-column type='index' label="序号" align="center" width="80" :index='indexMethod' ></el-table-column>
        <el-table-column label="负责人" width="160" align="center">
          <template slot-scope="scope">{{scope.row.head}}</template>
        </el-table-column>
        <el-table-column label="营销中心名字" width="160" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="电话号码" width="160" align="center">
          <template slot-scope="scope">{{scope.row.phone}}</template>
        </el-table-column>
        <el-table-column label="名额" width="160" align="center">
          <template slot-scope="scope">{{scope.row.places}}</template>
        </el-table-column>
        <el-table-column label="省" width="160" align="center">
          <template slot-scope="scope">{{scope.row.province}}</template>
        </el-table-column>
        <el-table-column label="市" width="160" align="center">
          <template slot-scope="scope">{{scope.row.city}}</template>
        </el-table-column>
        <el-table-column label="区" width="160" align="center">
          <template slot-scope="scope">{{scope.row.area}}</template>
        </el-table-column>
        <el-table-column width="160" label="详细地址">
          <template slot-scope="scope">{{scope.row.address}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center">
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
      :title="isEdit?'编辑':'添加'"
      :visible.sync="dialogVisible"
      width="40%">
      <el-form :model="role"
               ref="roleForm"
               :rules="rules"
               label-width="150px" size="small">
        <el-form-item prop="head" label="负责人：">
          <el-input v-model="role.head" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item prop="phone" label="联系电话：">
          <el-input v-model="role.phone" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="运营中心名字：">
          <el-input v-model="role.name" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item prop="area" label="地区：">
          <VDistpicker v-model="defultAddress"></VDistpicker>
        </el-form-item>
         <el-form-item prop="address" label="详细地址：">
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
  import {fetchList,deleteRole,updateRole,createRole} from '@/api/operate';
  import {formatDate} from '@/utils/date';
  import VDistpicker from '@/components/VdIstpicker/index';
  import regular from "@/utils/regular";
  import awayHintForm from "@/utils/hintForm"
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    keyword:null
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
        defultAddress:{
            province:null,
            city: null,
            area:null,
        },
        role: Object.assign({}, defaultRole),
        rules:{
            head:[{ required: true, validator:regular.FormValidate.Form().validateContacts, trigger: 'blur'}],
            phone:[{ required: true, validator:regular.FormValidate.Form().validatePhone, trigger: 'blur'}],
            name:[{ required: true,validator:regular.FormValidate.Form().validateCharacter, trigger: 'blur'}],
            area:[{ required: true, message: '请选择地区', trigger: 'blur'}],
            address:[{ required: true, validator:regular.FormValidate.Form().validateCharacter, trigger: 'blur'}]
        },
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
      handleAdd() {
        this.dialogVisible = true;
        awayHintForm(this.$refs.roleForm)
        this.isEdit = false;
        this.defultAddress.province = ""
        this.defultAddress.city = ""
        this.defultAddress.area = ""
        this.role = Object.assign(this.defultAddress,defaultRole);
      },
      handleUpdate(index,row) {
        this.dialogVisible = true;
        awayHintForm(this.$refs.roleForm)
        this.isEdit = true;
        this.role = Object.assign(this.defultAddress,row)
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
                  this.showArea = false;
                  this.dialogVisible =false;
                  this.getList();
                })
              }
            })
          } else {
             this.$refs[formName].validate((valid) =>{
               console.log(this.role)
               if(valid){
                  const data = Object.assign(this.role,this.defultAddress)
                  createRole(data).then(response => {
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
          this.list = response.data.list; 
          this.total = response.data.total;
        });
      }
    }
  }
</script>
<style></style>
