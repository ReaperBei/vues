<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float:right"
          type="primary"
          @click="handleSearchList()"
          size="small">
          查询搜索
        </el-button>
        <el-button
          style="float:right;margin-right: 15px"
          @click="handleResetSearch()"
          size="small">
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="请输入标题：">
            <el-input v-model="listQuery.keyword" class="input-width" placeholder="请输入标题" clearable></el-input>
          </el-form-item>
          <el-form-item label="分类名称：">
            <el-select v-model.trim="listQuery.codeKeyword" placeholder="请选择品牌" clearable>
              <el-option
                v-for="item in categoryOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button size="mini" class="btn-add" @click="handleAdd()" style="margin-left: 20px">添加</el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="roleTable"
                :data="list"
                style="width: 100%;"
                v-loading="listLoading" border>
        <el-table-column type='index' label="序号" align="center" width="80" :index='indexMethod' ></el-table-column>
        <el-table-column label="分类" width="110" align="center">
          <template slot-scope="scope">{{getType(scope.row.classifyCode)}}</template>
        </el-table-column>
         <el-table-column label="标题" align="center">
          <template slot-scope="scope">
            <div class="text-overflow" :title="scope.row.headline">{{scope.row.headline}}</div>
          </template>
        </el-table-column>
        <el-table-column label="标题图片" width="100" align="center">
          <template slot-scope="scope">
            <img style="width:100%;height:100%" :src="scope.row.headlineImg" />
          </template>
        </el-table-column>
        <el-table-column label="关联标题" align="center">
          <template slot-scope="scope">
            <div class="text-overflow" :title="scope.row.labelCodes">{{scope.row.labelCodes}}</div>
          </template>
        </el-table-column>
          <el-table-column label="文本内容" align="center">
          <template slot-scope="scope">
            <div class="text-overflow" :title="scope.row.contentArticle">{{scope.row.contentArticle}}</div>
          </template>
        </el-table-column>
        <el-table-column label="创建人" width="120" align="center">
          <template slot-scope="scope">{{scope.row.createdBy}}</template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template slot-scope="scope">{{scope.row.createdTime | formatDateTime}}</template>
        </el-table-column>
        <el-table-column label="操作" width="160" align="center">
          <template slot-scope="scope">
            <el-row>
            <el-button size="mini"
                      type="text"
                       @click="handleUpdate(scope.$index, scope.row)">
              编辑
            </el-button>
            <el-button size="mini"
                       type="text"
                       @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div></div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :current-page.sync="listQuery.pageNum"
        :page-size="listQuery.pageSize"
        :page-sizes="[10,15,20]"
        :total="total">
      </el-pagination>
    </div>
    <el-dialog
      :title="isEdit?'编辑内容':'添加数据'"
      :visible.sync="dialogVisible"
      width="50%">
      <el-form :model="role"
              :rules='rules'
               ref="roleForm"
               label-width="150px" size="small">
        <el-form-item prop="classifyCode" label="分类：">
           <el-select v-model="role.classifyCode" style="width: 350px" placeholder="全部" clearable class="input-width">
              <el-option v-for="item in categoryOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="headline" label="标题：">
          <el-input v-model="role.headline" style="width: 350px"></el-input>
        </el-form-item>
        <el-form-item prop="labelCodes" label="标签：">
          <el-input v-model="role.labelCodes" style="width: 350px"></el-input>
        </el-form-item>
        <el-form-item label="标题图片：" prop="headlineImg">
          <upload v-if="dialogVisible" :list="isEdit?[role.headlineImg]:[]" :limit="1" :type="4001" v-model="role.headlineImg" />
        </el-form-item>
        <el-form-item prop="contentArticle" label="内容：">
          <editor v-if="dialogVisible" :type="4001" :data="role.contentArticle" v-model="role.contentArticle" />
        </el-form-item>
        <!-- <el-form-item label="内容：">
          <el-input v-model="role.contentArticle"
                    type="textarea"
                    :rows="5"
                    style="width: 350px"
                     ></el-input>
        </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm('roleForm')" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import {fetchList,createRole,deleteRole,updateRole,handelData} from '@/api/showInfo';
  import upload from '@/components/Upload/upload'
  import editor from '@/components/vueEditor/editor'
  import {formatDate} from '@/utils/date';
  import regular from "@/utils/regular";
  import awayHintForm from "@/utils/hintForm"
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    keyword:null,
    codeKeyword:null
  };
  const defaultRole = {
    contentArticle: null,
    classifyCode: null,
    discoverId: null,
    labelCodes: null,
    headlineImg:null,
    headline:null,
    state: 10001
  };
  export default {
    name: 'roleList',
    components:{upload,editor},
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        list: null,
        total: null,
        listLoading: false,
        dialogVisible: false,
        categoryOptions:[],
        role: defaultRole,
        isEdit: false,
        uploadImages:{
          type:4001
        },
        rules:{
            headline:[{ required: true, validator:regular.FormValidate.Form().validateCharacter, trigger: 'blur'}],
            labelCodes:[{ required: true,validator:regular.FormValidate.Form().validateCharacter, trigger: 'blur'}],
            contentArticle:[{ required: true, message: '请输入内容', trigger: 'blur'}],
            classifyCode:[{ required: true, message: '请选择分类', trigger: ["blur",'change']}],
            headlineImg:[{ required: true, message: '请选择标题图片', trigger: ["blur",'change']}]
        }
      }
    },
    created() {
      this.handelDatacodeData()
      this.getList()
    },
    filters: {
      formatDateTime(time) {
        if (time == null || time === '') {
          return ' ';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd')
      }
    },
    methods: {
      indexMethod (index) {
        let curpage = this.listQuery.pageNum
        let limitpage = this.listQuery.pageSize
        return (index+1) + (curpage-1)*limitpage
      },
      handleResetSearch() {
        this.listQuery = Object.assign({}, defaultListQuery);
        this.getList()
      },
      handleSearchList() {
        this.listQuery.pageNum = 1;
        this.getList();
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.getList();
      },
      handleAdd() {
        this.dialogVisible = true;
        this.isEdit = false;
        this.role = Object.assign({},defaultRole);
        awayHintForm(this.$refs.roleForm)
      },
      handleDelete(index, row) {
        this.$confirm('是否要删除该数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let ids = [];
          ids.push(row.discoverId);
          let params=new URLSearchParams();
          params.append("id",ids);
          deleteRole(params).then(response => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getList();
          });
        });
      },
      handleUpdate(index,row) {
        this.dialogVisible = true;
        this.isEdit = true;
        this.role = row
        console.log(row)
        awayHintForm(this.$refs.roleForm)
      },
      handleDialogConfirm(formName) {
          if (this.isEdit) {
            this.$refs[formName].validate((valid) =>{
              if(valid){
                  // if(typeof(this.role.headlineImg)!=='string'){
                  //   this.role.headlineImg = this.role.headlineImg[0]
                  // }
                  updateRole(this.role).then(response => {
                    this.$message({
                    message: '修改成功！',
                    type: 'success'
                });
                    this.dialogVisible =false;
                    this.getList();
                })
              }
            })
          } else {
             this.$refs[formName].validate((valid) =>{
               if(valid){
                //  if(typeof(this.role.headlineImg)!=='string'){
                //     this.role.headlineImg = this.role.headlineImg[0]
                //   }
                  createRole(this.role).then(response => {
                  this.$message({
                    message: '添加成功！',
                    type: 'success'
                  });
                  this.dialogVisible =false;
                  this.getList();
                });
               }
             })
          }
      },
      handelDatacodeData(){
          handelData().then(response => {
            let cateList = response.data;
            for(let i=0;i<cateList.length;i++){
              let cate = cateList[i];
              this.categoryOptions.push({label:cate.dictName,value:cate.dictCode});
            }
          })
      },
      getType(str){
       let list= this.categoryOptions.filter((item)=>{return item.value===str})
       if(list.length)
        return list[0].label
      },
      getList() {
        this.listLoading = true;
        fetchList(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data.list;
          this.total = response.data.total;
        });
      }
    }
  }
</script>
<style lang="scss" scoped>
/deep/.text-overflow{
  display: -webkit-box;
  overflow: hidden;
  /*! autoprefixer: off */
    -webkit-box-orient: vertical;
  /* autoprefixer: on */
  -webkit-line-clamp: 3;
}
</style>
