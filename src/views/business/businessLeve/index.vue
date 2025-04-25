<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="商户等级配置" name="first">

        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-dropdown>
              <el-button type="primary">
                新增<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="add1">增加1级</el-dropdown-item>
                <el-dropdown-item @click.native="add10">增加10级</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
          <el-col :span="1.5">
            <el-dropdown>
              <el-button type="danger">
                删除<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="delete1">删除1级</el-dropdown-item>
                <el-dropdown-item @click.native="delete10">删除10级</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
          <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>

        <el-table v-loading="loading" :data="levelList">
          <el-table-column label="用户账号" align="center" prop="name" />
          <el-table-column label="等级名称" align="center" prop="num" />
          <el-table-column label="等级logo" align="center" prop="logo" />
          <el-table-column label="等级所需经验值" align="center" prop="experience" />
          <el-table-column label="升级奖励积分" align="center" prop="bonus" />
          <el-table-column label="最近操作人" align="center" prop="updateBy" />
          <el-table-column label="最近操作时间" align="center" prop="updateTime" />
        </el-table>

        <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize" @pagination="getList" />

      </el-tab-pane>
      <el-tab-pane label="商户升级记录" name="second">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch">
          <el-form-item label="时间" prop="name">
            <el-input v-model="queryParams.name" placeholder="请输入时间" clearable @keyup.enter.native="handleQuery" />
          </el-form-item>
          <el-form-item label="升级后用户等级" prop="logoUrl">
            <el-input v-model="queryParams.logoUrl" placeholder="请输入升级后用户等级" clearable
              @keyup.enter.native="handleQuery" />
          </el-form-item>
          <el-form-item label="用户状态" prop="experience">
            <el-input v-model="queryParams.experience" placeholder="请输入用户状态" clearable
              @keyup.enter.native="handleQuery" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
          </el-form-item>
        </el-form>

        <el-table v-loading="loading" :data="levelList2">
          <el-table-column label="商户账号" align="center" prop="name" />
          <el-table-column label="账号类型" align="center" prop="num" />
          <el-table-column label="升级前等级" align="center" prop="logo" />
          <el-table-column label="升级后等级" align="center" prop="experience" />
          <el-table-column label="升级奖励积分" align="center" prop="bonus" />
          <el-table-column label="奖励领取" align="center" prop="bonus" />
          <el-table-column label="升级时间" align="center" prop="bonus" />
          <el-table-column label="奖励领取时间" align="center" prop="updateBy" />
        </el-table>

        <pagination v-show="total2 > 0" :total="total2" :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize" @pagination="getList" />

      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { listLevel,listLevelMer,deleteOne,deleteTen,addOne,addTen } from "@/api/business/userLeve";

export default {
  name: "userLeve",
  data() {
    return {
       activeName: 'first',
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      total2: 0,
      // 等级表格数据
      levelList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: null,
        logoUrl: null,
        experience: null,
        bonus: null,
        type: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      },
      levelList2:[]
    };
  },
  created() {
    this.getList();
  },
  methods: {
    add1() {
      addOne().then(res => {
        if (res.code === 200) {
          this.getList();
        }
      });
    },
    add10() {
      addTen().then(res => {
        if (res.code === 200) {
          this.getList();
        }
      });
    },
    delete1() {
      deleteOne().then(res => {
        if (res.code === 200) {
          this.getList();
        }
      });
    },
    delete10() {
      deleteTen().then(res => {
        if (res.code === 200) {
          this.getList();
        }
      });
    },
    handleClick(tab, event) {
        console.log(tab, event);
      },
    /** 查询等级列表 */
    getList() {
      this.loading = true;
      listLevel(this.queryParams).then(response => {
        this.levelList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
      listLevelMer(this.queryParams).then(response => {
        this.levelList2 = response.rows;
        this.total2 = response.total || 0;
        this.loading = false;
      });
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    /** 新增按钮操作 */
    handleAdd() {},
  }
};
</script>
