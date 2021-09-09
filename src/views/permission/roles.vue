<template>
  <el-row>
    <el-button type="primary" @click="addInit()">新增角色</el-button>
    <el-col :span="24">
      <el-table :data="roles" border style="width: 100%">
        <el-table-column label="创建日期" prop="created_at"></el-table-column>
        <el-table-column label="name" prop="name"></el-table-column>
        <el-table-column label="guard_anme" prop="guard_name"></el-table-column>
        <el-table-column label="更新时间" prop="updated_at"></el-table-column>
        <el-table-column label="操作" fixed="right">
          <template slot-scope="scope">
            <el-popconfirm
              title="删除角色？"
              @onConfirm="deleteRole(scope.row.id)"
            >
              <el-button slot="reference" type="danger" size="mini"
                >删除角色</el-button
              >
            </el-popconfirm>

            <el-button type="info" @click="updateRoles(scope.row)" size="mini"
              >更新</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <el-dialog :title="title" :visible.sync="dialogVisbleRole">
      <el-form ref="form" form="form">
        <el-form-item label="name" label-width="100px">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <!-- <el-form-item label="guard_name" label-width="100px">
            <el-select v-model="form.guard_anme">
                <el-option label="api" value="api" selected></el-option>
                <el-option label="web" value="web"></el-option>
            </el-select>
        </el-form-item> -->
        <el-form-item>
          <el-button v-if="type == 'add'" @click="addRole" type="primary"
            >提交</el-button
          >
          <el-button v-else type="primary" @click="updateRole">修改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-row>
</template>

<script>
import request from "@/utils/request";
export default {
  name: "roles",
  data() {
    return {
      roles: [],
      form: {},
      dialogVisbleRole: false,
      type: "add",
    };
  },
  computed: {
    title() {
      return this.type == "add" ? "添加角色" : "修改角色";
    },
  },
  mounted() {
    this.getRolesList();
  },
  methods: {
    addInit() {
      this.type = "add";
      this.dialogVisbleRole = true;
    },
    async getRolesList() {
      let data = await request.get("/roles");
      this.roles = data.data;
    },
    async addRole() {
      let data = await request.post("/roles", this.form);
      this.$message({
        message: "添加成功!",
        type: "success",
      });
      this.form = {};
      this.dialogVisbleRole = false;
      this.getRolesList();
    },
    async updateRole(roleData) {
      let data = await request.put(`/roles/${this.form.id}`, this.form);
      if (data.code == 200) {
        this.$message({ message: "修改成功", type: "success" });
        this.dialogVisbleRole = false;
        this.getRolesList();
      }
    },
    async deleteRole(id) {
      let data = await request.delete(`/roles/${id}`);
      this.$message({ message: "删除成功", type: "success" });
      this.getRolesList();
    },
    updateRoles(data) {
      this.dialogVisbleRole = true;
      this.form = data;
      this.type = "edit";
    },
  },
};
</script>

<style>
</style>