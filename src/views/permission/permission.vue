<template>
  <el-row>
    <el-button
      type="primary"
      @click="dialogVisbleRole = true"
    >新增权限</el-button>
    <el-col :span="24">
      <el-table :data="permissions" border style="width: 100%">
        <el-table-column label="创建日期" prop="created_at" />
        <el-table-column label="name" prop="name" />
        <el-table-column label="guard_anme" prop="guard_name" />
        <el-table-column label="更新时间" prop="updated_at" />
        <el-table-column label="操作" fixed="right">
          <template slot-scope="scope">
            <el-popconfirm
              title="删除权限？"
              @onConfirm="deleteRole(scope.row.id)"
            >
              <el-button
                slot="reference"
                type="danger"
                size="mini"
              >删除权限</el-button>
            </el-popconfirm>

            <el-button type="info" size="mini">更新</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <el-dialog :title="title" :visible.sync="dialogVisbleRole">
      <el-form ref="form" :model="form" :rules="formRules">
        <el-form-item label="权限名称" label-width="100px" prop="name">
          <el-input ref="name" v-model="form.name" />
        </el-form-item>
        <!-- <el-form-item label="guard_name" label-width="100px">
            <el-select v-model="form.guard_anme">
                <el-option label="api" value="api" selected></el-option>
                <el-option label="web" value="web"></el-option>
            </el-select>
        </el-form-item> -->
        <el-form-item label-width="100px">
          <el-button
            v-if="type === 'add'"
            type="primary"
            @click="addRoleRules"
          >提交</el-button>
          <el-button v-else type="primary" @click="updateRole">修改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-row>
</template>

<script>
import request from '@/utils/request'
import { validUsername } from '@/utils/validate'
export default {
  name: 'Permissions',
  data() {
    const validateName = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct permission name'))
      } else {
        callback()
      }
    }
    return {
      permissions: [],
      form: {},
      dialogVisbleRole: false,
      type: 'add',
      formRules: {
        name: [{ required: true, trigger: 'blur', validator: validateName }]
      }
    }
  },
  computed: {
    title() {
      return this.type === 'add' ? '添加权限' : '修改权限'
    }
  },
  mounted() {
    this.getPermissionsList()
  },
  methods: {
    async getPermissionsList() {
      const data = await request.get('/permissions')
      this.permissions = data.data
    },
    addRoleRules() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.addRole()
        } else {
          console.log('submit error')
          return false
        }
      })
    },
    async addRole() {
      const data = await request.post('/permissions', this.form)
      this.$message({
        message: '添加成功!',
        type: 'success'
      })

      this.form = {}
      this.dialogVisbleRole = false
      this.getPermissionsList()
    },
    async updateRole() {},
    async deleteRole(id) {
      const data = await request.delete(`/roles/${id}`)
      this.$message({ message: '删除成功', type: 'success' })
      this.getPermissionsList()
    }
  }
}
</script>

<style>
</style>
