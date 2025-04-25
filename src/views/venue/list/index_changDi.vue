<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch"
            label-width="68px">
            <el-form-item label="场地ID" prop="sid">
                <el-input v-model="queryParams.sid" placeholder="请输入用户账号" clearable
                    @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="场馆ID" prop="vid">
                <el-input v-model="queryParams.vid" placeholder="请输入用户账号" clearable
                    @keyup.enter.native="handleQuery" />
            </el-form-item>

            <el-form-item label="场地环境" prop="env">
                <el-select v-model="queryParams.env" placeholder="请选择" clearable>
                  <el-option label="全部" value=""></el-option>
                    <el-option v-for="dict in dict.type.hs_site_env" :key="dict.value" :label="dict.label"
                        :value="dict.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="场地草皮" prop="turf">
                <el-select v-model="queryParams.turf" placeholder="请选择" clearable>
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="dict in dict.type.hs_site_turf" :key="dict.value" :label="dict.label"
                        :value="dict.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="场地规格" prop="standard">
                <el-select v-model="queryParams.standard" placeholder="请选择" clearable>
                  <el-option label="全部" value=""></el-option>
                    <el-option v-for="dict in dict.type.hs_site_standard" :key="dict.value" :label="dict.label"
                        :value="dict.value"></el-option>
                </el-select>
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
            <el-table-column fixed="left" label="场地ID" align="center" prop="sid">
            </el-table-column>
            <el-table-column fixed="left" label="场馆ID" align="center" prop="vid">
            </el-table-column>
            <el-table-column label="场地编号" align="center" prop="num" />
            <el-table-column label="场地图片" align="center" prop="invitationCode">
                <template slot-scope="scope">
                    <div style="display: flex;">
                        <div v-for="item in (scope.row.photos ? JSON.parse(scope.row.photos) : [])">
                            <img :src="item.url" alt="" style="width: 50px; height: 50px;">
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="场地环境" align="center" prop="invitationCode">
                <template slot-scope="scope">
                    <span v-if="scope.row.env == 0">室内</span>
                    <span v-if="scope.row.env == 1">室外</span>
                </template>
            </el-table-column>
            <el-table-column label="场地草皮" align="center" prop="turf">
                <template slot-scope="scope">
                    <span v-if="scope.row.turf == 1">天然草</span>
                    <span v-if="scope.row.turf == 2">人工草</span>
                    <span v-if="scope.row.turf == 3">复合地板</span>
                    <span v-if="scope.row.turf == 0">其他</span>
                </template>
            </el-table-column>
            <el-table-column label="场地规格" align="center" prop="standard">
                <template slot-scope="scope">
                    <span v-if="scope.row.standard == 5">5人制</span>
                    <span v-if="scope.row.standard == 7">7人制</span>
                    <span v-if="scope.row.standard == 11">11人制</span>
                </template>
            </el-table-column>
            <el-table-column label="场地长度" align="center" prop="length" />
            <el-table-column label="场地宽度" align="center" prop="width" />
            <el-table-column label="可售时段" align="center" prop="sellTime" />
            <el-table-column label="修改记录" align="center" prop="" />
            <el-table-column label="最近一次审核时间" align="center" prop="updateTime" />
            <el-table-column label="审核人" align="center" prop="updateBy" />
        </el-table>

        <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum"
            :limit.sync="queryParams.pageSize" @pagination="getList" />
    </div>
</template>

<script>
import { listInfo, changeType, changeStatus } from "@/api/venue/list_changDi";

export default {
    name: "changDi",
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
