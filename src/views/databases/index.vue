
<template>
<el-row>
  <el-col :span="24" >
     <div class="add-button">
    <el-button type="primary"> <router-link to='/databases/create'>新增网站</router-link> </el-button>
     </div>
    </el-col> 
  <el-col :span="24">
     <div class="app-container">
    <el-table
      v-loading="listLoading"
        :data="list.filter(data => !search || data.url.toLowerCase().includes(search.toLowerCase())||data.database.toLowerCase().includes(search.toLowerCase())||data.username.toLowerCase().includes(search.toLowerCase()))"
      border
      fit
      highlight-current-row
      style="width: 100%"
       max-height="800"
    >
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="{ row }">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
<!-- 
      <el-table-column width="180px" align="center" label="Date">
        <template slot-scope="{ row }">
          <span>{{
            row.created_at | parseTime("{y}-{m}-{d} {h}:{i}:{s}")
          }}</span>
        </template>
      </el-table-column> -->

      <el-table-column width="300px" align="center" label="url">
        <template slot-scope="{ row }">
          <template v-if="row.edit">
            <el-input v-model="row.url" class="edit-input" size="small" ></el-input>
               <el-button
              class="cancel-btn"
              size="mini"
              icon="el-icon-refresh"
              type="warning"
              @click="cancelEdit(row)"
            >
              cancel
            </el-button>
          </template>

          <span v-else>{{ row.url }}</span>
        </template>
      </el-table-column>

      <el-table-column width="300px" align="center" label="database">
        <template slot-scope="{ row }">
          <template v-if="row.edit">
            <el-input v-model="row.database" class="edit-input" size="small" ></el-input>
               <el-button
              class="cancel-btn"
              size="mini"
              icon="el-icon-refresh"
              type="warning"
              @click="cancelEdit(row)"
            >
              cancel
            </el-button>
          </template>
          <span v-else>{{ row.database }}</span>
        </template>
      </el-table-column>
      <el-table-column width="300px" align="center" label="username">
        <template slot-scope="{ row }">
               <template v-if="row.edit">
            <el-input v-model="row.username" class="edit-input" size="small" ></el-input>
               <el-button
              class="cancel-btn"
              size="mini"
              icon="el-icon-refresh"
              type="warning"
              @click="cancelEdit(row)"
            >
              cancel
            </el-button>
          </template>
            <span v-else>{{ row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column width="300px" align="center" label="password">
        <template slot-scope="{ row }">
         <template v-if="row.edit">
            <el-input v-model="row.passwd" class="edit-input" size="small" ></el-input>
               <el-button
              class="cancel-btn"
              size="mini"
              icon="el-icon-refresh"
              type="warning"
              @click="cancelEdit(row)"
            >
              cancel
            </el-button>
          </template>
            <span v-else>{{ row.passwd }}</span>
        </template>
      </el-table-column>
      <el-table-column width="80px" align="center" label="port">
        <template slot-scope="{ row }">
          <span>{{ row.port }}</span>
        </template>
      </el-table-column>

      <el-table-column width="250px" align="center" label="ip">
        <template slot-scope="{ row }">
           <template v-if="row.edit">
            <el-input v-model="row.ip" class="edit-input" size="small" ></el-input>
               <el-button
              class="cancel-btn"
              size="mini"
              icon="el-icon-refresh"
              type="warning"
              @click="cancelEdit(row)"
            >
              cancel
            </el-button>
          </template>
            <span v-else>{{ row.ip }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="Status" width="110">
        <template slot-scope="{ row }">
          <el-tag :type="row.status | statusFilter">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>

      <!-- <el-table-column min-width="300px" label="Title">
        <template slot-scope="{ row }">
          <template v-if="row.edit">
            <el-input v-model="row.title" class="edit-input" size="small" />
            <el-button
              class="cancel-btn"
              size="small"
              icon="el-icon-refresh"
              type="warning"
              @click="cancelEdit(row)"
            >
              cancel
            </el-button>
          </template>
          <span v-else>{{ row.title }}</span>
        </template>
      </el-table-column> -->

      <el-table-column align="center" label="Actions" width="200px" fixed="right">
        <template slot="header" slot-scope="scope">
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入关键字搜索"/>
        </template>
        <template slot-scope="{ row }">
          <el-button
            v-if="row.edit"
            type="success"
            size="small"
            icon="el-icon-circle-check-outline"
            @click="confirmEdit(row)"
          >
            Ok
          </el-button>
          <el-button
            v-else
            type="primary"
            size="small"
            icon="el-icon-edit"
            @click="row.edit = !row.edit"
          >
            Edit
          </el-button>
          <el-button type="danger" size="small" icon="el-icon-delete">delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  </el-col>
   
</el-row>

</template>

<script>
import request from "@/utils/request";
import { parseTime } from "@/utils/index";
export default {
  name: "InlineEditTable",
  filters: {
    parseTime: parseTime,
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "info",
        deleted: "danger",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      list: [],
      editWidth:'300px',
      search:'',
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      this.listLoading = true;
      const { data } = await request.get("/databases",{
        params: { 
          search:this.search,
        }
      });
      console.log(data);
      const items = data.data;
      this.list = items.map((v) => {
        this.$set(v, "edit", false); // https://vuejs.org/v2/guide/reactivity.html
        v.originalTitle = v.title; //  will be used when user click the cancel botton
        return v;
      });
      this.listLoading = false;
    },
    cancelEdit(row) {
      row.title = row.originalTitle;
      row.edit = false;
      this.$message({
        message: "The title has been restored to the original value",
        type: "warning",
      });
    },
    confirmEdit(row) {
      row.edit = false;
      row.originalTitle = row.title;
      this.$message({
        message: "The title has been edited",
        type: "success",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
.add-button{
  margin:20px 0 0 20px;

}
</style>