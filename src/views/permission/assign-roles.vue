<template>
  <el-row>
    <el-col :span="24">
         <el-transfer v-model="roles" :data="data"></el-transfer>
    </el-col>
  </el-row>
</template>

<script>
import {getRolesList} from '@/api/role'
export default {
  name: "assignUser",
  data() {
    return {
        roles:[],
        data:[],
    };
  },mounted(){
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

          })
      }
  },
};
</script>

<style>
</style>