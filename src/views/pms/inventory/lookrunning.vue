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
        <el-table-column label="商品名称" width="160" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="SKU编码" width="160" align="center">
          <template slot-scope="scope">{{scope.row.pmsStockLog.skuCode}}</template>
        </el-table-column>
        <el-table-column label="变更前库存" width="100" align="center">
          <template slot-scope="scope">{{scope.row.pmsStockLog.beforeStock}}</template>
        </el-table-column>
        <el-table-column label="变更的库存" width="100" align="center">
          <template slot-scope="scope">{{scope.row.pmsStockLog.changeStock}}</template>
        </el-table-column>
        <el-table-column label="变更后的库存" width="160" align="center">
          <template slot-scope="scope">{{scope.row.pmsStockLog.afterStock}}</template>
        </el-table-column>
        <el-table-column label="账号" width="120" align="center">
          <template slot-scope="scope">{{scope.row.pmsStockLog.createdBy}}</template>
        </el-table-column>
        <el-table-column label="变更类型" width="160" align="center">
          <template slot-scope="scope">
              {{scope.row.pmsStockLog.type | verifyStatusFilter}}
          </template>
        </el-table-column>
        <el-table-column label="创建时间" width="160" align="center">
          <template slot-scope="scope">{{scope.row.pmsStockLog.createTime | formatDateTime}}</template>
        </el-table-column>
        <el-table-column label="备注" width="160" align="center">
          <template slot-scope="scope">{{scope.row.pmsStockLog.remark}}</template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
  // ,createRole,updateRole,updateStatus,deleteRole
  import {handleLookRunning} from '@/api/inventory';
  import {formatDate} from '@/utils/date';

  const defaultListQuery = {
    pageNum: 1,
    pageSize: 5,
  };
  export default {
    name: 'roleList',
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        list: null,
        total: null,
        skuStockCode:null
      }
    },
    created() {
        this.skuStockCode = this.$route.query.id
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
      verifyStatusFilter(value) {
        if (value === 1) {
          return '冻结库存';
        } else if(value ==2) {
          return '减少库存';
        }else if(value ==3){
          return '增加库存';
        }else{
          return '冻结库存还原';
        }
      }
    },
    methods: {
      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getList();
      },
      getList() {
        this.listLoading = true;
        this.listQuery = Object.assign({skuStockCode:this.skuStockCode},defaultListQuery)
        handleLookRunning(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data.list;
          this.tolot = response.data.tolot;
        });
      }
    }
  }
</script>
<style></style>
