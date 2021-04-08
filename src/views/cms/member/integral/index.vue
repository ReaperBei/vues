<template> 
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
    </el-card>
    <div class="table-container">
      <el-table ref="roleTable"
                :data="list"
                style="width: 100%;"
                v-loading="listLoading" border>
        <el-table-column label="操作人员" width="100" align="center">
          <template slot-scope="scope">{{scope.row.operateMan}}</template>
        </el-table-column>
        <el-table-column label="积分改变数量" align="center">
          <template slot-scope="scope">{{scope.row.changeCount}}</template>
        </el-table-column>
        <el-table-column label="改变类型"  width="100" align="center">
            <template slot-scope="scope">
                {{scope.row.changeType==0?'增加':'减少'}}
            </template>
        </el-table-column>
         <el-table-column label="创建时间" align="center">
          <template slot-scope="scope">{{scope.row.createTime| formatDateTime}}</template>
        </el-table-column>
        <el-table-column label="操作备注" width="160" align="center">
          <template slot-scope="scope">{{scope.row.operateNote}}</template>
        </el-table-column>
        <el-table-column label="积分来源" width="160" align="center">
          <template slot-scope="scope">{{scope.row.sourceType| formsourceType}}</template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
  // ,createRole,updateRole,updateStatus,deleteRole
  import {handleIntegral} from '@/api/member';
  import {formatDate} from '@/utils/date';
  export default {
    name: 'roleList',
    data() {
      return {
        list: null,
        total: null,
        listLoading: false,
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
      formsourceType(value){
        if(value==0){
          return '购物'
        }else if(value==1){
          return '管理员修改'
        }else if(value==2){
          return '晋升奖励'
        }else {
          return '股权兑换'
        }
      }
    },
    methods: {
      getList() {
        this.listLoading = true;
        handleIntegral({id:this.$route.query.id}).then(response => {
          this.listLoading = false;
          this.list = response.data.transactionList;
        });
      }
    }
  }
</script>
<style></style>