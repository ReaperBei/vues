<!--html部分-->
<template>
    <div id="imgEnlarge" ref="imgEnlarge" class="img-bg" @click="imgBgHide" v-show="isShow">
          <mt-swipe :auto="0" :show-indicators="false" :continuous=false :defaultIndex="defaultIndex" @change="handleChange">
                <mt-swipe-item v-for="(item,index) in imgSrc" :key="index">
                      <img v-lazy="item" @click="handleClick"/>
                </mt-swipe-item>
          </mt-swipe>
    </div>
</template>
<!--js部分-->
<script>
    export default{
        data(){
            return{
                scroll:0
            }
        },
        props:{
            imgSrc:{
                type:Array
            },
            defaultIndex:{
                type:Number,
                default:0
            },
            isShow:{
                type:Boolean,
                deflault:false
            }
        },
        methods:{
            imgBgHide(){
                  this.$emit("imgBgHide") //向父组件传递事件
            } ,
            handleClick(e){
                  e.stopPropagation()//阻止事件冒泡，避免点击预览的图片穿透遮罩层
            },
            handleChange(value){
            //向父组件传递轮播图索引，解决加载图片的问题
            this.$emit("handleChange",value)
            }
        },
      watch:{
            isShow:{//判断遮罩是否显示，显示时底层页面无法滚动，隐藏后滚动条回到显示时的位置
                 handler(newVal,oldVal){
                    if(newVal==true){
                        this.scrolly = document.body.scrollTop;
                        document.body.style.position = "fixed";
                    }else{
                        document.body.style.position = "static";
                        document.body.scrollTop = this.scrolly; //
                    }
                } 
            }
      }

    }
</script>
<!--样式部分-->
<style scoped>
      .img-bg {
            width:100%;
             height:100%;
             position:fixed;
             left:0;
             top:0;
             z-index:9999;
             background:rgba(0,0,0,1);
      }
      .img-bg img{
              width:auto;
              height:auto;
              max-width:100%;
              max-height:100%;
       }
</style>