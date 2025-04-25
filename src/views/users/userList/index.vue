<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch"
            label-width="68px">
            <el-form-item label="用户账号" prop="account">
                <el-input v-model="queryParams.account" placeholder="请输入用户账号" clearable
                    @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="用户昵称" prop="nickname">
                <el-input v-model="queryParams.nickname" placeholder="请输入用户昵称" clearable
                    @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="用户id" prop="uid">
                <el-input v-model="queryParams.uid" placeholder="用户ID" clearable @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="邀请码" prop="invitationCode">
                <el-input v-model="queryParams.invitationCode" placeholder="请输入邀请码" clearable
                    @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="上级账号" prop="parentUid">
                <el-input v-model="queryParams.parentUid" placeholder="请输入上级id" clearable
                    @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="用户等级" prop="userLevel">
                <el-input v-model="queryParams.userLevel" placeholder="请输入用户等级，条件递增 0起" clearable
                    @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="用户类型" prop="parentUid">
                <!-- <el-select v-model="queryParams.parentUid" placeholder="用户状态" clearable>
                    <el-option label="普通" :value="1"></el-option>
                    <el-option label="蓝v" :value="2"></el-option>
                    <el-option label="橙v" :value="3"></el-option>
                </el-select> -->
                <el-select v-model="queryParams.parentUid" placeholder="用户状态" clearable>
                    <el-option v-for="dict in dict.type.hs_user_type" :key="dict.value" :label="dict.label"
                        :value="dict.value"></el-option>
                </el-select>

            </el-form-item>
            <el-form-item label="用户层级" prop="parentUid">
                <el-select v-model="queryParams.popularStatus" placeholder="用户层级" clearable>
                    <el-option v-for="dict in dict.type.hs_user_popular" :key="dict.value" :label="dict.label"
                        :value="dict.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="消费层级" prop="parentUid">
                <el-select v-model="queryParams.popularStatus" placeholder="用户层级" clearable>
                    <el-option v-for="dict in dict.type.hs_user_spend" :key="dict.value" :label="dict.label"
                        :value="dict.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="运动保险" prop="insuranceId">
                <el-input v-model="queryParams.insuranceId" placeholder="请输入保险id" clearable
                    @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="注册终端" prop="platform">
                <el-select v-model="queryParams.platform" placeholder="用户层级" clearable>
                    <el-option v-for="dict in dict.type.hs_user_platform" :key="dict.value" :label="dict.label"
                        :value="dict.value"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="用户来源" prop="sourceId">
                <el-input v-model="queryParams.sourceId" placeholder="请输入type为3是渠道id" clearable
                    @keyup.enter.native="handleQuery" />
            </el-form-item>

            <!-- <el-form-item label="用户身份" prop="identity">
                <el-input v-model="queryParams.identity" placeholder="请输入身份，1散客，2球队队员，3球队张，4裁判，5啦啦队员" clearable
                    @keyup.enter.native="handleQuery" />
            </el-form-item> -->
            <!-- <el-form-item label="球队id" prop="teamId">
                <el-input v-model="queryParams.teamId" placeholder="请输入球队id" clearable
                    @keyup.enter.native="handleQuery" />
            </el-form-item> -->
            <!-- <el-form-item label="${comment}" prop="registerTime">
                <el-date-picker clearable v-model="queryParams.registerTime" type="date" value-format="yyyy-MM-dd"
                    placeholder="请选择${comment}">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="${comment}" prop="lastLoginTime">
                <el-date-picker clearable v-model="queryParams.lastLoginTime" type="date" value-format="yyyy-MM-dd"
                    placeholder="请选择${comment}">
                </el-date-picker>
            </el-form-item> -->
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">
            <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>

        <el-table v-loading="loading" :data="infoList" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column label="用户Id" align="center" prop="uid" />
            <el-table-column label="用户账号" align="center" prop="account">
                <template slot-scope="scope">
                        <span style="color:#1890ff;cursor: pointer;" @click="toDetile(scope.row.account)">{{ scope.row.account }}</span>
                </template>
            </el-table-column>
            <el-table-column label="用户昵称" align="center" prop="nickname" />
            <el-table-column label="邀请码" align="center" prop="invitationCode" />
            <el-table-column label="用户类型" align="center" prop="sourceType">
                <template slot-scope="scope">
                    <span v-if="scope.row.sourceType == '1'">{{ scope.row.sourceType == '1' ? '普通' : '' }}</span>
                    <span v-if="scope.row.sourceType == '2'">{{ scope.row.sourceType == '2' ? '蓝v' : '' }}</span>
                    <span v-if="scope.row.sourceType == '3'">{{ scope.row.sourceType == '3' ? '橙v' : '' }}</span>
                </template>
            </el-table-column>
            <el-table-column label="用户身份" align="center" prop="identity">
                <template slot-scope="scope">
                    <span v-if="scope.row.identity == '1'">{{ scope.row.identity == '1' ? '散客' : '' }}</span>
                    <span v-if="scope.row.identity == '2'">{{ scope.row.identity == '2' ? '球队队员' : '' }}</span>
                    <span v-if="scope.row.identity == '3'">{{ scope.row.identity == '3' ? '球队长' : '' }}</span>
                    <span v-if="scope.row.identity == '4'">{{ scope.row.identity == '4' ? '裁判' : '' }}</span>
                    <span v-if="scope.row.identity == '5'">{{ scope.row.identity == '5' ? '啦啦队员' : '' }}</span>
                </template>
            </el-table-column>
            <el-table-column label="所属队伍" align="center" prop="teamId" />
            <el-table-column label="用户等级" align="center" prop="userLevel" />
            <!-- <el-table-column label="账号状态" align="center" prop="popularStatus">
            <template slot-scope="scope">
                <span>{{ scope.row.popularStatus == '0' ? '封禁' :'正常' }}</span>
            </template>
        </el-table-column> -->
            <!-- <el-table-column label="1普通，2中层，3精英，4土豪" align="center" prop="spendLevel" /> -->
            <el-table-column label="账号状态" align="center" prop="status">
                <template slot-scope="scope">
                    <span>{{ scope.row.status == '0' ? '封禁' : '正常' }}</span>
                </template>
            </el-table-column>
            <el-table-column label="运动保险" align="center" prop="insuranceId" />
            <el-table-column label="用户来源" align="center" prop="sourceType">
                <template slot-scope="scope">
                    <span v-if="scope.row.sourceType == '1'">{{ scope.row.sourceType == '1' ? '用户邀请' : '' }}</span>
                    <span v-if="scope.row.sourceType == '2'">{{ scope.row.sourceType == '2' ? '官网' : '' }}</span>
                    <span v-if="scope.row.sourceType == '3'">{{ scope.row.sourceType == '3' ? '渠道' : '' }}</span>
                </template>
            </el-table-column>
            <!-- <el-table-column label="type为3是渠道id" align="center" prop="sourceId" /> -->
            <el-table-column label="上级账户" align="center" prop="parentUid" />
            <el-table-column label="注册终端" align="center" prop="platform">
                <template slot-scope="scope">
                    <span>{{ scope.row.platform == '1' ? 'Android' : 'ios' }}</span>
                </template>
            </el-table-column>
            <el-table-column label="注册时间/最后登录时间" align="center" width="180">
                <template slot-scope="scope">
                    <span>{{ parseTime(scope.row.registerTime, '{y}-{m}-{d}') }}/</span>
                    <span>{{ parseTime(scope.row.lastLoginTime, '{y}-{m}-{d}') }}</span>
                </template>
            </el-table-column>
            <el-table-column label="注册IP/登录IP" width="200" align="center" prop="registerIp">
                <template slot-scope="scope">
                    <span>{{ scope.row.registerIp }}/</span>
                    <span>{{ scope.row.lastLoginIp }}</span>
                </template>
            </el-table-column>
            <el-table-column label="备注" align="center" prop="remake" />
        </el-table>

        <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum"
            :limit.sync="queryParams.pageSize" @pagination="getList" />
    </div>
