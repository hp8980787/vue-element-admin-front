<template>
  <el-row style="margin: 20px 0">
    <el-col
      :span="10"
      :offset="5"
      style="text-align: center"
    ><h1>新增数据库</h1></el-col>
    <el-col :span="10" :offset="5">
      <el-form ref="form" :model="form" :rules="formRules" label-width="80px">
        <el-form-item label="database" label-width="80px" prop="database">
          <el-input v-model="form.database" />
        </el-form-item>
        <el-form-item label="userName">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="password">
          <el-input v-model="form.passwd" />
        </el-form-item>
        <el-form-item label="ip">
          <el-input v-model="form.ip" />
        </el-form-item>
        <el-form-item label="port">
          <el-input v-model="form.port" />
        </el-form-item>
        <el-form-item label="url">
          <el-input v-model="form.url" />
        </el-form-item>
        <el-form-item label="country">
          <el-input v-model="form.nickname" />
        </el-form-item>
        <el-form-item>
          <div style="margin:0 auto;text-align:center">
            <el-button type="primary">提交</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'DatabasesCreate',
  data() {
    return {
      form: {},
      formRules: {}
    }
  }
}
</script>

<style>
</style>
