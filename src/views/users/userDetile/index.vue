<template>
    <div class="app-container">

        <div class="flex mb align-item">
            <span>用户账号:</span>
            <el-input style="width: 240px;margin: 0 10px;" v-model="searchId" />
            <el-button type="primary" @click="getDetailsList">查询</el-button>
            <el-button @click="reset">重置</el-button>
        </div>

        <el-tabs type="card">
            <div class="flex align-item">
                <i class="el-icon-refresh"></i>
                <div class="mx">账号操作</div>
                <div>
                    <el-button type="primary" @click="setStatus">账号状态</el-button>
                    <el-button type="primary">重置资金密码</el-button>
                    <el-button type="primary" @click="changePswModel">重置登录密码</el-button>
                    <el-button type="primary" @click="userModel = true">用户标签</el-button>
                    <el-button type="primary" @click="setType">用户类型</el-button>
                </div>
            </div>
            <el-tab-pane label="基本信息">
                <div class="m-10">
                    <div style="border-bottom: 1px solid #dcdfe6;" class="mb"></div>
                    <div class="flex py">
                        <div style="min-width: 200px;height: auto;text-align: center;">
                            <div class="mx">
                                <el-avatar :size="100" icon="el-icon-user-solid"></el-avatar>
                            </div>
                            <el-link type="primary" style="margin-top: 20px;">清空头像</el-link>
                        </div>
                        <div>
                            <div style="display: flex;align-items: center;">
                                <div style="color: #606266;font-size: 14px;">用户标签：</div>
                                <div v-for="tag in userTags" :key="tag.id">
                                    <el-tag style="margin-right: 3px;">{{ tag.tittle }}</el-tag>
                                </div>
                                <i class="el-icon-edit-outline" @click="userModel = true"></i>
                            </div>
                            <el-descriptions :column="4">
                                <el-descriptions-item label="用户账号">{{ userInfoBase.account }}</el-descriptions-item>
                                <el-descriptions-item label="钱包余额">{{ safeData ? safeData.balance : 0
                                    }}</el-descriptions-item>
                                <el-descriptions-item label="运动保险">{{ userInfoBase.insuranceId }}</el-descriptions-item>
                                <el-descriptions-item label="注册时间">{{ userInfoBase.lastLoginTime
                                    }}</el-descriptions-item>
                                <el-descriptions-item label="会员ID">{{ userInfoBase.uid }}</el-descriptions-item>
                                <el-descriptions-item label="用户等级">{{ userInfoBase.userLevel }}</el-descriptions-item>
                                <el-descriptions-item label="邀请码">{{ userInfoBase.invitationCode
                                    }}</el-descriptions-item>
                                <el-descriptions-item label="注册IP">{{ userInfoBase.registerIp }}</el-descriptions-item>
                                <el-descriptions-item label="用户昵称">{{ userInfoBase.nickname }}</el-descriptions-item>
                                <el-descriptions-item label="用户层级">{{ userInfoBase.userLevel }}</el-descriptions-item>
                                <el-descriptions-item label="用户来源">{{ userInfoBase.sourceType == 1 ? '用户邀请' :
                                    userInfoBase.sourceType == 2 ? '官网' : '渠道' }}</el-descriptions-item>
                                <el-descriptions-item label="注册终端">{{ userInfoBase.platform == 1 ? 'android' :
                                    'ios' }}</el-descriptions-item>
                                <el-descriptions-item label="用户类型">{{ userInfoBase.utype == 1 ? '普通' :
                                    userInfoBase.utype ==
                                        2 ? '蓝色VIP' : '橙色VIP' }}</el-descriptions-item>
                                <el-descriptions-item label="用户身份">{{ userInfoBase.identity == 1 ? '散客'
                                    : userInfoBase.identity == 2 ? '球队队员' : userInfoBase.identity == 3 ? '球队队长' :
                                        userInfoBase.identity == 4 ? '裁判' : '拉拉队' }}</el-descriptions-item>
                                <el-descriptions-item label="上级账号">{{ userInfoBase.parentUid }}</el-descriptions-item>
                                <el-descriptions-item label="登录IP">{{ userInfoBase.lastLoginIp }}</el-descriptions-item>
                                <el-descriptions-item label="账号状态">{{ userInfoBase.status == 0 ? '禁用' :
                                    '正常' }}</el-descriptions-item>
                                <el-descriptions-item label="消费层级">{{
                                    userInfoBase.spendLevel == 1 ? '普通' : userInfoBase.spendLevel == 2 ? '中层' :
                                        userInfoBase.spendLevel == 3 ? '精英' : '土豪'
                                }}</el-descriptions-item>
                                <el-descriptions-item label="离线天数">3</el-descriptions-item>
                                <el-descriptions-item label="最后登录时间">{{ userInfoBase.lastLoginTime
                                    }}</el-descriptions-item>
                            </el-descriptions>
                        </div>
                    </div>
                    <div style="border-bottom: 1px solid #dcdfe6;" class="mb"></div>
                    <el-descriptions :column="4">
                        <el-descriptions-item label="血型">{{ userInfo ? userInfo.blood : '' }}</el-descriptions-item>
                        <el-descriptions-item label="真实姓名">{{ }}</el-descriptions-item>
                        <el-descriptions-item label="出生日期">{{ userInfo ? userInfo.birthday : ''
                            }}</el-descriptions-item>
                        <el-descriptions-item label="手机号码">{{ userInfo ? userInfo.phone : '' }}</el-descriptions-item>
                        <el-descriptions-item label="邮箱地址">{{ userInfo ? userInfo.birthday : ''
                            }}</el-descriptions-item>
                        <el-descriptions-item label="身高">{{ userInfo ? userInfo.height : '' }}</el-descriptions-item>
                        <el-descriptions-item label="运动爱好">{{ userInfo ? userInfo.sportsHobbies : ''
                            }}</el-descriptions-item>
                        <el-descriptions-item label="兴趣爱好">{{ userInfo ? userInfo.interestHobbies : ''
                            }}</el-descriptions-item>
                        <el-descriptions-item label="体重">{{ userInfo ? userInfo.weight : '' }}</el-descriptions-item>
                        <el-descriptions-item label="擅长位置">{{ }}</el-descriptions-item>
                        <el-descriptions-item label="历史最高荣誉">{{ userInfo ? userInfo.highestGlory : ''
                            }}</el-descriptions-item>
                    </el-descriptions>
                    <el-divider content-position="left"></el-divider>
                    <div class="flex align-item">
                        <div style="min-width: 100px;">账号备注</div>
                        <el-input v-model="remarkContent" />
                        <el-button type="primary" @click="setAdd">添加备注</el-button>
                    </div>
                    <div style="margin-top: 10px;">
                        <el-table v-loading="loading" :data="tagsList">
                            <el-table-column label="序号" align="center" type="index" />
                            <el-table-column label="备注时间" align="center" prop="remarkTime" />
                            <el-table-column label="备注信息" align="center" prop="remarkContent" />
                            <el-table-column label="添加备注人" align="center" prop="updateBy" />
                        </el-table>

                        <pagination :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
                            @pagination="getHsRemarkPage" />
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="财务信息">
                <el-row class="flex align-item mt">
                    <el-col :span="2">
                        <div>用户资产</div>
                    </el-col>
                    <el-col :span="2">
                        <i class="el-icon-refresh"></i>
                    </el-col>
                    <el-col :span="4">
                        <div>钱包余额：{{ safeData ? safeData.balance : 0 }}</div>
                    </el-col>
                    <el-col :span="4">
                        <div>已缴纳队费金额：{{ safeData ? safeData.payAmount : 0 }}</div>
                    </el-col>
                    <el-col :span="4">
                        <div>累计消费金额：{{ safeData ? safeData.spendAmount : 0 }}</div>
                    </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="球队信息">球队信息</el-tab-pane>
            <el-tab-pane label="社交信息">社交信息</el-tab-pane>
        </el-tabs>

        <el-dialog title="账号状态" :visible.sync="statusModel" width="500px" append-to-body>
            <el-form ref="form" :model="statusForm" label-width="80px">
                <el-form-item label="账号状态" prop="status">
                    <el-select style="width: 100%;" v-model="statusForm.status" placeholder="请选择">
                        <el-option v-for="dict in dict.type.hs_user_status" :key="dict.value" :label="dict.label"
                            :value="dict.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="提交备注" prop="remark">
                    <el-input v-model="statusForm.remark" placeholder="请输入备注" />
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitStatus">确 定</el-button>
                <el-button @click="statusModel = false">取 消</el-button>
            </div>
        </el-dialog>

        <el-dialog title="用户类型" :visible.sync="typeModel" width="500px" append-to-body>
            <el-form ref="form" :model="typeForm" label-width="80px">
                <el-form-item label="用户类型" prop="utype">
                    <el-select style="width: 100%;" v-model="typeForm.utype" placeholder="请选择">
                        <el-option v-for="dict in dict.type.hs_user_type" :key="dict.value" :label="dict.label"
                            :value="dict.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="提交备注" prop="remark">
                    <el-input v-model="typeForm.remark" placeholder="请输入备注" />
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitType">确 定</el-button>
                <el-button @click="typeModel = false">取 消</el-button>
            </div>
        </el-dialog>

        <el-dialog title="用户标签" :visible.sync="userModel" width="500px" append-to-body>
            <el-form ref="form" :model="userForm" label-width="80px">
                <el-form-item label="用户标签" prop="tids">
                    <el-select style="width: 100%;" multiple v-model="userForm.tids" placeholder="请选择">
                        <el-option v-for="dict in tagsData" :key="dict.id" :label="dict.tittle"
                            :value="dict.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="提交备注" prop="remark">
                    <el-input v-model="userForm.remark" placeholder="请输入备注" />
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitUser">确 定</el-button>
                <el-button @click="userModel = false">取 消</el-button>
            </div>
        </el-dialog>

        <el-dialog title="重置密码" :visible.sync="pswModel" width="500px" append-to-body>
            <el-form ref="form" :model="pswForm" label-width="80px">
                <el-form-item label="新密码" prop="password">
                    <el-input v-model="pswForm.password"></el-input>
                </el-form-item>
                <el-form-item label="密码备注" prop="remark">
                    <el-input v-model="pswForm.remark" placeholder="请输入备注" />
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitPsw">确 定</el-button>
                <el-button @click="pswModel = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { getUserDetails, hsRemarkPage, hsRemarkAdd, changeStatus, changeType, changeTags, getUserDetailsBase, getSafe, getTags, changePassword } from "@/api/users/userDetile";
