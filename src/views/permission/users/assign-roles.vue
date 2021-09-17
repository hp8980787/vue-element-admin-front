<template>
  <el-row>
    <el-col :span="12" :offset="6">
      <el-transfer v-model="roles" :titles="titles" :data="data" />
    </el-col>
    <el-col :span="10">
      <el-button style="display:block;margin: 0 auto" type="primary" @click="submitForm">提交</el-button>
    </el-col>
  </el-row>
</template>

<script>
import { getRolesList } from '@/api/role'
import request from '@/utils/request'
export default {
  name: 'AssignUser',
  props: ['id'],
  data() {
    return {
      roles: [],
      data: [],
      titles: ['所有角色', '已拥有角色']
    }
  },
  mounted() {
    this.getData()
    this.getUserRoles()
  },
  methods: {
    getData() {
      getRolesList()
        .then((response) => {
          const data = response.data
          for (const i in data) {
            this.data.push({ label: data[i].name, key: data[i].id })
          }
        })
        .catch((error) => {})
    },
    submitForm() {
      this.assignRole()
    },
    async assignRole() {
      const { data } = await request.post('users-assign-roles', {
        userid: this.id,
        roles: this.roles
      })
      this.$message({ message: '成功', type: 'success' })
      this.$router.push({ path: '/permission/users' })
    },
    async getUserRoles() {
      const { data } = await request.get('/users-get-roles', {
        params: {
          id: this.id
        }
      })
      const roles = data.roles
      for (const i in roles) {
        this.roles.push(roles[i].id)
      }
      console.log(this.roles)
      // console.log(this.roles);
    }
  }
}
</script>

<style>
</style>
