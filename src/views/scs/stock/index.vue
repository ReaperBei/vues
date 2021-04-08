<template> 
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button size="mini" class="btn-add" @click="handleAdd()" style="margin-left: 20px">发行股权</el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="adminTable"
                :data="list"
                style="width: 100%;"
                v-loading="listLoading" border>
        <el-table-column type='index' label="序号" align="center" width="80" :index='indexMethod' ></el-table-column>
        <el-table-column label="第几轮" width="160" align="center">
          <template slot-scope="scope">{{scope.row.currentWheelNumber}}</template>
        </el-table-column>
         <el-table-column label="售卖状态" width="160" align="center">
          <template slot-scope="scope">{{scope.row.state | formatDateState}}</template>
        </el-table-column>
        <el-table-column label="开售日期" width="160" align="center">
          <template slot-scope="scope">{{scope.row.startDate| formatDateTime}}</template>
        </el-table-column>
        <el-table-column label="停售日期" width="160" align="center">
          <template slot-scope="scope">{{scope.row.stopDate| formatStopDate}}</template>
        </el-table-column>
        <el-table-column label="总股权数" width="110" align="center">
          <template slot-scope="scope">{{scope.row.totalNumber}}</template>
        </el-table-column>
        <!-- <el-table-column label="总出售股数" width="160" align="center">
          <template slot-scope="scope">{{scope.row.totalSellingNum}}</template>
        </el-table-column> -->
        <el-table-column label="增长基数" width="160" align="center">
          <template slot-scope="scope">{{scope.row.increase}}</template>
        </el-table-column>
        <el-table-column label="增值基数" width="120" align="center">
          <template slot-scope="scope">{{scope.row.baseValueAdded}}</template>
        </el-table-column>
         <el-table-column label="稀释比例%" width="120" align="center">
          <template slot-scope="scope">{{scope.row.dilutionProportion}}</template>
        </el-table-column>
        <el-table-column label="公司股权占比" width="160" align="center">
          <template slot-scope="scope">{{scope.row.companyProportion}}</template>
        </el-table-column>
        <el-table-column label="本轮发行号" width="120" align="center">
          <template slot-scope="scope">{{scope.row.issueNumber}}</template>
        </el-table-column>
        <el-table-column label="股权数" width="160" align="center">
          <template slot-scope="scope">{{scope.row.issueEquityNumber}}</template>
        </el-table-column>
         <!-- <el-table-column label="发行的底价" width="160" align="center">
          <template slot-scope="scope">{{scope.row.lowPrice}}</template>
        </el-table-column>
        <el-table-column label="发行的最高价" width="160" align="center">
          <template slot-scope="scope">{{scope.row.topPrice}}</template>
        </el-table-column> -->
        <el-table-column label="发行预售股权数" width="160" align="center">
          <template slot-scope="scope">{{scope.row.sellingEquityNumber}}</template>
        </el-table-column>
        <el-table-column label="创建人" width="110" align="center">
          <template slot-scope="scope">{{scope.row.createBy}}</template>
        </el-table-column>
         <el-table-column label="创建时间" width="160" align="center">
          <template slot-scope="scope">{{scope.row.createTime| formatDateTime}}</template>
        </el-table-column>
        <el-table-column label="更新时间" width="160" align="center">
          <template slot-scope="scope">{{scope.row.updateTime| formatDateTime}}</template>
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
      title="股权发行"
      :visible.sync="dialogVisible"
      width="40%">
      <el-form :model="role"
              :rules='rules'
               ref="roleForm"
               label-width="180px" size="small">
          <el-form-item prop="issuePercentum" label="股权新增倍数：">
            <el-input style="width: 250px;" v-model="role.issuePercentum"></el-input>
          </el-form-item>
          <el-form-item prop="memberPercentum" label="股权稀释比例：">
            <el-input v-model="role.memberPercentum" style="width: 250px;float: left;"></el-input>
            <div style="float: left;">%</div>
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
  import {fetchList,createRole} from '@/api/stock';
  import {formatDate} from '@/utils/date';
  import regular from "@/utils/regular";
  import awayHintForm from "@/utils/hintForm"
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 5
  };
  const defaultRole = {
    issuePercentum: null,
    memberPercentum: null
  };
  export default {
    data() {
      var validateStart = (rule, value, callback) => {
          let numberReg = /^[1-9]\d*$/;
          if(!value){
            return callback('请输入内容只能是正整数')
          }
	        if(!numberReg.test(value)){
	           return callback('输入的内容只能是正整数');
          }
          if(value>100){
              return callback('输入内容数字最大100')
          }else{
             callback();
          }
	    };
      return {
        listQuery: Object.assign({}, defaultListQuery),
        list: null,
        total: null,
        listLoading: false,
        dialogVisible: false,
        role: Object.assign({}, defaultRole),
        rules:{
          issuePercentum:[{ required: true,validator:validateStart, trigger: 'blur'}],
          memberPercentum:[{ required: true,validator:validateStart, trigger: 'blur'}]
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
      formatStopDate(time){
         if (time == null || time === '') {
          return '正在售卖';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      },
      formatDateState(value){
        if(value==1){
          return '准备发售'
        }else if(value==2){
          return '正在售卖'
        }else if(value==3){
          return '售卖完成'
        }else if(value==4){
          return '完成分红'
        }else if(value==5){
          return '已经核账'
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
        this.dialogVisible = true;
        awayHintForm(this.$refs.roleForm)
        this.role = Object.assign({},defaultRole);
      },
      handleStatusChange(index, row) {
        this.$confirm('是否要修改该状态?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          updateStatus({areaNo: row.state}).then(response => {
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
        this.$refs[formName].validate((valid) =>{
          if(valid){
            this.$confirm('确定股权发行后，股权将直接进入兑换阶段，是否继续？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                createRole(this.role).then(response => {
                this.$message({
                  message: '发行成功！',
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
