<template>
    <div class="detail-container">
        <el-card shadow="never" class="standard-margin">
            <span class="font-title-medium">门店详情信息</span>
            <div class="form-container-border" v-for="(item,index) in list" :key="index">
                <el-row>
                    <el-col :span="6" class="form-border form-left-bg font-small">区域编号</el-col>
                    <el-col class="form-border font-small" :span="18">{{item.areaNo}}</el-col>
                </el-row>
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6">门店名字</el-col>
                    <el-col class="form-border font-small" :span="18">{{item.name}}</el-col>
                </el-row>
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6">门店金额</el-col>
                    <el-col class="form-border font-small" :span="18">
                        ￥{{item.totalAccount}}<span class="view-text" @click="hanaleLook(item.id)">查看</span>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6">审核原因</el-col>
                    <el-col class="form-border font-small" :span="18">{{item.auditReason}}</el-col>
                </el-row>
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6">审核状态</el-col>
                    <el-col class="form-border font-small" :span="18">{{item.auditStatus | formDataState}}</el-col>
                </el-row>
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6">审核人</el-col>
                    <el-col class="form-border font-small" :span="18">{{item.auditor}}</el-col>
                </el-row>
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6">审核时间</el-col>
                    <el-col
                        class="form-border font-small"
                        :span="18"
                    >{{item.auditTime | formatDateTime}}</el-col>
                </el-row>
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6">创建人</el-col>
                    <el-col class="form-border font-small" :span="18">{{item.createdBy}}</el-col>
                </el-row>
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6">创建时间</el-col>
                    <el-col
                        class="form-border font-small"
                        :span="18"
                    >{{item.createdTime | formatDateTime}}</el-col>
                </el-row>
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6">门店电话</el-col>
                    <el-col class="form-border font-small" :span="18">{{item.phone}}</el-col>
                </el-row>
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6">推荐人</el-col>
                    <el-col class="form-border font-small" :span="18">{{item.recommender}}</el-col>
                </el-row>
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6">结算类型</el-col>
                    <el-col class="form-border font-small" :span="18">{{item.settlementType}}</el-col>
                </el-row>
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6">门店联系人</el-col>
                    <el-col class="form-border font-small" :span="18">{{item.storeContact}}</el-col>
                </el-row>
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6">门店编码</el-col>
                    <el-col class="form-border font-small" :span="18">{{item.storeSn}}</el-col>
                </el-row>
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6">地址</el-col>
                    <el-col class="form-border font-small" :span="18">{{item.address}}</el-col>
                </el-row>
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6">省</el-col>
                    <el-col class="form-border font-small" :span="18">{{item.province}}</el-col>
                </el-row>
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6">市</el-col>
                    <el-col class="form-border font-small" :span="18">{{item.city}}</el-col>
                </el-row>
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6">县</el-col>
                    <el-col class="form-border font-small" :span="18">{{item.area}}</el-col>
                </el-row>
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6">更新人</el-col>
                    <el-col class="form-border font-small" :span="18">{{item.updatedBy}}</el-col>
                </el-row>
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6">更新时间</el-col>
                    <el-col class="form-border font-small" :span="18">{{item.updatedTime | formatDateTime}}</el-col>
                </el-row>
                 <el-row>
                    <el-col
                        class="form-border form-left-bg font-small"
                        style="height:100px;line-height: 100px;"
                        :span="6"
                    >营业执照</el-col>
                    <el-col class="form-border font-small" :span="18" style="height:100px">
                        <div @click="handleImagesPreview(item.businessLicense)" class="cursor-image">
                            <img style="width:80px;height:80px" :src="item.businessLicense" alt=""/>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col
                        class="form-border form-left-bg font-small"
                        style="height:100px;line-height: 100px;"
                        :span="6"
                    >食品安全许可证</el-col>
                    <el-col class="form-border font-small" :span="18" style="height:100px">
                        <div @click="handleImagesPreview(item.foodSafetyPermit)" class="cursor-image">
                            <img style="width:80px;height:80px" :src="item.foodSafetyPermit" alt=""/>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col
                        class="form-border form-left-bg font-small"
                        style="height:100px;line-height: 100px;"
                        :span="6"
                    >税务登记证</el-col>
                    <el-col class="form-border font-small" :span="18" style="height:100px">
                        <div @click="handleImagesPreview(item.taxRegistrationCertificate)" class="cursor-image">
                            <img style="width:80px;height:80px" :src="item.taxRegistrationCertificate" alt=""/>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col
                        class="form-border form-left-bg font-small"
                        style="height:100px;line-height: 100px;"
                        :span="6"
                    >身份证正面</el-col>
                    <el-col class="form-border font-small" :span="18" style="height:100px">
                        <div @click="handleImagesPreview(item.idCardFront)" class="cursor-image">
                           <img style="width:80px;height:80px" :src="item.idCardFront" alt=""/>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col
                        class="form-border form-left-bg font-small"
                        style="height:100px;line-height: 100px;"
                        :span="6"
                    >身份证反面</el-col>
                    <el-col class="form-border font-small" :span="18" style="height:100px">
                        <div @click="handleImagesPreview(item.idCardReverse)" class="cursor-image">
                            <img style="width:80px;height:80px" :src="item.idCardReverse" alt=""/>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col
                        class="form-border form-left-bg font-small"
                        style="height:100px;line-height: 100px;"
                        :span="6"
                    >门店照片</el-col>
                    <el-col class="form-border font-small" :span="18" style="height:100px">
                        <div @click="handleImagesPreview(item.storePic)" class="cursor-image">
                            <img style="width:80px;height:80px" :src="item.storePic" alt=""/>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6">备注</el-col>
                    <el-col class="form-border font-small" :span="18">{{item.note}}</el-col>
                </el-row>
                <el-dialog title="图片预览" :visible.sync="dialogTableVisible" align="center" width="50%">
                    <img :src="imags" style="width:100%;height:100%;" alt="">
                </el-dialog>
            </div>
        </el-card>
    </div>
</template>
<script>
import { handleMessage,handleMoney} from "@/api/shop";
import { formatDate } from "@/utils/date";
export default {
    data() {
        return {
            list: [],
            id: null,
            dialogTableVisible:false,
            imags:null,
        };
    },
    components: {
        formatDate
    },
    created() {
        this.id = this.$route.query.id;
        this.getList();
    },
    filters: {
        formatDateTime(time) {
            if (time == null || time === "") {
                return "";
            }
            let date = new Date(time);
            return formatDate(date, "yyyy-MM-dd hh:mm:ss");
        },
        formDataState(time){
        if(time==0){
          return '未审核'
        }else if(time==1){
          return '审核通过'
        }else{
          return '审核未通过'
        }
      }
    },
    methods: {
        handleImagesPreview(imags){
            this.dialogTableVisible =true;
            this.imags =imags
        },
        hanaleLook(row){
            this.$router.push({path: '/cms/accountDetails', query: {id: row}})
        },  
        getList() {
            handleMessage({ id: this.id }).then(response => {
                this.list.push(response.data);
            });
        }
    }
};
</script>
<style lang="scss" scoped>
  @import "src/styles/commoLook.scss";
  .view-text{
      color: #3a8ee6;
      cursor: pointer;
      margin-left: 20px;
  }
</style>