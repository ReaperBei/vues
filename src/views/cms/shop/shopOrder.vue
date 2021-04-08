<template> 
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <!-- <el-button size="mini" class="btn-add" @click="handleAdd()" style="margin-left: 20px">添加</el-button> -->
    </el-card>
    <div class="table-container">
      <el-table ref="roleTable"
                :data="list"
                style="width: 100%;"
                v-loading="listLoading" border>
        <el-table-column type='index' label="序号" align="center" width="80" :index='indexMethod' ></el-table-column>
        <el-table-column label="用户帐号" width="120" align="center">
          <template slot-scope="scope">{{scope.row.memberUsername}}</template>
        </el-table-column>
        <el-table-column label="收货人姓名" width="160" align="center">
          <template slot-scope="scope">{{scope.row.receiverName}}</template>
        </el-table-column>
        <el-table-column label="收货人电话" width="120" align="center">
          <template slot-scope="scope">{{scope.row.receiverPhone}}</template>
        </el-table-column>
        <el-table-column label="收货人邮编" width="100" align="center">
          <template slot-scope="scope">{{scope.row.receiverPostCode}}</template>
        </el-table-column>
        <el-table-column label="订单类型" align="center">
          <template slot-scope="scope">{{scope.row.orderType | formatDateType}}</template>
        </el-table-column>
        <el-table-column label="订单状态" align="center">
          <template slot-scope="scope">{{scope.row.status | formatDateStatus}}</template>
        </el-table-column>
        <el-table-column label="订单备注" width="160" align="center">
          <template slot-scope="scope">{{scope.row.note}}</template>
        </el-table-column>
        <el-table-column label="订单编号" width="160" align="center">
          <template slot-scope="scope">{{scope.row.orderSn}}</template>
        </el-table-column>
        <el-table-column label="订单来源" align="center">
          <template slot-scope="scope">{{scope.row.sourceType | formatDateSourceType}}</template>
        </el-table-column>
        <el-table-column label="退款状态" align="center">
          <template slot-scope="scope">{{scope.row.returnStatus | formatDateReturnStatus}}</template>
        </el-table-column>
        <el-table-column label="优惠券抵扣金额" align="center">
          <template slot-scope="scope">{{scope.row.couponAmount}}</template>
        </el-table-column>
        <el-table-column label="应付金额" align="center">
          <template slot-scope="scope">{{scope.row.payAmount}}</template>
        </el-table-column>
        <el-table-column label="支付方式" align="center">
          <template slot-scope="scope">{{scope.row.payType | formatDatePayType}}</template>
        </el-table-column>
         <el-table-column label="支付时间" width="160" align="center">
          <template slot-scope="scope">{{scope.row.paymentTime | formatDateTime}}</template>
        </el-table-column>
        <el-table-column label="评价时间" width="160" align="center">
          <template slot-scope="scope">{{scope.row.commentTime | formatDateTime}}</template>
        </el-table-column>
        <el-table-column label="省份/直辖市" align="center">
          <template slot-scope="scope">{{scope.row.receiverProvince}}</template>
        </el-table-column>
         <el-table-column label="城市" align="center">
          <template slot-scope="scope">{{scope.row.receiverCity}}</template>
        </el-table-column>
         <el-table-column label="区" align="center">
          <template slot-scope="scope">{{scope.row.receiverRegion}}</template>
        </el-table-column>
         <el-table-column label="详细地址" width="160" align="center">
          <template slot-scope="scope">{{scope.row.receiverDetailAddress}}</template>
        </el-table-column>
        <el-table-column label="发票类型" align="center">
          <template slot-scope="scope">{{scope.row.billType | formatDateBillType}}</template>
        </el-table-column>
        <el-table-column label="收票人电话" width="120" align="center">
          <template slot-scope="scope">{{scope.row.billReceiverPhone}}</template>
        </el-table-column>
        <el-table-column label="发票内容" width="160" align="center">
          <template slot-scope="scope">{{scope.row.billContent}}</template>
        </el-table-column>
        <el-table-column label="收票人邮箱" width="160" align="center">
          <template slot-scope="scope">{{scope.row.billReceiverEmail}}1487770458@qq.com</template>
        </el-table-column>
        <el-table-column label="提交时间" width="160" align="center">
          <template slot-scope="scope">{{scope.row.createTime | formatDateTime}}</template>
        </el-table-column>
        <el-table-column label="物流公司(配送方式)" width="120" align="center">
          <template slot-scope="scope">{{scope.row.deliveryCompany}}</template>
        </el-table-column>
         <el-table-column label="确认收货状态" align="center">
          <template slot-scope="scope">{{scope.row.confirmStatus | formatDateConfirmStatus}}</template>
        </el-table-column>
        <el-table-column label="物流单号" align="center">
          <template slot-scope="scope">{{scope.row.deliverySn}}</template>
        </el-table-column>
        <el-table-column label="运费金额" align="center">
          <template slot-scope="scope">{{scope.row.freightAmount}}</template>
        </el-table-column>
        <el-table-column label="配送方式" align="center">
          <template slot-scope="scope">{{scope.row.deliveryType | formatDateDeliveryType}}</template>
        </el-table-column>
        <el-table-column label="可以获得的积分" align="center">
          <template slot-scope="scope">{{scope.row.integration}}</template>
        </el-table-column>
        <el-table-column label="积分抵扣金额" align="center">
          <template slot-scope="scope">{{scope.row.integrationAmount}}</template>
        </el-table-column>
        <el-table-column label="修改时间" width="160" align="center">
          <template slot-scope="scope">{{scope.row.modifyTime | formatDateTime}}</template>
        </el-table-column>
        <el-table-column label="发票抬头" align="center">
          <template slot-scope="scope">{{scope.row.billHeader}}</template>
        </el-table-column>
         <el-table-column label="促销优化金额" align="center">
          <template slot-scope="scope">{{scope.row.promotionAmount}}</template>
        </el-table-column>
         <el-table-column label="活动信息" align="center">
          <template slot-scope="scope">{{scope.row.promotionInfo}}</template>
        </el-table-column>
         <el-table-column label="确认收货时间" width="160" align="center">
          <template slot-scope="scope">{{scope.row.receiveTime | formatDateTime}}</template>
        </el-table-column>
        <el-table-column label="自提时间" width="160" align="center">
          <template slot-scope="scope">{{scope.row.arrivalTime | formatDateTime}}</template>
        </el-table-column>
        <el-table-column label="自动确认时间(天)" align="center">
          <template slot-scope="scope">{{scope.row.money}}</template>
        </el-table-column>
        <el-table-column label="管理员后台调整订单使用的折扣金额" align="center">
          <template slot-scope="scope">{{scope.row.discountAmount}}</template>
        </el-table-column>
        <el-table-column label="可以活动的成长值" align="center">
          <template slot-scope="scope">{{scope.row.growth}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-row>
                <el-button size="mini"
                      type="text"
                      @click="handleOrderDetails(scope.row)">订单详情
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
  import {handleOrder} from '@/api/shop';
  import {formatDate} from '@/utils/date';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    storeId:null
  };
  export default {
    name: 'roleList',
    model: {
      prop: 'caddress',
      event: 'change',
    },
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
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
      formatDateBillType(value){
        if(value==0){
          return '不开发票'
        }else if(value==1){
          return '电子发票'
        }else if(value==2){
          return '纸质发票'
        }
      },
      formatDateConfirmStatus(value){
        if(value==0){
          return '未确认'
        }else if(value==1){
          return '已确认'
        }
      },
      formatDateDeliveryType(value){
          if(value==0){
          return '自提'
        }else if(value==1){
          return '物流'
        }
      },
      formatDateType(value) {
       if(value==0){
           return '正常订单'
       }else if(value==1){
           return '秒杀订单'
       }else if(value==2){
           return '退款订单'
       }
      },
      formatDatePayType(value) {
        if(value==0){
           return '未支付'
       }else if(value==1){
           return '支付宝'
       }else if(value==2){
           return '微信'
       }
      },
      formatDateSourceType(vaule){
        if(vaule==0){
          return 'PC订单'
        }else if(vaule==1){
          return 'app订单'
        }else if(vaule==2){
          return '小程序订单'
        }
      },
      formatDateReturnStatus(vaule){
        if(vaule=='-1'){
          return '未退货'
        }else if(vaule==0){
          return '待处理'
        }else if(vaule==1){
          return '退货中'
        }else if(vaule==2){
           return '已完成'
        }else if(vaule==3){
           return '已拒绝'
        }
      },
      formatDateStatus(vaule){
        if(vaule==1010){
          return '待付款'
        }else if(vaule==1020){
          return '已付款'
        }else if(vaule==1030){
          return '待出库'
        }else if(vaule==1040){
           return '已出库'
        }else if(vaule==1050){
           return '到达门店'
        }else if(vaule==1060){
          return '待提货'
        }else if(vaule==1070){
          return '已提货'
        }else if(vaule==1080){
           return '已完成'
        }else if(vaule==2010){
           return '手动取消订单'
        }else if(vaule==2020){
           return '超时取消订单'
        }
      }
    },
    methods: {
      indexMethod (index) {
        let curpage = this.listQuery.pageNum
        let limitpage = this.listQuery.pageSize
        return (index+1) + (curpage-1)*limitpage
      },
      selected(data) {
        for(var obj in data) {
          this.role[obj] = data[obj].value
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
      handleOrderDetails(row){
        this.$router.push({path: '/cms/orderDetails', query: {id: row.id}})
      },
      getList() {
        this.listLoading = true;
        Object.assign(this.listQuery,{storeSn:this.$route.query.storeSn})
        handleOrder(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data.list; 
          this.total = response.data.total;
        });
      }
    }
  }
</script>
<style></style>
