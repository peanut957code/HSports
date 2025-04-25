<template>
  <div class="order-management">
    <!-- 顶部选项卡 -->
    <el-tabs v-model="activeTab" type="card">
      <el-tab-pane label="订场消费" name="userRecharge"></el-tab-pane>
      <el-tab-pane label="保险消费" name="merchantRecharge"></el-tab-pane>
      <el-tab-pane label="商品消费" name="merchantRecharge"></el-tab-pane>
      <el-tab-pane label="特权消费" name="merchantRecharge"></el-tab-pane>
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
          <el-select v-model="queryParams.orderStatus" placeholder="订单状态" style="width: 100%;">
            <el-option label="确认中" value="confirming"></el-option>
            <el-option label="超时取消" value="timeoutCancel"></el-option>
            <el-option label="用户取消" value="userCancel"></el-option>
            <el-option label="已支付" value="paid"></el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-select v-model="queryParams.orderStatus" placeholder="执行状态" style="width: 100%;">
            <el-option label="待执行" value="confirming"></el-option>
            <el-option label="已执行" value="timeoutCancel"></el-option>
            <el-option label="有争议" value="userCancel"></el-option>
            <el-option label="取消" value="paid"></el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-select v-model="queryParams.payType" placeholder="订场类型" style="width: 100%;">
            <el-option label="整场订金" value="bankTransfer"></el-option>
            <el-option label="整场全款" value="bankTransfer"></el-option>
            <el-option label="约战全款" value="alipay"></el-option>
            <el-option label="散客全款" value="alipay"></el-option>
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
      <el-table-column prop="payTime" label="订单时间" width="150"></el-table-column>
      <el-table-column prop="wallet" label="订单信息">
        <template #default="{ row }">
          <span>用户账号：{{ row.uid }}</span><br />
          <span>使用钱包：{{ row.paySafe }}</span><br />
          <span>执行场馆：{{ row.vName }}</span><br />
          <span>商户账号：{{ row.receiveSafe }}</span><br />
          <span>订单状态：
            <span v-if="row.status == 1">已支付定金</span>
            <span v-if="row.status == 2">已支付全款</span>
            <span v-if="row.status == 3">后台取消</span>
            <span v-if="row.status == 4">用户取消</span>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="amount" label="订场信息">
        <template #default="{ row }">
          <span>订场日期：{{ row.reserveTime }}</span><br />
          <span>订场场地：{{ row.sNum}}</span><br />
          <span>订场场次：{{ row.sSession}}</span><br />
          <span>订场时段：{{ row.sTime}}</span><br />
          <span>订场类型：{{ row.sType  == 1 ? '整场订金' : row.sType  == 2 ? '整场全款' : ''}}</span><br />
          <span>订场金额：{{ row.realAmount }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="payType" label="优惠信息">
        <template #default="{ row }">
          <span>优惠内容：{{ row.disAmount }}</span><br />
          <span>优惠金额：{{ row.disAmount }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="finalStatus" label="执行状态" width="120">
        <template #default="{ row }">
          <span v-if="row.finalStatus == 1">待执行</span>
          <span v-if="row.finalStatus == 2">已执行</span>
          <span v-if="row.finalStatus == 3">有争议</span>
          <span v-if="row.finalStatus == 0">取消</span>
        </template>
      </el-table-column>
      <el-table-column prop="operationInfo" label="操作信息" width="200">
        <template #default="{ row }">
          <span>操作时间：{{ row.updateTime || '无' }}</span><br />
          <span>操作账号：{{ row.updateBy || '无' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template #default="{ row }">
          <el-button type="text" size="small" @click="cennlOrder(row)" v-if="row.status == 1 && row.finalStatus == 1">取消订单</el-button>
          <el-button type="text" size="small" v-else disabled>取消订单</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />
  </div>
</template>
<script>
import { listInfo, cancel } from "@/api/order/consumption";
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
        orderStatus: "",
        payType: "",
        pageNum: 1,
        pageSize: 10,
        completeTimeBegin: null,
        completeTimeEnd: null,
        data: null,
      },
      total: 2,
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
        this.queryParams.completeTimeBegin = this.queryParams.date[0]
        this.queryParams.completeTimeEnd = this.queryParams.date[1]
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
        orderStatus: "",
        payType: "",
        completeTimeBegin: null,
        completeTimeEnd: null,
        date: null,
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
    cennlOrder(row) {
      this.$confirm('确定要取消该订单嘛?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        cancel(row.orderNo).then(response => {
          if (response.code == 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getList();
          }
        });
      })
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
