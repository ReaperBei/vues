<template>
      <div class="detail-container">
        <el-card shadow="never" class="standard-margin">
        <span class="font-title-medium">参数配置信息</span>
        <div class="form-container-border" v-for="(item,index) in list" :key="index">
          <el-row>
            <el-col :span="6" class="form-border form-left-bg font-small">参数名称</el-col>
            <el-col class="form-border font-small" :span="18">{{item.configName}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="6" class="form-border form-left-bg font-small">参数编码</el-col>
            <el-col class="form-border font-small" :span="18">{{item.configCode}}</el-col>
          </el-row>
          <el-row>
            <el-col class="form-border form-left-bg font-small" :span="6">创建者</el-col>
            <el-col class="form-border font-small" :span="18">{{item.createBy}}</el-col>
          </el-row>
          <el-row>
            <el-col class="form-border form-left-bg font-small" :span="6">创建时间</el-col>
            <el-col class="form-border font-small" :span="18">{{item.createTime| formatDateTime}}</el-col>
          </el-row>
          <el-row>
            <el-col class="form-border form-left-bg font-small" :span="6">更新者</el-col>
            <el-col class="form-border font-small" :span="18">{{item.updateBy}}</el-col>
          </el-row>
          <el-row>
            <el-col class="form-border form-left-bg font-small" :span="6">更新时间</el-col>
            <el-col class="form-border font-small" :span="18">{{item.updateTime | formatDateTime}}</el-col>
          </el-row>
          <el-row>
            <el-col class="form-border form-left-bg font-small" :span="6">备注</el-col>
            <el-col class="form-border font-small" :span="18">{{item.remark}}</el-col>
          </el-row>
        </div>
        </el-card>
      </div>    
</template>
<script>
import {handleMessage} from '@/api/parameter';
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
            handleMessage({uuid:this.$route.query.uuid}).then(response => {
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