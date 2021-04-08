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
        <el-table-column type='index' label="序号" align="center" width="80"></el-table-column>
        <el-table-column label="字典编码" align="center">
          <template slot-scope="scope">{{scope.row.dictId}}</template>
        </el-table-column>
        <el-table-column label="字典名称" align="center">
          <template slot-scope="scope">{{scope.row.dictName}}</template>
        </el-table-column>
        <el-table-column label="排序"  width="100" align="center">
          <template slot-scope="scope">{{scope.row.dictSort}}</template>
        </el-table-column>
         <el-table-column label="创建者" align="center">
          <template slot-scope="scope">{{scope.row.createBy}}</template>
        </el-table-column>
        <el-table-column label="备注" align="center">
          <template slot-scope="scope">{{scope.row.remark}}</template>
        </el-table-column>
        <el-table-column label="更新者"  width="100" align="center">
          <template slot-scope="scope">{{scope.row.updateBy}}</template>
        </el-table-column>
        <el-table-column label="更新时间" width="160" align="center">
          <template slot-scope="scope">{{scope.row.updateTime | formatDateTime}}</template>
        </el-table-column>
        <el-table-column label="是否启用" width="140" align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleStatusChanges(scope.$index, scope.row)"
              :active-value="10002"
              :inactive-value="10003"
              v-model="scope.row.status">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160" align="center">
          <template slot-scope="scope">
            <el-row>
            <el-button size="mini"
                       @click="handleUpdate(scope.$index, scope.row)">
              编辑
            </el-button>
            <el-button size="mini"
                       type="danger"
                       @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      :title="isEdit?'编辑内容':'添加数据'"
      :visible.sync="dialogVisible"
      width="40%">
      <el-form :model="role"
              :rules='rules'
               ref="roleForm"
               label-width="150px" size="small">
        <el-form-item prop="dictName" label="字典名称：">
          <el-input v-model="role.dictName" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input v-model="role.remark"
                    type="textarea"
                    :rows="5"
                    style="width: 250px"
                     ></el-input>
        </el-form-item>
        <el-form-item label="是否启用：">
          <el-radio-group v-model="role.status">
            <el-radio :label="10002">是</el-radio>
            <el-radio :label="10003">否</el-radio>
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
  // ,createRole,updateRole,updateStatus,deleteRole
  import {fetchList,createRole,updateRole,deleteRole,updateStatus} from '@/api/dctionmenu';
  import {formatDate} from '@/utils/date';
  import regular from "@/utils/regular";
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 5,
    keyword:null
  };
  const defaultRole = {
      dictId: null,
      dictName: null,
      dictCode:null,
      dictValue: null,
      status: 10002,
      remark: null,
  };
  export default {
    name: 'roleList',
    data() {
      return {
        listQuery: Object.assign({dictTypeCode:this.$route.query.code}, defaultListQuery),
        list: null,
        total: null,
        listLoading: false,
        dialogVisible: false,
        role: Object.assign({}, defaultRole),
        isEdit: false,
        code: null,
         rules:{
            dictName:[{ required: true,validator:regular.FormValidate.Form().validateCharacter, trigger: 'blur'}]
        }
      }
    },
    created() {
        this.code = this.$route.query.code
        this.getList();
    },
    filters: {
      formatDateTime(time) {
        if (time == null || time === '') {
          return '';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      }
    },
    methods: {
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
      handleAdd() {
        this.dialogVisible = true;
        this.isEdit = false;
        this.role = Object.assign({},defaultRole);
      },
      handleStatusChanges(index, row) {
        this.$confirm('是否要修改该状态?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            updateStatus(row.dictId,{status: row.status,id:row.dictId}).then(response => {
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
      handleDelete(index, row) {
        this.$confirm('是否要删除该数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let ids = [];
          ids.push(row.dictId);
          let params=new URLSearchParams();
          params.append("dictId",ids);
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
        this.isEdit = true;
        this.role = Object.assign({},row);
      },
      handleDialogConfirm(formName) {
          if (this.isEdit) {
            updateRole(this.role.dictId,this.role).then(response => {
              this.$message({
                message: '修改成功！',
                type: 'success'
              });
              this.dialogVisible =false;
              this.getList();
            })
          } else {
             this.$refs[formName].validate((valid) =>{
               if(valid){
                 let roles = Object.assign({dictTypeCode:this.code},this.role)
                  createRole(roles).then(response => {
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
        fetchList(this.code).then(response => {
          this.listLoading = false;
          this.list = response.data
        });
      }
    }
  }
</script>
<style></style>
