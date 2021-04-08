<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="homeAdvertise"
             :rules="rules"
             ref="homeAdvertiseFrom"
             label-width="150px"
             size="small">
      <el-form-item label="门店名称：" prop="name">
        <el-input v-model="homeAdvertise.name" class="input-width"  ></el-input>
      </el-form-item>
      <el-form-item label="经营范围：">
        <el-input v-model="homeAdvertise.businessScope" class="input-width"  ></el-input>
      </el-form-item>
      <el-form-item label="门店电话：" prop="phone">
        <el-input v-model="homeAdvertise.phone" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="门店账号：" prop="phone">
        <el-input v-model="homeAdvertise.userName" :disabled="isEdit" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="推荐人：" prop="recommender">
        <el-input v-model="homeAdvertise.recommender" :disabled="isEdit" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="门店联系人：" prop="storeContact">
        <el-input v-model="homeAdvertise.storeContact" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="身份证证号：" prop="idCard">
        <el-input v-model="homeAdvertise.idCard" class="input-width"></el-input>
      </el-form-item>
       <el-form-item label="营业执照：" prop="businessLicense">
          <SingleUpload v-if="dialogVisible" :list="[homeAdvertise.businessLicense]" :limit="1" :type="4003" v-model="homeAdvertise.businessLicense" />
      </el-form-item>
      <el-form-item label="食品许可证：">
          <SingleUpload v-if="dialogVisible" :list="[homeAdvertise.foodSafetyPermit]" :limit="1" :type="4003" v-model="homeAdvertise.foodSafetyPermit" />
      </el-form-item>
      <el-form-item label="税务登记证：">
          <SingleUpload v-if="dialogVisible" :list="[homeAdvertise.taxRegistrationCertificate]" :limit="1" :type="4003" v-model="homeAdvertise.taxRegistrationCertificate" />
      </el-form-item>
      <el-form-item label="身份证正面：" prop="idCardFront">
          <SingleUpload v-if="dialogVisible" :list="[homeAdvertise.idCardFront]" :limit="1" :type="4003" v-model="homeAdvertise.idCardFront" />
      </el-form-item>
      <el-form-item label="身份证反面：" prop="idCardReverse">
          <SingleUpload v-if="dialogVisible" :list="[homeAdvertise.idCardReverse]" :limit="1" :type="4003" v-model="homeAdvertise.idCardReverse" />
      </el-form-item>
      <el-form-item label="门店照片：">
          <SingleUpload v-if="dialogVisible" :list="[homeAdvertise.storePic]" :limit="1" :type="4003" v-model="homeAdvertise.storePic" />
      </el-form-item>
      <el-form-item prop="area" label="请选择地区：">
          <VDistpicker v-model="defultAddress"></VDistpicker>
      </el-form-item> 
      <el-form-item label="详细地址：" prop="address">
        <el-input v-model="homeAdvertise.address" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="备注：">
        <el-input
          class="input-width"
          type="textarea"
          :rows="5"
          placeholder="请输入内容"
          v-model="homeAdvertise.note">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('homeAdvertiseFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('homeAdvertiseFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import SingleUpload from '@/components/Upload/upload';
  import {createHomeAdvertise, getHomeAdvertise, updateHomeAdvertise} from '@/api/shop';
  import VDistpicker from '@/components/VdIstpicker/index';
  import regular from "@/utils/regular";
  const defaultHomeAdvertise = {
    name: null,
    businessLicense: null,
    businessScope: null,
    foodSafetyPermit: null,
    taxRegistrationCertificate:null,
    note: null,
    phone: null,
    storeContact:null,
    storeSn:null,
    recommender:null,
    userName: null,
    storePic:null,
    address:null,
    password: null,
    province:null,
    idCard:null,
    idCardReverse:null,
    idCardFront:null,
    city:null,
    area:null
  };
  export default {
    components:{
      SingleUpload,
      VDistpicker
    },
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        homeAdvertise: null,
        headlineImgs:"",
        businessLicense:"",
        businessPermit:"",
        businessficate:"",
        dialogVisible:false,
        defultAddress:{
            province:null,
            city: null,
            area:null,
        },
        rules: {
          name: [
            {required: true, message: '请输入门店名称', trigger: 'blur'}
          ],
          businessLicense: [
            {required: true, message: '请选择营业执照', trigger: 'blur'}
          ],
          idCardFront:[
            {required: true, message: '请选择身份证正面', trigger: 'blur'}
          ],
          idCardReverse:[
            {required: true, message: '请选择身份证反面', trigger: 'blur'}
          ],
          idCard:[
            {required: true,validator:regular.FormValidate.Form().validateIdentity, trigger: 'blur'}
          ],
          phone: [
            {required: true,validator:regular.FormValidate.Form().validatePhone, trigger: 'blur'}
          ],
          userName: [
            {required: true,validator:regular.FormValidate.Form().validateCode, trigger: 'blur'}
          ],
          storeContact: [
            {required: true,validator:regular.FormValidate.Form().validateContacts, trigger: 'blur'}
          ],
          address: [
            {required: true, message: '请输入详细地址', trigger: 'blur'}
          ],
          area:[
            {required: true, message: '请选择地区', trigger: ['blur',"change"]}
          ],
        }
      }
    },
    created(){
      if (this.isEdit) {
        let ids = []
        ids.push(this.$route.query.id)
        let params = new URLSearchParams
        params.append('id',ids)
        this.dialogVisible = true
        getHomeAdvertise(params).then(response => {
          this.homeAdvertise = Object.assign(this.defultAddress,response.data);
        });
      }else{
        this.homeAdvertise = Object.assign({},defaultHomeAdvertise);
        this.dialogVisible = false;
      }
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if (this.isEdit) {
                this.funcImages()
                updateHomeAdvertise(this.$route.query.id,this.homeAdvertise).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                this.funcImages()
                createHomeAdvertise(this.homeAdvertise).then(response => {
                  this.$refs[formName].resetFields();
                  this.homeAdvertise = Object.assign({},defaultHomeAdvertise);
                  this.$message({
                    message: '提交成功',
                    type: 'success',
                    duration:1000
                  });
                });
              }
            });
          } else {
            this.$message({
              message: '验证失败',
              type: 'error',
              duration:1000
            });
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.homeAdvertise = Object.assign({},defaultHomeAdvertise);
      },
      funcImages() {
        if(typeof(this.homeAdvertise.businessLicense)!=='string'){
          this.homeAdvertise.businessLicense = this.homeAdvertise.businessLicense[0]
        }else if(typeof(this.homeAdvertise.foodSafetyPermit)!=='string'){
          this.homeAdvertise.foodSafetyPermit = this.homeAdvertise.foodSafetyPermit[0]
        }else if(typeof(this.homeAdvertise.taxRegistrationCertificate)!=='string'){
          this.homeAdvertise.taxRegistrationCertificate = this.homeAdvertise.taxRegistrationCertificate[0]
        }else if(typeof(this.homeAdvertise.storePic)!=='string'){
          this.homeAdvertise.storePic = this.homeAdvertise.storePic[0]
        }
      }
    }
  }
</script>
<style scoped>
  .input-width {
    width: 70%;
  }
</style>


