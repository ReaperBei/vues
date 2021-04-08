<template>
      <vue-editor useCustomImageHandler @text-change="textChange" @image-added="handleImageAdded" :placeholder="placeholder" v-model="editorContent"> </vue-editor>
</template>

<script>

import { VueEditor } from "vue2-editor";
import axios from 'axios'
  export default {
    name: 'vie-editor',
    components: {VueEditor },
    props: {
      data: {
        type: String,
        default: ''
      },
      placeholder:{
        type: String,
        default: '请输入文本内容...' 
      },
      type:{
          type:[String,Number],
          default: 4005
      }
    },
    data() {
      return {
          editorContent:''
      }
    },
    mounted() {
        this.editorContent = this.data
    },
    methods: {
         handleImageAdded: function(file, Editor, cursorLocation, resetUploader) {
            var formData = new FormData();
             formData.append("file", file)
             formData.append("type", this.type)
              axios({
                url: process.env.BASE_API+"/ums/v1/oss/img/checkImage",
                method: "POST",
                data: formData
              })
              .then(result => {
                 Editor.insertEmbed(cursorLocation, "image", result.data.data)
                 resetUploader()
              })
              .catch(err => {
            })
      },
      textChange(text){
          this.$emit('input', this.editorContent);
          //this.$emit('change',this.editorContent).replace(/<[^<>]+>/g, "").replace(/&nbsp;/gi,"")
      }
    }
  }
</script>
<style scoped>

</style>
