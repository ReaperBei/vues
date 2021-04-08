<template> 
  <div class="app-container">
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
        <el-table-column type='index' label="序号" align="center" :index='indexMethod' width="80" ></el-table-column>
        <el-table-column label="产品" width="160" align="center">
          <template slot-scope="scope">{{scope.row.appName}}</template>
        </el-table-column>
        <el-table-column label="平台" width="100" align="center">
          <template slot-scope="scope">{{scope.row.platform}}</template>
        </el-table-column>
        <el-table-column label="版本号" width="160" align="center">
          <template slot-scope="scope">{{scope.row.version}}</template>
        </el-table-column>
        <el-table-column label="版本状态" width="100" align="center">
          <template slot-scope="scope">{{scope.row.state==0?'无效':'有效'}}</template>
        </el-table-column>
        <el-table-column label="强制更新" width="100" align="center">
          <template slot-scope="scope">{{scope.row.isUpdate==1?'是':'否'}}</template>
        </el-table-column>
        <el-table-column label="更新描述" width="160" align="center">
          <template slot-scope="scope">{{scope.row.remark}}</template>
        </el-table-column>
        <el-table-column label="下载地址" width="160" align="center">
          <template slot-scope="scope">{{scope.row.downLoad}}</template>
        </el-table-column>
        <el-table-column label="更新时间" width="160" align="center">
          <template slot-scope="scope">{{scope.row.createTime | formatDateTime}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-row>
            <el-button size="mini"
                type="text"
                @click="handleUpdate(scope.$index, scope.row)">编辑</el-button>
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
        <el-form-item prop="appName" label="产品：">
          <el-select v-model="role.appName" style="width: 250px" placeholder="全部" clearable class="input-width">
              <el-option v-for="(item,index) in placesList"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
              </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="version" label="版本号：">
          <el-input v-model="role.version" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item prop="platform" label="平台：">
           <el-select v-model="role.platform" style="width: 250px" placeholder="全部" clearable class="input-width">
              <el-option v-for="(item,index) in platformList"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
              </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否强制更新：">
          <el-radio-group v-model="role.isUpdate">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="版本状态是否有效：">
          <el-radio-group v-model="role.state">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
         <el-form-item label="下载地址：">
            <el-upload
              :action="fileUrl"  
              :auto-upload="true" 
              :show-file-list="true"
              :limit="1"
              :before-upload="beforeUpload"
              :data="fileData"
              :file-list="fileList"
              :on-success="onSuccess" 
            >
            <el-button type="primary">选择文件</el-button>
            </el-upload>
        </el-form-item>
        <el-form-item prop="remark" label="更新描述：">
          <el-input
          placeholder="请输入内容"
          type="textarea"
          style="width: 250px"
          :rows="5"
          v-model="role.remark"
           ></el-input>
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
  import {fetchList,updateRole,createRole} from '@/api/versions';
  import {formatDate} from '@/utils/date';
  import regular from "@/utils/regular";
  import awayHintForm from "@/utils/hintForm"
  const defaultListQuery = {
    pageNum: 0,
    pageSize: 10
  };
  const defaultRole = {
    appName: "",
    appid: "",
    createTime: "",
    downLoad: "",
    id: null,
    isUpdate: 1,
    platform: "",
    remark: "",
    state:1,
    version: ""
  };
  export default {
    name: 'roleList',
    model: {
      prop: 'caddress',
      event: 'change',
    },
    data() {
      var regVersion= /^(?!0\.0\.0)(\d|[1-9]\d+)\.(\d|[1-9]\d+)\.(\d|[1-9]\d+)$/;
      var valueVersion = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入版本号'));
        } else {
          if (!regVersion.test(value)) {
            callback(new Error('请输入正确版本号,列如1.5.8,两位数不能以0开头'));
          }
          callback();
        }
      };
      return {
        listQuery: Object.assign({}, defaultListQuery),
        list: null,
        total: null,
        listLoading: false,
        dialogVisible: false,
        isEdit:false,
        cityName:null,
        appid:null,
        fileUrl: process.env.BASE_API+"/ums/v1/oss/img/uploadFiles",
        fileData:{
          fileList:null,
          type:3000
        },
        fileList:[],
        role: Object.assign({}, defaultRole),
        rules:{
            appName:[{ required: true,validator:regular.FormValidate.Form().validateCharacter, trigger: ['blur','change']}],
            version:[{ required: true,validator:valueVersion, trigger: ['blur','change']}],
            platform:[{ required: true, message: '请输入平台', trigger: ['blur','change']}]
        },
        cityList:[],
        areaList:[],
        placesList:[{
          value: '俏品多商家版',
          label: '俏品多商家版'
        }, {
          value: '俏品多用户版',
          label: '俏品多用户版'
        }],
        platformList:[{
          value: 'Android',
          label: 'Android'
        }, {
          value: 'iOS',
          label: 'iOS'
        }],
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
    },
    watch:{
      dialogVisible(vaule){
        if(vaule==false){
          this.fileList = [];
        }
      }
    },
    methods: {
      indexMethod (index) {
        let curpage = this.listQuery.pageNum+1
        let limitpage = this.listQuery.pageSize
        return (index+1) + (curpage-1)*limitpage
      },
      selected(data) {
        for(var obj in data) {
          this.role[obj] = data[obj].value
        }
      },
      beforeUpload(file){
        this.fileData.fileList = file
      },
      onSuccess(res,file){
        this.role.downLoad = res.data
        this.fileList.push({name:file.name,url:file.response.data,uid:file.uid,status:"success"})
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 0;
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.getList();
      },
      handleAdd() {
        this.dialogVisible = true;
        this.isEdit = false;
        this.role = Object.assign({},defaultRole);
        awayHintForm(this.$refs.roleForm)
      },
      handleUpdate(index,row) {
        this.dialogVisible = true;
        this.isEdit = true;
        awayHintForm(this.$refs.roleForm)
        this.role = Object.assign({},row)
        let array = []
        if(row.downLoad!==""){
          array.push({name:row.downLoad,uid:row.id,status:"success"})
          this.fileList = array
        }
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
               if(valid){
                 if(this.role.appName=='俏品多商家版'){
                   this.appid = 1
                 }else if(this.role.appName=='俏品多用户版'){
                   this.appid = 2
                 }
                  Object.assign(this.role,{appid:this.appid})
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
          this.list = response.data.list; 
          this.total = response.data.total;
        });
      }
    }
  }
</script>
<style>
</style>
