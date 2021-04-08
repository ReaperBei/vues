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
        <el-table-column label="优惠编码" align="center">
          <template slot-scope="scope">{{scope.row.memberNickname}}</template>
        </el-table-column>
        <el-table-column label="领卷人昵称" align="center">
          <template slot-scope="scope">{{scope.row.memberNickname}}</template>
        </el-table-column>
        <el-table-column label="获取类型"  width="100" align="center">
            <template slot-scope="scope">
                {{scope.row.getType==0?'后台赠送':'主动获取'}}
            </template>
        </el-table-column>
         <el-table-column label="创建时间" align="center">
          <template slot-scope="scope">{{scope.row.createTime| formatDateTime}}</template>
        </el-table-column>
        <el-table-column label="使用状态" width="80" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.useStatus==0">
              未使用
            </div>
            <div v-else>{{scope.row.useStatus===1?'已使用':'已过期'}}</div>
          </template>
        </el-table-column>
        <el-table-column label="使用时间" align="center">
          <template slot-scope="scope">{{scope.row.useTime| formatDateTime}}</template>
        </el-table-column>
        <el-table-column label="订单编码" width="160" align="center">
          <template slot-scope="scope">{{scope.row.orderId}}</template>
        </el-table-column>
        <el-table-column label="订单号码" width="160" align="center">
          <template slot-scope="scope">{{scope.row.orderSn}}</template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
  // ,createRole,updateRole,updateStatus,deleteRole
  import {handleDiscounts} from '@/api/member';
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
      }
    },
    methods: {
      getList() {
        this.listLoading = true;
        handleDiscounts({id:this.$route.query.id}).then(response => {
          this.listLoading = false;
          this.list = response.data;
        });
      }
    }
  }
</script>
<style></style>