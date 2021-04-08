<template>
      <div class="detail-container">
        <el-card shadow="never" class="standard-margin">
        <span class="font-title-medium">会员详情信息</span>
        <div class="form-container-border" v-for="(item,index) in list" :key="index">
          <el-row>
            <el-col class="form-border form-left-bg font-small" :span="6">用户账号</el-col>
            <el-col class="form-border font-small" :span="18">{{item.username}}</el-col>
          </el-row>
          <el-row>
            <el-col class="form-border form-left-bg font-small" :span="6">昵称</el-col>
            <el-col class="form-border font-small" :span="18">{{item.nickname}}</el-col>
          </el-row>
          <el-row>
            <el-col class="form-border form-left-bg font-small" :span="6">电话号码</el-col>
            <el-col class="form-border font-small" :span="18">{{item.phone}}</el-col>
          </el-row>
          <el-row>
            <el-col class="form-border form-left-bg font-small" :span="6">金额</el-col>
            <el-col class="form-border font-small" :span="18">￥{{item.totalAccount}}</el-col>
          </el-row>
          <el-row>
            <el-col class="form-border form-left-bg font-small" style="height:100px;line-height: 100px;" :span="6">头像</el-col>
            <el-col class="form-border font-small" :span="18" style="height:100px">
              <img style="width:80px;height:80px" :src="item.icon">
            </el-col>
          </el-row>
          <el-row>
            <el-col class="form-border form-left-bg font-small" :span="6">性别</el-col>
            <el-col class="form-border font-small" :span="18" v-if="item.gender===0">未知</el-col>
            <el-col class="form-border font-small" :span="18" v-else>{{item.gender=='1'?'男':'女'}}</el-col>
          </el-row>
          <el-row>
            <el-col class="form-border form-left-bg font-small" :span="6">生日</el-col>
            <el-col class="form-border font-small" :span="18">{{item.birthday| formatDateTime}}</el-col>
          </el-row>
          <el-row>
            <el-col class="form-border form-left-bg font-small" :span="6">城市</el-col>
            <el-col class="form-border font-small" :span="18">{{item.city}}</el-col>
          </el-row>
          <el-row>
            <el-col class="form-border form-left-bg font-small" :span="6">个性签名</el-col>
            <el-col class="form-border font-small" :span="18">{{item.personalizedSignature}}</el-col>
          </el-row>
          <el-row>
            <el-col class="form-border form-left-bg font-small" :span="6">用户来源</el-col>
            <el-col class="form-border font-small" :span="18">{{item.sourceType}}</el-col>
          </el-row>
          <el-row>
            <el-col class="form-border form-left-bg font-small" :span="6">积分</el-col>
            <el-col class="form-border font-small" :span="18">{{item.integration}}</el-col>
          </el-row>
          <el-row>
            <el-col class="form-border form-left-bg font-small" :span="6">成长值</el-col>
            <el-col class="form-border font-small" :span="18">{{item.growth}}</el-col>
          </el-row>
          <el-row>
            <el-col class="form-border form-left-bg font-small" :span="6">股权数</el-col>
            <el-col class="form-border font-small" :span="18">{{item.numberOfShares}}</el-col>
          </el-row>
          <el-row>
            <el-col class="form-border form-left-bg font-small" :span="6">股权占比</el-col>
            <el-col class="form-border font-small" :span="18">{{item.shareholdingRatio}}</el-col>
          </el-row>
          <el-row>
            <el-col class="form-border form-left-bg font-small" :span="6">注册时间</el-col>
            <el-col class="form-border font-small" :span="18">{{item.createTime| formatDateTime}}</el-col>
          </el-row>
        </div>
        </el-card>
      </div>    
</template>
<script>
import {handleMessage} from '@/api/member';
import {formatDate} from '@/utils/date';
export default {
    data(){
        return{
            list:null,
            id:null
        }
    },
    components:{
        formatDate
    },
    created(){
        this.id = this.$route.query.id
        this.getList()
    },
    filters: {
      formatDateTime(time) {
        if (time == null || time === '') {
          return '';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      }
    },
    methods:{
        getList() {
            handleMessage({id:this.id}).then(response => {
                let array = [];
                array.push(response.data)
                this.list = array
            });
        }
    }
}
</script>
<style lang="scss" scoped>
  @import "src/styles/commoLook.scss";
</style>