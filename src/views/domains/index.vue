<template>
  <el-row v-loading="loading">
    <el-col :span="24" style="margin: 20px 20px">
      <el-button type="primary" @click="addInit">添加</el-button>
      <el-button type="primary" @click="checkWeb">检查网站过期时间</el-button>
    </el-col>
    <el-col :span="24">
      <el-table :data="domains">
        <el-table-column label='id' prop="id"></el-table-column>
        <el-table-column label="name" prop="name" />
        <el-table-column label="网址" prop="url">
          <template slot-scope="scope">
            <a :href="scope.row.url" target="__blank">{{ scope.row.url }}</a>
          </template>
        </el-table-column>
        <el-table-column label="国家" prop="country" />
        <el-table-column
          label="提醒时间(天)"
          prop="remind_time"
        />
        <el-table-column label="检查状态">
          <template slot-scope="scope">
            <el-tag :type="scope.row.check_status | statusTransType">
              {{ scope.row.check_status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="check_time" prop="check_time" />
        <el-table-column label="过期时间" prop="expired_time" />
        <el-table-column label="操作" fixed="right" width="300px">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="editInit(scope.row)"
            >修改</el-button>
            <el-popconfirm
              title="确定删除该域名吗？"
              @onConfirm="deleteDomains(scope.row.id)"
            >
              <el-button
                slot="reference"
                size="mini"
                type="danger"
              >删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <el-col :span="8" :offset="8" style="margin-top: 20px; margin-bottom: 20px">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="perPage"
        :current-page="currentPage"
        @current-change="changePage"
      />
    </el-col>
    <el-dialog :visible.sync="dialogFormVisible" :title="title[action]">
      <el-form ref="form" :model="form" :rules="formRules" label-width="100px">
        <el-form-item label="url" prop="url">
          <el-input
            v-model="form.url"
            placeholder="https://example.com"
          />
        </el-form-item>
        <el-form-item label="name" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="country" prop="country">
          <el-input v-model="form.country" />
        </el-form-item>
        <el-form-item label="提醒时间">
          <el-select v-model="form.remind_time">
            <el-option
              v-for="(item, key) in 10"
              :key="key"
              :label="5 * item + '天'"
              :value="5 * item"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            v-if="action == 'add'"
            type="primary"
            @click="formSubmit"
          >提交</el-button>
          <el-button v-else type="primary" @click="formUpdate">修改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-row>
</template>

<script>
import request from '@/utils/request'
import { validUrl } from '@/utils/validate'
import { checkDomains } from '@/api/domain'
export default {
  name: 'DomainsIndex',
  filters: {
    statusTransType(value) {
      const type = {
        checked: 'success',
        not_checked: 'warning',
        checked_fail: 'danger'
      }
      return type[value]
    }
  },
  data() {
    var validateUrl = (rule, value, callback) => {
      if (!validUrl(value)) {
        callback(new Error('格式不正确!'))
      } else {
        callback()
      }
    }
    return {
      domains: [],
      loading: true,
      total: 0,
      perPage: 0,
      currentPage: 1,
      dialogFormVisible: false,
      action: 'add',
      title: {
        add: '添加域名',
        edit: '修改域名'
      },
      form: {},
      formRules: {
        name: [{ required: true, message: '必须', trigger: 'blur' }],
        url: [{ required: true, trigger: 'blur', validator: validateUrl }]
      }
    }
  },
  watch: {
    'form.url': {
      handler(val, old) {
        if (val !== '') {
          this.form.name = val.replace(/(https\:\/\/|http\:\/\/)(www\.|)/i, '')
        }
      }
    }
  },
  mounted() {
    this.getDoaminsList()
  },
  methods: {
    async getDoaminsList() {
      const { data } = await request.get('/domains', {
        params: {
          page: this.currentPage
        }
      })
      this.domains = data.data
      this.total = data.total
      this.perPage = data.per_page
      this.currentPage = data.current_page
      this.loading = false
    },
    changePage(page) {
      this.currentPage = page
      this.getDoaminsList()
    },
    addInit() {
      this.dialogFormVisible = true
      this.form = {}
      this.action = 'add'
    },
    editInit(data) {
      this.dialogFormVisible = true
      this.form = data
      this.action = 'edit'
    },
    formSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.createDomains()
        } else {
          this.$message({ message: '添加失败!', type: 'error' })
        }
      })
    },
    formUpdate() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.updateDomains()
        } else {
          this.$message({ message: '添加失败!', type: 'error' })
        }
      })
    },
    async createDomains() {
      const data = await request.post('/domains', this.form)
      this.$message({ message: '添加成功!', type: 'success' })
      this.dialogFormVisible = false
      this.getDoaminsList()
    },
    async updateDomains() {
      const data = await request.put(`/domains/${this.form.id}`, this.form)
      this.$message({ message: '修改成功!', type: 'success' })
      this.getDoaminsList()
      this.dialogFormVisible = false
    },
    async deleteDomains(id) {
      const data = await request.delete(`/domains/${id}`)
      this.getDoaminsList()
      this.$message({ message: '删除成功!', type: 'success' })
    },
    checkWeb() {
      this.loading = true
      checkDomains().then((response) => {
        this.loading = false
        this.getDoaminsList()
        console.log(response)
      })
    }
  }
}
</script>

<style>
</style>
