<template>
  <el-row>
    <el-col :span="12" :offset="6">
      <el-transfer :titles="titles" v-model="roles" :data="data"></el-transfer>
    </el-col>
    <el-col :span="10"  >
      <el-button style="display:block;margin: 0 auto"  @click="submitForm" type="primary">提交</el-button>
    </el-col>
  </el-row>
</template>

<script>
import { getRolesList } from "@/api/role";
import request from "@/utils/request";
export default {
  name: "assignUser",
  props: ["id"],
  data() {
    return {
      roles: [],
      data: [],
      titles: ["所有角色", "已拥有角色"],
    };
  },
  mounted() {
    this.getData();
    this.getUserRoles();
  },
  methods: {
    getData() {
      getRolesList()
        .then((response) => {
          let data = response.data;
          for (let i in data) {
            this.data.push({ label: data[i].name, key: data[i].id });
          }
         
        })
        .catch((error) => {});
    },
    submitForm() {
     
        this.assignRole();
      
    },
    async assignRole() {
      let { data } = await request.post("users-assign-roles", {
        userid: this.id,
        roles: this.roles,
      });
      this.$message({message:'成功',type:'success'});
      this.$router.push({path:'/permission/users'});
    },
    async getUserRoles() {
      let { data }  =await request.get('/users-get-roles',{
        params: {
          id:this.id,
        }
      });
      let roles = data.roles;
      for (let i in roles){
        this.roles.push(roles[i].id);
      }
      console.log(this.roles)
      // console.log(this.roles);
    },
  },
};
</script>

<style>
</style>