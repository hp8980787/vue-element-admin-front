<template>
  <el-row>
    <el-col :span="24">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="id" prop="id"></el-table-column>
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="email" prop="email"></el-table-column>
        <el-table-column label="avatar">
            <template slot-scope="scope">
                <img :src="scope.row.avatar"  width="50px" :alt="scope.row.name">
            </template>
        </el-table-column>
        <el-table-column label="介绍" prop="introdution"></el-table-column>
        <el-table-column label="拥有角色">
             <template slot-scope="scope">
                <el-tag v-for="(role,key) in scope.row.roles" :key="key" type="info">{{ role.name }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="created_at"></el-table-column>
        
        <el-table-column
      fixed="right"
      label="操作"
      width="120">
      <template slot-scope="scope">
       <el-button size="mini" type="info">修改用户</el-button>
     <el-button size="mini" type="primary"> <router-link to="/permission/users/assign-roles">分配角色</router-link></el-button>
     <el-button size="mini" type="warning">删除用户</el-button>
      </template>
    </el-table-column>
      </el-table>
    </el-col>
      <router-view />
  </el-row>
</template>

<script>
import request from "@/utils/request";
export default {
  name: "users",
  data() {
    return {
      tableData: [],
    };
  },
  mounted() {
    this.getUsersList();
  },
  methods: {
    async getUsersList() {
      let { data } = await request.get("/users");
      this.tableData = data;
    },
  },
};
</script>

<style>
</style>