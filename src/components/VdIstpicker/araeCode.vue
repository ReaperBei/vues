<template>
    <div class="select-box">
        <el-select
            style="width: 130px"
            @change="selected"
            placeholder="请选择省"
            class="input-width"
            v-model="caddress.province"
        >
            <el-option
                v-for="(item,index) in provinceList"
                :key="index"
                :label="item.provincer_name"
                :value="item.provincer_code"
            ></el-option>
        </el-select>
        <el-select
            style="width: 130px"
            @change="getchangeCity"
            placeholder="请选择市"
            v-model="caddress.city"
            class="input-width"
        >
            <el-option
                v-for="(item,index) in cityList"
                :key="index"
                :label="item.city_name"
                :value="item.city_code"
            ></el-option>
        </el-select>
        <el-select
            style="width: 130px"
            placeholder="请选择区"
            class="input-width"
            @change="onAreaChanged"
            v-model="caddress.area"
        >
            <el-option
                v-for="(item,index) in areaList"
                :key="index"
                :label="item.area_name"
                :value="item.area_code"
            ></el-option>
        </el-select>
    </div>
</template>
<script>
  // createRole,updateRole,updateStatus,deleteRole
  import dataArea from "@/utils/area.json";
  export default {
    name: 'VdIstpicker',
    model: {
      prop: 'caddress',
      event: 'change',
    },
    props: {
      caddress: {
        type: Object,
      },
    },
    data() {
      return {
        provinceList:null,
        cityList:[],
        areaList:[],
        cityCode:null
      }
    },
    mounted(){
        this.provinceList = dataArea;
    },
    methods: {
      selected(provincer_code){
       let citylists= this.provinceList.filter((item)=>{
            return item.provincer_code === provincer_code     
        })
        if(citylists.length){
          this.caddress.city = "";
          this.caddress.area = "";
          this.cityList = citylists[0].city;
        }
      },
      getchangeCity(city_code){
        this.cityCode = city_code
        let areaLists = this.cityList.filter((items)=>{
          return items.city_code === city_code
        })
        if(areaLists.length){
          this.caddress.area = "";
          this.areaList = areaLists[0].area
        }
      },
      onAreaChanged(val) {
         this.$emit('change', this.caddress);//发送改变
      }
  }
}
</script>
<style lang="scss" scoped>
.select-box{
    display: flex;
}
</style>
