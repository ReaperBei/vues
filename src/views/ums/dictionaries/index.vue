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
          <el-form-item label="字典名称：">
            <el-input v-model.trim="listQuery.keyword" class="input-width" placeholder="字典名称" clearable></el-input>
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
                @selection-change="handleSelectionChange"
                v-loading="listLoading" border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column type='index' label="序号" align="center" width="80" :index='indexMethod' ></el-table-column>
        <el-table-column label="字典名称" width="160" align="center">
          <template slot-scope="scope">{{scope.row.dictYpeName}}</template>
        </el-table-column>
        <el-table-column label="备注" width="160" align="center">
          <template slot-scope="scope">{{scope.row.remark}}</template>
        </el-table-column>
        <el-table-column label="创建者" align="center">
          <template slot-scope="scope">{{scope.row.createBy}}</template>
        </el-table-column>
        <el-table-column label="创建时间" width="160" align="center">
          <template slot-scope="scope">{{scope.row.createTime | formatDateTime}}</template>
        </el-table-column>
        <el-table-column label="更新者"  width="100" align="center">
          <template slot-scope="scope">{{scope.row.updateBy}}</template>
        </el-table-column>
        <el-table-column label="更新时间" width="160" align="center">
          <template slot-scope="scope">{{scope.row.updateTime | formatDateTime}}</template>
        </el-table-column>
        <el-table-column label="设置" width="100" align="center">
          <template slot-scope="scope">
            <el-row>
              <el-button size="mini"
                        @click="handleShowNextLevel(scope.$index, scope.row)">
                查看下级
              </el-button>
            </el-row>
          </template>
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
        <el-table-column label="操作" width="160" align="center">
          <template slot-scope="scope">
            <el-row>
            <el-button size="mini"
                       @click="handleUpdate(scope.$index, scope.row)">
              编辑
            </el-button>
            <el-button size="mini"
                       type="danger"
                       @click="handleDelete(scope.row.dictId)">删除
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
      :title="isEdit?'编辑字典':'添加字典'"
      :visible.sync="dialogVisible"
      width="40%">
      <el-form :model="role"
               ref="roleForm"
               :rules="rules"
               label-width="150px" size="small">
        <el-form-item prop="dictYpeName" label="字典名称：">
          <el-input v-model="role.dictYpeName" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item prop="remark" label="备注：">
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
  // createRole,updateRole,updateStatus,deleteRole
  import {fetchList,createRole,deleteRole,updateRole,updateStatus} from '@/api/dictionaries';
  import {formatDate} from '@/utils/date';
  import regular from "@/utils/regular";
  import awayHintForm from "@/utils/hintForm"
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    keyword:null
  };
  const defaultRole = {
    dictId: null,
    dictYpeName: null,
    dictTypeCode:null,
    remark:null,
    status: 10002
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
        operates: [
          {
            label: "删除",
            value: 0
          }
        ],
        operateType: null,
        multipleSelection:[],
        rules:{
            dictYpeName:[{ required: true,validator:regular.FormValidate.Form().validateCharacter, trigger: 'blur'}],
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
       handleSelectionChange(val){
        this.multipleSelection = val;
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
        let idarr = [];
        for (let i = 0; i < this.multipleSelection.length; i++) {
          idarr.push(this.multipleSelection[i].dictId);
        }
        if(this.operateType===0){
          //删除
          this.handleDelete(idarr);
        }else {
          this.$message({
            message: '请选择批量操作类型',
            type: 'warning',
            duration: 1000
          });
        }
      },
      handleStatusChange(index, row) {
        this.$confirm('是否要修改该状态?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          updateStatus(row.dictId, {status: row.status,id:row.dictId}).then(response => {
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
      handleAdd() {
        this.dialogVisible = true;
        this.isEdit = false;
        this.role = Object.assign({},defaultRole);
        awayHintForm(this.$refs.roleForm)
      },
      handleDelete(ids) {
        this.$confirm('是否要删除该数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
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
      handleShowNextLevel(index, row) {
        this.$router.push({path: '/ums/dctionmenu', query: {code: row.dictTypeCode}})
      },
      handleUpdate(index, row) {
        this.dialogVisible = true;
        this.isEdit = true;
        this.role = Object.assign({},row);
        awayHintForm(this.$refs.roleForm)
      },
      handleDialogConfirm(formName) {
          if (this.isEdit) {
            console.log(this.role)
            updateRole(this.role.dictId,this.role).then(response => {
              this.$message({
                message: '修改成功！',
                type: 'success'
              });
              this.dialogVisible =false;
              this.getList();
            })
          } else {
            this.$refs[formName].validate((valid) => {
              if(valid){
                createRole(this.role).then(response => {
                  this.$message({
                    message: '添加成功！',
                    type: 'success'
                  });
                  this.dialogVisible =false;
                  this.getList();
                })
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