import { listTags } from '@/api/users/userLabel'

export default {
    name: "userDetile",
    dicts: ['hs_user_status', 'hs_user_type'],
    data() {
        return {
            userInfoBase: {},
            queryParams: {
                pageNum: 1,
                pageSize: 10,
                tittle: null,
                content: null,
                remake: null
            },
            // 总条数
            total: 0,
            // 标签表格数据
            tagsList: [],
            loading: false,
            searchId: '',
            userInfo: {},
            remarkContent: '',
            statusModel: false,
            statusForm: {
                status: null,
                remark: null
            },
            typeModel: false,
            typeForm: {
                utype: null,
                remark: null
            },
            userForm: {
                tids: [],
                remark: null
            },
            safeData: {},
            uid: null,
            userModel: false,
            tagsData: [],
            userTags: [],
            pswModel: false,
            pswForm: {
                password: null,
                remark: null
            }
        }
    },
    created() {

    },
    methods: {
        reset() {
            this.searchId = ''
        },
        getDetailsList() {
            let id = this.searchId
            if (!id) {
                this.$modal.msgError(`请输入用户账号`);
                return
            }
            getUserDetailsBase({ account: id }).then(res => {
                if (res.code == 200) {
                    this.userInfoBase = res.data
                    this.uid = res.data.uid
                    this.getDetil()
                    this.getHsRemarkPage()
                    this.getSafeData()
                    this.getTagsList()
                }
            })
        },
        getDetil() {
            let uid = this.uid
            if (!uid) {
                this.$modal.msgError(`请先查询用户账号`);
                return
            }
            getUserDetails({ uid: uid }).then(response => {
                if (response.code == 200) {
                    this.userInfo = response.data
                }
            })
        },
        //备注列表
        getHsRemarkPage() {
            let uid = this.uid
            if (!uid) {
                this.$modal.msgError(`请先查询用户账号`);
                return
            }
            hsRemarkPage({ otherId: uid }).then(res => {
                if (res.code == 200) {
                    this.tagsList = res.rows
                    this.total = res.total;
                } else {
                    this.tagsList = []
                    this.total = 0
                }
            })
        },
        setAdd() {
            let id = this.searchId
            if (!id) {
                this.$modal.msgError(`请输入用户账号`);
                return
            }
            let params = {
                uid: this.uid,
                remarkContent: this.remarkContent
            }
            if (!this.uid) {
                this.$modal.msgError(`请先查询用户账号`);
                return
            }
            hsRemarkAdd(params).then(res => {
                if (res.code == 200) {
                    this.$modal.msgSuccess("添加成功");
                    this.getHsRemarkPage()
                }
            })
        },

        setStatus() {
            this.statusForm = {
                status: null,
                remark: null
            }
            this.statusModel = true
        },
        setType() {
            this.typeForm = {
                utype: null,
                remark: null
            }
            this.typeModel = true
        },
        submitType() {
            if (!this.uid) {
                this.$modal.msgError(`请先查询用户账号`);
                return
            }
            let params = {
                uid: this.uid,
                remark: this.typeForm.remark,
                utype: this.typeForm.utype,

            }
            changeType(params).then(res => {
                if (res.code == 200) {
                    this.$modal.msgSuccess("修改成功");
                    this.typeModel = false
                    this.getHsRemarkPage()
                }
            })
        },
        submitStatus() {
            if (!this.uid) {
                this.$modal.msgError(`请先查询用户账号`);
                return
            }
            let params = {
                uid: this.uid,
                status: this.statusForm.status,
                remark: this.statusForm.remark
            }
            changeStatus(params).then(res => {
                if (res.code == 200) {
                    this.$modal.msgSuccess("修改成功");
                    this.statusModel = false
                    this.getHsRemarkPage()
                }
            })
        },
        submitUser() {
            if (!this.uid) {
                this.$modal.msgError(`请先查询用户账号`);
                return
            }
            let params = {
                uid: this.uid,
                remark: this.userForm.remark,
                tids: this.userForm.tids
            }
            changeTags(params).then(res => {
                if (res.code == 200) {
                    this.$modal.msgSuccess("修改成功");
                    this.userModel = false
                    this.getHsRemarkPage()
                }
            })
        },
        getSafeData() {
            let params = {
                uid: this.uid
            }
            getSafe(params).then(res => {
                if (res.code == 200) {
                    this.safeData = res.data
                }
            })
        },
        getTagsList() {
            getTags(this.uid).then(res => {
                if (res.code == 200) {
                    this.userTags = res.data
                }
            })
        },
        getListData() {
            let params = {
                pageNum: 1,
                pageSize: 9999
            }
            listTags(params).then(res => {
                if (res.code == 200) {
                    this.tagsData = res.rows
                }
            })
        },
        submitPsw() {
            if (!this.uid) {
                this.$modal.msgError(`请先查询用户账号`);
                return
            }
            let params = {
                // mid: "string",
                uid: this.uid,
                password: this.pswForm.password,
                remark: this.pswForm.remark
            }
            changePassword(params).then(res => {
                if (res.code == 200) {
                    this.pswModel = false
                    this.$modal.msgSuccess("修改成功");
                }
            })
        },
        changePswModel() {
            this.pswModel = true
            this.pswForm = {
                password: null,
                remark: null
            }
        }
    },
    mounted() {
        this.getListData()
        if (this.$route.query.account) {
            this.searchId = this.$route.query.account
            this.getDetailsList()
        }
    }
}
</script>
<style lang="scss" scoped>
.app-container {
    cursor: pointer;

    .flex {
        display: flex;
    }

    .mt {
        margin-top: 10px;
    }

    .mb {
        margin-bottom: 10px;
    }

    .my {
        margin: 10px 0;
    }

    .mx {
        margin: 0 10px;
    }

    .py {
        padding: 10px 0;
    }

    .px {
        padding: 10 10px;
    }

    .m-10 {
        margin: 10px;
    }

    .align-item {
        align-items: center;
    }

    .justify-content {
        justify-content: center;
    }
}
</style>
