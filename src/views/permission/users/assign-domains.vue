<template>
  <el-row>
   <el-col :spam=24>
     <transfer
        @getTransferData="transferSubmit"
        :transferModel="userDomains"
        :transferData="domains"
        :titles="titles"
      ></transfer>
   </el-col>
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
    this.getUserDoaminsList();
  },
  methods: {
    async getDomainsList() {
      let { data } = await request.get("/databases-all");
      console.log(data,1);
      for (let i in data) {
        this.domains.push({ label: data[i].url, key: data[i].id });
      }
      console.log(this.domains);
    },
    transferSubmit(data){
      this.updateUserDoamin(data);
    },async updateUserDoamin(domains){
      
      let { data } = await request.post('/users-domains',{
        id:this.id,
        domains:domains,
      });
      this.$message({message:'修改成功',type:'success'});
    },async getUserDoaminsList(){
      let { data } = await request.get('/users-domains',{
        params: {id:this.id}
      });
      for(let i in data.domains){
        this.userDomains.push(data.domains[i].id);
      }
      console.log(this.userDomains)
    }
  },
};
</script>

<style>
.el-transfer-panel{
    width:500px;
}
</style>