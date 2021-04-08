<template>
    <div class="detail-container">
        <el-card shadow="never" class="standard-margin">
            <span class="font-title-medium">商品详情信息</span>
            <div class="form-container-border" v-for="(item,index) in list" :key="index">
                <el-row>
                    <el-col :span="6" class="form-border form-left-bg font-small">商品名称</el-col>
                    <el-col class="form-border font-small" :span="18">{{item.name}}</el-col>    
                </el-row>
                <el-row>
                    <el-col :span="6" class="form-border form-left-bg font-small">区域编码</el-col>
                    <el-col class="form-border font-small" :span="18">{{item.pmsPrice.areaCode}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="form-border form-left-bg font-small">市场价</el-col>
                    <el-col class="form-border font-small" :span="18">{{item.pmsPrice.originalPrice}}￥</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="form-border form-left-bg font-small">审核状态</el-col>
                    <el-col class="form-border font-small" :span="18">{{item.pmsPrice.auditStatus | verifyStatusFilter}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="form-border form-left-bg font-small">生效时间</el-col>
                    <el-col class="form-border font-small" :span="18">{{item.pmsPrice.startTime | formatDateTime}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="form-border form-left-bg font-small">审核人</el-col>
                    <el-col class="form-border font-small" :span="18">{{item.pmsPrice.auditor}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="form-border form-left-bg font-small">创建人</el-col>
                    <el-col class="form-border font-small" :span="18">{{item.pmsPrice.createdBy}}</el-col>
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
                    <el-table-column label="SKU编号" align="center">
                        <template slot-scope="scope">{{scope.row.pmsPrice.skuCode}}</template>
                    </el-table-column>
                </el-table>
            </div>
        </el-card>
    </div>
</template>
<script>
import { handleUpLook } from "@/api/prodcontrol";
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
                return " ";
            }
            let date = new Date(time);
            return formatDate(date, "yyyy-MM-dd hh:mm:ss");
        },
        verifyStatusFilter(value) {
        if (value === 1) {
          return '审核通过';
        } else if(value ==2) {
          return '审核未通过';
        }else {
          return '未审核';
        }
      },
    },
    methods: {
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