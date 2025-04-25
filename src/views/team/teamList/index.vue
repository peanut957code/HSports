<template>
    <div class="app-container">
        <!-- 筛选条件 -->
        <div class="filter-section">
            <el-row :gutter="20">
                <el-col :span="4">
                    <el-date-picker v-model="queryParams.orderTime" type="daterange" placeholder="订单时间"
                        style="width: 100%;"></el-date-picker>
                </el-col>
                <el-col :span="4">
                    <el-date-picker v-model="queryParams.addTime" type="daterange" placeholder="添加时间"
                        style="width: 100%;"></el-date-picker>
                </el-col>
                <el-col :span="4">
                    <el-select v-model="queryParams.status" placeholder="订单状态" style="width: 100%;">
                        <el-option label="审核中" :value="1"></el-option>
                        <el-option label="成功" :value="2"></el-option>
                        <el-option label="失败" :value="3"></el-option>
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
            <el-table-column prop="orderNo" label="序号" width="150"></el-table-column>
            <el-table-column prop="orderTime" label="球队ID" width="150"></el-table-column>
            <el-table-column prop="status" label="球队名称" width="120" />
            <el-table-column prop="safeNo" label="球队类型" width="120"></el-table-column>
            <el-table-column prop="amount" label="球队状态" width="150"></el-table-column>
            <el-table-column prop="payType" label="球队主场" width="120">
                <template #default="{ row }">
                    <span v-if="row.payType == 1">银行</span>
                    <span v-if="row.payType == 2">第三方</span>
                </template>
            </el-table-column>
            <el-table-column prop="amount" label="球队等级" width="150" />
            <el-table-column prop="amount" label="球队认证" width="150" />
            <el-table-column prop="amount" label="球队LOGO" width="150" />
            <el-table-column prop="amount" label="球队队长" width="150" />
            <el-table-column prop="amount" label="球队成员" width="150" />
            <el-table-column prop="amount" label="球队荣誉" width="150" />
            <el-table-column prop="amount" label="球队钱包余额" width="150" />
            <el-table-column prop="amount" label="球队历史参赛" width="150" />
            <el-table-column prop="amount" label="球队历史约战" width="150" />
            <el-table-column prop="amount" label="球队历史订场" width="150" />
            <el-table-column prop="amount" label="球队战力指数" width="150" />
            <el-table-column prop="amount" label="球队战力排名" width="150" />
            <el-table-column prop="amount" label="球队约战指数" width="150" />
            <el-table-column prop="amount" label="球队约战排名" width="150" />
            <el-table-column prop="amount" label="球队天梯积分" width="150" />
            <el-table-column prop="amount" label="球队天梯排名" width="150" />
            <el-table-column prop="amount" label="成立地点" width="150" />
            <el-table-column prop="amount" label="成立时间" width="150" />
            <el-table-column prop="amount" label="解散时间" width="150" />
            <el-table-column prop="amount" label="最近一次审核时间" width="150" />
            <el-table-column prop="amount" label="最近一次审核人" width="150" />
            <el-table-column prop="amount" label="最近一次审核结果" width="150" />
            <el-table-column prop="operationInfo" label="操作" width="200"></el-table-column>
            <el-table-column label="操作" width="120">
                <template #default="{ row }">
                    <el-button type="text" size="small">操作</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum"
            :limit.sync="queryParams.pageSize" @pagination="getList" />
    </div>
</template>
<script>
import { listInfo } from "@/api/order/withdrawal";
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
                status: "",
                payType: "",
                pageNum: 1,
                pageSize: 10,
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
    }
};
</script>

<style scoped>
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
</style>