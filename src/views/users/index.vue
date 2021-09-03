<template>
  <div>
    <el-row style="margin-top: 20px">
      <el-card class="box-card">
        <el-col :span="8" :offset="2">
          <avatar
            @add-avatar="getAvatar"
            v-if="avatarUrl.length > 0 && user.avatar"
            :uploadsUrl="avatarUrl"
            :avatarImage="user.avatar"
          ></avatar>
        </el-col>
        <el-col :span="12">
          <el-form ref="userForm" :model="userForm" label-width="100px">
            <el-form-item label="name">
              <el-input v-model="user.name"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input :value="user.email" disabled></el-input>
            </el-form-item>
            <el-form-item label="拥有角色">
              <el-tag
                info="success"
                v-for="(item, key) in user.roles"
                :key="key"
                >{{ item }}</el-tag
              >
            </el-form-item>
            <el-form-item label="介绍">
              <el-input type="textarea" v-model="user.introdution"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="updateUserInfo" type="primary"
                >update</el-button
              >
            </el-form-item>
          </el-form>
        </el-col>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import avatar from "../avatar-uploads/avatar-upload.vue";

export default {
  name: "userIndex",
  components: { avatar },
  data() {
    let baseURL = process.env.VUE_APP_BASE_API;

    return {
      userForm: {},
      user: {},
      avatarUrl: baseURL + "/auth/avatar-uploads",
      "with-credentials": false,
      avatar: "",
    };
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      this.$store.dispatch("user/getInfo").then((response) => {
        this.user = response;
      });
    },
    getAvatar(data) {
      this.avatar = data;
      console.log(data);
    },
    updateUserInfo() {
      let user = {
        name: this.user.name,
        avatar: this.avatar != "" ? this.avatar : this.user.avatar,
        introdution: this.user.introdution,
      };
      this.$store
        .dispatch("user/updateInfo", user)
        .then((response) => {
          this.$message("修改成功!", "success");
          this.getUserInfo();
        })
        .catch((error) => {});
    },
  },
};
</script>

<style>
</style>