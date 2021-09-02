<template>
  <el-row style="margin-top:20px">

    <el-col :span="12">
        <div><img :src="user.avatar" alt=""></div>
      <el-form ref="userForm" :model="userForm" label-width="100px">
        <el-form-item label="name">
          <el-input v-model="user.name"></el-input>
        </el-form-item> 
          <el-form-item label="邮箱">
            <el-input :value="user.email" disabled></el-input>
        </el-form-item>
        <el-form-item label="拥有角色">
          <el-tag  info="success" v-for="(item,key) in user.roles" :key="key">{{ item }}</el-tag>
        </el-form-item>
        <el-form-item label="介绍">
            <el-input v-model="user.introdution"></el-input>
        </el-form-item>
        </el-form>
        </el-col>
  </el-row>
</template>

<script>
export default {
  name: "userIndex",
  data() {
    return {
      userForm: {},
      user:{},
    };
  },
  mounted() {
      this.$store.dispatch('user/getInfo').then((response)=>{
         this.user = response;
         console.log(this.user.roles)
      });
      

  }
};
</script>

<style>
</style>