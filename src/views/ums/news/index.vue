<template> 
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button size="mini" class="btn-add" @click="handleAdd()" style="margin-left: 20px">添加</el-button>
    </el-card>
    <div class="table-container">
      <el-table
                :data="list"
                style="width: 100%;"
                tooltip-effect="dark"
                v-loading="listLoading" border>
        <el-table-column type='index' label="序号" align="center" width="80" :index='indexMethod' ></el-table-column>
        <el-table-column label="标题" align="center">
          <template slot-scope="scope">{{scope.row.title}}</template>
        </el-table-column>
        <el-table-column width="160" label="内容" align="center">
           <template slot-scope="scope">
            <div class="text-overflow" :title="scope.row.content">
              {{scope.row.content}}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="等级" align="center">
          <template slot-scope="scope">{{scope.row.grade}}</template>
        </el-table-column>
        <el-table-column label="消息类型" align="center"> 
          <template slot-scope="scope">{{scope.row.msgType}}</template>
        </el-table-column>
        <el-table-column label="发送人" align="center">
          <template slot-scope="scope">{{scope.row.sendBy}}</template>
        </el-table-column>
        <el-table-column label="发送时间" align="center">
          <template slot-scope="scope">{{scope.row.sendTime | formatDateTime}}</template>
        </el-table-column>
        <el-table-column label="来源类型" align="center">
          <template slot-scope="scope">{{scope.row.sourceType}}</template>
        </el-table-column>
        <el-table-column label="是否启用" width="100" align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleStatusChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.state">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="更新人" align="center">
          <template slot-scope="scope">{{scope.row.updatedBy}}</template>
        </el-table-column>
        <el-table-column label="更新时间" align="center">
          <template slot-scope="scope">{{scope.row.updatedTime | formatDateTime}}</template>
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
            </el-row>
            <el-row>
              <el-button size="mini"
                          type="text"
                          v-show="scope.row.state==1?true:false"
                          @click="handleSenddate(scope.$index,scope.row)">
                发送
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
      :title="isEdit?'编辑内容':'添加数据'"
      :visible.sync="dialogVisible"
      width="40%">
      <el-form :model="role"
              :rules='rules'
               ref="roleForm"
               label-width="150px" size="small">
        <el-form-item prop="title" label="消息标题：">
          <el-input v-model="role.title" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item prop="grade" label="消息等级：">
          <el-input v-model="role.grade" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item prop="msgType" label="消息类型：">
          <el-input v-model="role.msgType" style="width: 250px"  ></el-input>
        </el-form-item>
        <el-form-item prop="content" label="消息内容：">
          <el-input v-model="role.content"
                    type="textarea"
                    :rows="5"
                    style="width: 250px"  ></el-input>
        </el-form-item>
        <el-form-item prop="state" label="是否启用：">
          <el-radio-group v-model="role.state">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
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
  import {fetchList,createRole,updateStatus,handleSenddate,updateRole} from '@/api/news';
  import {formatDate} from '@/utils/date';
  import regular from "@/utils/regular";
  import awayHintForm from "@/utils/hintForm"
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
  };
  const defaultRole = {
    content: null,
    grade: null,
    id: null,
    msgCode: null,
    msgType: null,
    remindType:null,
    revision: null,
    revokeTime: null,
    sourceId: null,
    sourceType: null,
    state: 1,
    title: null
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
        multipleSelection: [],
        rules:{
            content:[{ required: true, message: '请输入消息内容', trigger:["blur",'change']}],
            title:[{ required: true, validator:regular.FormValidate.Form().validateCharacter, trigger:["blur",'change']}],
            grade:[{ required: true,validator:regular.FormValidate.Form().valiminPoint, trigger:["blur",'change']}],
            msgType:[{ required: true, message: "请输入消息类型", trigger: ["blur",'change']}]
        },
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
      handleMessage(index,row){
        this.$router.push({path: '/ums/newsDetails', query: {id: row.id}})
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
      handleStatusChange(index, row) {
        this.$confirm('是否要修改该状态?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(row)
          let params = new URLSearchParams()
          params.append('id',row.id)
          params.append('state',row.state)
          updateStatus(row.id,params).then(response => {
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
      handleSenddate(index,row){
        this.$confirm('是否要发送该消息', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params=new URLSearchParams();
          params.append("id",row.id);
          handleSenddate(row.id,params).then(response=>{
            this.getList();
            this.$message({
              type: 'success',
              message: '发送成功!'
            });
          });
        })
      },
      getList() {
        this.listLoading = true;
        fetchList(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data.list.map((item)=>{
            item.state = Number(item.state)
            return item
          });
          this.total = response.data.total
        });
      }
    }
  }
</script>
<style lang="scss" scoped>
/deep/.text-overflow{
  display: -webkit-box;
  overflow: hidden;
  /*! autoprefixer: off */
    -webkit-box-orient: vertical;
  /* autoprefixer: on */
  -webkit-line-clamp: 3;
}
</style>
