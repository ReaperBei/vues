<template>
    <div class="app-container">
        <el-card class="operate-container" shadow="never">
            <i class="el-icon-tickets"></i>
            <span>数据列表</span>
        </el-card>
        <el-tabs v-model="activeName">
            <el-tab-pane label="价格台账" name="first" :key="'first'">
                <el-card class="filter-container" shadow="never">
                    <div>
                        <i class="el-icon-search"></i>
                        <span>筛选搜索</span>
                        <el-button
                            style="float:right"
                            type="primary"
                            @click="handleSearchList()"
                            size="small"
                        >查询搜索</el-button>
                        <el-button
                            style="float:right;margin-right: 15px"
                            @click="handleResetSearch()"
                            size="small"
                        >重置</el-button>
                    </div>
                    <div style="margin-top: 15px">
                        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
                            <el-form-item label="请输入商品名称：">
                                <el-input
                                    v-model.trim="listQuery.productName"
                                    style="width: 203px"
                                    class="input-width"
                                    placeholder="请输入商品名称"
                                    clearable
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="请输入sku编码：">
                                <el-input
                                    v-model.trim="listQuery.skuCode"
                                    style="width: 203px"
                                    class="input-width"
                                    placeholder="请输入sku编码"
                                    clearable
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="请输入区域编码：">
                                <el-input
                                    v-model.trim="listQuery.areaCode"
                                    style="width: 203px"
                                    class="input-width"
                                    placeholder="请输入区域编码"
                                    clearable
                                ></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-card>
                <div class="layout">
                    <el-table :data="list" border>
                        <el-table-column prop="name">
                            <template slot-scope="scope">
                                <div class="tab_header">
                                    <span style="font-weight:600;">{{scope.row.name}}</span>
                                </div>
                                <div class="table-item">
                                    <div class="item">规格</div>
                                    <div class="item">SKU编码</div>
                                    <div class="item item-box">
                                        <div class="list">区域</div>
                                        <div class="list">区域编码</div>
                                        <div class="list">价格</div>
                                        <div class="list">市场价格</div>
                                        <div class="list">赠送积分</div>
                                        <div class="list">更新时间</div>
                                    </div>
                                </div>
                                <div
                                    class="table-item"
                                    v-for="(item,index) in scope.row.areaSkuInfos"
                                    :key="index"
                                >
                                    <div class="item">
                                        <div v-for="(h,t) in JSON.parse(item.spData)" :key="t">
                                            {{h.key}}({{h.value}})
                                            <br />
                                        </div>
                                    </div>
                                    <div
                                        class="item"
                                        style="border-left:1px solid #ddd;"
                                    >{{item.skuCode}}</div>
                                    <div class="item datalist item-box">
                                        <div
                                            class="list"
                                            v-for="(items,i)  in  item.areaPriceInfos"
                                            :key="i"
                                        >
                                            <div class="text">{{items.areaName}}</div>
                                            <div class="text">{{items.areaCode}}</div>  
                                            <div class="text">{{items.price}}</div>
                                            <div class="text">{{items.originalPrice}}</div>
                                            <div class="text">{{items.sendPoint}}</div>
                                            <div class="text">{{items.updatedTime}}</div>
                                        </div>
                                    </div>
                                </div>
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
                        :total="total"
                    ></el-pagination>
                </div>
            </el-tab-pane>
            <el-tab-pane label="价格列表" name="second" :key="'second'">
                <listData />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
// createRole,updateRole,updateStatus,deleteRole
import { fetchLists, handleUpDelete } from "@/api/prodcontrol";
import { formatDate } from "@/utils/date";
import listData from "./lookprice";
const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    skuCode: null,
    productName: null,
    areaCode: null
};
export default {
    name: "roleList",
    data() {
        return {
            listQuery: Object.assign({}, defaultListQuery),
            list: null,
            total: null,
            areaSkuInfosList: null,
            activeName: "first",
            listData: null
        };
    },
    created() {
        this.getList();
    },
    components: {
        listData
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
                return "审核通过";
            } else if (value == 2) {
                return "审核未通过";
            } else {
                return "未审核";
            }
        }
    },
    methods: {
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
        handleUpDelete(index, row) {
            this.$confirm("是否要删除该数据?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                let params = new URLSearchParams();
                params.append("id", row.productId);
                handleUpDelete(row.productId).then(response => {
                    this.$message({
                        type: "success",
                        message: "删除成功!"
                    });
                    this.getList();
                });
            });
        },
        handleLookPrice(row) {
            this.$router.push({
                path: "/pms/lookprice",
                query: {
                    id: row.productId,
                    skuCode: row.skuCode,
                    areaCode: row.areaCode
                }
            });
        },
        handleUpLookRecord(row) {
            this.$router.push({
                path: "/pms/priceRecord",
                query: {
                    id: row.productId,
                    skuCode: row.skuCode,
                    areaCode: row.areaCode
                }
            });
        },
        getList() {
            this.listLoading = true;
            fetchLists(this.listQuery).then(response => {
                this.listLoading = false;
                this.list = response.data.list;
                this.total = response.data.total;
            });
        }
    }
};
</script>
<style lang="scss" scoped>
@import "src/styles/prodcontrol.scss";
</style>
