<template>
  <div class="order-management">
    <!-- 顶部选项卡 -->
    <el-tabs v-model="activeTab" type="card">
      <el-tab-pane label="用户充值" name="userRecharge"></el-tab-pane>
      <el-tab-pane label="商户充值" name="merchantRecharge"></el-tab-pane>
    </el-tabs>

    <!-- 筛选条件 -->
    <div class="filter-section">
      <el-row :gutter="20">
        <el-col :span="5">
          <el-date-picker v-model="queryParams.date" type="datetimerange" range-separator="至" start-placeholder="开始日期"
            format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" end-placeholder="结束日期">
          </el-date-picker>
        </el-col>
        <el-col :span="3">
          <el-input v-model="queryParams.orderNo" placeholder="订单ID"></el-input>
        </el-col>
        <el-col :span="3">
            <el-select v-model="queryParams.type" placeholder="转账类型" style="width: 100%;">
              <el-option label="缴纳参赛费" :value="1"></el-option>
              <el-option label="缴纳队费" :value="2"></el-option>
              <el-option label="缴纳活动费" :value="3"></el-option>
            </el-select>
          </el-col>
          <el-col :span="3">
            <el-input v-model="queryParams.outSafe" placeholder="转出钱包"></el-input>
          </el-col>
          <el-col :span="3">
            <el-input v-model="queryParams.inSafe" placeholder="转入钱包"></el-input>
          </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="getList">查询</el-button>
          <el-button @click="reset">重置</el-button>
        </el-col>
      </el-row>
    </div>

    <!-- 表格 -->
    <el-table v-loading="loading" :data="orderData" border style="width: 100%;">
      <el-table-column prop="orderNo" label="订单ID" width="150"></el-table-column>
      <el-table-column prop="createTime" label="转账时间" width="150"></el-table-column>
      <el-table-column prop="type" label="转账类型" width="120">
        <template #default="{ row }">
          <span>{{ statusText(row.type) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="amount" label="转账金额" width="150"></el-table-column>
      <el-table-column prop="outSafe" label="转出钱包" width="120"></el-table-column>
      <el-table-column prop="inSafe" label="转入钱包"></el-table-column>
    </el-table>

    <!-- 分页 -->
    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />
  </div>
</template>
<script>
import { listInfo } from "@/api/order/refund";
export default {
  data() {
    return {
      activeTab: "userRecharge",
      filter: {

      },
      loading: false,
      queryParams: {
        orderTime: null,
        addTime: null,
        orderNo: "",
        type: "",
        outSafe: "",
        inSafe: "",
        pageNum: 1,
        pageSize: 10,
      },
      total:0,
      orderData: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.loading = true;
      if (this.queryParams.date) {
        this.queryParams.createTimeBegin = this.queryParams.date[0]
        this.queryParams.createTimeEnd = this.queryParams.date[1]
      }
      listInfo(this.queryParams).then(response => {
        this.orderData = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    search() {
      console.log("查询条件:", this.filter);
      // 模拟数据查询逻辑
    },
    reset() {
      this.queryParams = {
        orderTime: null,
        addTime: null,
        orderNo: "",
        type: "",
        outSafe: "",
        inSafe: "",
        pageNum: 1,
        pageSize: 10,
        createTimeBegin: null,
        createTimeEnd: null,
        date: null,
      };
      this.getList()
    },
    statusText(status) {
      switch (status) {
        case 1:
          return "缴纳参赛费";
        case 2:
          return "缴纳队费";
        case 3:
          return "缴纳活动费";
        default:
          return "";
      }
    },
  }
};
</script>

<style scoped>
.order-management {
  padding: 20px;
}

.filter-section {
  margin: 20px 0;
}

.text-blue {
  color: blue;
}

.text-red {
  color: red;
}

.text-green {
  color: green;
}

.text-yellow {
  color: orange;
}

.pagination {
  margin-top: 20px;
  text-align: right;
}
</style>