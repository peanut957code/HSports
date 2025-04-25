<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="用户等级配置" name="first">

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

        <el-table v-loading="loading" :data="levelList" @selection-change="handleSelectionChange">
          <el-table-column label="等级" align="center" prop="num" />
          <el-table-column label="等级名称" align="center" prop="name" />
          <el-table-column label="等级logo" align="center" prop="logo">
            <template #default="{ row }">
              <img v-if="row.logo" :src="row.logo" alt="" style="width: 50px; height: 50px;">
              <image-upload 
                v-else
                :isShowTip="false"
                v-model="row.logo"
                :rowObj="row"
                @upload-success="handleUploadSuccess"
              >
                <el-button size="mini" type="primary">
                 上传logo
                </el-button>
              </image-upload>
            </template>
          </el-table-column>
          <el-table-column label="等级所需经验值" align="center" prop="experience">
            <template #default="{ row }">
              <el-input v-model="row.experience"  @blur="addLogo(row)"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="升级奖励积分" align="center" prop="bonus">
            <template #default="{ row }">
              <el-input v-model="row.bonus" @blur="addLogo(row)"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="最近操作人" align="center" prop="updateBy" />
          <el-table-column label="最近操作时间" align="center" prop="updateTime" />
        </el-table>

        <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize" @pagination="getList" />

      </el-tab-pane>
      <el-tab-pane label="用户升级记录" name="second">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch">
          <el-form-item label="用户账号" prop="name">
            <el-input v-model="queryParams.name" placeholder="请输入等级名" clearable @keyup.enter.native="handleQuery" />
          </el-form-item>
          <el-form-item prop="status">
            <el-select v-model="queryParams.status" placeholder="升级奖励领取状态" clearable @keyup.enter.native="handleQuery">
              <el-option label="未领取" :value="0"></el-option>
              <el-option label="已领取" :value="1"></el-option>
            </el-select>
            <!-- <el-input v-model="queryParams.logoUrl" placeholder="升级奖励领取状态" clearable
              @keyup.enter.native="handleQuery" /> -->
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
          </el-form-item>
        </el-form>

        <el-table v-loading="loading" :data="levelList2" @selection-change="handleSelectionChange">
          <el-table-column label="用户等级" align="center" prop="name" />
          <el-table-column label="账号类型" align="center" prop="type">
            <template #default="{ row }">
              <span>{{ row.type === 'USER' ? '用户' : '商户' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="升级前等级" align="center" prop="upBefore" />
          <el-table-column label="升级后等级" align="center" prop="upAfter" />
          <el-table-column label="升级奖励积分" align="center" prop="bonus" />
          <el-table-column label="奖励领取" align="center" prop="status">
            <template #default="{ row }">
              <span>{{ row.type === 0 ? '未领取' : '领取' }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column label="升级时间" align="center" prop="bonus" />
          <el-table-column label="奖励领取时间" align="center" prop="bonus" /> -->
          <el-table-column label="最近操作人" align="center" prop="updateBy" />
          <el-table-column label="最近操作时间" align="center" prop="updateTime" />
        </el-table>

        <pagination v-show="total2 > 0" :total="total2" :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize" @pagination="getList" />

      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { modify, getLevel, delLevel, addLevel, updateLevel, listUserLevelUp, listUserUp, addLevel1, addLevel10, deleteOne1, deleteOne10 } from "@/api/users/userLeve";

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
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name:'',
        status: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      },
      levelList2: [],
      imgLogo: ''
    };
  },
  created() {
    this.getList();
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleUploadSuccess(url,row) {
      console.log(url,row);
      this.imgLogo = url;
      this.addLogo(row);
    },
    addLogo(row) {
      let params = {
        id: row.id,
        logo: this.imgLogo,
        experience: row.experience,
        bonus: row.bonus
      }
      modify(params).then(response => {
        if(response.code === 200){
          this.$modal.msgSuccess("修改成功");
          this.getList();
        }
      });
    },
    /** 查询等级列表 */
    getList() {
      this.loading = true;
      listUserUp(this.queryParams).then(response => {
        this.levelList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
      listUserLevelUp(this.queryParams).then(response => {
        this.levelList2 = response.rows;
        this.total2 = response.total;
        this.loading2 = false;
      });
    },
    add1(){
      addLevel1().then(response => {
        this.$modal.msgSuccess("新增成功");
        this.getList();
      });
    },
    add10(){
      addLevel10().then(response => {
        this.$modal.msgSuccess("新增成功");
        this.getList();
      });
    },
    delete1(){
      deleteOne1().then(response => {
        this.$modal.msgSuccess("新增成功");
        this.getList();
      });
    },
    delete10(){
      deleteOne10().then(response => {
        this.$modal.msgSuccess("新增成功");
        this.getList();
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
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.title = "添加等级";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      const id = row.id || this.ids
      getLevel(id).then(response => {
        this.form = response.data;
        this.title = "修改等级";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateLevel(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.getList();
            });
          } else {
            addLevel(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除等级编号为"' + ids + '"的数据项？').then(function () {
        return delLevel(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => { });
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/level/export', {
        ...this.queryParams
      }, `level_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
