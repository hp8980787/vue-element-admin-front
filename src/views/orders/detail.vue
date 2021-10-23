<template>
  <el-row v-loading="loading">
    <!-- <el-col :span="24">
      <div class="Echarts">
        <div id="main" style="width: 100%; height: 400px"></div>
      </div>
    </el-col> -->
    
    <el-col :span="24">
      <div class="info">
        <h2>{{ database.url }}</h2>

        <div class="user-div">
          <h3>网站管理人员:</h3>
          <ul class="user-info">
            <li v-for="(user, key) in database.users" :key="key">
              <el-tag>{{ user.name }}</el-tag>
            </li>
          </ul>
        </div>
        <el-select v-model="table_name" @change="getOrdersList">
          <el-option
            v-for="(table, key) in database.tables"
            :key="key"
            :label="table.name"
            :value="table.name"
          ></el-option>
        </el-select>
      </div>
    </el-col>
    <el-col :span="24" style="margin-top: 20px">
      <div class="search">
        <el-input
          placeholder="搜索"
          v-model="search"
          @change="searchOrder"
        >
        </el-input>
 
      </div>
      <el-table :data="data" border style="width: 100%">
        <el-table-column
          v-for="(column, key) in columns"
          :key="key"
          :label="column"
          :prop="column"
        ></el-table-column>
      </el-table>
    </el-col>
      <el-col :span="8" :offset="8" style="margin-top: 20px; margin-bottom: 20px">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="page"
      >
      </el-pagination>
    </el-col>
  </el-row>
</template>

<script>
import request from "@/utils/request";
export default {
  name: "OrdersDetail",
  props: ["id"],
  data() {
    return {
      chart: null,
      loading: true,
      columns: [],
      data: [],
      time_column: "",
      time_columns: ["dd_time", "created_at", "time"],
      table_name: "",
      database: {},
      total: 0,
      current_page: 1,
      search:''
    };
  },
  mounted() {
    // this.EchartsInit();
    this.DatabaseInfo();
    // this.getColumn();
    // this.getOrdersList();
  },
  methods: {
    getOrdersList() {
      this.loading = true;
      request({
        url: `order-database`,
        method: "get",
        params: {
          id: this.id,
          table_name: this.table_name,
          page: this.current_page,
          search:this.search,
        },
        timeout: 40 * 1000,
      })
        .then((res) => {
          this.loading = false;
          this.data = res.data.data;
          this.total = res.data.total;
          console.log(res);
          for (let i in this.data[0]) {
            if (this.time_columns.indexOf(i) != -1) {
              this.time_column = i;
            }
            this.columns.push(i);
          }
        })
        .catch((error) => {
          this.loading = false;
        });
    },
    async getColumn() {
      const { data } = await request.get(`/tables/${this.id}`);
      // if (data.display_column == null) {
      this.columns = data.full_column;
      this.time_column = data.time_column;
      // } else {
      // this.columns = data.display_column;
      // }
      // this.loading = false;
    },
    async DatabaseInfo() {
      const { data } = await request.get(`/databases/${this.id}`);
      this.loading = false;
      this.database = data;
    },
    page(currentPage) {
      this.current_page = currentPage;
      this.getOrdersList();
    },
    searchOrder() {
       if (this.table_name!=''){
         this.getOrdersList();
       }
    },
    EchartsInit() {
      let myChart = this.$echarts.init(document.getElementById("main"));
      myChart.setOption({
        title: {
          text: "ECharts 入门示例",
        },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      });
    },
  },
};
</script>


<style lang="scss" scoped>
.info {
  text-align: center;
}
.search {
  width:200px;
  margin: 10px 0 10px 10px;
}
.user-div {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
  h3 {
    display: inline-block;
    width: fit-content;
    margin: 0;
  }
  ul {
    list-style: none;
    display: inline-block;
    margin: 0;
    padding: 0;
    li {
      width: fit-content;
      float: left;
      margin-right: 10px;
    }
  }
}
</style>