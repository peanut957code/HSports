<template>
  <div class="order-management">
    <!-- 顶部选项卡 -->
    <el-tabs v-model="activeTab" type="card">
      <el-tab-pane label="场馆退费" name="userRecharge"></el-tab-pane>
      <el-tab-pane label="球队退费" name="merchantRecharge"></el-tab-pane>
      <el-tab-pane label="赛事退费" name="merchantRecharge"></el-tab-pane>
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
          <el-select v-model="queryParams.type" placeholder="退费类型" style="width: 100%;">
            <el-option label="场馆退费给个人" value="bankTransfer"></el-option>
            <el-option label="场馆退费给球队" value="alipay"></el-option>
            <el-option label="场馆退费给赛事" value="alipay"></el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-select v-model="queryParams.reason" placeholder="退费是由" style="width: 100%;">
            <el-option label="个人订场费" value="bankTransfer"></el-option>
            <el-option label="球队订场费" value="alipay"></el-option>
            <el-option label="赛事订场费" value="alipay"></el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-input v-model="queryParams.outSafe" placeholder="转出钱包"></el-input>
        </el-col>
        <el-col :span="3">
          <el-input v-model="queryParams.inSafe" placeholder="转入钱包"></el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="getList">查询</el-button>
          <el-button @click="reset">重置</el-button>
        </el-col>
      </el-row>
    </div>

    <!-- 表格 -->
    <el-table v-loading="loading" :data="orderData" border style="width: 100%;">
      <el-table-column prop="orderNo" label="订单ID" width="150"></el-table-column>
      <el-table-column prop="refundTime" label="退费时间" width="150"></el-table-column>
      <el-table-column prop="type" label="退费类型" width="120">
        <template #default="{ row }">
          <span v-if="row.type == 1">场馆退费</span>
          <span v-if="row.type == 2">球队退费</span>
          <span v-if="row.type == 3">赛事退费</span>
          <span v-if="row.type == 4">商铺退费</span>
        </template>
      </el-table-column>
      <el-table-column prop="amount" label="退费金额" width="120"></el-table-column>
      <el-table-column prop="reason" label="退费是由" width="150"></el-table-column>
      <el-table-column prop="outSafe" label="转出钱包" width="120"></el-table-column>
      <el-table-column prop="inSafe" label="转入钱包"></el-table-column>

      <!-- <el-table-column label="操作" width="120">
        <template #default="{ row }">
          <el-button type="text" size="small">出款确认</el-button>
        </template>
      </el-table-column> -->
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
        orderNo: "",
        reason: "",
        type: "",
        outSafe: "",
        inSafe: "",
        pageNum: 1,
        pageSize: 10,
        refundTimeBegin: "",
        refundTimeEnd: "",
        date: "",
      },
      orderData: [],
      total: 0,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.loading = true;
      if (this.queryParams.date) {
        this.queryParams.refundTimeBegin = this.queryParams.date[0]
        this.queryParams.refundTimeEnd = this.queryParams.date[1]
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
        orderNo: "",
        reason: "",
        type: "",
        outSafe: "",
        inSafe: "",
        pageNum: 1,
        pageSize: 10,
        refundTimeBegin: "",
        refundTimeEnd: "",
        date: "",
      };
      this.getList()
    },
    statusClass(status) {
      switch (status) {
        case "confirming":
          return "text-blue";
        case "timeoutCancel":
          return "text-red";
        case "userCancel":
          return "text-yellow";
        case "paid":
          return "text-green";
        default:
          return "";
      }
    },
    handlePageChange(page) {
      console.log("当前页码:", page);
    }
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
