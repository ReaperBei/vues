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
          size="small">
          查询搜索
        </el-button>
        <el-button
          style="float:right;margin-right: 15px"
          @click="handleResetSearch()"
          size="small">
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="请输入搜索：">
            <el-input v-model="listQuery.keyword" class="input-width" placeholder="请输入用户名" clearable></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <div class="table-container">
      <el-table ref="roleTable"
                :data="list"
                style="width: 100%;"
                @selection-change="handleSelectionChange"
                v-loading="listLoading" border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column type='index' label="序号" align="center" width="80" :index='indexMethod' ></el-table-column>
        <el-table-column label="用户名" width="160" align="center">
          <template slot-scope="scope">{{scope.row.username}}</template>
        </el-table-column>
        <el-table-column label="性别" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.gender==0">未知</div>
            <div v-else>{{scope.row.gender=='1'?'男':'女'}}</div>
          </template>
        </el-table-column>
        <el-table-column label="头像" width="120" align="center">
          <template slot-scope="scope"><img class="global-image" :src="scope.row.icon" alt=""/></template>
        </el-table-column>
        <el-table-column label="职业"  width="100" align="center">
          <template slot-scope="scope">{{scope.row.job}}</template>
        </el-table-column>
        <el-table-column label="手机号码"  width="110" align="center">
          <template slot-scope="scope">{{scope.row.phone}}</template>
        </el-table-column>
        <el-table-column label="积分"  width="110" align="center">
          <template slot-scope="scope">{{scope.row.integration}}</template>
        </el-table-column>
        <el-table-column label="用户来源"  width="100" align="center">
          <template slot-scope="scope">{{scope.row.sourceType | formatDateType}}</template>
        </el-table-column>
        <el-table-column label="生日" width="160" align="center">
          <template slot-scope="scope">{{scope.row.birthday| formatDateTime}}</template>
        </el-table-column>
        <el-table-column label="注册时间" width="160" align="center">
          <template slot-scope="scope">{{scope.row.createTime| formatDateTime}}</template>
        </el-table-column>
        <el-table-column label="查看" width="100" align="center">
          <template slot-scope="scope">
            <el-row>
                <el-button size="mini"
                        type="text"
                        @click="handleShowMessage(scope.$index, scope.row)">
                查看会员信息
                </el-button>
                <br/>
                <el-button size="mini"
                        type="text"
                        @click="handleShowDiscount(scope.$index, scope.row)">
                    查看会员优惠
                </el-button>
                <br/>
                <el-button size="mini"
                        type="text"
                        @click="handleShowIntegral(scope.$index, scope.row)">
                    查看会员积分
                </el-button>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column label="是否启用" width="140" align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleStatusChange(scope.$index, scope.row)"
              :active-value="10002"
              :inactive-value="10003"
              v-model="scope.row.status">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160" align="center">
          <!-- <template slot-scope="scope">
            <el-row>
            <el-button size="mini"
                       type="text"
                       @click="handleUpdate(scope.$index, scope.row)">
              编辑
            </el-button>
            <el-button size="mini"
                       type="text"
                       @click="handleDelete(scope.row.id)">删除
            </el-button>
            </el-row>
          </template> -->
          <template slot-scope="scope">
              <el-button size="mini"
                       type="text"
                       @click="handleDonateIntegral(scope.row)">赠送积分
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="batch-operate-container">
      <el-select
        size="small"
        v-model="operateType" placeholder="批量操作">
        <el-option
          v-for="item in operates"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button
        style="margin-left: 20px"
        class="search-button"
        @click="handleBatchOperate()"
        type="primary"
        size="small">
        确定
      </el-button>
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
        :total="total">
      </el-pagination>
    </div>
    <el-dialog
      title="编辑内容"
      :visible.sync="dialogVisible"
      width="40%">
      <el-form :model="role"
               ref="roleForm"
               :rules="rules"
               label-width="150px" size="small">
        <el-form-item prop="birthday" label="生日：">
          <el-date-picker
            style="width: 250px"
            v-model="role.birthday"
            type="date"
            placeholder="请选择生日">
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="city" label="城市：">
          <el-input v-model="role.city" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item prop="gender" label="性别：">
            <el-radio-group v-model="role.gender">
                <el-radio :label="1">男</el-radio>
                <el-radio :label="2">女</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item prop="nickname" label="昵称：">
          <el-input v-model="role.nickname" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item prop="phone" label="手机号码：">
          <el-input v-model="role.phone" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item prop="personalizedSignature" label="个性签名：">
          <el-input v-model="role.personalizedSignature"
                    type="textarea"
                    :rows="5"
                    style="width: 250px"></el-input>
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
        <el-button type="primary" @click="handleDialogConfirm('roleForm')" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="赠送积分"
      :visible.sync="dialogIntegration"
      width="40%">
      <el-form
        label-width="150px"
        ref="integral"
        :model="integralList"
        :rules="rulesIntegral"
        size="small">
        <el-form-item prop="integration" label="赠送积分：">
          <el-input v-model="integralList.integration" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="验证码：" prop="code">
          <el-input v-model="integralList.code" style="width: 250px">
            <template slot="append">
              <el-button @click="btnVerify" v-if="show" type="success">验证</el-button>
              <el-button v-if="!show" type="success">{{count}}</el-button>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogIntegration = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleIntegral('integral')" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
 import upload from '@/components/Upload/upload'
  import {fetchList,deleteRole,updateRole,handleAllDelete,handleDonateIntegral,handleCode} from '@/api/member';
  import {formatDate} from '@/utils/date';
  import regular from "@/utils/regular";
  import awayHintForm from "@/utils/hintForm"
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    keyword:null
  };
  const defaultRole = {
    id:null,
    birthday: null,
    city: null,
    gender: 0,
    icon:null,
    memberLevelId:null,
    nickname:null,
    phone:null,
    password:null,
    username:null,
    status: 10002
  };
  export default {
    name: 'roleList',
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        list: null,
        total: null,
        listLoading: false,
        dialogVisible: false,
        dialogIntegration:false,
        role: Object.assign({}, defaultRole),
        operates: [
          {
            label: "删除",
            value: 0
          }
        ],
        operateType: null,
        integralList:{
          integration:null,
          memberId:null,
          code:null
        },
        show: true,
        count: "", // 初始化次数
        timer: null,
        multipleSelection:[],
        rulesIntegral:{
          integration:[{ required: true,validator:regular.FormValidate.Form().valiminPoint, trigger: 'blur'}],
          code:[{ required: true,message: '请输入验证码', trigger: 'blur'}],
        },
        rules:{
            city:[{ required: true, message: '请输入城市', trigger: 'blur'}],
            birthday:[{ required: true, message: '请输选择生日', trigger: 'blur'}],
            gender:[{ required: true, message: '请输选择性别', trigger: 'blur'}],
            nickname:[{ required: true, message: '请输入昵称', trigger: 'blur'}],
            phone:[{ required: true, validator:regular.FormValidate.Form().validatePhone, trigger: 'blur'}]
        }
      }
    },
    created() {
      this.getList();
    },
    filters: {
      formatDateTime(time) {
        if (time == null || time === '') {
          return '';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      },
      formatDateType(value){
        if(value==1){
          return '小程序'
        }else if(value==2){
          return '安卓'
        }else if(value==3){
          return 'IOS'
        }else if(value==4){
          return '门店注册'
        }
      }
    },
    methods: {
      indexMethod (index) {
        let curpage = this.listQuery.pageNum
        let limitpage = this.listQuery.pageSize
        return (index+1) + (curpage-1)*limitpage
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
       handleSelectionChange(val){
        this.multipleSelection = val;
      },
      handleBatchOperate(){
        if (this.multipleSelection < 1) {
          this.$message({
            message: '请选择一条记录',
            type: 'warning',
            duration: 1000
          });
          return;
        }
        let idarr = [];
        for (let i = 0; i < this.multipleSelection.length; i++) {
          idarr.push(this.multipleSelection[i].id);
        }
        if(this.operateType===0){
          //删除
          this.handleAllDelete(idarr);
        }else {
          this.$message({
            message: '请选择批量操作类型',
            type: 'warning',
            duration: 1000
          });
        }
      },
      handleStatusChange(index, row) {
        this.$confirm('是否要修改该状态?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          updateRole(row.id, {status: row.status,id:row.id}).then(response => {
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消修改'
          });
          this.getList();
        });
      },
      handleAllDelete(idarr) {
        this.$confirm('是否要删除该数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params=new URLSearchParams();
          params.append("id",idarr);
          handleAllDelete(params).then(response => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getList();
          });
        });
      },
      handleDelete(ids) {
        this.$confirm('是否要删除该数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params=new URLSearchParams();
          params.append("id",ids);
          deleteRole(params).then(response => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getList();
          });
        });
      },
      handleShowMessage(index, row){
        this.$router.push({path: '/cms/memberMessage', query: {id: row.id}})
      },
      handleShowDiscount(index, row) {
        this.$router.push({path: '/cms/discounts', query: {id: row.id}})
      },
      handleShowIntegral(index, row) {
        this.$router.push({path: '/cms/memberIntegral', query: {id: row.id}})
      },
      btnVerify(){
        handleCode().then(response =>{
          if(response.code=='200'){
            const TIME_COUNT = 30; //更改倒计时时间
            if (!this.timer) {
                this.count = TIME_COUNT;
                console.log(this.count)
                this.show = false;
                this.timer = setInterval(() => {
                    if (this.count > 0 && this.count <= TIME_COUNT) {
                        this.count--;
                    } else {
                        this.show = true;
                        clearInterval(this.timer); // 清除定时器
                        this.timer = null;
                    }
                }, 1000);
            }
            this.$message({
              message: response.data,
              type: 'success'
            });
          }else{
            this.$message({
              message: response.data,
              type: 'error'
            });
          }
        })
      },
      handleUpdate(index, row) {
        this.dialogVisible = true;
        this.role = Object.assign({},row);
      },
      handleDialogConfirm(formName) {
            this.$refs[formName].validate((valid) =>{
              if(valid){
                updateRole(this.role.id,this.role).then(response => {
                  this.$message({
                    message: '修改成功！',
                    type: 'success'
                  });
                  this.dialogVisible =false;
                  this.getList();
                })
              }
            })
      },
      handleDonateIntegral(row){
          this.dialogIntegration =true;
          awayHintForm(this.$refs.integral)
          this.integralList.memberId=row.id;
      },
      handleIntegral(formName){
          this.$refs[formName].validate((valid) =>{
                if(valid){
                  handleDonateIntegral(this.integralList).then(response=>{
                    this.$message({
                      message: '赠送成功！',
                      type: 'success'
                    });
                    this.dialogIntegration = false
                    this.getList();
                  })
                }
          })
      },
      getList() {
        this.listLoading = true;
        fetchList(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data.list
          this.total = response.data.total;
        });
      }
    }
  }
</script>
<style></style>
