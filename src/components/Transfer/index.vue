<template>
<el-row>
     <el-col :span="20" :offset="3" >
  <el-transfer
    :titles="titles"
    v-model="model"
    :data="transferData"
  ></el-transfer>
 </el-col>
 <el-col :span="20">
       <el-button type="primary" style="margin:0 auto" >提交</el-button>
 </el-col>
</el-row>

</template>

<script>
export default {
  name: "transfer",
  props: {
    titles: {
      type: Array,
      required: true,
    },
    transferModel: {},
    transferData: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      model: [],
    };
  },
  mounted() {
    this.transferInit();
  },
  methods: {
    transferInit() {
      this.model = this.transferModel;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>