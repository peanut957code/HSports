<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch"
            label-width="68px">
            <el-form-item label="场馆ID" prop="vid">
                <el-input v-model="queryParams.vid" placeholder="请输入用户账号" clearable @keyup.enter.native="handleQuery" />
            </el-form-item>

            <el-form-item label="商户全称" prop="fullName">
                <el-input v-model="queryParams.fullName" placeholder="请输入商户全称" clearable
                    @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="所在省份" prop="addressStr">
                <el-input v-model="queryParams.addressStr" placeholder="请输入所在省份" clearable
                    @keyup.enter.native="handleQuery" />
            </el-form-item>





            <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">
            <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>

        <el-table v-loading="loading" :data="infoList" @selection-change="handleSelectionChange">
            <el-table-column fixed="left" label="序号" type="index" width="55" align="center" />
            <el-table-column fixed="left" label="场馆ID" align="center" prop="vid">
            </el-table-column>
            <el-table-column label="场馆全称" align="center" prop="fullName" />
            <el-table-column label="场馆简称" align="center" prop="simpleName" />
            <el-table-column label="联系电话" align="center" prop="phone" />
            <el-table-column label="联系邮箱" align="center" prop="email" />
            <el-table-column label="所在省份" align="center" prop="addressStr" />
            <el-table-column label="所在城市" align="center" prop="addressCode" />
            <el-table-column label="详细地址" align="center" prop="addressExpand" />
            <el-table-column label="地图坐标" align="center" prop="invitationCode" />
            <el-table-column label="配备设施" align="center" prop="installation">
                <template slot-scope="scope">
                    <span v-for="item in getInstallationNames(scope.row.installation)" :key="item">{{ item }} </span>
                </template>
            </el-table-column>
            <el-table-column label="场馆公告" align="center" prop="notice" />
            <el-table-column label="员工数量" align="center" prop="" />
            <el-table-column label="岗位数量" align="center" prop="" />
            <el-table-column label="5人制场地" align="center" prop="fiveCount" />
            <el-table-column label="7人制场地" align="center" prop="sevenCount" />
            <el-table-column label="11人制场地" align="center" prop="elevenCount" width="180" />
            <el-table-column label="修改记录" align="center" prop="updateCount" />
            <el-table-column label="最近一次审核时间" align="center" prop="updateTime" />
            <el-table-column label="最近一次审核人" align="center" prop="updateBy" />
        </el-table>

        <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum"
            :limit.sync="queryParams.pageSize" @pagination="getList" />
    </div>
</template>

<script>
import { listInfo, changeType } from "@/api/venue/list";

export default {
    name: "venueList",
    dicts: ['hs_site_env', 'hs_site_turf', 'hs_site_standard'],
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
                vid: null,
                fullName: null,
                addressStr: null,
            },
            typeList: []
        };
    },
    created() {
        this.getList();
    },
    methods: {
        getInstallationNames(installation) {
            // 设施的映射
            const facilitiesMap = {
                "1": "停车",
                "2": "沐浴",
                "3": "器械",
                "4": "其他"
            };
            // 分割字符串，获取安装设施的数组
            const installationArray = installation.split(",");
            // 返回对应的设施名称列表
            return installationArray.map(id => facilitiesMap[id]).filter(Boolean);
        },
        /** 查询用户基本信息列表 */
        getList() {
            this.loading = true;
            listInfo(this.queryParams).then(response => {
                this.infoList = response.rows;
                this.total = response.total;
                this.loading = false;
            });
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
            this.queryParams = {
                pageNum: 1,
                pageSize: 10,
                vid: null,
                fullName: null,
                addressStr: null,
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
