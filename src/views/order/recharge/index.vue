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
            <el-option label="待支付" :value="0"></el-option>
            <el-option label="待确认" :value="1"></el-option>
            <el-option label="超时取消" :value="3"></el-option>
            <el-option label="用户取消" :value="4"></el-option>
            <el-option label="已支付" :value="2"></el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select v-model="queryParams.payType" placeholder="支付类型" style="width: 100%;">
            <el-option label="银行转账" :value="1"></el-option>
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
      <el-table-column prop="orderNo" label="订单ID"></el-table-column>
      <el-table-column prop="orderTime" label="订单时间"></el-table-column>
      <el-table-column prop="status" label="订单状态">
        <template #default="{ row }">
          <span :class="statusClass(row.status)" style="color: chocolate;" v-if="row.status == 0">待支付</span>
          <span :class="statusClass(row.status)" v-if="row.status == 1">待确认</span>
          <span :class="statusClass(row.status)" style="color: green;" v-if="row.status == 2">已支付</span>
          <span :class="statusClass(row.status)" style="color: red;" v-if="row.status == 3">超时取消</span>
          <span :class="statusClass(row.status)" style="color: red;" v-if="row.status == 4">用户取消</span>
        </template>
      </el-table-column>
      <el-table-column prop="safeNo" label="充值钱包"></el-table-column>
      <el-table-column prop="amount" label="充值金额"></el-table-column>
      <el-table-column prop="payType" label="支付类型">
        <template #default="{ row }">
          <span :class="statusClass(row.payType)" v-if="row.payType == 1">银行</span>
          <span :class="statusClass(row.payType)" v-if="row.payType == 2">第三方</span>
        </template>
      </el-table-column>
      <el-table-column prop="payInfo" label="支付信息">
        <template #default="{ row }">
          <span>付款渠道：{{ row.payChannelName || '无' }}</span><br />
          <span>付款资料：{{ row.payAccountName || '无' }}</span><br />
          <span>付款账户：{{ row.payAccountNo || '无' }}</span><br />
          <span>付款时间：{{ row.paySuccessTime || '无' }}</span><br />
          <span>支付流水号：<span style="color: #1890ff;">{{ row.payNo || '无' }}</span></span>
        </template>
      </el-table-column>
      <el-table-column prop="payInfo" label="入款信息">
        <template #default="{ row }">
          <span>入款渠道：{{ row.inChannelName || '无' }}</span><br />
          <span>入款资料：{{ row.inAccountName || '无' }}</span><br />
          <span>入款账户：{{ row.inAccountNo || '无' }}</span><br />
          <span>确定金额：{{ row.inAmount || '无' }}</span><br />
          <span>确认时间：{{ row.inSuccessTime || '无' }}</span><br />
          <span>确认耗时：{{ row.depleteTime || '无' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="operationInfo" label="操作信息">
        <template #default="{ row }">
          <span>操作时间：{{ row.updateTime || '无' }}</span><br />
          <span>操作账号：{{ row.updateBy || '无' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template #default="{ row }">
          <el-button type="text" size="small" @click="orderSubmit(row)" v-if="row.status == 1">入款确认</el-button>
          <el-button type="text" size="small" disabled v-else>入款确认</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />


    <el-dialog :visible.sync="dialogVisible" width="30%" title="确认提示">
      <div>
        <p><strong>是否确认该笔入款订单？</strong></p>
        <p>请核对清楚后谨慎操作</p>
<!--        <div class="flex">-->
<!--          <span style="min-width: 100px">付款渠道：</span>-->
<!--          <el-input v-model="paymentInfo.payChannelName" placeholder="请输入付款渠道" size="small" />-->
<!--        </div>-->
<!--        <div class="flex">-->
<!--          <span style="min-width: 100px">付款资料：</span>-->
<!--          <el-input v-model="paymentInfo.payAccountName" placeholder="请输入付款资料" size="small" />-->
<!--        </div>-->
        <div class="flex">
          <span style="min-width: 100px">付款账号：</span>
<!--          <el-input v-model="paymentInfo.payAccountNo" placeholder="请输入付款账号" size="small" />-->
          <el-col :span="16">{{ paymentInfo.payAccountNo }}</el-col>
        </div>
        <div class="flex">
          <span style="min-width: 100px">付款时间：</span>
<!--          <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss"-->
<!--            v-model="paymentInfo.payScuccessTime" type="datetime" placeholder="选择日期时间">-->
<!--          </el-date-picker>-->
          <el-col :span="16">{{ paymentInfo.paySuccessTime }}</el-col>
        </div>
        <div class="flex">
          <span style="min-width: 100px">支付流水号：</span>
<!--          <el-input v-model="paymentInfo.payNo" placeholder="请输入支付流水号" size="small" />-->
          <el-col :span="16">{{ paymentInfo.payNo }}</el-col>
        </div>
        <div class="flex">
          <span style="min-width: 80px">确认金额：</span>
          <el-input v-model="paymentInfo.realAmount" placeholder="请输入实际到账的金额" size="small" />
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmPayment">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { listInfo, deposits } from "@/api/order/recharge";
export default {
  data() {
    return {
      activeTab: "userRecharge",
      paymentAmount: "",
      paymentInfo: {},
      dialogVisible: false,
      loading: false,
      queryParams: {
        orderNo: "",
        status: "",
        payType: "",
        pageNum: 1,
        pageSize: 10,
        orderTimeBegin: null,
        orderTimeEnd: null,
        data: null,
      },
      total: 0,
      orderData: [
      ],
      interval:null
    };
  },
  created() {
    this.getList();
    this.interval = setInterval(() => {
      this.getList();
    }, 5000);
  },
  destroyed() {
    clearInterval(this.interval);  // 清除定时器
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
        data: null,
      };
      this.getList();
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
    orderSubmit(row) {
      console.log("支付时间："+row.paySuccessTime)
      console.log(row)
      this.paymentInfo = {
        payChannelName: row.payChannelName,
        payAccountName: row.payAccountName,
        payAccountNo: row.payAccountNo,
        paySuccessTime: row.paySuccessTime,
        payNo: row.payNo,
        id: row.id,
      };
      this.dialogVisible = true;
    },
    confirmPayment() {
      console.log(this.paymentInfo);
      deposits(this.paymentInfo).then(response => {
        this.dialogVisible = false;
        this.getList();
      });
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

.flex {
  display: flex;
  align-items: center;
  padding: 10px 0
}
</style>
