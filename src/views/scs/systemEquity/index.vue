<template> 
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button size="mini" class="btn-add" @click="handleAdd()" style="margin-left: 20px">分红</el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="adminTable"
                :data="list"
                style="width: 100%;"
                v-loading="listLoading" border>
        <el-table-column type='index' label="序号" align="center" width="80" :index='indexMethod' ></el-table-column>
        <el-table-column label="分红总金额" align="center">
          <template slot-scope="scope">{{scope.row.dividendMoney}}</template>
        </el-table-column>
        <el-table-column label="创建人" align="center">
          <template slot-scope="scope">{{scope.row.createdBy}}</template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template slot-scope="scope">{{scope.row.createdTime | formatDateTime}}</template>
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
      title="分红计算"
      :visible.sync="dialogMoney"
      width="40%">
      <el-form :model="role"
              :rules='rules'
               ref="roleMoney"
               label-width="180px" size="small">
          <el-form-item prop="dividendMoney" label="分红数量：">
            <el-input style="width: 250px;" v-model="role.dividendMoney"></el-input>
          </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogMoney = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogMoney('roleMoney')" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="发行分红"
      :visible.sync="dialogVisible"
      width="40%">
      <el-form :model="role"
               ref="roleForm"
               label-width="180px" size="small">
          <el-form-item label="分红数量：">
            <el-input style="width: 250px;" :disabled="true" v-model="role.dividendMoney"></el-input>
          </el-form-item >
          <el-form-item>
            <div v-html="keepTextStyle(eoentenMessage)"></div>
          </el-form-item >
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm('roleForm')" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import {fetchList,createRole,handleMoney} from '@/api/systemEquity';
  import {formatDate} from '@/utils/date';
  import regular from "@/utils/regular";
  import awayHintForm from "@/utils/hintForm"
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    etDividendRecord:null
  };
  const defaultRole = {
    dividendMoney:null
  };
  export default {
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        list: null,
        total: null,
        listLoading: false,
        dialogVisible:false,
        dialogMoney:false,
        eoentenMessage:null,
        role: Object.assign({}, defaultRole),
        rules:{
           dividendMoney:[{ required: true, validator:regular.FormValidate.Form().valiminPoint, trigger: 'blur'}],
        }
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
      formatDateState(item){
        if(item==1){
          return '申请分红'
        }else if(item==2){
          return '全部分红完毕'
        }else if(item==3){
           return '分红异常部分到账'
        }else {
          return '失效数据请重新申请'
        }
      }
    },
    methods: {
      indexMethod (index) {
        let curpage = this.listQuery.pageNum
        let limitpage = this.listQuery.pageSize
        return (index+1) + (curpage-1)*limitpage
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
        this.dialogMoney = true;
        awayHintForm(this.$refs.roleMoney)
        // this.handleDialogMoney()
      },
      keepTextStyle(val){
         if(val){
            let conent = (val+"").replace(/\!/g,"<br/>")
            console.log(val)
            console.log(conent)
            return conent
         }
      },
      handleDialogMoney(roleMoney){
          this.$refs.roleMoney.validate((valid) =>{
               if(valid){
                  handleMoney(this.role).then(response => {
                  this.eoentenMessage = response.data.message
                  let _this = this
                  setTimeout(function(){
                      _this.dialogVisible = true;
                      _this.dialogMoney = false;
                    },1000)
                  });
               }
          })
      },
       handleDialogConfirm(formName) {
        this.$refs[formName].validate((valid) =>{
          if(valid){
            this.$confirm('确定发行分红', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                createRole(this.role).then(response => {
                this.$message({
                  message: '分红成功！',
                  type: 'success'
                });
                this.dialogVisible =false;
                this.getList();
                });
            }).catch(()=>{
                this.dialogVisible = false;
                 this.$message({
                  type: 'info',
                  message: '已取消'
                });
            })
          }
        })
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
<style scoped>
</style>
