<template>
    <div class="detail-container">
        <el-card shadow="never" class="standard-margin">
            <div v-for="(item,index) in list" :key="index" v-loading="loading">
                <span class="font-title-medium">个人中心</span>
                <el-button size="medium" type="text" @click="handleUpdate(item.username)">修改密码</el-button>
                <div
                    class="form-container-border"
                    >
                    <el-row>
                        <el-col :span="6" class="form-border form-left-bg font-small">用户名</el-col>
                        <el-col class="form-border font-small" :span="18">{{item.username}}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6" class="form-border form-left-bg font-small">城市</el-col>
                        <el-col class="form-border font-small" :span="18">{{item.city==''?'':item.city}}</el-col>
                    </el-row>
                    <el-row>
                        <el-col
                            :span="6"
                            class="form-border form-left-bg font-small"
                            style="height:100px;line-height:100px;"
                        >图像</el-col>
                        <el-col class="form-border font-small" style="height:100px" :span="18">
                            <img style="height:100%" :src="item.icon" alt />
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6" class="form-border form-left-bg font-small">邮箱</el-col>
                        <el-col class="form-border font-small" :span="18">{{item.email}}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6" class="form-border form-left-bg font-small">昵称</el-col>
                        <el-col class="form-border font-small" :span="18">{{item.nickName}}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6" class="form-border form-left-bg font-small">创建时间</el-col>
                        <el-col
                            class="form-border font-small"
                            :span="18"
                        >{{item.createTime | formatDateTime}}</el-col>
                    </el-row>
                </div>
            </div>
        </el-card>
        <el-dialog title="修改资料" :visible.sync="dialogVisible" width="40%">
                <el-form
                    :model="roleForm"
                    :rules="rules"
                    ref="roleForm"
                    label-width="150px"
                    size="small"
                >
                <el-form-item label="用户名">
                    <el-input v-model="roleForm.username" :disabled="true" style="width:50%"></el-input>
                </el-form-item>
                <el-form-item label="旧密码" prop="oldPassword">
                    <el-input type="password" style="width:50%" v-model="roleForm.oldPassword"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPassword">
                    <el-input type="password" style="width:50%" v-model="roleForm.newPassword"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" style="width:50%" v-model="roleForm.checkPass"></el-input>
                </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false" size="small">取 消</el-button>
                    <el-button
                        type="primary"
                        @click="handleDialogConfirm('roleForm')"
                        size="small"
                    >确 定</el-button>
                </span>
            </el-dialog>
    </div>
</template>
<script>
import { createRole,updateRole} from "@/api/myCenter";
import { formatDate } from "@/utils/date";
import awayHintForm from "@/utils/hintForm"
const defaultRole = {
    username:null,
    newPassword:null,
    oldPassword:null,
    checkPass:null,
} 
export default {
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === ''||value==null) {
            callback(new Error('请输入密码'));
            } else {
            if (this.roleForm.checkPass !== '') {
                this.$refs.roleForm.validateField('checkPass');
            }
            callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === ''||value==null) {
            callback(new Error('请再次输入密码'));
            } else if (value !== this.roleForm.newPassword) {
            callback(new Error('两次输入密码不一致!'));
            } else {
            callback();
            }
        };
        return {
            list: null,
            id: null,
            loading:true,
            roleForm:Object.assign({},defaultRole),
            dialogVisible:false,
            rules: {
                newPassword: [
                    {validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    {validator: validatePass2, trigger: 'blur' }
                ],
                oldPassword:[
                    {required: true, message: '请输入旧密码', trigger: 'blur'}
                ],
            }
        };
    },
    components: {
        formatDate
    },
    created() {
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
        handleUpdate(row){
            awayHintForm(this.$refs.roleForm)
            this.dialogVisible = true
            this.roleForm = Object.assign(defaultRole,{username:row})
        },
        handleDialogConfirm(formName) {
            this.$refs[formName].validate((valid) =>{
              if(valid){
                const data = {
                    username:this.roleForm.username,
                    newPassword:this.roleForm.newPassword,
                    oldPassword:this.roleForm.oldPassword,
                }
                updateRole(data).then(response => {
                  this.$message({
                    message: '修改成功！',
                    type: 'success'
                  });
                  this.dialogVisible =false;
                  this.$store.dispatch('LogOut').then(() => {
                        location.reload() // 为了重新实例化vue-router对象 避免bug
                    })
                })
              }
            })
          },
        getList() {
            this.loading=true
            createRole().then(response => {
                let arry = []
                arry.push(response.data);
                this.loading= false
                this.list = arry
            });
        }
    }
};
</script>
<style lang="scss" scoped>
@import "src/styles/commoLook.scss";
</style>