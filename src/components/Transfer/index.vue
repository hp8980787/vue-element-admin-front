<template>
  <el-row style="margin-top:20px">
    <el-col :span="20" :offset="3">
      <el-transfer
        v-model="model"
        :titles="titles"
        :data="transferData"
      />
    </el-col>
    <el-col :span="22" style="margin-top:20px">
      <el-button type="primary" style="display:block;margin:0 auto" @click="submitTransfer">提交</el-button>
    </el-col>
  </el-row>

</template>

<script>
export default {
  name: 'Transfer',
  props: {
    titles: {
      type: Array,
      required: true
    },
    transferModel: {},
    transferData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      model: []
    }
  },
  mounted() {
    this.transferInit()
  },
  methods: {
    transferInit() {
      this.model = this.transferModel
    }, submitTransfer() {
      this.$emit('getTransferData', this.model)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
