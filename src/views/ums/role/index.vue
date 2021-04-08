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
                    <el-form-item label="角色名称：">
                        <el-input
                            v-model.trim="listQuery.keyword"
                            class="input-width"
                            placeholder="角色名称"
                            clearable
                        ></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
        <el-card class="operate-container" shadow="never">
            <i class="el-icon-tickets"></i>
            <span>数据列表</span>
            <el-button size="mini" class="btn-add" @click="handleAdd()" style="margin-left: 20px">添加</el-button>
        </el-card>
        <div class="table-container">
            <el-table
                ref="roleTable"
                :data="list"
                style="width: 100%;"
                v-loading="listLoading"
                border
            >
                <el-table-column
                    type="index"
                    label="序号"
                    align="center"
                    width="80"
                    :index="indexMethod"
                ></el-table-column>
                <el-table-column label="角色名称" align="center">
                    <template slot-scope="scope">{{scope.row.name}}</template>
                </el-table-column>
                <el-table-column label="描述" align="center">
                    <template slot-scope="scope">{{scope.row.description}}</template>
                </el-table-column>
                <el-table-column label="添加时间" width="160" align="center">
                    <template slot-scope="scope">{{scope.row.createTime | formatDateTime}}</template>
                </el-table-column>
                <el-table-column label="是否启用" width="140" align="center">
                    <template slot-scope="scope">
                        <el-switch
                            @change="handleStatusChange(scope.$index, scope.row)"
                            :active-value="10002"
                            :inactive-value="10003"
                            v-model="scope.row.status"
                        ></el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="160" align="center">
                    <template slot-scope="scope">
                        <el-row>
                            <el-button
                                size="mini"
                                type="text"
                                @click="handleSelectMenu(scope.$index, scope.row)"
                            >分配菜单</el-button>
                            <el-button
                                size="mini"
                                type="text"
                                @click="handleSelectResource(scope.$index, scope.row)"
                            >分配资源</el-button>
                        </el-row>
                        <el-row>
                            <el-button
                                size="mini"
                                type="text"
                                @click="handleUpdate(scope.$index, scope.row)"
                            >编辑</el-button>
                            <el-button
                                size="mini"
                                type="text"
                                @click="handleDelete(scope.$index, scope.row)"
                            >删除</el-button>
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
                :total="total"
            ></el-pagination>
        </div>
        <el-dialog :title="isEdit?'编辑角色':'添加角色'" :visible.sync="dialogVisible" width="40%">
            <el-form :model="role" ref="ruleForm" :rules="rules" label-width="150px" size="small">
                <el-form-item prop="name" label="角色名称：">
                    <el-input v-model="role.name" style="width: 250px"></el-input>
                </el-form-item>
                <el-form-item label="描述：">
                    <el-input
                        v-model="role.description"
                        type="textarea"
                        :rows="5"
                        style="width: 250px"
                    ></el-input>
                </el-form-item>
                <el-form-item label="是否启用：">
                    <el-radio-group v-model="role.status">
                        <el-radio :label="10002">是</el-radio>
                        <el-radio :label="10003">否</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false" size="small">取 消</el-button>
                <el-button type="primary" @click="handleDialogConfirm('ruleForm')" size="small">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import {
    fetchList,
    createRole,
    updateRole,
    updateStatus,
    deleteRole
} from "@/api/role";
import { formatDate } from "@/utils/date";
import regular from "@/utils/regular";
import awayHintForm from "@/utils/hintForm"
const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    keyword: null
};
const defaultRole = {
    id: null,
    name: null,
    description: null,
    adminCount: 0,
    status: 10002
};
export default {
    name: "roleList",
    data() {
        return {
            listQuery: Object.assign({}, defaultListQuery),
            list: null,
            total: null,
            listLoading: false,
            dialogVisible: false,
            role: Object.assign({}, defaultRole),
            isEdit: false,
            rules: {
                name: [
                    {required: true,validator: regular.FormValidate.Form().validateCharacter,trigger: "blur"}
                ]
            }
        };
    },
    created() {
        this.getList();
    },
    filters: {
        formatDateTime(time) {
            let date = new Date(time);
            return formatDate(date, "yyyy-MM-dd hh:mm:ss");
        }
    },
    methods: {
        indexMethod(index) {
            let curpage = this.listQuery.pageNum;
            let limitpage = this.listQuery.pageSize;
            return index + 1 + (curpage - 1) * limitpage;
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
        handleStatusChange(index, row) {
            this.$confirm("是否要修改该状态?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    updateStatus(row.id, {
                        id: row.id,
                        status: row.status
                    }).then(response => {
                        this.$message({
                            type: "success",
                            message: "修改成功!"
                        });
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "取消修改"
                    });
                    this.getList();
                });
        },
        handleDelete(index, row) {
            this.$confirm("是否要删除该角色?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                let ids = [];
                ids.push(row.id);
                let params = new URLSearchParams();
                params.append("ids", ids);
                deleteRole(params).then(response => {
                    this.$message({
                        type: "success",
                        message: "删除成功!"
                    });
                    this.getList();
                });
            });
        },
        handleAdd() {
            this.dialogVisible = true;
            this.isEdit = false;
            this.role = Object.assign({}, defaultRole);
            awayHintForm(this.$refs.ruleForm)
        },
        handleUpdate(index, row) {
            this.dialogVisible = true;
            this.isEdit = true;
            this.role = Object.assign({}, row);
            awayHintForm(this.$refs.ruleForm)
        },
        handleDialogConfirm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.$confirm("是否要确认?", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    }).then(() => {
                        if (this.isEdit) {
                            updateRole(this.role.id, this.role).then(
                                response => {
                                    this.$message({
                                        message: "修改成功！",
                                        type: "success"
                                    });
                                    this.dialogVisible = false;
                                    this.getList();
                                }
                            );
                        } else {
                            createRole(this.role).then(response => {
                                this.$message({
                                    message: "添加成功！",
                                    type: "success"
                                });
                                this.dialogVisible = false;
                                this.getList();
                            });
                        }
                    });
                }
            });
        },
        handleSelectMenu(index, row) {
            this.$router.push({
                path: "/ums/allocMenu",
                query: { roleId: row.id }
            });
        },
        handleSelectResource(index, row) {
            this.$router.push({
                path: "/ums/allocResource",
                query: { roleId: row.id }
            });
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
<style></style>


