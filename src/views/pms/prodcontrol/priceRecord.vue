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
        <el-table-column label="区域编码" width="160" align="center">
          <template slot-scope="scope">{{scope.row.areaCode}}</template>
        </el-table-column>
        <el-table-column label="操作人" width="100" align="center">
          <template slot-scope="scope">{{scope.row.operatingBy}}</template>
        </el-table-column>
        <el-table-column label="操作时间" width="160" align="center">
          <template slot-scope="scope">{{scope.row.operatingTime | formatDateTime}}</template>
        </el-table-column>
        <el-table-column label="市场价" width="160" align="center">
          <template slot-scope="scope">{{scope.row.originalPrice}}￥</template>
        </el-table-column>
        <el-table-column label="销售价格" width="160" align="center">
          <template slot-scope="scope">
              {{scope.row.price}}￥
          </template>
        </el-table-column>
        <el-table-column label="赠送积分" width="160" align="center">
          <template slot-scope="scope">
              {{scope.row.sendPoint}}
          </template>
        </el-table-column>
        <el-table-column label="sku编码" width="160" align="center">
          <template slot-scope="scope">{{scope.row.skuCode}}</template>
        </el-table-column>
        <el-table-column
        v-for="(item,index) in list.slice(0,1)"
        :key="index"
        :label="getheader(item,index)"
        width="160" 
        align="center">
          <template slot-scope="scope">{{getProductSkuSp(scope.row,index)}}</template>
        </el-table-column>
        <el-table-column label="开始时间" width="160" align="center">
          <template slot-scope="scope">{{scope.row.startTime | formatDateTime}}</template>
        </el-table-column>
        <el-table-column label="结束时间" width="160" align="center">
          <template slot-scope="scope">{{scope.row.endTime | formatDateTime}}</template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
  // ,createRole,updateRole,updateStatus,deleteRole
  import {handleLookRunning} from '@/api/prodcontrol';
  import {formatDate} from '@/utils/date';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
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
          return '';
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
      },
    },
    methods: {
      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getList();
      },
      getProductSkuSp(row, index) {
            let spData = JSON.parse(row.spData);
            if (spData != null && index < spData.length) {
                return spData[index].value;
            } else {
                return null;
            }
        },
        getheader(row, index) {
            let spData = JSON.parse(row.spData);
            if (spData != null && index < spData.length) {
                return spData[index].key;
            } else {
                return null;
            }
      },
      getList() {
        this.listLoading = true;
        let params = Object.assign(this.listQuery,{productId:this.$route.query.id})
        handleLookRunning(params).then(response => {
          this.listLoading = false;
          this.list = response.data.list;
          this.tolot = response.data.tolot;
        });
      }
    }
  }
</script>
<style></style>