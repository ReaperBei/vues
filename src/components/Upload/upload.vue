<template>
    <div>
      <el-upload
        class="upload-demo"
        :action="imaUrls"
        :data="pdata"
         accept="image/jpeg,image/gif,image/png"
        :before-upload="beforeUpload"
        :file-list="fileList"
        :on-success="handleUploadSuccess"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-exceed="handleExceed"
        :before-remove="beforeRemove"
        :on-change="handleChange"
         multiple
        :limit="limit"
        list-type="picture-card">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible"
                  append-to-body>
          <img width="100%" :src="viewImage" />
      </el-dialog>
    </div>
</template>
<script>
export default {
    name:'singleUp',
    model: {
      prop: 'caddress',
    },
    props: { //图片上传类型
      type: {
        type: [String,Number],
        default:'4002'
      },
      limit:{ //限制能传几张
        type:Number,
        default:5
      },
      list:{
        type:Array,
        default:[]
      }
    },
    data(){
        return{
            dialogVisible: false,
            pdata:{type:4002},
            fileList:[],
            viewImage:'',
            imaUrls: process.env.BASE_API+"/ums/v1/oss/img/checkImage"
        }
    },
    mounted(){
          this.pdata.type =this.type;
          let list = []
          if(this.list!=""){
              this.list.map((item,index)=>{ list.push({url:item,uid:index,status:"success"}) })
              this.fileList = list
          }
    },
    methods:{
      handleUploadSuccess(res,file){
      },
      beforeUpload(file) {
        const isIMAGE = file.type === 'image/jpeg'||'image/gif'||'image/png';
        const isLt1M = file.size / 1024 / 1024 < 2;

        if (!isIMAGE) {
          this.$message.error('上传文件只能是图片格式!');
        }
        if (!isLt1M) {
          this.$message.error('上传文件大小不能超过 2MB!');
        }
        return isIMAGE && isLt1M;
      },
      handlePreview(file){
        this.viewImage = file.url
        this.dialogVisible = true
      },
      handleExceed(files, fileList) {
        this.$message({
          message: '最多只能上传'+this.limit+'张图片',
          type: 'warning',
          duration:2000
        });
      },
      handleRemove(file, fileList){
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除该图片?`);
      },
       handleChange(file, fileList) {
         let list = []
         fileList.forEach(element => {
           if(element.status==="success")
           if(element.response){
              list.push(element.response.data)
           }else{
              list.push(element.url)
           }
         })
          if(this.limit===1){
             this.$emit('input', list[0]);
              this.$emit('getList',list[0])
          }else{
             this.$emit('input', list);
              this.$emit('getList',list)
          }
      }
    }
}
</script>
<style lang="scss" scoped>
</style>