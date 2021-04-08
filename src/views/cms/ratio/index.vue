<template>
  <el-card class="container" shadow="never">
    <el-form :model="orderSetting"
             ref="orderSettingForm"
             :rules="rules"
             label-width="160px">
      <el-row>
        <el-col :span="12">
            <el-form-item label="大学生：" prop="collegeStudent">
              <el-input v-model="orderSetting.collegeStudent" @keyup.native="trimLR(orderSetting.collegeStudent)">
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
        </el-col>
        <el-col :span="12">
            <el-form-item label="合作者金额：" prop="collegeMoney">
              <el-input v-model="orderSetting.collegeMoney" :disabled="true">
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
            <el-form-item label="收益比例：" prop="earnings">
              <div class="input-box">
                  <el-input v-model="orderSetting.earnings">
                      <template slot="append">%</template>
                  </el-input>
                  <div class="note-margin">份额(1份)</div>
              </div>
            </el-form-item>
        </el-col>
        <el-col :span="12">
              <el-form-item label="金额：" prop="money">
                  <el-input v-model="orderSetting.money" :disabled="true">
                    <template slot="append">元</template>
                  </el-input>
              </el-form-item>
        </el-col>
      </el-row>
      <el-row >
          <el-col :span="12">
              <el-form-item label="收益比例：" prop="earningsRatio">
                <div class="input-box">
                    <el-input v-model="orderSetting.earningsRatio">
                      <template slot="append">%</template>
                    </el-input>
                    <div class="note-margin">份额(2份)</div>
                </div>
                </el-form-item>
          </el-col>
          <el-col :span="12">
                <el-form-item label="金额：" prop="ratioMoney">
                  <el-input v-model="orderSetting.ratioMoney" :disabled="true">
                    <template slot="append">元</template>
                  </el-input>
                </el-form-item>
          </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
            <el-form-item label="收益比例：" prop="earningsRatios">
              <div class="input-box">
                  <el-input v-model="orderSetting.earningsRatios">
                    <template slot="append">%</template>
                  </el-input>
                  <div class="note-margin">份额(3份)</div>
              </div>
            </el-form-item>
        </el-col>
        <el-col :span="12">
            <el-form-item label="金额：" prop="ratiosMoney">
              <el-input v-model="orderSetting.ratiosMoney" :disabled="true">
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="直推门店收益：" prop="store">
        <el-input v-model="orderSetting.store" class="input-width">
          <template slot="append">%</template>
        </el-input>
      </el-form-item>
      <el-form-item label="非直推门店收益：" prop="undirectStore">
        <el-input v-model="orderSetting.undirectStore" class="input-width">
          <template slot="append">%</template>
        </el-input>
      </el-form-item>
      <el-form-item label="非直推门店下单：" prop="directStore">
        <el-input v-model="orderSetting.directStore" class="input-width">
          <template slot="append">%</template>
        </el-input>
        <span>(会员直推门店收益)</span>
      </el-form-item>
      <el-form-item>
        <el-button
          @click="confirm('orderSettingForm')"
          type="primary">提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {fetchList,createRole,updateRole} from '@/api/ratio';
  import regular from "@/utils/regular";
  const defaultOrderSetting = {
      id:"",
    	collegeMoney: "",
      collegeStudent: "",
      directStore: "",
      earnings: "",
      earningsRatio: "",
      earningsRatios: "",
      money: "",
      ratioMoney: "",
      ratiosMoney: "",
      store: "",
      undirectStore: "",
      updateMan: "",
      updateTime: ""
  };
  const checkTime = (rule, value, callback) => {
    if (!value) {
      return callback(new Error('内容不能为空'));
    }
    let regs = /^\s+|\s+$/
    if(regs.test(value)){
      return callback(new Error('不能输入空格'));
    }
    const resNumber = /^\d+$|^\d+[.]?\d+$/
    if (!resNumber.test(value)) {
      return callback(new Error('请输入数字值'));
    }else{
       callback();
    }
    
  };
  export default {
    name: 'orderSetting',
    data() {
      return {
        orderSetting: Object.assign({}, defaultOrderSetting),
        rules: {
          collegeStudent:{validator: checkTime, trigger: 'blur' },
          collegeMoney:{validator: checkTime, trigger: 'blur' },
          earnings:{validator: checkTime, trigger: 'blur' },
          earningsRatio: {validator: checkTime, trigger: 'blur' },
          earningsRatios: {validator: checkTime, trigger: 'blur' },
          store:{validator: checkTime, trigger: 'blur' },
          undirectStore:{validator: checkTime, trigger: 'blur' },
          directStore:{validator: checkTime, trigger: 'blur' }
        }
      }
    },
    created(){
      this.getDetail();
    },
    methods:{
      trimLR(vaules) {
        if(this.orderSetting.collegeStudent==vaules){
          this.orderSetting.collegeStudent = vaules.replace(/^\s+|\s+$/gm,'')
        }
          //replace(/^\s+|\s+$/gm,'')去除input的空字符串
      },
      confirm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否要提交修改?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              const data = {
                collegeStudent:this.orderSetting.collegeStudent/'100',
                earnings:this.orderSetting.earnings/'100',
                earningsRatio:this.orderSetting.earningsRatio/'100',
                earningsRatios:this.orderSetting.earningsRatios/'100',
                store:this.orderSetting.store/'100',
                undirectStore:this.orderSetting.undirectStore/'100',
                directStore:this.orderSetting.directStore/'100',
              }
              const orders = Object.assign(this.orderSetting,data)
              updateRole(orders).then(response=>{
                this.$message({
                  type: 'success',
                  message: '提交成功!',
                  duration:1000
                });
                this.getDetail()
              })
            });
          } else {
            this.$message({
              message: '提交参数不合法',
              type: 'warning'
            });
            return false;
          }
        });
      },
      getDetail(){
        fetchList().then(response=>{
          this.orderSetting=response.data;
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .input-box{
    display: flex;
    width: 220px;
  }
   /deep/.note-margin{
      width: 82px;
    }
  .input-width {
    width: 50%;
  }
  .container{
      position: absolute;
      left: 0;
      right: 0;
      width:800px;
      padding: 35px 35px 15px 35px;
      margin: 20px auto;
  }
  /* .note-margin {
    margin-left: 15px;
  } */
</style>