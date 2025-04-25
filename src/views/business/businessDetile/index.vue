<template>
    <div class="app-container">
        <div class="flex mb align-item">
            <span style="font-size: 16px;color: #333;">商户账号:</span>
            <el-input style="width: 240px;margin: 0 10px;" v-model="searchValue" />
            <el-button type="primary" @click="sechar">查询</el-button>
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
                    <el-button type="primary" @click="userModel = true">商户标签</el-button>
                    <el-button type="primary" @click="setType">商户类型</el-button>
                </div>
            </div>
            <el-tab-pane label="基本信息">
                <div class="flex py">
                    <div style="min-width: 200px;height: auto;text-align: center;">
                        <div class="mx">
                            <el-avatar :size="100" icon="el-icon-user-solid"></el-avatar>
                        </div>
                        <el-link type="primary" style="margin-top: 20px;">清空头像</el-link>
                    </div>
                    <div>
                        <div style="display: flex;align-items: center;">
                        <div style="color: #606266;font-size: 14px;">商户标签：</div>
                        <div v-for="tag in userTags" :key="tag.id">
                            <el-tag style="margin-right: 3px;">{{ tag.tittle }}</el-tag>
                        </div>
                        <i class="el-icon-edit-outline" @click="userModel = true"></i>
                    </div>
                        <el-descriptions :column="4">
                            <el-descriptions-item label="商户账号">{{ userInfoBase.account }}</el-descriptions-item>
                            <el-descriptions-item label="商户余额">{{ userInfoBase.merSafe ? userInfoBase.merSafe.balance :
                                0 }}</el-descriptions-item>
                            <el-descriptions-item label="商户保险">{{ userInfoBase.insuranceId }}</el-descriptions-item>
                            <el-descriptions-item label="注册时间">{{ userInfoBase.lastLoginTime
                                }}</el-descriptions-item>
                            <el-descriptions-item label="商户ID">{{ userInfoBase.mid }}</el-descriptions-item>
                            <el-descriptions-item label="商户等级">{{ userInfoBase.merLevel }}</el-descriptions-item>
                            <el-descriptions-item label="邀请码">{{ userInfoBase.inviteCode }}</el-descriptions-item>
                            <el-descriptions-item label="注册IP">{{ userInfoBase.registerIp }}</el-descriptions-item>
                            <el-descriptions-item label="商户名称">{{ userInfoBase.fullName }}</el-descriptions-item>
                            <el-descriptions-item label="商户层级">{{ }}</el-descriptions-item>
                            <el-descriptions-item label="商户来源">{{ userInfoBase.sourceType == 1 ? '官方邀请' :
                                '自助申请' }}</el-descriptions-item>
                            <el-descriptions-item label="登录IP">{{ userInfoBase.lastLoginIp }}</el-descriptions-item>
                            <el-descriptions-item label="商户类型">{{ userInfoBase.mtype == 1 ? '普通' :
                                userInfoBase.mtype == 2 ? '蓝色VIP' : '橙色VIP' }}</el-descriptions-item>
                            <el-descriptions-item label="体量层级">{{ userInfoBase.scaleLevel == 1 ? '微型'
                                : userInfoBase.identity == 2 ? '小型' : userInfoBase.identity == 3 ? '中型' : '大型'
                                }}</el-descriptions-item>
                            <el-descriptions-item label="账号状态">{{ userInfoBase.status == 0 ? '禁用' : '正常'
                                }}</el-descriptions-item>
                            <el-descriptions-item label="最后登录时间">{{ userInfoBase.lastLoginTime }}</el-descriptions-item>
                        </el-descriptions>
                    </div>
                </div>
                <el-divider content-position="left">场馆资料</el-divider>
                <el-descriptions>
                    <el-descriptions-item label="配套设施"></el-descriptions-item>
                </el-descriptions>
                <div class="flex">
                    <el-descriptions style="width: 70%;">
                        <el-descriptions-item label="岗位数量"></el-descriptions-item>
                        <el-descriptions-item label="场馆名称"></el-descriptions-item>
                        <el-descriptions-item label="所在省份"></el-descriptions-item>
                        <el-descriptions-item label="员工数量"></el-descriptions-item>
                        <el-descriptions-item label="场馆简称"></el-descriptions-item>
                        <el-descriptions-item label="所在城市"></el-descriptions-item>
                        <el-descriptions-item label="联系电话"></el-descriptions-item>
                        <el-descriptions-item label="详细地址"></el-descriptions-item>
                        <el-descriptions-item label="联系邮箱"></el-descriptions-item>
                        <el-descriptions-item label="地图坐标"></el-descriptions-item>
                    </el-descriptions>
                    <div style="width: 30%;">
                        <el-descriptions>
                            <el-descriptions-item label="场馆公告"></el-descriptions-item>
                        </el-descriptions>
                    </div>
                </div>
                <div>
                    <el-descriptions>
                        <el-descriptions-item label="场馆照片"></el-descriptions-item>
                    </el-descriptions>
                </div>
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
            </el-tab-pane>
            <el-tab-pane label="财务信息">
                <el-descriptions title="商户资产">
                    <el-descriptions-item label="钱包余额">{{ safe ? safe.balance : 0 }}</el-descriptions-item>
                    <el-descriptions-item label="锁定金额">{{ safe ? safe.freezeAmount : 0 }}</el-descriptions-item>
                    <el-descriptions-item label="可提现金额">0</el-descriptions-item>
                </el-descriptions>
                <el-divider content-position="left"></el-divider>
                <el-descriptions title="商户资产">
                    <el-descriptions-item label="场地收入"></el-descriptions-item>
                    <el-descriptions-item label="其他收入"></el-descriptions-item>
                    <el-descriptions-item label="商户应收款"></el-descriptions-item>
                </el-descriptions>
            </el-tab-pane>
            <el-tab-pane label="订单信息">
                <el-descriptions title="订单统计">
                    <el-descriptions-item label="订场订单总数"></el-descriptions-item>
                </el-descriptions>
                <el-descriptions :column="3">
                    <el-descriptions-item label="已完成的订单"></el-descriptions-item>
                    <el-descriptions-item label="已订场的订单"></el-descriptions-item>
                    <el-descriptions-item label="已退款的订单"></el-descriptions-item>
                    <el-descriptions-item label="整场类订单"></el-descriptions-item>
                    <el-descriptions-item label="约战类订单"></el-descriptions-item>
                    <el-descriptions-item label="散客类订单"></el-descriptions-item>
                </el-descriptions>
            </el-tab-pane>
            <el-tab-pane label="场地信息">
                <el-descriptions title="场地资料">
                    <el-descriptions-item label="场地总数"></el-descriptions-item>
                </el-descriptions>
                <el-descriptions :column="3">
                    <el-descriptions-item label="5人制"></el-descriptions-item>
                    <el-descriptions-item label="7人制"></el-descriptions-item>
                    <el-descriptions-item label="11人制"></el-descriptions-item>
                </el-descriptions>
                <div style="margin: 0 10%;">
                    <div>
                        <span>1# 场地: 5人制 室外 天然草 长32m*宽28m</span>
                        <div style="width: 300px;text-align: center; padding: 5px;">
                            <div style="width: 300px;height: 100px;border: 1px solid #ccc;"></div>
                            <span>删除照片</span>
                        </div>
                    </div>
                </div>
                <el-descriptions title="场地体量">
                    <el-descriptions-item label="每周可售次数"></el-descriptions-item>
                </el-descriptions>
                <el-descriptions :column="3">
                    <el-descriptions-item label="本周已售出场次"></el-descriptions-item>
                    <el-descriptions-item label="本周已预定场次"></el-descriptions-item>
                    <el-descriptions-item label="本周空闲场次"></el-descriptions-item>
                </el-descriptions>
                <el-descriptions title="广告牌" :column="3">
                    <el-descriptions-item label="广告牌总数"></el-descriptions-item>
                    <el-descriptions-item label="总面积"></el-descriptions-item>
                    <el-descriptions-item label="月租单价"></el-descriptions-item>
                </el-descriptions>
                <el-descriptions :column="3">
                    <el-descriptions-item label="已使用广告牌"></el-descriptions-item>
                    <el-descriptions-item label="已使用面积"></el-descriptions-item>
                    <el-descriptions-item label="已使用品牌"></el-descriptions-item>
                    <el-descriptions-item label="月租收入"></el-descriptions-item>
                </el-descriptions>
            </el-tab-pane>
            <el-tab-pane label="球队信息"></el-tab-pane>
            <el-tab-pane label="赛事信息"></el-tab-pane>
            <el-tab-pane label="客户信息"></el-tab-pane>
            <el-tab-pane label="社交信息"></el-tab-pane>
        </el-tabs>
        <el-dialog title="账号状态" :visible.sync="statusModel" width="500px" append-to-body>
            <el-form ref="form" :model="statusForm" label-width="80px">
                <el-form-item label="账号状态" prop="status">
                    <el-select style="width: 100%;" v-model="statusForm.status" placeholder="请选择">
                        <el-option v-for="dict in dict.type.hs_mer_status" :key="dict.value" :label="dict.label"
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

        <el-dialog title="商户类型" :visible.sync="typeModel" width="500px" append-to-body>
            <el-form ref="form" :model="typeForm" label-width="80px">
                <el-form-item label="商户类型" prop="utype">
                    <el-select style="width: 100%;" v-model="typeForm.utype" placeholder="请选择">
                        <el-option v-for="dict in dict.type.hs_mer_type" :key="dict.value" :label="dict.label"
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

        <el-dialog title="商户标签" :visible.sync="userModel" width="500px" append-to-body>
            <el-form ref="form" :model="userForm" label-width="80px">
                <el-form-item label="商户标签" prop="tids">
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
                <el-button type="primary" @click="submitTags">确 定</el-button>
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
import { getVenueDetails, getBase, addRemark, hsRemarkPage, changeStatus, changeType, changeTags, getTags, getSafe,changePassword } from "@/api/business/userDetile";
import { listTags } from '@/api/business/userLabel'

