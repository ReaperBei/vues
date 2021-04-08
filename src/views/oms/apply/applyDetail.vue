<template>
  <div class="detail-container">
    <el-card shadow="never">
      <span class="font-title-medium">退货商品</span>
      <el-table
        border
        class="standard-margin"
        ref="productTable"
        :data="productList">
        <el-table-column label="商品图片" width="160" align="center">
          <template slot-scope="scope">
            <img style="height:80px" :src="scope.row.productPic">
          </template>
        </el-table-column>
        <el-table-column label="商品名称" width="160" align="center">
          <template slot-scope="scope">
            <span class="font-small">{{scope.row.productName}}</span><br>
            <span class="font-small">品牌：{{scope.row.productBrand}}</span>
          </template>
        </el-table-column>
        <el-table-column label="价格/货号" width="180" align="center">
          <template slot-scope="scope">
            <span class="font-small">价格：￥{{scope.row.productRealPrice}}</span><br>
            <span class="font-small">货号：NO.{{scope.row.productId}}</span>
          </template>
        </el-table-column>
        <el-table-column
            v-for="(item,index) in productList"
            :label="getheader(item,index)"
            :key="item.id"
            align="center"
        >
            <template slot-scope="scope">{{getProductSkuSp(scope.row,index)}}</template>
        </el-table-column>
        <el-table-column label="数量" width="100" align="center">
          <template slot-scope="scope">{{scope.row.productCount}}</template>
        </el-table-column>
        <el-table-column label="小计" width="100" align="center">
          <template slot-scope="scope">￥{{scope.row.productRealPrice*scope.row.productCount}}</template>
        </el-table-column>
      </el-table>
      <div style="float:right;margin-top:15px;margin-bottom:15px">
        <span class="font-title-medium">合计：</span>
        <span class="font-title-medium color-danger">￥{{totalAmount}}</span>
      </div>
    </el-card>
    <el-card shadow="never" class="standard-margin">
      <span class="font-title-medium">服务单信息</span>
      <div class="form-container-border">
        <el-row>
          <el-col :span="6" class="form-border form-left-bg font-small">服务单号</el-col>
          <el-col class="form-border font-small" :span="18">{{orderReturnApply.id}}</el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6">申请状态</el-col>
          <el-col class="form-border font-small" :span="18">{{orderReturnApply.status | formatStatus}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="form-border form-left-bg font-small" style="height:50px;line-height:30px">订单编号
          </el-col>
          <el-col class="form-border font-small" :span="18" style="height:50px">
            {{orderReturnApply.orderSn}}
            <el-button type="text" size="small" @click="handleViewOrder">查看</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6">申请时间</el-col>
          <el-col class="form-border font-small" :span="18">{{orderReturnApply.createTime | formatTime}}</el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6">用户账号</el-col>
          <el-col class="form-border font-small" :span="18">{{orderReturnApply.memberUsername}}</el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6">联系人</el-col>
          <el-col class="form-border font-small" :span="18">{{orderReturnApply.returnName}}</el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6">联系电话</el-col>
          <el-col class="form-border font-small" :span="18">{{orderReturnApply.returnPhone}}</el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6">退货原因</el-col>
          <el-col class="form-border font-small" :span="18">{{orderReturnApply.reason}}</el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6">问题描述</el-col>
          <el-col class="form-border font-small" :span="18">{{orderReturnApply.description}}</el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6" style="height:100px;line-height:80px">凭证图片
          </el-col>
          <el-col class="form-border font-small" :span="18" style="height:100px">
            <img @click="handelImage(index)" v-for="(item,index) in proofPics" style="width:80px;height:80px" :key="index" :src="item">
          </el-col>
        </el-row>
      </div>
      <el-dialog
        title="图片预览"
        :visible.sync="dialogVisible"
        width="60%"
        >
        <el-carousel :interval="4000" type="card" :initial-index='showIndex' ref="carousel">
          <el-carousel-item  v-for="(item,index) in proofPics" style="text-align: center;" height="400px" :key="index">
            <img style="width：100%;height:100%" :src="item" alt="加载中...">
          </el-carousel-item>
        </el-carousel>
      </el-dialog>
      <div class="form-container-border">
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6">订单金额</el-col>
          <el-col class="form-border font-small" :span="18">￥{{totalAmount}}</el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6">退款金额
          </el-col>
          <el-col class="form-border font-small" :span="18">￥{{orderReturnApply.returnAmount}}</el-col>
        </el-row>
        <div v-show="orderReturnApply.status!==3">
          <div v-if="orderReturnApply.companyAddress==null?false:true">
            <el-row>
              <el-col class="form-border form-left-bg font-small" :span="6">收货人姓名</el-col>
              <el-col class="form-border font-small" :span="18">{{orderReturnApply.companyAddress.name}}</el-col>
            </el-row>
            <el-row>
              <el-col class="form-border form-left-bg font-small" :span="6">所在区域</el-col>
              <el-col class="form-border font-small" :span="18">{{orderReturnApply.companyAddress | formatRegion}}</el-col>
            </el-row>
            <el-row>
              <el-col class="form-border form-left-bg font-small" :span="6">详细地址</el-col>
              <el-col class="form-border font-small" :span="18">{{orderReturnApply.companyAddress.detailAddress}}</el-col>
            </el-row>
            <el-row>
              <el-col class="form-border form-left-bg font-small" :span="6">联系电话</el-col>
              <el-col class="form-border font-small" :span="18">{{orderReturnApply.companyAddress.phone}}</el-col>
            </el-row>
          </div>
        </div>
      </div>
      <div class="form-container-border" v-show="orderReturnApply.status!==0">
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6">处理人员</el-col>
          <el-col class="form-border font-small" :span="18">{{orderReturnApply.handleMan}}</el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6">处理时间</el-col>
          <el-col class="form-border font-small" :span="18">{{orderReturnApply.handleTime | formatTime}}</el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6">处理备注</el-col>
          <el-col class="form-border font-small" :span="18">{{orderReturnApply.handleNote}}</el-col>
        </el-row>
      </div>
      <div class="form-container-border" v-show="orderReturnApply.status===2">
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6">收货人员</el-col>
          <el-col class="form-border font-small" :span="18">{{orderReturnApply.receiveMan}}</el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6" >收货时间</el-col>
          <el-col class="form-border font-small" :span="18">{{orderReturnApply.receiveTime | formatTime}}</el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6">收货备注</el-col>
          <el-col class="form-border font-small" :span="18">{{orderReturnApply.receiveNote}}</el-col>
        </el-row>
      </div>
      <div style="margin-top:15px;text-align: center" v-show="orderReturnApply.status===0">
        <el-button type="primary" size="small" @click="handleUpdateStatus(orderReturnApply,1)">确认退货</el-button>
        <el-button type="danger" size="small" @click="handleUpdateStatus(orderReturnApply,3)">拒绝退货</el-button>
      </div>
      <div style="margin-top:15px;text-align: center" v-show="orderReturnApply.status===1">
        <el-button type="primary" size="small" @click="handleUpdateStatus(orderReturnApply,2)">确认收货</el-button>
      </div>
      <el-dialog
      title="原因"
      :visible.sync="dialogReceiveNote" width="30%">
      <el-form
      :model="updateStatusParam"
      ref="ruleForm"
      :rules="rules"
      label-width="150px" size="small">
      <el-form-item label="确认/拒绝备注：" prop="handleNote" v-if="orderReturnApply.status===0">
        <el-input v-model="updateStatusParam.handleNote"
                    type="textarea"
                    :rows="5"
                    style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="收货备注：" v-show="orderReturnApply.status===1">
          <el-input v-model="updateStatusParam.receiveNote"
                    type="textarea"
                    :rows="5"
                    style="width: 250px"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogReceiveNote = false">取 消</el-button>
        <el-button type="primary" @click="handleCloseOrderConfirm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
    </el-card>
  </div>
</template>
<script>
  import {getApplyDetail,updateApplyStatus} from '@/api/returnApply';
  import {fetchList} from '@/api/companyAddress';
  import {formatDate} from '@/utils/date';
  import regular from "@/utils/regular";
  const defaultUpdateStatusParam = {
    companyAddressId: null,
    handleMan: 'admin',
    handleNote: null,
    receiveMan: 'admin',
    receiveNote: null,
    returnAmount: null,
    status: 0
  };
  const defaultOrderReturnApply = {
    id: null,
    orderId: null,
    companyAddressId: null,
    productId: null,
    orderSn: null,
    createTime: null,
    memberUsername: null,
    returnAmount: null,
    returnName: null,
    returnPhone: null,
    status: null,
    handleTime: null,
    productPic: null,
    productName: null,
    productBrand: null,
    productAttr: null,
    productCount: null,
    productPrice: null,
    productRealPrice: null,
    reason: null,
    description: null,
    proofPics: null,
    handleNote: null,
    handleMan: null,
    receiveMan: null,
    receiveTime: null,
    receiveNote: null
  };
  export default {
    name: 'returnApplyDetail',
    data() {
      return {
        id: null,
        orderReturnApply: Object.assign({},defaultOrderReturnApply),
        productList: null,
        proofPics: null,
        updateStatusParam: Object.assign({}, defaultUpdateStatusParam),
        companyAddressList: null,
        dialogVisible:false,
        dialogReceiveNote:false,
        showIndex:null,
        rules:{
          handleNote:[{ required: true, message: '请输入确认/拒绝备注', trigger: 'blur'}]
        }
      }
    },
    created() {
      this.id = this.$route.query.id;
      this.getDetail();
    },
    computed: {
      totalAmount() {
        if (this.orderReturnApply != null) {
          return this.orderReturnApply.productRealPrice;
        } else {
          return 0;
        }
      },
      currentAddress() {
        let id = this.updateStatusParam.companyAddressId;
        if(this.companyAddressList==null)return {};
        for (let i = 0; i < this.companyAddressList.length; i++) {
          let address = this.companyAddressList[i];
          if (address.id === id) {
            return address;
          }
        }
        return null;
      }
    },
    filters: {
      formatStatus(status) {
        if (status === 0) {
          return "待处理";
        } else if (status === 1) {
          return "退货中";
        } else if (status === 2) {
          return "已完成";
        } else {
          return "已拒绝";
        }
      },
      formatTime(time) {
        if (time == null || time === '') {
          return '';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      },
      formatRegion(address) {
        let str = address.province;
        if (address.city != null) {
          str += "  " + address.city;
        }
        str += "  " + address.region;
        return str;
      }
    },
    methods: {
      handelImage(item){
        this.dialogVisible = true
        this.showIndex = item
        if(this.$refs.carousel){
            this.$refs.carousel.setActiveItem(item);
        }
      },
      getProductSkuSp(row, index) {
            let spData = JSON.parse(row.productAttr);
            if (spData != null && index < spData.length) {
                return spData[index].value;
            } else {
                return null;
            }
        },
        getheader(row, index) {
            let spData = JSON.parse(row.productAttr);
            if (spData != null && index < spData.length) {
                return spData[index].key;
            } else {
                return null;
            }
      },
      handleViewOrder(){
        this.$router.push({path:'/oms/orderDetail',query:{id:this.orderReturnApply.orderId}});
      },
      getDetail() {
        getApplyDetail(this.id).then(response => {
          this.orderReturnApply = response.data;
          this.productList = [];
          this.productList=response.data.goodsInfos;
          if (this.orderReturnApply.proofPics != null) {
            this.proofPics = this.orderReturnApply.proofPics.split(",")
          }
          //退货中和完成
          if(this.orderReturnApply.status===1||this.orderReturnApply.status===2){
            this.updateStatusParam.returnAmount=this.orderReturnApply.returnAmount;
            this.updateStatusParam.companyAddressId=this.orderReturnApply.companyAddressId;
          }
          this.getCompanyAddressList();
        });
      },
      getCompanyAddressList() {
        fetchList().then(response => {
          this.companyAddressList = response.data;
          for (let i = 0; i < this.companyAddressList.length; i++) {
            if (this.companyAddressList[i].receiveStatus === 1&&this.orderReturnApply.status===0) {
              this.updateStatusParam.companyAddressId = this.companyAddressList[i].id;
            }
          }
        });
      },
      handleUpdateStatus(row,status){
        console.log(status)
        this.dialogReceiveNote = true
        if(status==1){
          this.updateStatusParam.returnAmount =row.returnAmount
        }
        this.updateStatusParam.status=status;
      },
      handleCloseOrderConfirm(formName){
        this.$refs[formName].validate((valid) =>{
           if(valid){
              this.$confirm('是否要进行此操作?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                console.log(this.updateStatusParam)
                updateApplyStatus(this.id,this.updateStatusParam).then(response=>{
                  this.$message({
                    type: 'success',
                    message: '操作成功!',
                    duration:1000
                  });
                  this.$router.back();
                });
              });
           }
        })
      }
    }
  }
</script>
<style scoped>
  .detail-container {
    position: absolute;
    left: 0;
    right: 0;
    width: 1080px;
    padding: 35px 35px 15px 35px;
    margin: 20px auto;
  }

  .standard-margin {
    margin-top: 15px;
  }
  .form-border {
    border-right: 1px solid #DCDFE6;
    border-bottom: 1px solid #DCDFE6;
    padding: 10px;
  }

  .form-container-border {
    border-left: 1px solid #DCDFE6;
    border-top: 1px solid #DCDFE6;
    margin-top: 15px;
  }

  .form-left-bg {
    background: #F2F6FC;
  }
</style>


