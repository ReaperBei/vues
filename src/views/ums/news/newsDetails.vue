<template>
    <div class="detail-container">
        <el-card shadow="never" class="standard-margin">
            <span class="font-title-medium">消息详情信息</span>
            <div class="form-container-border" v-for="(item,index) in list" :key="index">
                 <el-row>
                    <el-col :span="6" class="form-border form-left-bg font-small">标题</el-col>
                    <el-col class="form-border font-small" :span="18">{{item.title}}</el-col>
                </el-row>
                <el-row style="height:80px">
                    <el-col :span="6" style="height:80px;line-height:80px;" class="form-border form-left-bg font-small">内容</el-col>
                    <el-col class="form-border font-small" style="height:80px" :span="18">
                        <div class="text-overflow" :title="item.content">
                            {{item.content}}
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="form-border form-left-bg font-small">等级</el-col>
                    <el-col class="form-border font-small" :span="18">{{item.grade}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="form-border form-left-bg font-small">消息类型</el-col>
                    <el-col class="form-border font-small" :span="18">{{item.msgType}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="form-border form-left-bg font-small">来源类型</el-col>
                    <el-col class="form-border font-small" :span="18">{{item.sourceType==''? ' ':item.sourceType}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="form-border form-left-bg font-small">提醒类型</el-col>
                    <el-col class="form-border font-small" :span="18">{{item.remindType}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="form-border form-left-bg font-small">创建人</el-col>
                    <el-col class="form-border font-small" :span="18">{{item.createdBy}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="form-border form-left-bg font-small">创建时间</el-col>
                    <el-col class="form-border font-small" :span="18">{{item.createdTime | formatDateTime}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="form-border form-left-bg font-small">撤销时间</el-col>
                    <el-col class="form-border font-small" :span="18">{{item.revokeTime | formatDateTime}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="form-border form-left-bg font-small">消息编码</el-col>
                    <el-col class="form-border font-small" :span="18">{{item.msgCode}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="form-border form-left-bg font-small">发送人</el-col>
                    <el-col class="form-border font-small" :span="18">{{item.sendBy}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="form-border form-left-bg font-small">发送时间</el-col>
                    <el-col class="form-border font-small" :span="18">{{item.sendTime | formatDateTime}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="form-border form-left-bg font-small">是否启用状态</el-col>
                    <el-col class="form-border font-small" :span="18">{{item.state==0?'禁用':'启用'}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="form-border form-left-bg font-small">更新人</el-col>
                    <el-col class="form-border font-small" :span="18">{{item.updatedBy}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="form-border form-left-bg font-small">更新时间</el-col>
                    <el-col class="form-border font-small" :span="18">{{item.updatedTime | formatDateTime}}</el-col>
                </el-row>
            </div>
        </el-card>
    </div>
</template>
<script>
import { handleMessage } from "@/api/news";
import { formatDate } from "@/utils/date";
export default {
    data() {
        return {
            list: null
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
                return " ";
            }
            let date = new Date(time);
            return formatDate(date, "yyyy-MM-dd hh:mm:ss");
        }
    },
    methods: {
        getList() {
            handleMessage(this.$route.query.id,{id:this.$route.query.id}).then(response => {
                let array = [];
                array.push(response.data);
                this.list = array;
            });
        }
    }
};
</script>
<style lang="scss" scoped>
@import "src/styles/commoLook.scss";
  /deep/.text-overflow{
  display: -webkit-box;
  overflow: hidden;
  /*! autoprefixer: off */
    -webkit-box-orient: vertical;
  /* autoprefixer: on */
  -webkit-line-clamp: 3;
}
</style>