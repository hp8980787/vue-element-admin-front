<template>
  <el-row v-loading="loading">
    <div style="margin: 20px 0 20px 20px">
      <el-button type="primary" @click="addInit">add</el-button>
    </div>
    <el-col :span="24">
      <el-table :data="tables" width="100%">
        <el-table-column label="id" prop="id" width="60"></el-table-column>
        <el-table-column
          label="数据库"
          prop="database.username"
          width="200"
        ></el-table-column>
        <el-table-column label="表类型" width="100">
          <template slot-scope="scope">
            <span>
              <svg-icon
                style="background-color: #606266; font-size: 16px"
                :icon-class="scope.row.type_id | tableStatus"
              />
              {{ scope.row.type_id | tableStatus }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="表名" prop="name" width="100"></el-table-column>
        <el-table-column label="录单格式" prop="format.name"></el-table-column>
        <el-table-column label="时间字段" prop="time_column"></el-table-column>
        <el-table-column label="全字段" prop="full_column"></el-table-column>
        <el-table-column
          label="展示字段"
          prop="display_column"
        ></el-table-column>
        <el-table-column label="操作" fixed="right" width="300">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"
            />
          </template>
          <template slot-scope="scope">
            <el-button @click="editInit(scope.row)" size="mini" type="primary"
              >修改</el-button
            >
            <el-popconfirm
              @onConfirm="TablesDelete(scope.row.id)"
              title="这是一段内容确定删除吗？"
            >
              <el-button slot="reference" size="mini" type="danger"
                >删除</el-button
              >
            </el-popconfirm>

            <el-button size="mini" type="primary">分配录单格式</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin: 10px auto 10px auto; text-align: center">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="pageSize"
          :current_page="currentPage"
          :total="total"
          @current-change="changeSize"
        >
        </el-pagination>
      </div>
    </el-col>
    <el-dialog
      :visible.sync="dialogVisible"
      :title="title"
      v-loading="dialogLoading"
    >
      <el-form
        :model="form"
        ref="form"
        :rules="formRules"
        label-width="100px"
        width="100%"
      >
        <el-form-item
          label="数据库选择"
          v-if="databases.length > 0"
          prop="database_id"
        >
          <el-select
            filterable
            @change="getTableName"
            v-model="form.database_id"
            placeholder="选择数据库"
          >
            <el-option
              v-for="(item, index) in databases"
              :key="index"
              :label="item.url + ' -|- ' + item.database"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="form.database_id > 0" label="选择表" prop="name">
          <el-select @change="getTableInfo" v-model="form.name">
            <el-option
              v-for="(table, key) in tableName"
              :key="key"
              :label="table"
              :value="table"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="form.database_id > 0"
          label="表类型选择"
          prop="type_id"
        >
          <el-select v-model="form.type_id">
            <el-option label="购物车表" value="1"></el-option>
            <el-option label="订单表" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="columns.length > 0" label="需要显示字段">
          <el-transfer
            :titles="['所有字段', '前台展示字段']"
            v-model="form.display_column"
            :data.sync="columns"
          ></el-transfer>
        </el-form-item>
        <el-form-item
          v-if="form.database_id > 0"
          label="时间字段"
          prop="time_column"
        >
          <el-select v-model="form.time_column">
            <el-option
              v-for="(column, key) in columns"
              :key="key"
              :label="column.label"
              :value="column.key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="formSubmit" v-if="action === 'add'"
            >提交</el-button
          >
          <el-button type="primary" v-else>修改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-row>
</template>

<script>
import request from "@/utils/request";
export default {
  name: "TablesIndex",
  filters: {
    tableStatus(val) {
      const status = [];
      status[1] = "cart";
      status[2] = "paypal";
      return status[parseInt(val)];
    },
  },
  data() {
    return {
      tables: [],
      loading: true,
      action: "add",
      total: 0,
      pageSize: 0,
      currentPage: 1,
      search: "sadsadsa",
      dialogVisible: false,
      title: "",
      form: {},
      databases: [],
      tables: [],
      tableName: [],
      dialogLoading: true,
      columns: [],
      isIndeterminate: true,
      checkAll: false,
      formRules: {
        database_id: [{ required: true, message: "必须", trigger: "blur" }],
        name: [{ required: true, message: "必须", trigger: "blur" }],
        type_id: [{ required: true, message: "必须", trigger: "blur" }],
        time_column: [{ required: true, message: "必须", trigger: "blur" }],
      },
    };
  },
  mounted() {
    this.getTablesList();
  },
  methods: {
    async getTablesList() {
      const { data } = await request.get("/tables", {
        params: {
          page: this.currentPage,
        },
      });

      this.tables = data.data;
      this.total = data.total;
      this.pageSize = data.per_page;
      this.currentPage = data.current_page;
      this.loading = false;
    },
    changeSize(page) {
      this.currentPage = page;
      this.loading = true;
      this.getTablesList();
    },
    addInit() {
      this.dialogVisible = true;
      this.action = "add";
      this.title = "添加数据表";
      this.getDatabasesList();
    },
    editInit(data) {
      this.form = data;
      this.dialogVisible = true;
      this.action = "edit";
      this.title = "修改数据表";
      this.getDatabasesList();
    },
    async getDatabasesList() {
      const { data } = await request.get("/databases-all");
      this.databases = data;
      this.dialogLoading = false;
    },
    async TablesDelete(id) {
      const data = await request.delete(`tables/${id}`);
      if (data.code === 200) {
        this.$message({ message: "删除成功!", type: "success" });
        this.getTablesList();
      } else {
        this.$message({ message: "删除失败!", type: "error" });
      }
    },
    getTableName() {
      this.dialogLoading = true;
      request({
        url: `/databases/${this.form.database_id}/tables-name`,
        method: "get",
        timeout: 40 * 1000,
      })
        .then((response) => {
          this.tableName = response.data;
          (this.dialogLoading = false), console.log(this.tables);
        })
        .catch((error) => {});
    },
    getTableInfo() {
      this.dialogLoading = true;
      request({
        url: `/databases/${this.form.database_id}/tables-info`,
        params: {
          table_name: this.form.name,
        },
        method: "get",
        timeout: 40 * 1000,
      })
        .then((response) => {
          for (let i in response.data) {
            this.columns.push({
              key: response.data[i],
              label: response.data[i],
            });
          }
          this.form.full_column = response.data;
          this.dialogLoading = false;
          console.log(response);
        })
        .catch((error) => {});
    },
    formSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          request
            .post("/tables", this.form)
            .then((response) => {
              if (response.code === 200) {
                this.$message({ message: "添加成功!", type: "success" });
                this.getTablesList();
              }
            })
            .catch((error) => {});
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style>
</style>