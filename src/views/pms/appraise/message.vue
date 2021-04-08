<template>
    <div class="detail-container">
        <el-card shadow="never" class="standard-margin">
            <span class="font-title-medium">评价管理详情</span>
            <div class="form-container-border" v-for="(item,index) in list" :key="index" v-loading="loading">
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6">商品名称</el-col>
                    <el-col class="form-border font-small" :span="18">{{item.comment.pmsComment.productName}}</el-col>
                </el-row>
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6"  style="line-height: 80px;height: 80px;">评价内容</el-col>
                    <el-col class="form-border font-small" :span="18" style="height: 80px;">{{item.comment.pmsComment.content}}</el-col>
                </el-row>
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6">评价时间</el-col>
                    <el-col class="form-border font-small" :span="18">{{item.comment.pmsComment.createTime | formatDateTime}}</el-col>
                </el-row>
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6" style="height:100px;line-height:80px">评价图片
                    </el-col>
                    <el-col class="form-border font-small" :span="18" style="height:100px">
                        <img @click="handelImage(ind)" v-for="(ite,ind) in item.comment.picList" alt="加载中..." style="width:80px;height:80px" :key="ind" :src="ite">
                        <div v-if="item.comment.picList?true:false" style="height:100px;line-height:80px">暂无评价图片</div>
                    </el-col>
                </el-row>
                <el-table
                :data="item.commentReplay"
                style="width: 100%;"
                v-loading="listLoading" border>
                    <el-table-column label="回复内容" align="center">
                        <template slot-scope="scope">
                            <div :title="scope.row.content" class="text-overflow">
                                {{scope.row.content}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="回复时间" align="center">
                        <template slot-scope="scope">{{scope.row.createTime | formatDateTime}}</template>
                    </el-table-column>
                    <el-table-column label="会员昵称" align="center">
                        <template slot-scope="scope">{{scope.row.memberNickName}}</template>
                    </el-table-column>
                    <el-table-column label="会员头像" width="120" align="center">
                        <template slot-scope="scope">
                            <img style="height: 80px" :src="scope.row.memberIcon" alt="">
                        </template>
                    </el-table-column>
                    <el-table-column label="评价人员类型" align="center">
                        <template slot-scope="scope">{{scope.row.type | formatType}}</template>
                    </el-table-column>
                </el-table>
                <el-dialog
                    title="图片预览"
                    :visible.sync="dialogVisible"
                    width="60%"
                    >
                    <el-carousel :interval="4000" type="card" :initial-index='showIndex' ref="carousel">
                        <el-carousel-item  v-for="(item,index) in item.comment.picList" style="text-align: center;" height="400px" :key="index">
                            <img style="width：100%;height:100%" :src="item" alt="加载中...">
                        </el-carousel-item>
                    </el-carousel>
                </el-dialog>
            </div>
        </el-card>
    </div>
</template>
<script>
import { handleMessage } from "@/api/appraise";
import { formatDate } from "@/utils/date";
export default {
    data() {
        return {
            list: [],
            id: null,
            loading:true,
            dialogVisible:false,
            showIndex:null,
            listLoading:false
        };
    },
    components: {
        formatDate
    },
    watch:{
        list:function(){
            this.$nextTick(function(){
                this.loading=false
            })
        }
    },
    created() {
        this.id = this.$route.query.id;
        this.getList();
    },
    filters: {
        formatDateTime(time) {
            if (time == null || time === "") {
                return '';
            }
            let date = new Date(time);
            return formatDate(date, "yyyy-MM-dd hh:mm:ss");
        },
        formatType(value){
            if(value==0){
                return '会员'
            }else{
                return '管理员'
            }
        }
    },
    methods: {
        getList() {
            this.listLoading = true
            handleMessage({ id: this.id }).then(response => {
                this.list.push(response.data);
                this.listLoading = false
            });
        },
        handelImage(item){
            this.showIndex = item;
            this.dialogVisible = true
            if(this.$refs.carousel){
                
            }
        },
    }
};
</script>
<style lang="scss" scoped>
@import "src/styles/commoLook.scss";
.image-list{
    width: 120px;
    height: 120px;
    display: inline-flex;
    &img{
        width: 100%;
    }
}
/deep/.text-overflow{
  display: -webkit-box;
  overflow: hidden;
  /*! autoprefixer: off */
    -webkit-box-orient: vertical;
  /* autoprefixer: on */
  -webkit-line-clamp: 5;
}
</style>