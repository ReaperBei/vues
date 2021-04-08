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
                v-loading="listLoading" border>
        <el-table-column type='index' label="序号" align="center" width="80" :index='indexMethod' ></el-table-column>
        <el-table-column label="参数名称" align="center">
          <template slot-scope="scope">{{scope.row.configName}}</template>
        </el-table-column>
        <el-table-column label="参数键值" align="center">
          <template slot-scope="scope">{{scope.row.configValue}}</template>
        </el-table-column>
        <el-table-column label="参数键名" align="center">
          <template slot-scope="scope">{{scope.row.configKey}}</template>
        </el-table-column>
        <el-table-column label="备注" align="center">
          <template slot-scope="scope">{{scope.row.remark}}</template>
        </el-table-column>
        <el-table-column label="更新时间" align="center">
          <template slot-scope="scope">{{scope.row.updateTime | formatDateTime}}</template>
        </el-table-column>
         <el-table-column label="更新者"  width="100" align="center">
          <template slot-scope="scope">{{scope.row.updateBy}}</template>
        </el-table-column>
        <el-table-column label="操作" width="160" align="center">
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
    <div></div>
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
        <el-form-item prop="configName" label="参数名称：">
          <el-input v-model="role.configName" style="width: 250px"  ></el-input>
        </el-form-item>
        <el-form-item prop="configValue" label="参数键值：">
          <el-input v-model="role.configValue" style="width: 250px"  ></el-input>
        </el-form-item>
        <el-form-item prop="configKey" label="参数键名：">
          <el-input v-model="role.configKey" style="width: 250px"  ></el-input>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input v-model="role.remark"
              type="textarea"
              :rows="5"
              style="width: 250px"
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
  // ,createRole,updateRole,updateStatus,deleteRole
  import {fetchList,createRole,deleteRole,updateRole} from '@/api/parameter';
  import {formatDate} from '@/utils/date';
  import regular from "@/utils/regular";
  import awayHintForm from "@/utils/hintForm"
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    keyword:null
  };
  const defaultRole = {
    configKey:null,
    configName: null,
    configValue:null,
    configId: null,
    remark: null,
    state:null
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
        role: Object.assign({}, defaultRole),
        isEdit: false,
        rules:{
            configName:[{ required: true,validator: regular.FormValidate.Form().validateCharacter, trigger: 'blur'}],
            configValue:[{ required: true,validator: regular.FormValidate.Form().validateCharacter, trigger: 'blur'}],
            configKey:[{ required: true,validator: regular.FormValidate.Form().validateCharacter, trigger: 'blur'}]
        }
      }
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
      handleMessage(index,row){
        this.$router.push({path: '/ums/parameterMessage', query: {uuid: row.configId}})
      },
      handleDelete(index, row) {
        this.$confirm('是否要删除该数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let ids = [];
          ids.push(row.configId);
          let params=new URLSearchParams();
          params.append("uuid",ids);
          deleteRole(params).then(response => {
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
        awayHintForm(this.$refs.roleForm)
      },
      handleDialogConfirm(formName) {
          if (this.isEdit) {
            this.$refs[formName].validate((valid) =>{
               if(valid){
                  updateRole(this.role.configId,this.role).then(response => {
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
