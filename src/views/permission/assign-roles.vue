<template>
  <el-row>
    <el-col :span="12" :offset="6"  >
         <el-transfer :titles="titles" v-model="roles" :data="data"></el-transfer>
       
    </el-col>
     <el-col :span="10" :offset="10" style="margin-top:20px">
         <el-button @click="submitForm" type="primary">提交</el-button>
     </el-col>
  </el-row>
</template>

<script>
import {getRolesList} from '@/api/role';
import request from '@/utils/request';
export default {
  name: "assignUser",
  props: ["id"],
  data() {
    return {
        roles:[],
        data:[],
        titles:['所有角色','赋予角色'],
    };
  },mounted(){
    console.log(this.id);
      this.getData();
  },methods: {
      getData(){
          getRolesList().then(response=>{
            let data = response.data;
            for(let i in data){
                this.data.push({label:data[i].name,key:data[i].id})
            }
            console.log(this.roles)
          }).catch(error=>{

          });
      }, submitForm(){
        if(this.roles.length<1){
          this.$message({
            message:'请分配角色',type:'error'});
        }else{
          this.assignRole();
        }
         
      },async assignRole(){
        let {data} = await request.post('users-assign-roles',{
          userid:this.id,
          roles:this.roles,
        });
  }
}
}
</script>

<style>
</style>