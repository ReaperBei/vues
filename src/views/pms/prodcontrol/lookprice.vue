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
                            class="input-width"
                            placeholder="请输入商品名称"
                            clearable
                        ></el-input>
                    </el-form-item>
                     <el-form-item label="sku编码：">
                        <el-input
                            v-model.trim="listQuery.skuCode"
                            class="input-width"
                            placeholder="请输入sku编码"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="请输入区域编码：">
                        <el-input
                            v-model.trim="listQuery.areaCode"
                            class="input-width"
                            placeholder="请输入区域编码"
                            clearable
                        ></el-input>
                    </el-form-item>
                   
                </el-form>
            </div>
        </el-card>
        <!-- <div class="table-container">
        <el-table-column label="操作" width="160" align="center">
          <template slot-scope="scope">
            <el-row>
                <el-button size="mini"
                          type="text"
                          @click="handleUpLook(scope.row.pmsPrice)">查看
                </el-button>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
        </div>-->
        <div class="layout">
            <el-table :data="list" border>
                <el-table-column prop="name">
                    <template slot-scope="scope">
                        <div class="tab_header">
                            <span style="font-weight:600;">{{scope.row.name}}</span>
                            <div class="operate">
                                <span @click="handleAdd(scope.$index, scope.row)">添加</span>
                                <span @click="handleUpLook(scope.$index, scope.row)">查看</span>
                            </div>
                        </div>
                        <div class="table-item">
                            <div class="item">规格</div>
                            <div class="item item-list">SKU编码</div>
                            <div class="item datalistBox">
                                <div class="list">区域编号</div>
                                <div class="list list-coding">区域名字</div>
                                <div class="list">审核状态</div>
                                <div class="list">审核人</div>
                                <div class="list">创建人</div>
                                <div class="list">市场价</div>
                                <div class="list">销售价格</div>
                                <div class="list">赠送积分</div>
                                <div class="list">生效时间</div>
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
                            <div class="item item-list" style="border-left:1px solid #ddd;">{{item.skuCode}}</div>
                            <div class="item datalist datalist-box">
                                <div
                                    class="list list-box"
                                    v-for="(items,i)  in  item.priceInfos"
                                    :key="i"
                                >
                                    <div class="text text-coding">{{items.areaCode}}</div>
                                    <div class="text coding-name">{{items.areaName}}</div>
                                    <div class="text">{{items.auditStatus |verifyStatusFilter}}</div>
                                    <div class="text">{{items.auditor==""?' ':items.auditor}}</div>
                                    <div class="text">{{items.createdBy}}</div>
                                    <div class="text">{{items.originalPrice}}</div>
                                    <div class="text">{{items.price}}</div>
                                    <div class="text">{{items.sendPoint}}</div>
                                    <div class="text">{{items.startTime}}</div>
                                </div>
                            </div>
                            <div class="handle-box">
                                 <div class="handle-btn"
                                    v-for="(itemis,s)  in  item.priceInfos"
                                    :key="s">
                                    <div class="btn" type="text" @click="handleUpdate(scope.$index, itemis)" v-if="itemis.auditStatus==1?false:true">修改</div>
                                    <div class="btn" type="text" @click="handleDelete(scope.$index, itemis)" v-if="itemis.auditStatus==1?false:true">删除</div>
                                    <div class="btn" type="text" @click="handleShowAudit(scope.$index, itemis)" v-if="itemis.auditStatus==1?false:true">审核</div>
                                </div>
                            </div>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- <div class="batch-operate-container">
            <el-select size="small" v-model="operateType" placeholder="批量操作">
                <el-option
                    v-for="item in operates"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                ></el-option>
            </el-select>
            <el-button
                style="margin-left: 20px"
                class="search-button"
                @click="handleBatchOperate()"
                type="primary"
                size="small"
            >确定</el-button>
        </div> -->
        <div class="pagination-container">
            <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                layout="total, sizes,prev, pager, next,jumper"
                :current-page.sync="listQuery.pageNum"
                :page-size="listQuery.pageSize"
                :page-sizes="[5,10,15]"
                :total="total"
            ></el-pagination>
        </div>
        <el-dialog title="审核" :visible.sync="dialogVisibleis" width="40%">
            <el-form :model="role" :rules="rulesState" ref="roleFormis" label-width="150px" size="small">
                <el-form-item prop="verifyStatus" label="审核：">
                    <el-radio-group v-model="role.auditStatus">
                        <el-radio :label="1">审核通过</el-radio>
                        <el-radio :label="2">未审不通过</el-radio>
                    </el-radio-group>
                </el-form-item>
                 <el-form-item prop="note" label="审核意见：">
                        <el-input v-model="role.note"
                            type="textarea"
                            :rows="5"
                            style="width:250px"
                            ></el-input>
                    </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisibleis = false" size="small">取 消</el-button>
                <el-button type="primary" @click="handleEditAudit('roleFormis')" size="small">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog :title="isEdit?'编辑':'添加'" :visible.sync="dialogVisible" width="40%">
            <el-form :model="role" ref="roleForm" :rules="rules" label-width="150px" size="small">
                <el-form-item prop="originalPrice" label="市场价：">
                    <el-input v-model="role.originalPrice" style="width: 250px"></el-input>
                </el-form-item>
                <el-form-item prop="price" label="价格：">
                    <el-input v-model="role.price" style="width: 250px"></el-input>
                </el-form-item>
                <el-form-item prop="sendPoint" label="赠送积分：">
                    <el-input v-model="role.sendPoint" style="width: 250px"></el-input>
                </el-form-item>
                 <el-form-item v-if="isList" prop="areaCode" label="地区：">
                    <VDistpicker v-model="defultAddress"></VDistpicker>
                  </el-form-item>
                <el-form-item prop="skuCode" v-if="isList" label="sku编码：">
                    <el-select v-model="role.skuCode" style="width: 250px" placeholder="全部" clearable class="input-width">
                      <el-option v-for="(item,index) in skuList"
                          :key="index"
                          :label="getheader(item.spData)"
                          :value="item.skuCode"
                           >
                      </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-if="isList" label="生效时间：" prop="startTime">
                  <el-date-picker
                    style="width: 250px"
                    type="datetime"
                    :picker-options="pickerOptions"
                    placeholder="选择日期"
                    v-model="role.startTime"></el-date-picker>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false" size="small">取 消</el-button>
                <el-button type="primary" @click="handleDialogConfirm('roleForm')" size="small">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import {
    fetchList,
    createRole,
    deleteRole,
    updateRole,
    updateStatus,
    handleBatchUpdata,
    handleEditAudit
} from "@/api/prodcontrol";
import { formatDate } from "@/utils/date";
import VDistpicker from '@/components/VdIstpicker/araeCode';
import regular from "@/utils/regular";
const defaultListQuery = {
    pageNum: 1,
    pageSize: 5,
    areaCode: null,
    productName: null,
    skuCode: null
};
const defaultRole = {
    	areaCode: "",
        auditStatus: "",
        auditor: "",
        createdBy: "",
        deleted: "",
        id: "",
        originalPrice: "",
        price: "",
        productId: "",
        note:null,
        skuCode: "",
        startTime: "",
        sendPoint:""
};
export default {
    name: "roleList",
    data() {
        return {
            listQuery: Object.assign({}, defaultListQuery),
            list: null,
            skuList:[],
            defultAddress:{
                province:null,
                city: null,
                area:null,
            },
            total: null,
            listLoading: false,
            dialogVisible: false,
            dialogVisibleis: false,
            role: Object.assign({}, defaultRole),
            isList:false,
            isEdit: false,
            operates: [
                {
                    label: "删除",
                    value: 0
                }
            ],
            operateType: null,
            multipleSelection: [],
            rulesState:{
                auditStatus: [{required: true,message: "请选择审核",trigger: 'blur'}],
                note: [{required: true,message: "请选择备注",trigger: 'blur'}],
            },
            rules: {
                originalPrice: [{ required: true,validator:regular.FormValidate.Form().validateNumber, trigger: "blur" }],
                price: [{required: true,validator:regular.FormValidate.Form().validateNumber,trigger: "blur"}],
                sendPoint:[{required: true,validator:regular.FormValidate.Form().validateNumber,trigger: "blur"}],
                areaCode: [{required: true,message: "请选择地区",trigger: 'blur'}],
                skuCode: [{required: true,message: "请输选择sku编码",trigger: ["blur",'change']}],
                startTime: [{required: true,message: "请输选择生效时间",trigger: "blur"}]
            },
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            }
        };
    },
    created() {
        this.getList();
    },
    filters: {
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
    components:{
      VDistpicker
    },
    methods: {
        handleShowAudit(index, row) {
            this.dialogVisibleis = true;
            this.role.auditStatus = 1
            this.role.id = row.id
        },
        getheader(row) {
            let spData = JSON.parse(row)
            let headerText=''
            spData.forEach(element => {
                headerText += element.key+' '+'('+element.value+')'
            });
            return headerText
        },
        handleEditAudit(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let params = new URLSearchParams();
                    params.append("auditStatus", this.role.auditStatus);
                    params.append("note", this.role.note);
                    params.append("id", this.role.id);
                    handleEditAudit(this.role.id, params).then(response => {
                        this.$message({
                            message: "审核成功！",
                            type: "success"
                        });
                        this.dialogVisibleis = false;
                        this.getList();
                    });
                }
            });
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
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        handleBatchOperate() {
            if (this.multipleSelection < 1) {
                this.$message({
                    message: "请选择一条记录",
                    type: "warning",
                    duration: 1000
                });
                return;
            }
            let idarr = [];
            for (let i = 0; i < this.multipleSelection.length; i++) {
                idarr.push(this.multipleSelection[i].pmsPrice.id);
            }
            if (this.operateType === 0) {
                //更新
                this.handleBatchUpdata(idarr);
            } else {
                this.$message({
                    message: "请选择批量操作类型",
                    type: "warning",
                    duration: 1000
                });
            }
        },
        handleBatchUpdata(ids) {
            this.$confirm("是否要更新数据?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                let params = new URLSearchParams();
                params.append("ids", ids);
                handleBatchUpdata(params).then(response => {
                    this.$message({
                        type: "success",
                        message: "更新数据成功!"
                    });
                    this.getList();
                });
            });
        },
        handleDelete(index,ids) {
            this.$confirm("是否要删除该数据?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                let params = new URLSearchParams();
                params.append("id", ids.id);
                deleteRole(ids.id, params).then(response => {
                    this.$message({
                        type: "success",
                        message: "删除成功!"
                    });
                    this.getList();
                });
            });
        },
        handleUpLook(index,row) {
            this.$router.push({path: "/pms/priceRecord/",query: { id: row.productId} });
        },
        handleAdd(index,row) {
            this.skuList= row.areaSkuInfos
            this.dialogVisible = true;
            this.isEdit = false;
            this.isList = true
            this.role=Object.assign({}, defaultRole)
            this.role.productId = row.productId
            this.role.areaCode = this.defultAddress.area
        },
        handleUpdate(index, row) {
            this.dialogVisible = true;
            this.isEdit = true;
            this.isList = false
            this.role = Object.assign({},row);
        },
        formatDateTime(time) {
            if (time == null || time === "") {
                return " ";
            }
            let date = new Date(time);
            return formatDate(date, "yyyy-MM-dd hh:mm:ss");
        },
        handleDialogConfirm(formName) {
            if (this.isEdit) {
                updateRole(this.role.id, this.role).then(response => {
                    this.$message({
                        message: "修改成功！",
                        type: "success"
                    });
                    this.dialogVisible = false;
                    this.getList();
                });
            } else {
                this.role.areaCode = this.defultAddress.area
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        let dats = this.formatDateTime(this.role.startTime)
                        Object.assign(this.role,{startTime:dats,areaCode:this.defultAddress.area})
                        console.log(this.role,'添加...')
                        createRole(this.role).then(response => {
                            this.$message({
                                message: "添加成功！",
                                type: "success"
                            });
                            this.dialogVisible = false;
                            this.role=Object.assign({}, defaultRole);
                            this.defultAddress.area = "";
                            this.defultAddress.city="";
                            this.defultAddress.province="";
                            this.getList();
                        });
                    }
                });
            }
        },
        getList() {
            this.listLoading = true;
            fetchList(this.listQuery).then(response => {
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
