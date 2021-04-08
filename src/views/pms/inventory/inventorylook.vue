<template>
    <div class="detail-container">
        <el-button type="primary">
            <span v-on:click="back">返回</span>
        </el-button>
        <el-card shadow="never" class="standard-margin">
            <span class="font-title-medium">商品详情信息</span>
            <div class="form-container-border" v-for="(item,index) in list" :key="index">
                <el-row>
                    <el-col :span="6" class="form-border form-left-bg font-small">商品名称</el-col>
                    <el-col class="form-border font-small" :span="18">{{item.name}}</el-col>    
                </el-row>
                <el-row>
                    <el-col :span="6" class="form-border form-left-bg font-small">价格</el-col>
                    <el-col class="form-border font-small" :span="18">{{item.pmsSkuStock.price}}￥</el-col>
                </el-row>
                <el-row>
                    <el-col
                        class="form-border form-left-bg font-small"
                        style="height:200px;line-height: 200px;"
                        :span="6"
                    >照片</el-col>
                    <el-col class="form-border font-small" :span="18" style="height:200px">
                        <img style="width:180px;height:180px" :src="item.pmsSkuStock.pic" />
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="form-border form-left-bg font-small">销量</el-col>
                    <el-col class="form-border font-small" :span="18">{{item.pmsSkuStock.sale}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="form-border form-left-bg font-small">促销价格</el-col>
                    <el-col class="form-border font-small" :span="18">{{item.pmsSkuStock.promotionPrice}}￥</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="form-border form-left-bg font-small">锁定库存</el-col>
                    <el-col class="form-border font-small" :span="18">{{item.pmsSkuStock.lockStock}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="form-border form-left-bg font-small">总库存</el-col>
                    <el-col class="form-border font-small" :span="18">{{item.pmsSkuStock.sumStock}}</el-col>
                </el-row>
                <el-table style="width: 100%;" :data="list" border>
                    <el-table-column
                        v-for="(item,index) in item.pmsProductAttributeAndValueParamList"
                         :key="item.id" 
                         :label="item.key"
                         :property="item.value"
                         align="center">
                         <template slot-scope="scope">
                                {{scope.row.pmsProductAttributeAndValueParamList[index].value}}
                         </template>
                    </el-table-column>
                    <el-table-column label="商品库存" align="center">
                        <template slot-scope="scope">{{scope.row.pmsSkuStock.stock}}</template>
                    </el-table-column>
                    <el-table-column label="库存预警值" align="center">
                        <template slot-scope="scope">{{scope.row.pmsSkuStock.lowStock}}</template>
                    </el-table-column>
                    <el-table-column label="SKU编号" align="center">
                        <template slot-scope="scope">{{scope.row.pmsSkuStock.skuCode}}</template>
                    </el-table-column>
                </el-table>
            </div>
        </el-card>
    </div>
</template>
<script>
import { handleUpLook } from "@/api/inventory";
import { formatDate } from "@/utils/date";
export default {
    data() {
        return {
            list: null,
            id: null,
            nameList: null
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
        }
    },
    methods: {
         back(){
            this.$router.push({name:'inventory',params:{sku:this.$route.query.sku,name:this.$route.query.name}})
        },
        getList() {
            handleUpLook(this.id,{id:this.id}).then(response => {
                let array = [];
                array.push(response.data);
                this.list = array;
            });
        },
        getProductSkuSp(row, index) {
            let spData = JSON.parse(row);
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