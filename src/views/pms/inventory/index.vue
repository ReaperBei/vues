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
          <el-form-item label="请输入sku编码：">
            <el-input v-model.trim="listQuery.keyword" style="width: 203px" @keyup.native="trimLR" class="input-width" placeholder="请输入sku编码"></el-input>
          </el-form-item>
          <el-form-item label="商品名称：">
            <el-input style="width: 203px" v-model.trim="listQuery.productName" @keyup.native="trimLR" placeholder="商品名称"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
    </el-card>
    <div class="table-container">
      <el-table ref="roleTable"
                :data="list"
                style="width: 100%;"
                v-loading="listLoading" border>
        <el-table-column type='index' label="序号" align="center" width="80" :index='indexMethod' ></el-table-column>
        <el-table-column label="sku编码" width="160" align="center">
          <template slot-scope="scope">{{scope.row.pmsSkuStock.skuCode}}</template>
        </el-table-column>
        <el-table-column label="商品名称" width="160" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
         <el-table-column width="120" label="图片" align="center">
          <template slot-scope="scope">
            <img class="global-image" :src="scope.row.pmsSkuStock.pic" alt="">
          </template>
        </el-table-column>
        <el-table-column label="价格" width="160" align="center">
          <template slot-scope="scope">{{scope.row.pmsSkuStock.price}}￥</template>
        </el-table-column>
        <el-table-column label="销量" align="center">
          <template slot-scope="scope">{{scope.row.pmsSkuStock.sale}}</template>
        </el-table-column>
        <el-table-column label="库存" align="center">
          <template slot-scope="scope">{{scope.row.pmsSkuStock.stock}}</template>
        </el-table-column>
        <el-table-column label="设置" align="center">
          <template slot-scope="scope">
            <el-row>
              <el-button size="mini"
                    type="text"
                    @click="handleLookRunning(scope.row)">
                    查看流水
              </el-button>
               <el-button size="mini"
                    type="text"
                    @click="handleInventory(scope.row)">
                    申请库存
              </el-button>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160" align="center">
          <template slot-scope="scope">
            <el-row>
              <el-button size="mini"
                       type="text"
                       @click="handleUpLook(scope.row.pmsSkuStock)">查看
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
  </div>
</template>
<script>
  import {fetchList,createRole} from '@/api/inventory';
  import {formatDate} from '@/utils/date';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    keyword:null,
    productName:null
  };
  const defaultRole = {
    "pmsSkuStock": {
      "stock": null,
      "sumStock": null
    },
  };
  const defaultUpdata = {
      pic:null,
      price:null,
      promotionPrice:null,
      lowStock:null ,
      stock:null,
      sumStock:null
  };
  export default {
    name: 'roleList',
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        list: null,
        total: null,
        productId:null,
        listLoading: false,
        role: Object.assign({}, defaultRole),
        addData:Object.assign({}, defaultUpdata),
        isEdit: false,
        operates: [
          {
            label: "更新",
            value: 0
          }
        ],
        operateType: null,
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
      trimLR(){
        if(this.listQuery.keyword==null||this.listQuery.keyword==""){
          this.$route.params.sku = null
        }
        if(this.listQuery.productName==null||this.listQuery.productName==""){
          this.$route.params.name = null
        }
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
      handleInventory(row){
        this.$router.push({path:'/pms/addprice',query:{id:row.pmsSkuStock.id,skuCode:row.pmsSkuStock.skuCode}})
      },
      handleLookRunning(row){
        this.$router.push({path:'/pms/lookrunning',query:{id:row.pmsSkuStock.skuCode}})
      },
       handleUpLook(row){
        this.$router.push({path:'/pms/inventoryLook',query:{id:row.id,sku:this.listQuery.keyword,name:this.listQuery.productName}})
      },
      getList() {
        this.listLoading = true;
        if(this.$route.params.sku||this.$route.params.name){
          this.listQuery.keyword = this.$route.params.sku
          this.listQuery.productName = this.$route.params.name
        }
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
