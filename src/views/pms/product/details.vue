<template>
    <div class="detail-container">
        <el-card shadow="never" class="standard-margin">
            <span class="font-title-medium">商品详情信息</span>
            <div class="form-container-border" v-for="(item,index) in list" :key="index" v-loading="loading">
                <el-row>
                    <el-col :span="6" class="form-border form-left-bg font-small">商品分类</el-col>
                    <el-col class="form-border font-small" :span="18">{{item.cateParentName}} / {{item.productCategoryName}}</el-col>
                </el-row>
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6">商品名称</el-col>
                    <el-col class="form-border font-small" :span="18">{{item.name}}</el-col>
                </el-row>
                <el-row>
                    <el-col
                        class="form-border form-left-bg font-small"
                        style="height:200px;line-height: 200px;"
                        :span="6"
                    >照片</el-col>
                    <el-col class="form-border font-small" :span="18" style="height:200px">
                        <img style="width:180px;height:180px" :src="item.pic" />
                    </el-col>
                </el-row>
                <el-row>
                    <el-col
                        class="form-border form-left-bg font-small"
                        style="height:60px;line-height:60px;"
                        :span="6"
                    >副标题</el-col>
                    <el-col
                        class="form-border font-small"
                        style="height:60px;overflow: hidden;"
                        :span="18"
                    >{{item.subTitle}}</el-col>
                </el-row>
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6">商品品牌</el-col>
                    <el-col class="form-border font-small" :span="18">{{item.brandName}}</el-col>
                </el-row>
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6">商品货号</el-col>
                    <el-col class="form-border font-small" :span="18">{{item.productSn}}</el-col>
                </el-row>
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6">计量单位</el-col>
                    <el-col class="form-border font-small" :span="18">{{item.unit}}</el-col>
                </el-row>
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6">商品重量</el-col>
                    <el-col class="form-border font-small" :span="18">{{item.weight}}克</el-col>
                </el-row>
                <el-row>
                    <el-col
                        class="form-border form-left-bg font-small"
                        style="height:60px;line-height:60px;"
                        :span="6"
                    >商品描述</el-col>
                    <el-col
                        class="form-border font-small"
                        style="height:60px;overflow: hidden;"
                        :span="18"
                    >{{item.description}}</el-col>
                </el-row>
                <el-row>
                    <el-col
                        class="form-border form-left-bg font-small"
                        style="height:60px;line-height:60px;"
                        :span="6"
                    >详情描述</el-col>
                    <el-col
                        class="form-border font-small"
                        style="height:60px;overflow: hidden;"
                        :span="18"
                    >{{item.detailDesc}}</el-col>
                </el-row>
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6">赠送的成长值</el-col>
                    <el-col class="form-border font-small" :span="18">{{item.giftGrowth}}</el-col>
                </el-row>
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6">赠送的积分</el-col>
                    <el-col class="form-border font-small" :span="18">{{item.giftPoint}}</el-col>
                </el-row>
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6">新品状态</el-col>
                    <el-col
                        class="form-border font-small"
                        :span="18"
                    >{{item.newStatus==0?'不是新品':'新品'}}</el-col>
                </el-row>
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6">是否为预告商品</el-col>
                    <el-col
                        class="form-border font-small"
                        :span="18"
                    >{{item.previewStatus==0?'不是':'是'}}</el-col>
                </el-row>
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6">商品分类名称</el-col>
                    <el-col class="form-border font-small" :span="18">{{item.productCategoryName}}</el-col>
                </el-row>
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6">审核状态</el-col>
                    <el-col
                        class="form-border font-small"
                        :span="18"
                    >{{item.verifyStatus==0?'未审核':'审核通过'}}</el-col>
                </el-row>
                <el-row>
                    <el-col
                        class="form-border form-left-bg font-small"
                        style="height:60px;line-height:60px;"
                        :span="6"
                    >审核意见</el-col>
                    <el-col
                        class="form-border font-small"
                        style="height:60px;overflow: hidden;"
                        :span="18"
                    >{{item.pmsProductVertifyRecord.detail}}</el-col>
                </el-row>
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6">审核时间</el-col>
                    <el-col class="form-border font-small" :span="18">{{item.pmsProductVertifyRecord.createTime | formatDateTime}}</el-col>
                </el-row>
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6">上架状态</el-col>
                    <el-col
                        class="form-border font-small"
                        :span="18"
                    >{{item.publishStatus==0?'下架':'上架'}}</el-col>
                </el-row>
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6">推荐状态</el-col>
                    <el-col
                        class="form-border font-small"
                        :span="18"
                    >{{item.recommandStatus==0?'不推荐':'推荐'}}</el-col>
                </el-row>
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6">排序</el-col>
                    <el-col class="form-border font-small" :span="18">{{item.sort}}</el-col>
                </el-row>
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6">销量</el-col>
                    <el-col class="form-border font-small" :span="18">{{item.sale}}</el-col>
                </el-row>
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6">促销价格</el-col>
                    <el-col class="form-border font-small" :span="18">{{item.promotionPrice}}</el-col>
                </el-row>
                <el-row>
                    <el-col
                        class="form-border form-left-bg font-small"
                        style="height:60px;line-height:60px;"
                        :span="6"
                    >备注</el-col>
                    <el-col
                        class="form-border font-small"
                        style="height:60px;overflow: hidden;"
                        :span="18"
                    >{{item.note}}</el-col>
                </el-row>
                <el-table style="width: 100%;" :data="item.skuStockList" border>
                    <el-table-column width="160" label="SKU编号" align="center">
                        <template slot-scope="scope">{{scope.row.skuCode}}</template>
                    </el-table-column>
                    <el-table-column
                        v-for="(item,index) in item.skuStockList.slice(0,2)"
                        :label="getheader(item,index)"
                        :key="item.id"
                        align="center"
                    >
                        <template slot-scope="scope">{{getProductSkuSp(scope.row,index)}}</template>
                    </el-table-column>
                    <el-table-column label="商品库存" align="center">
                        <template slot-scope="scope">{{scope.row.stock}}</template>
                    </el-table-column>
                    <el-table-column label="库存预警值" align="center">
                        <template slot-scope="scope">{{scope.row.lowStock}}</template>
                    </el-table-column>
                    <el-table-column label="价格" align="center">
                        <template slot-scope="scope">{{scope.row.price}}</template>
                    </el-table-column>
                    <el-table-column label="赠送积分" align="center">
                        <template slot-scope="scope">{{scope.row.sendPoint}}</template>
                    </el-table-column>
                </el-table>
            </div>
        </el-card>
    </div>
</template>
<script>
import { getProduct } from "@/api/product";
import { formatDate } from "@/utils/date";
export default {
    data() {
        return {
            list: null,
            id: null,
            nameList: null,
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
                return "";
            }
            let date = new Date(time);
            return formatDate(date, "yyyy-MM-dd hh:mm:ss");
        }
    },
    methods: {
        getList() {
            getProduct(this.id).then(response => {
                let array = [];
                array.push(response.data);
                this.list = array;
            });
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
        }
    }
};
</script>
<style lang="scss" scoped>
  @import "src/styles/commoLook.scss";
</style>