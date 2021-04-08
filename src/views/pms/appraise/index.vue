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
          <el-form-item label="请输入商品名称：">
            <el-input v-model.trim="listQuery.productName" style="width: 203px" class="input-width" placeholder="请输入商品名称" clearable></el-input>
          </el-form-item>
          <el-form-item label="请输入订单ID：">
            <el-input v-model.trim="listQuery.orderId" style="width: 203px" class="input-width" placeholder="请输入订单ID" clearable></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
    </el-card>
    <div class="table-container">
      <el-table
                :data="list"
                style="width: 100%;"
                @selection-change="handleSelectionChange"
                v-loading="listLoading" border>
        <el-table-column type='index' label="序号" align="center" width="80" :index='indexMethod' ></el-table-column>
        <el-table-column label="商品名称"  width="180" align="center">
          <template slot-scope="scope">{{scope.row.pmsComment.productName}}</template>
        </el-table-column>
        <el-table-column label="订单ID"  width="160" align="center">
          <template slot-scope="scope">{{scope.row.pmsComment.orderId}}</template>
        </el-table-column>
         <el-table-column label="评价内容" align="center">
           <template slot-scope="scope">
            <div class="text-overflow" :title="scope.row.pmsComment.content">
              {{scope.row.pmsComment.content}}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="评价星数" width="80" align="center">
          <template slot-scope="scope">{{scope.row.pmsComment.star}}</template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template slot-scope="scope">{{scope.row.pmsComment.createTime | formatDateTime}}</template>
        </el-table-column>
        <!-- <el-table-column 
          align="center" 
          v-for="(item,index) in (list.slice(0,2))"
          :key="index"
          :label="getheader(item,index)">
          <template slot-scope="scope">{{getProductSkuSp(scope.row,index)}}</template>
        </el-table-column> -->
        <el-table-column label="是否显示" width="120" align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleStatusChange(scope.$index, scope.row.pmsComment)"
              :active-value="1"
              :inactive-value="0"
              :disabled="scope.row.pmsComment.showStatus | disableNextLevel"
              v-model="scope.row.pmsComment.showStatus">
            </el-switch>
          </template>
        </el-table-column>
         <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-row>
              <el-button
                size="mini"
                type="text"
                :disabled="scope.row.isReplay | formisReplay"
                @click="handleReply(scope.$index, scope.row.pmsComment)">回复
              </el-button>
              <el-button
                size="mini"
                type="text"
                @click="handleDelete(scope.$index, scope.row.pmsComment)">删除
              </el-button>
            </el-row>
            <el-row>
              <el-button
                size="mini"
                type="text"
                @click="handleExamine(scope.$index, scope.row.pmsComment)">查看
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
      title="回复消息"
      :visible.sync="dialogVisible"
      width="40%">
      <el-form :model="role"
              :rules='rules'
               ref="roleForm"
               label-width="150px" size="small">
          <el-form-item prop="content" label="回复内容：">
            <el-input v-model="role.content"
                    type="textarea"
                    :rows="5"
                    style="width: 250px"></el-input>
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
  import {fetchList,handleReply,updateStatus,deleteRole} from '@/api/appraise';
  import {formatDate} from '@/utils/date';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    orderId:null,
    productName:null
  };
  const defaultRole = {
   	commentId: null,
    content: null
  };
  export default {
    // name: 'roleList',5-30
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        list: null,
        total: null,
        listLoading: false,
        dialogVisible: false,
        role: Object.assign({}, defaultRole),
        multipleSelection:[],
        commentId:null,
        rules:{
          content:[{ required: true, message: '请输入回复内容', trigger: 'blur'}]
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
      },
      disableNextLevel(value) {
        if (value === 1) {
          return true;
        }else{
           return false;
        }
      },
      formisReplay(vaule){
        if(vaule==false){
          return false
        }else {
          return true
        }
      },
      disableReplayCount(value){
        if(value==0){
          return false
        }else{
          return true
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
      handleSelectionChange(val){
        this.multipleSelection = val;
      },
      handleReply(index,row) {
        this.dialogVisible = true;
        this.commentId = row.id
      },
      handleExamine(index,row){
        this.$router.push({path: '/pms/appraiseMessage', query: {id: row.id}})
      },
      handleStatusChange(index, row) {
        this.$confirm('是否要修改该状态?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            let params = new URLSearchParams()
            params.append('id',row.id)
            params.append('showStatus',row.showStatus)
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
      handleDelete(index,row) {
        this.$confirm('是否要删除该数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params=new URLSearchParams();
          params.append("id",row.id);
          console.log(row)
          deleteRole(row.id,params).then(response => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getList();
          });
        });
      },
      handleDialogConfirm(formName) {
          this.$refs[formName].validate((valid) =>{
               if(valid){
                 let params = Object.assign(this.role,{commentId:this.commentId})
                handleReply(params).then(response => {
                  this.$message({
                    message: '回复成功！',
                    type: 'success'
                  });
                  this.dialogVisible =false;
                  this.getList();
                });
               }
            })
      },
      getProductSkuSp(row, index) {
            let spData = JSON.parse(row.pmsComment.productAttribute);
            if (spData != null && index < spData.length) {
                return spData[index].value;
            } else {
                return null;
            }
        },
        getheader(row, index) {
            let spData = JSON.parse(row.pmsComment.productAttribute);
            if (spData != null && index < spData.length) {
                return spData[index].key;
            } else {
                return null;
            }
      },
      getList() {
        this.listLoading = true;
        fetchList(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data.list;
          this.total = response.data.total;
          console.log(response.data.list)
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
  -webkit-line-clamp: 5;
}
</style>
