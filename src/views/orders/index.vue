<template>
  <el-row v-loading="loading">
    <el-col :span="24">
      <el-table :data="domains">
        <el-table-column label="id" prop="id" width="100px"></el-table-column>
        <el-table-column label="url" prop="url" />
        <el-table-column label="ip" prop="ip" />
        <el-table-column label="port" prop="port" />
        <el-table-column label="database" prop="database" />
        <el-table-column label="username" prop="username" />
        <el-table-column label="密码" prop="passwd">
          <template slot="header">
            <span>
              密码
              <el-button
                size="mini"
                type="info"
                @click="passHidden = !passHidden"
                ><svg-icon icon-class="eye" /></el-button
            ></span>
          </template>
          <template slot-scope="scope">
            <el-input
              :value="scope.row.passwd"
              :type="passHidden ? 'password' : ''"
              readonly
            />
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="checkOrder(scope.row)"
              >查看订单</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <el-dialog :visible.sync="dialogOrderVisible" :title="title"> </el-dialog>
  </el-row>
</template>

<script>
import request from "@/utils/request";
export default {
  name: "OrdersIndex",
  data() {
    return {
      domains: [],
      title: "",
      passHidden: true,
      dialogOrderVisible: false,
      title: "",
      orders: [],
      loading: true,
    };
  },
  mounted() {
    this.getUsersData();
  },
  methods: {
    async getUsersData() {
      const { data } = await request.get("/users-domains");
      this.domains = data;
      this.loading = false;
    },
     checkOrder(database) {
       this.$router.push(`/orders/detail/${database.id}`);
      // this.dialogOrderVisible = true;
      // this.loading = true;
      // request({
      //   url: `order-database`,
      //   method: "get",
      //   params: {
      //     id: database.id,
      //   },
      // timeout: 40 * 1000,
      // })
      //   .then((res) => {
      //     console.log(res);
      //     this.loading = false;
      //   })
      //   .catch((error) => {
      //        this.loading = false;
      //   });
    },
  },
};
</script>

<style>
</style>
