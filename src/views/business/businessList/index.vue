<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch"
            label-width="68px">
            <el-form-item label="商户id" prop="mid">
                <el-input v-model="queryParams.mid" id="mid" placeholder="商户ID" clearable @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="商户账号" prop="account">
                <el-input v-model="queryParams.account" id="account" placeholder="请输入商户账号" clearable
                    @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="邀请码" prop="invitationCode">
                <el-input v-model="queryParams.invitationCode" id="invitationCode"  placeholder="请输入邀请码" clearable
                    @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="商户等级" prop="merLevel">
                <el-input v-model="queryParams.merLevel" id="merLevel" placeholder="请输入商户等级" clearable
                    @keyup.enter.native="handleQuery" />
            </el-form-item>

            <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd"
                    v-hasPermi="['system:businessList:add']">新增</el-button>
            </el-col>
            <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>

        <el-table v-loading="loading" :data="infoList" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column label="商户Id" align="center" prop="mid" />
            <el-table-column label="商户账号" align="center" prop="account">
            </el-table-column>
            <el-table-column label="商户全称" align="center" prop="fullName" />
            <el-table-column label="邀请码" align="center" prop="inviteCode" />
            <el-table-column label="商户类型" align="center" prop="mtype">
                <template slot-scope="scope">
                    <span v-if="scope.row.mtype == 1">普通</span>
                    <span v-if="scope.row.mtype == 2">蓝色VIP</span>
                    <span v-if="scope.row.mtype == 3">橙色VIP</span>
                </template>
            </el-table-column>
            <el-table-column label="商户身份" align="center" prop="identity">
                <template slot-scope="scope">
                    <span v-if="scope.row.identity == 'B'">{{ scope.row.identity == 'B' ? '赛事' : '' }}</span>
                    <span v-if="scope.row.identity == 'D'">{{ scope.row.identity == 'D' ? '场馆' : '' }}</span>
                    <span v-if="scope.row.identity == 'E'">{{ scope.row.identity == 'E' ? '商铺' : '' }}</span>
                </template>
            </el-table-column>
            <el-table-column label="员工数量" align="center" prop="employeeCount" />
            <el-table-column label="钱包余额" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.merSafe">{{ scope.row.merSafe ? 0 : (scope.row.merSafe.balance || 0)}}</span>
                </template>
            </el-table-column>
            <el-table-column label="商户等级" align="center" prop="merLevel" />
            <el-table-column label="商户层级" align="center" prop="userLevel" />
            <el-table-column label="体量层级" align="center" prop="scaleLevel">
                <template slot-scope="scope">
                    <span v-if="scope.row.scaleLevel == '1'">{{ scope.row.scaleLevel == "1" ? '微型' : '' }}</span>
                    <span v-if="scope.row.scaleLevel == '2'">{{ scope.row.scaleLevel == 2 ? '小型' : '' }}</span>
                    <span v-if="scope.row.scaleLevel == '3'">{{ scope.row.scaleLevel == 3 ? '中型' : '' }}</span>
                    <span v-if="scope.row.scaleLevel == '4'">{{ scope.row.scaleLevel == 4 ? '大型' : '' }}</span>
                </template>
            </el-table-column>
            <el-table-column label="商户标签" align="center" prop="tagIds" />
        </el-table>

        <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum"
            :limit.sync="queryParams.pageSize" @pagination="getList" />

        <el-dialog :title="title" :visible.sync="dialogVisible" width="500px">
            <el-form :model="form" :rules="rules" ref="form" label-width="100px">
                <!-- 商户身份 -->
                <!-- 商户身份 B赛事 D场馆 E 商铺 -->
                <el-form-item label="商户身份" prop="identity">
                    <el-select style="width: 100%;" v-model="form.identity" placeholder="请选择">
                        <el-option v-for="dict in dict.type.hs_mer_identity" :key="dict.value" :label="dict.label"
                            :value="dict.value"></el-option>
                    </el-select>
                </el-form-item>

                <!-- 商户账号 -->
                <el-form-item label="商户账号" prop="account">
                    <el-input v-model="form.account" placeholder="6-15位数字和字母的组合"></el-input>
                </el-form-item>

                <!-- 登录密码 -->
                <el-form-item label="登录密码" prop="password">
                    <el-input v-model="form.password" placeholder="6-15位，字母+数字组合，不包含特殊符号" type="password"></el-input>
                </el-form-item>

                <!-- 商户类型 -->
                <el-form-item label="商户类型" prop="mtype">
                    <el-select style="width: 100%;" v-model="form.mtype" placeholder="请选择">
                        <el-option v-for="dict in dict.type.hs_mer_type" :key="dict.value" :label="dict.label"
                            :value="dict.value"></el-option>
                    </el-select>
                </el-form-item>

                <!-- 商户来源 -->
                <el-form-item label="商户来源" prop="sourceType">
                    <el-select style="width: 100%;" v-model="form.sourceType" placeholder="请选择">
                        <el-option v-for="dict in dict.type.hs_user_source" :key="dict.value" :label="dict.label"
                            :value="dict.value"></el-option>
                    </el-select>
                </el-form-item>

                <!-- 商户全称 -->
                <el-form-item label="商户全称" prop="fullName">
                    <el-input v-model="form.fullName" maxlength="50" placeholder="请输入最多50个字符"></el-input>
                </el-form-item>

                <!-- 商户简称 -->
                <el-form-item label="商户简称" prop="shortName">
                    <el-input v-model="form.shortName" maxlength="20" placeholder="请输入最多20个字符"></el-input>
                </el-form-item>
            </el-form>

            <!-- 按钮 -->
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="submitForm">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { listInfo, changeType, add } from "@/api/business/userList";

