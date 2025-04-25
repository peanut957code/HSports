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
          <el-select v-model="queryParams.status" placeholder="订单状态" style="width: 100%;">
            <el-option label="审核中" :value="1"></el-option>
            <el-option label="成功" :value="2"></el-option>
            <el-option label="失败" :value="3"></el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-select v-model="queryParams.payType" placeholder="支付类型" style="width: 100%;">
            <el-option label="银行" :value="1"></el-option>
            <el-option label="第三方支付" :value="2"></el-option>
          </el-select>
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
      <el-table-column prop="orderTime" label="订单时间"></el-table-column>
      <el-table-column prop="status" label="订单状态">
        <template #default="{ row }">
          <span :class="statusClass(row.status)" v-if="row.status == 1">审核中</span>
          <span :class="statusClass(row.status)" v-if="row.status == 2">成功</span>
          <span :class="statusClass(row.status)" v-if="row.status == 3">失败</span>
        </template>
      </el-table-column>
      <el-table-column prop="safeNo" label="提款钱包"></el-table-column>
      <el-table-column prop="amount" label="提款金额"></el-table-column>
      <el-table-column prop="payType" label="出款类型">
        <template #default="{ row }">
          <span v-if="row.payType == 1">银行</span>
          <span v-if="row.payType == 2">第三方</span>
        </template>
      </el-table-column>
      <el-table-column prop="payInfo" label="出款信息" width="200">
        <template #default="{ row }">
          <span>出款渠道：{{ row.payChannelName || '无' }}</span><br />
          <span>出款资料：{{ row.payAccountName || '无' }}</span><br />
          <span>出款账户：{{ row.payAccountNo || '无' }}</span><br />
          <span>确认时间：{{ row.paySuccessTime || '无' }}</span><br />
          <span>确认耗时：{{ row.depleteTime || '无' }}</span><br />
          <span>积分消耗：{{ row.payAmount || '无' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="payInfo" label="收款信息" width="200">
        <template #default="{ row }">
          <span>收款渠道：{{ row.inChannelName || '无' }}</span><br />
          <span>收款资料：{{ row.inAccountName || '无' }}</span><br />
          <span>收款账户：{{ row.inAccountNo || '无' }}</span><br />
        </template>
      </el-table-column>
      <el-table-column prop="operationInfo" label="操作信息" width="200">
        <template #default="{ row }">
          <span>操作时间：{{ row.updateTime || '无' }}</span><br />
          <span>操作账号：{{ row.updateBy || '无' }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="操作" width="120">
        <template #default="{ row }">
          <el-button type="text" size="small" @click="submitEvent(row)">出款确认</el-button>
        </template>
      </el-table-column> -->
    </el-table>

    <!-- 分页 -->
    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />
  </div>
</template>
<script>
import { listInfo } from "@/api/order/withdrawal";
export default {
  data() {
    return {
      activeTab: "userRecharge",
      loading: false,
      queryParams: {
        orderTime: null,
        addTime: null,
        orderNo: "",
        status: "",
        payType: "",
        pageNum: 1,
        pageSize: 10,
        orderTimeBegin: null,
        orderTimeEnd: null,
        date: null,
      },
      total: 0,
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
        this.queryParams.orderTimeBegin = this.queryParams.date[0]
        this.queryParams.orderTimeEnd = this.queryParams.date[1]
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
        status: "",
        payType: "",
        pageNum: 1,
        pageSize: 10,
        orderTimeBegin: null,
        orderTimeEnd: null,
        date: null,
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
    },
    submitEvent(row) {
      console.log("出款确认:", row);
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
