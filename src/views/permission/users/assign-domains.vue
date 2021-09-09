<template>
  <el-row>
   
      <transfer
        :transferModel="userDomains"
        :transferData="domains"
        :titles="titles"
      ></transfer>
   
  </el-row>
</template>

<script>
import transfer from "@/components/Transfer/index";
import request from "@/utils/request";
export default {
  name: "assignDoamins",
  props: ["id"],
  components: { transfer },
  data() {
    return {
      domains: [],
      userDomains: [],
      titles: ["所有域名", "当前用户已分配域名"],
    };
  },
  mounted() {
    this.getDomainsList();

    console.log(this.id);
  },
  methods: {
    async getDomainsList() {
      let { data } = await request.get("domains");
      for (let i in data) {
        this.domains.push({ label: data[i].url, key: data[i].id });
      }
      console.log(data);
    },
  },
};
</script>

<style>
.el-transfer-panel{
    width:500px;
}
</style>