export default {
    name: "userDetile",
    dicts: ['hs_mer_status', 'hs_mer_type'],
    data() {
        return {
            searchValue: '',
            userInfoBase: {},
            remarkContent: '',
            tagsList: [],
            total: 0,
            queryParams: {
                pageNum: 1,
                pageSize: 10,
            },
            statusModel: false,
            typeModel: false,
            userModel: false,
            statusForm: {
                status: null,
                remark: null
            },
            typeForm: {
                utype: null,
                remark: null
            },
            userForm: {
                tids: null,
                remark: null
            },
            loading: false,
            tagsData: [],
            safe: {},
            userTags:[],
            pswModel:false,
            pswForm:{
                password:null,
                remark:null
            }
        }
    },
    created() {
    },
    methods: {
        sechar() {
            this.getBaseData()
        },
        reset() {
            this.searchValue = ''
        },
        setAdd() {
            let params = {
                mid: this.userInfoBase.mid,
                remarkContent: this.remarkContent
            }
            addRemark(params).then(res => {
                if (res.code == 200) {
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
            if (!this.userInfoBase.mid) {
                this.$modal.msgError(`请先查询商户账号`);
                return
            }
            let params = {
                mid: this.userInfoBase.mid,
                remark: this.typeForm.remark,
                mtype: Number(this.typeForm.utype),

            }
            changeType(params).then(res => {
                if (res.code == 200) {
                    this.$modal.msgSuccess("修改成功");
                    this.typeModel = false
                }
            })
        },
        submitStatus() {
            if (!this.userInfoBase.mid) {
                this.$modal.msgError(`请先查询商户账号`);
                return
            }
            let params = {
                mid: this.userInfoBase.mid,
                status: this.statusForm.status,
                remark: this.statusForm.remark
            }
            changeStatus(params).then(res => {
                if (res.code == 200) {
                    this.$modal.msgSuccess("修改成功");
                    this.statusModel = false
                }
            })
        },
        submitTags() {
            if (!this.userInfoBase.mid) {
                this.$modal.msgError(`请先查询商户账号`);
                return
            }
            let params = {
                mid: this.userInfoBase.mid,
                remark: this.userForm.remark,
                tids: this.userForm.tids
            }
            changeTags(params).then(res => {
                if (res.code == 200) {
                    this.$modal.msgSuccess("修改成功");
                    this.userModel = false
                }
            })
        },
        getSafeData() {
            if (!this.userInfoBase.mid) {
                this.$modal.msgError(`请先查询商户账号`);
                return
            }
            let params = {
                mid: this.userInfoBase.mid
            }
            getSafe(params).then(res => {
                if (res.code == 200) {
                    this.safe = res.data
                }
            })
        },
        getBaseData() {
            let params = {
                account: this.searchValue
            }
            getBase(params).then(res => {
                if (res.code == 200) {
                    this.userInfoBase = { ...res.data }
                    this.getVenueDetailsData()
                    this.getHsRemarkPage()
                    this.getSafeData()
                    this.getTagsData()
                }
            })
        },
        getVenueDetailsData() {
            let params = {
                mid: this.userInfoBase.mid
            }
            getVenueDetails(params).then(res => {

            })
        },
        getHsRemarkPage() {
            let params = {
                otherId: this.userInfoBase.mid
            }
            this.loading = true
            hsRemarkPage(params).then(res => {
                this.loading = false
                if (res.code == 200) {
                    this.tagsList = res.rows
                    this.total = res.total
                }
            })
        },
        getTagsData() {
            getTags(this.userInfoBase.mid).then(res => {
                if (res.code == 200) {
                    this.userTags = res.data
                }
            })
        },
        getListTagsData() {
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
            if (!this.userInfoBase.mid) {
                this.$modal.msgError(`请先查询用户账号`);
                return
            }
            let params = {
                mid: this.userInfoBase.mid,
                password: this.pswForm.password,
                remark:this.pswForm.remark
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
                password:null,
                remark:null
            }
        }
    },
    mounted() {
        this.getListTagsData()
    }
}
</script>
<style lang="scss" scoped>
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
</style>
