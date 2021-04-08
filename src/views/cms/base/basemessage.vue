<template>
    <div class="detail-container">
        <el-card shadow="never" class="standard-margin">
            <span class="font-title-medium">门店详情信息</span>
            <div class="form-container-border" v-for="(item,index) in list" :key="index" v-loading="loading">
                <el-row>
                    <el-col :span="6" class="form-border form-left-bg font-small">区域编号</el-col>
                    <el-col class="form-border font-small" :span="18">{{item.areaNo}}</el-col>
                </el-row>
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6">基地名字</el-col>
                    <el-col class="form-border font-small" :span="18">{{item.baseName}}</el-col>
                </el-row>
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6">审核原因</el-col>
                    <el-col class="form-border font-small" :span="18">{{item.auditReason}}</el-col>
                </el-row>
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6">审核状态</el-col>
                    <el-col class="form-border font-small" :span="18">{{item.auditStatus}}</el-col>
                </el-row>
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6">审核时间</el-col>
                    <el-col
                        class="form-border font-small"
                        :span="18"
                    >{{item.auditTime | formatDateTime}}</el-col>
                </el-row>
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6">审核人</el-col>
                    <el-col class="form-border font-small" :span="18">{{item.auditor}}</el-col>
                </el-row>
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6">营业执照</el-col>
                    <el-col class="form-border font-small" :span="18">{{item.businessScope}}</el-col>
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
                    <el-col class="form-border form-left-bg font-small" :span="6">基地电话</el-col>
                    <el-col class="form-border font-small" :span="18">{{item.basePhone}}</el-col>
                </el-row>
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6">推介人</el-col>
                    <el-col class="form-border font-small" :span="18">{{item.recommender}}</el-col>
                </el-row>
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6">结算类型</el-col>
                    <el-col class="form-border font-small" :span="18">{{item.settlementType}}</el-col>
                </el-row>
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6">基地联系人</el-col>
                    <el-col class="form-border font-small" :span="18">{{item.baseContact}}</el-col>
                </el-row>
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6">基地编码</el-col>
                    <el-col class="form-border font-small" :span="18">{{item.baseSn}}</el-col>
                </el-row>
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6">基地账号</el-col>
                    <el-col class="form-border font-small" :span="18">{{item.userName}}</el-col>
                </el-row>
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6">主营产品</el-col>
                    <el-col class="form-border font-small" :span="18">{{item.mainProducts}}</el-col>
                </el-row>
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6">基地编码</el-col>
                    <el-col class="form-border font-small" :span="18">{{item.baseSn}}</el-col>
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
                    >基地照片</el-col>
                    <el-col class="form-border font-small" :span="18" style="height:100px">
                        <img style="width:80px;height:80px" :src="item.basePic" />
                    </el-col>
                </el-row>
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6">基地介绍</el-col>
                    <el-col class="form-border font-small" :span="18">{{item.baseIntroduction}}</el-col>
                </el-row>
            </div>
        </el-card>
    </div>
</template>
<script>
import { handleMessage } from "@/api/base";
import { formatDate } from "@/utils/date";
export default {
    data() {
        return {
            list: null,
            id: null,
            loading:true
        };
    },
    components: {
        formatDate
    },
    watch:{
        list:function(){
            this.$nextTick(function(){
                this.loading=false
            })
        }
    },
    created() {
        this.id = this.$route.query.id;
        this.getList();
    },
    filters: {
        formatDateTime(time) {
            if (time == null || time === "") {
                return '';
            }
            let date = new Date(time);
            return formatDate(date, "yyyy-MM-dd hh:mm:ss");
        }
    },
    methods: {
        getList() {
            handleMessage({ id: this.id }).then(response => {
                let array = [];
                array.push(response.data);
                this.list = array;
            });
        }
    }
};
</script>
<style lang="scss" scoped>
@import "src/styles/commoLook.scss";
</style>