</template>

<script>
import { listInfo, changeType, changeStatus } from "@/api/users/userList";

export default {
    name: "userList",
    dicts: ['hs_user_type', 'hs_user_spend', 'hs_user_platform', 'hs_user_popular'],
    data() {
        return {
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
            // 用户基本信息表格数据
            infoList: [],
            // 弹出层标题
            title: "",
            // 是否显示弹出层
            open: false,
            // 查询参数
            queryParams: {
                pageNum: 1,
                pageSize: 10,
                uid: null,
                account: null,
                nickname: null,
                invitationCode: null,
                uType: null,
                identity: null,
                teamId: null,
                userLevel: null,
                popularStatus: null,
                spendLevel: null,
                status: null,
                insuranceId: null,
                sourceType: null,
                sourceId: null,
                parentUid: null,
                platform: null,
                registerTime: null,
                lastLoginTime: null,
                registerIp: null,
                lastLoginIp: null,
                remake: null
            },
            typeList: []
        };
    },
    created() {
        this.getList();
    },
    methods: {
        /** 查询用户基本信息列表 */
        getList() {
            this.loading = true;
            listInfo(this.queryParams).then(response => {
                this.infoList = response.rows;
                this.total = response.total;
                this.loading = false;
            });
        },
        toDetile(account){
            this.$router.push({ name: 'UserDetile', query: { account: account } });
        },
        getChangeType() {
            changeType().then(response => {
                this.typeList = response.rows;
            });
        },
        // 取消按钮
        cancel() {
            this.open = false;
            this.reset();
        },
        // 表单重置
        reset() {
            this.form = {
                id: null,
                uid: null,
                account: null,
                nickname: null,
                invitationCode: null,
                uType: null,
                identity: null,
                teamId: null,
                userLevel: null,
                popularStatus: null,
                spendLevel: null,
                status: null,
                insuranceId: null,
                sourceType: null,
                sourceId: null,
                parentUid: null,
                platform: null,
                registerTime: null,
                lastLoginTime: null,
                registerIp: null,
                lastLoginIp: null,
                createTime: null,
                createBy: null,
                updateTime: null,
                updateBy: null,
                remake: null
            };
            this.resetForm("form");
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

    }
};
</script>