export default {
    name: "userList",
    dicts: ['hs_mer_identity', 'hs_mer_type', 'hs_user_source'],
    data() {
        return {
            dialogVisible: false,
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
            // 商户基本信息表格数据
            infoList: [],
            // 弹出层标题
            title: "",
            // 是否显示弹出层
            open: false,
            rules: {
                identity: [{ required: true, message: '请选择商户身份', trigger: 'change' }],
                account: [
                    { required: true, message: '请输入商户账号', trigger: 'blur' },
                    { pattern: /^[a-zA-Z0-9]{6,15}$/, message: '账号需为6-15位数字和字母的组合', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入登录密码', trigger: 'blur' },
                    { pattern: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,15}$/, message: '密码需为6-15位字母+数字组合', trigger: 'blur' },
                ],
                mtype: [{ required: true, message: '请选择商户类型', trigger: 'change' }],
                sourceType: [{ required: true, message: '请选择商户来源', trigger: 'change' }],
                fullName: [
                    { required: true, message: '请输入商户全称', trigger: 'blur' },
                    { max: 50, message: '商户全称最多50个字符', trigger: 'blur' },
                ],
                shortName: [
                    { required: true, message: '请输入商户简称', trigger: 'blur' },
                    { max: 20, message: '商户简称最多20个字符', trigger: 'blur' },
                ],
            },
            // 查询参数
            queryParams: {
                pageNum: 1,
                pageSize: 10,
                account: null,
                invitationCode: null,
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
            typeList: [],
            form: {}
        };
    },
    created() {
        this.getList();
    },
    methods: {
        /** 查询商户基本信息列表 */
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
                identity: '',
                account: '',
                password: '',
                mtype: '',
                sourceType: '',
                fullName: '',
                shortName: '',
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
        handleAdd() {
            this.dialogVisible = true;
            this.title = "新增";
            this.reset();
        },
        submitForm() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    add(this.form).then(response => {
                        if (response.code == 200) {
                            this.getList();
                            this.$message.success('提交成功！');
                            this.dialogVisible = false;
                        }

                    });
                } else {
                    this.$message.error('请完善表单信息！');
                }
            });
        },
    }
};
</script>
