<template>
    <div class="app-container">
        <!-- 顶部选项卡 -->
        <el-tabs v-model="activeTab" type="card" @tab-click="handleClick">
            <el-tab-pane label="赞助商设置" name="first">
                <el-tabs v-model="activeChilTab" type="card">
                    <el-tab-pane label="固定排名区" name="1">
                        <!-- 筛选条件 -->
                        <div class="filter-section">
                            <el-row :gutter="20">
                                <el-col :span="4">
                                    <el-input v-model="queryParams.name"></el-input>
                                </el-col>
                                <el-col :span="4">
                                    <el-select v-model="queryParams.status" placeholder="订单状态" style="width: 100%;">
                                        <el-option label="已下架" :value="0"></el-option>
                                        <el-option label="已上架" :value="1"></el-option>
                                    </el-select>
                                </el-col>
                                <el-col :span="4">
                                    <el-button type="primary" @click="getList">查询</el-button>
                                    <el-button @click="reset">重置</el-button>
                                </el-col>
                                <el-col :span="12" style="text-align: right;">
                                    <el-button type="primary" @click="gudinAdd">添加</el-button>
                                </el-col>
                            </el-row>
                        </div>

                        <!-- 表格 -->
                        <el-table row-key="id" ref="tables" v-loading="loading" :data="gudingLIst" style="width: 100%;">
                            <el-table-column type="index" label="排序" width="150">
                            </el-table-column>
                            <el-table-column prop="orderTime" label="拖动" width="150">
                                <template #default="{ row }">
                                    <div :data-id="row.id">
                                        {{ row.id }}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="image" label="图片地址" />
                            <el-table-column label="图片预览" width="120">
                                <template #default="{ row }">
                                    <image-preview :src="row.image" />
                                </template>
                            </el-table-column>
                            <el-table-column prop="name" label="赞助商名称" width="120"></el-table-column>
                            <el-table-column prop="status" label="状态" width="150">
                                <template #default="{ row }">
                                    <el-tag :type="row.status == 0 ? 'danger' : 'success'">
                                        {{ row.status == 0 ? '已下架' : '已上架' }}
                                    </el-tag>
                                </template>
                            </el-table-column>
                            <el-table-column prop="updateTime" label="最近操作时间" width="120">
                            </el-table-column>
                            <el-table-column prop="updateBy" label="最近操作人"></el-table-column>
                            <el-table-column label="操作" width="120">
                                <template #default="{ row }">
                                    <el-button type="text" size="small" @click="changeStatusGudin(row)"
                                        v-if="row.status == 0" style="color: green;">上架</el-button>
                                    <el-button type="text" size="small" @click="changeStatusGudin(row)"
                                        v-if="row.status == 1" style="color: red;">下架</el-button>
                                    <el-button type="text" size="small" @click="gudinEdit(row)">编辑</el-button>
                                </template>
                            </el-table-column>
                        </el-table>

                        <!-- 分页 -->
                        <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum"
                            :limit.sync="queryParams.pageSize" @pagination="getList" />
                    </el-tab-pane>
                    <el-tab-pane label="随机排名区" name="2">
                        <!-- 筛选条件 -->
                        <div class="filter-section">
                            <el-row :gutter="20">
                                <el-col :span="4">
                                    <el-input v-model="queryParams.name"></el-input>
                                </el-col>
                                <el-col :span="4">
                                    <el-select v-model="queryParams.status" placeholder="订单状态" style="width: 100%;">
                                        <el-option label="已下架" :value="0"></el-option>
                                        <el-option label="已上架" :value="1"></el-option>
                                    </el-select>
                                </el-col>
                                <el-col :span="4">
                                    <el-button type="primary" @click="getList2">查询</el-button>
                                    <el-button @click="reset">重置</el-button>
                                </el-col>
                                <el-col :span="12" style="text-align: right;">
                                    <el-button type="primary" @click="suijiAdd">添加</el-button>
                                </el-col>
                            </el-row>
                        </div>

                        <!-- 表格 -->
                        <el-table v-loading="loading" :data="suijiLIst" border style="width: 100%;">
                            <el-table-column type="index" label="排序" width="150"></el-table-column>
                            <el-table-column prop="image" label="图片地址" />
                            <el-table-column label="图片预览" width="120">
                                <template #default="{ row }">
                                    <image-preview :src="row.image" />
                                </template>
                            </el-table-column>
                            <el-table-column prop="name" label="赞助商名称" width="120"></el-table-column>
                            <el-table-column prop="status" label="状态" width="150">
                                <template #default="{ row }">
                                    <el-tag :type="row.status == 0 ? 'danger' : 'success'">
                                        {{ row.status == 0 ? '已下架' : '已上架' }}
                                    </el-tag>
                                </template>
                            </el-table-column>
                            <el-table-column prop="updateTime" label="最近操作时间" width="120">
                            </el-table-column>
                            <el-table-column prop="updateBy" label="最近操作人"></el-table-column>
                            <el-table-column label="操作" width="120">
                                <template #default="{ row }">
                                    <el-button type="text" size="small" @click="changeStatusSuiji(row)"
                                        v-if="row.status == 0">上架</el-button>
                                    <el-button type="text" size="small" @click="changeStatusSuiji(row)"
                                        v-if="row.status == 1">下架</el-button>
                                    <el-button type="text" size="small" @click="suijiEdit(row)">编辑</el-button>
                                </template>
                            </el-table-column>
                        </el-table>

                        <!-- 分页 -->
                        <pagination v-show="total2 > 0" :total="total2" :page.sync="queryParams2.pageNum"
                            :limit.sync="queryParams2.pageSize" @pagination="getList2" />
                    </el-tab-pane>
                </el-tabs>
            </el-tab-pane>
            <el-tab-pane label="首页产品图设置" name="second">
                <!-- 表格 -->
                <el-table v-loading="loading" :data="productData" border style="width: 100%;">
                    <el-table-column type="index" label="排序"></el-table-column>
                    <el-table-column prop="name" label="产品图名称"></el-table-column>
                    <el-table-column prop="tittle" label="产品说明标题" />
                    <el-table-column prop="description" label="产品说明文本"></el-table-column>
                    <el-table-column prop="image" label="图片地址" />
                    <el-table-column prop="image" label="图片预览">
                        <template #default="{ row }">
                            <image-preview :src="row.image" />
                        </template>
                    </el-table-column>
                    <el-table-column prop="status" label="状态">
                        <template #default="{ row }">
                            <el-tag :type="row.status == 0 ? 'danger' : 'success'">
                                {{ row.status == 0 ? '已下架' : '已上架' }}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="updateTime" label="最近操作时间" />
                    <el-table-column prop="updateBy" label="最近操作人"></el-table-column>
                    <el-table-column label="操作">
                        <template #default="{ row }">
                            <el-button type="text" size="small" @click="changeProduct(row)" v-if="row.status == 0"
                                style="color: green;">上架</el-button>
                            <el-button type="text" size="small" @click="changeProduct(row)" v-if="row.status == 1"
                                style="color: red;">下架</el-button>
                            <el-button type="text" size="small" @click="editProduct(row)">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="社交链接设置" name="third">
                <!-- 表格 -->
                <el-table row-key="id" ref="table" v-loading="loading" :data="orderData" style="width: 100%;">
                    <el-table-column type="index" label="排序"></el-table-column>
                    <el-table-column prop="orderNo" label="拖动">
                        <template #default="{ row }">
                            <div :data-id="row.id">
                                {{ row.id }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="名称"></el-table-column>
                    <el-table-column prop="url" label="跳转链接" />
                    <el-table-column prop="image" label="图片地址"></el-table-column>
                    <el-table-column prop="image" label="图片预览" width="120">
                        <template #default="{ row }">
                            <image-preview :src="row.image" />
                        </template>
                    </el-table-column>
                    <el-table-column prop="status" label="状态">
                        <template #default="{ row }">
                            <el-tag :type="row.status == 0 ? 'danger' : 'success'">
                                {{ row.status == 0 ? '已下架' : '已上架' }}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="updateTime" label="最近操作时间">
                    </el-table-column>
                    <el-table-column prop="updateBy" label="最近操作人"></el-table-column>
                    <el-table-column label="操作" width="120">
                        <template #default="{ row }">
                            <el-button type="text" size="small" @click="change(row)" v-if="row.status == 0"
                                style="color: green;">上架</el-button>
                            <el-button type="text" size="small" @click="change(row)" v-if="row.status == 1"
                                style="color: red;">下架</el-button>
                            <el-button type="text" size="small" @click="configEdits(row)">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="赛事一条龙介绍设置" name="four">
                <!-- 表格 -->
                <!-- 筛选条件 -->
                <div class="filter-section">
                    <el-row :gutter="20">
                        <el-col :span="24" style="text-align: right;">
                            <el-button type="primary" @click="eventAdd">添加</el-button>
                        </el-col>
                    </el-row>
                </div>
                <el-table row-key="id" ref="eventTable" v-loading="loading" :data="eventData" style="width: 100%;">
                    <el-table-column type="index" label="排序"></el-table-column>
                    <el-table-column label="拖动">
                        <template #default="{ row }">
                            <div :data-id="row.id">
                                {{ row.id }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="description" label="赛事一条龙内容文本"></el-table-column>
                    <el-table-column prop="image" label="图片地址"></el-table-column>
                    <el-table-column prop="image" label="图片预览" width="120">
                        <template #default="{ row }">
                            <image-preview :src="row.image" />
                        </template>
                    </el-table-column>
                    <el-table-column prop="status" label="状态">
                        <template #default="{ row }">
                            <el-tag :type="row.status == 0 ? 'danger' : 'success'">
                                {{ row.status == 0 ? '已下架' : '已上架' }}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="updateTime" label="最近操作时间" />
                    <el-table-column prop="updateBy" label="最近操作人" />
                    <el-table-column label="操作" width="120">
                        <template #default="{ row }">
                            <el-button type="text" size="small" @click="change(row)" v-if="row.status == 0"
                                style="color: green;">上架</el-button>
                            <el-button type="text" size="small" @click="change(row)" v-if="row.status == 1"
                                style="color: red;">下架</el-button>
                            <el-button type="text" size="small" @click="eventEdit(row)">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <!-- 分页 -->
                <pagination v-show="total4 > 0" :total="total4" :page.sync="queryParams4.pageNum"
                    :limit.sync="queryParams4.pageSize" @pagination="getEventList" />
            </el-tab-pane>
            <el-tab-pane label="招聘简章设置" name="final">
                <!-- 表格 -->
                <div class="filter-section">
                    <el-row :gutter="20">
                        <el-col :span="4">
                            <el-select v-model="queryParams5.type" placeholder="岗位类型" style="width: 100%;">
                                <el-option :label="item.type" :value="item.type" v-for="item in sortList"></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="4">
                            <el-input v-model="queryParams5.name" placeholder="岗位名称"></el-input>
                        </el-col>
                        <el-col :span="4">
                            <el-button type="primary" @click="getRecruitConfigPage">查询</el-button>
                            <el-button @click="reset5">重置</el-button>
                        </el-col>
                        <el-col :span="12" style="text-align: right;">
                            <el-button type="primary" @click="sortModelAdd">岗位类型排序</el-button>
                            <el-button type="primary" @click="recruitmentAdd">添加</el-button>
                        </el-col>
                    </el-row>
                </div>
                <el-table v-loading="loading" :data="recruitmentData" style="width: 100%;">
                    <el-table-column type="index" label="排序"></el-table-column>
                    <el-table-column prop="type" label="岗位类型" />
                    <el-table-column prop="name" label="岗位名称" />
                    <el-table-column prop="description" label="岗位简章" />
                    <el-table-column prop="status" label="状态">
                        <template #default="{ row }">
                            <el-tag :type="row.status == 0 ? 'danger' : 'success'">
                                {{ row.status == 0 ? '已下架' : '已上架' }}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="updateTime" label="最近操作时间">
                    </el-table-column>
                    <el-table-column prop="updateBy" label="最近操作人"></el-table-column>
                    <el-table-column label="操作" width="120">
                        <template #default="{ row }">
                            <el-button type="text" size="small" @click="change(row)" v-if="row.status == 0"
                                style="color: green;">上架</el-button>
                            <el-button type="text" size="small" @click="change(row)" v-if="row.status == 1"
                                style="color: red;">下架</el-button>
                            <el-button type="text" size="small" @click="recruitmentEdit(row)">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <pagination v-show="total5 > 0" :total="total5" :page.sync="queryParams5.pageNum"
                    :limit.sync="queryParams5.pageSize" @pagination="getRecruitConfigPage" />
            </el-tab-pane>
        </el-tabs>

        <el-dialog :title="gudinTitle" :visible.sync="gudinModel" width="500px" append-to-body>
            <el-form ref="gudinForm" :model="gudinForm" label-width="80px">
                <el-form-item label="商户标签" prop="tids">
                    <image-upload v-model="gudinForm.image"></image-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitGudin">确 定</el-button>
                <el-button @click="gudinModel = false">取 消</el-button>
            </div>
        </el-dialog>

        <el-dialog :title="suijiTitle" :visible.sync="suijiModel" width="500px" append-to-body>
            <el-form ref="suijiForm" :model="suijiForm" label-width="80px">
                <el-form-item label="商户标签" prop="tids">
                    <image-upload v-model="suijiForm.image"></image-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitSuiji">确 定</el-button>
                <el-button @click="suijiModel = false">取 消</el-button>
            </div>
        </el-dialog>

        <el-dialog title="编辑产品图" :visible.sync="editModel" width="600px" append-to-body>
            <el-form ref="productForm" :model="productForm" label-width="110px">
                <el-form-item label="上传图片" prop="image">
                    <image-upload v-model="productForm.image"></image-upload>
                </el-form-item>
                <el-form-item label="产品图标题" prop="name">
                    <el-input v-model="productForm.name"></el-input>
                </el-form-item>
                <el-form-item label="产品图文本" prop="tittle">
                    <el-input v-model="productForm.tittle"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="setProductEdit">确 定</el-button>
                <el-button @click="editModel = false">取 消</el-button>
            </div>
        </el-dialog>

        <el-dialog title="编辑链接" :visible.sync="configModel" width="600px" append-to-body>
            <el-form ref="configForm" :model="configForm" label-width="110px">
                <el-form-item label="上传LOGO" prop="image">
                    <image-upload v-model="configForm.image"></image-upload>
                </el-form-item>
                <el-form-item label="上传链接" prop="url">
                    <el-input v-model="configForm.url"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="configSubmit">确 定</el-button>
                <el-button @click="configModel = false">取 消</el-button>
            </div>
        </el-dialog>

        <el-dialog :title="eventTitle" :visible.sync="eventModel" width="600px" append-to-body>
            <el-form ref="configForm" :model="eventForm" label-width="110px">
                <el-form-item label="赛事组织内容文本" prop="url">
                    <el-input v-model="eventForm.description"></el-input>
                </el-form-item>
                <el-form-item label="文本配套图片" prop="image">
                    <image-upload v-model="eventForm.image"></image-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="eventSubmit">确 定</el-button>
                <el-button @click="eventModel = false">取 消</el-button>
            </div>
        </el-dialog>

        <el-dialog :title="recruitmentTitle" :visible.sync="recruitmentModel" width="600px" append-to-body>
            <el-form ref="recruitmentForm" :model="recruitmentForm" label-width="110px">
                <el-form-item label="岗位类型" prop="type">
                    <!-- <el-input v-model="recruitmentForm.type"></el-input> -->
                    <el-autocomplete style="width:100%" value-key="type" v-model="recruitmentForm.type"
                        :fetch-suggestions="querySearch" placeholder="请输入内容"></el-autocomplete>
                </el-form-item>
                <el-form-item label="岗位名称" prop="name">
                    <el-input v-model="recruitmentForm.name"></el-input>
                </el-form-item>
                <el-form-item label="岗位简章" prop="description">
                    <editor v-model="recruitmentForm.description" :min-height="192" />
                </el-form-item>
                <el-form-item label="福利待遇文本" prop="remake">
                    <editor v-model="recruitmentForm.remake" :min-height="192" />
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="recruitmentSubmit">确 定</el-button>
                <el-button @click="recruitmentModel = false">取 消</el-button>
            </div>
        </el-dialog>

        <el-dialog title="岗位类型展示排序" :visible.sync="sortModel" width="600px" append-to-body>
            <el-table row-key="id" ref="sortTable" v-loading="loading" :data="sortList" style="width: 100%;">
                <el-table-column type="index" label="排序"></el-table-column>
                <el-table-column label="拖动">
                    <template #default="{ row }">
                        <div :data-id="row.id">
                            {{ row.id }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="type" label="岗位类型"></el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="sortModel = false">确 定</el-button>
                <el-button @click="sortModel = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import Sortable, { get } from 'sortablejs';
import { list, add, edit, changeSort, productList, productEdit, page, configEdit, configChangeSort, eventList, eventListAdd, eventListEdit, recruitConfigPage, recruitConfigAdd, recruitConfigEdit, recruitConfigSortList, recruitConfigChangeSort } from "@/api/website/siteManage";

export default {
    data() {
        return {
            activeTab: "first",
            activeChilTab: '1',
            loading: false,
            queryParams: {
                name: null,
                status: null,
                type: 0,
                pageNum: 1,
                pageSize: 10,
            },
            total: 0,
            gudingLIst: [],
            gudinModel: false,
            gudinForm: {
                type: 0,
                image: null
            },
            suijiLIst: [],
            total2: 0,
            suijiModel: false,
            suijiForm: {
                type: 1,
                image: null
            },
            queryParams2: {
                name: null,
                status: null,
                type: 1,
                pageNum: 1,
                pageSize: 10,
            },
            gudinTitle: '',
            suijiTitle: '',
            queryParams3: {
                pageNum: 1,
                pageSize: 10,
            },
            queryParams4: {
                pageNum: 1,
                pageSize: 10,
            },
            queryParams5: {
                type: null,
                name: null,
                pageNum: 1,
                pageSize: 10,
            },
            total3: 0,
            productData: [],
            editModel: false,
            productForm: {
                image: null,
                name: null,
                title: null
            },
            orderData: [],
            configModel: false,
            configForm: {
                image: null,
                url: null
            },
            eventModel: false,
            eventForm: {
                description: null,
                image: null
            },
            eventTitle: '',
            eventData: [],
            total4: 0,
            recruitmentModel: false,
            recruitmentForm: {
                type: null,
                name: null,
                description: null,
                remake: null
            },
            recruitmentTitle: '',
            recruitmentData: [],
            total5: 0,
            sortList: [],
            sortModel: false
        };
    },
    created() {
        this.getList();
        this.getList2();
    },
    methods: {
        handleClick() {
            if (this.activeTab == 'second') {
                this.getProductList()
            } else if (this.activeTab == 'third') {
                this.getPageList()
            } else if (this.activeTab == 'four') {
                this.getEventList()
            } else if (this.activeTab == 'final') {
                this.getRecruitConfigPage()
            }
        },
        getList() {
            this.loading = true;
            list(this.queryParams).then(response => {
                this.gudingLIst = response.rows;
                this.total = response.total;
                this.loading = false;
            });
        },
        submitGudin() {
            let api = this.gudinForm.id ? edit : add
            api(this.gudinForm).then(response => {
                if (response.code == 200) {
                    this.gudinModel = false
                    this.$modal.msgSuccess("添加成功");
                    this.getList()
                }
            });
        },
        getList2() {
            this.loading = true;
            list(this.queryParams2).then(response => {
                this.suijiLIst = response.rows;
                this.total2 = response.total;
                this.loading = false;
            });
        },
        getEventList() {
            eventList(this.queryParams4).then(response => {
                this.eventData = response.rows;
                this.total4 = response.total;
                this.loading = false;
            });
        },
        getRecruitConfigPage() {
            recruitConfigPage(this.queryParams5).then(response => {
                this.recruitmentData = response.rows;
                this.total5 = response.total;
                this.loading = false;
            });
            recruitConfigSortList().then(res => {
                this.sortList = res.data
            })
        },
        reset5() {
            this.queryParams5 = {
                type: null,
                name: null,
                pageNum: 1,
                pageSize: 10,
            },
                this.getRecruitConfigPage()
        },
        submitSuiji() {
            let api = this.suijiForm.id ? edit : add
            api(this.suijiForm).then(response => {
                if (response.code == 200) {
                    this.suijiModel = false
                    this.$modal.msgSuccess("添加成功");
                    this.getList2()
                }
            });
        },
        gudinAdd() {
            this.gudinTitle = '添加赞助商'
            this.gudinModel = true
            this.gudinForm.image = null
        },
        suijiAdd() {
            this.suijiTitle = '添加赞助商'
            this.suijiModel = true
            this.suijiForm.image = null
        },
        gudinEdit(row) {
            this.gudinTitle = '编辑赞助商'
            this.gudinModel = true
            this.gudinForm.image = row.image
            this.gudinForm.id = row.id
        },
        suijiEdit(row) {
            this.suijiTitle = '编辑赞助商'
            this.suijiModel = true
            this.suijiForm.image = row.image
            this.suijiForm.id = row.id
        },
        changeStatusGudin(row) {
            let status = row.status == 0 ? 1 : 0
            edit({ id: row.id, status, type: 0 }).then(response => {
                if (response.code == 200) {
                    this.$modal.msgSuccess("操作成功");
                    this.getList()
                }
            });
        },
        changeStatusSuiji(row) {
            let status = row.status == 0 ? 1 : 0
            edit({ id: row.id, status, type: 1 }).then(response => {
                if (response.code == 200) {
                    this.$modal.msgSuccess("操作成功");
                    this.getList2()
                }
            });
        },
        reset() {
            this.queryParams = {
                name: null,
                status: null,
                type: 0,
                pageNum: 1,
                pageSize: 10,
            };
            this.queryParams2 = {
                name: null,
                status: null,
                type: 1,
                pageNum: 1,
                pageSize: 10,
            };
            this.getList()
            this.getList2()
        },
        getProductList() {
            productList(this.queryParams).then(response => {
                this.productData = response.rows;
                this.total3 = response.total;
                this.loading = false;
            });
        },
        setProductEdit() {
            productEdit(this.productForm).then(response => {
                console.log(response)
                this.$modal.msgSuccess("操作成功");
                this.editModel = false
                this.getProductList()
            });
        },
        changeProduct(row) {
            let status = row.status == 0 ? 1 : 0
            productEdit({ id: row.id, status }).then(response => {
                if (response.code == 200) {
                    this.$modal.msgSuccess("操作成功");
                    this.getProductList()
                }
            });
        },
        editProduct(row) {
            this.editModel = true
            this.productForm = { ...row }
        },
        getPageList() {
            page().then(response => {
                this.orderData = response.rows;
            });
        },
        configEdits(row) {
            this.configModel = true
            this.configForm = { ...row }
        },
        change(row) {
            let status = row.status == 0 ? 1 : 0
            configEdit({ id: row.id, status }).then(response => {
                if (response.code == 200) {
                    this.$modal.msgSuccess("操作成功");
                    this.getPageList()
                }
            });
        },
        configSubmit() {
            configEdit(this.configForm).then(response => {
                this.$modal.msgSuccess("操作成功");
                this.configModel = false
                this.getPageList()
            });
        },
        setSortable() {
            const table = this.$refs.table.$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0];
            Sortable.create(table, {
                animation: 150,
                ghostClass: 'sortable-ghost',
                onEnd: (evt) => {
                    console.log(evt);

                    // 获取拖动的元素
                    const draggedElement = evt.item;

                    // 查找拖动元素对应的列的 ID
                    const draggedId = draggedElement.querySelector('[data-id]')
                        ? draggedElement.querySelector('[data-id]').getAttribute('data-id')
                        : null;
                    console.log('拖动的元素 ID:', draggedId);

                    // 获取拖动的起始和目标索引
                    const { newIndex } = evt;
                    console.log('拖动到的新位置索引:', newIndex);

                    // 获取当前表格中所有的行
                    const rows = evt.to.querySelectorAll('tr');

                    // 获取拖动位置的上下元素
                    const previousElement = rows[newIndex - 1]; // 上一行
                    const nextElement = rows[newIndex + 1];     // 下一行

                    // 获取上下元素的 ID
                    const previousId = previousElement
                        ? previousElement.querySelector('[data-id]').getAttribute('data-id')
                        : null; // 如果没有上方元素，设置为 null
                    const nextId = nextElement
                        ? nextElement.querySelector('[data-id]').getAttribute('data-id')
                        : null; // 如果没有下方元素，设置为 null

                    console.log('拖动位置上方的元素 ID:', previousId);
                    console.log('拖动位置下方的元素 ID:', nextId);
                    // 在这里处理拖动完成后的数据更新逻辑
                    this.setconfigChangeSort(draggedId, previousId)
                }
            });
        },
        setconfigChangeSort(idStart, idEnd) {
            let params = {
                idStart: Number(idStart),
                idEnd: Number(idEnd) ? Number(idEnd) : '',
            }
            configChangeSort(params).then(response => {
                this.$modal.msgSuccess("操作成功");
                this.getPageList()
            });
        },
        setSortable1() {
            const table = this.$refs.tables.$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0];
            Sortable.create(table, {
                animation: 150,
                ghostClass: 'sortable-ghost',
                onEnd: (evt) => {
                    console.log(evt);
                    // 获取拖动的元素
                    const draggedElement = evt.item;
                    // 查找拖动元素对应的列的 ID
                    const draggedId = draggedElement.querySelector('[data-id]')
                        ? draggedElement.querySelector('[data-id]').getAttribute('data-id')
                        : null;
                    console.log('拖动的元素 ID:', draggedId);

                    // 获取拖动的起始和目标索引
                    const { newIndex } = evt;
                    console.log('拖动到的新位置索引:', newIndex);

                    // 获取当前表格中所有的行
                    const rows = evt.to.querySelectorAll('tr');

                    // 获取拖动位置的上下元素
                    const previousElement = rows[newIndex - 1]; // 上一行
                    const nextElement = rows[newIndex + 1];     // 下一行

                    // 获取上下元素的 ID
                    const previousId = previousElement
                        ? previousElement.querySelector('[data-id]').getAttribute('data-id')
                        : null; // 如果没有上方元素，设置为 null
                    const nextId = nextElement
                        ? nextElement.querySelector('[data-id]').getAttribute('data-id')
                        : null; // 如果没有下方元素，设置为 null

                    console.log('拖动位置上方的元素 ID:', previousId);
                    console.log('拖动位置下方的元素 ID:', nextId);
                    // 在这里处理拖动完成后的数据更新逻辑
                    this.setSortable2(draggedId, previousId)
                }
            });
        },
        setSortable2(idStart, idEnd) {
            let params = {
                idStart: Number(idStart),
                idEnd: Number(idEnd) ? Number(idEnd) : '',
                type: 0
            }
            changeSort(params).then(response => {
                this.$modal.msgSuccess("操作成功");
                this.getList()
            });
        },
        setSor5() {
            const table = this.$refs.sortTable.$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0];
            Sortable.create(table, {
                animation: 150,
                ghostClass: 'sortable-ghost',
                onEnd: (evt) => {
                    console.log(evt);
                    // 获取拖动的元素
                    const draggedElement = evt.item;
                    // 查找拖动元素对应的列的 ID
                    const draggedId = draggedElement.querySelector('[data-id]')
                        ? draggedElement.querySelector('[data-id]').getAttribute('data-id')
                        : null;
                    console.log('拖动的元素 ID:', draggedId);

                    // 获取拖动的起始和目标索引
                    const { newIndex } = evt;
                    console.log('拖动到的新位置索引:', newIndex);

                    // 获取当前表格中所有的行
                    const rows = evt.to.querySelectorAll('tr');

                    // 获取拖动位置的上下元素
                    const previousElement = rows[newIndex - 1]; // 上一行
                    const nextElement = rows[newIndex + 1];     // 下一行

                    // 获取上下元素的 ID
                    const previousId = previousElement
                        ? previousElement.querySelector('[data-id]').getAttribute('data-id')
                        : null; // 如果没有上方元素，设置为 null
                    const nextId = nextElement
                        ? nextElement.querySelector('[data-id]').getAttribute('data-id')
                        : null; // 如果没有下方元素，设置为 null

                    console.log('拖动位置上方的元素 ID:', previousId);
                    console.log('拖动位置下方的元素 ID:', nextId);
                    // 在这里处理拖动完成后的数据更新逻辑
                    this.setSortable5(draggedId, previousId)
                }
            });
        },
        setSortable5(idStart, idEnd) {
            let params = {
                idStart: Number(idStart),
                idEnd: Number(idEnd) ? Number(idEnd) : '',
            }
            recruitConfigChangeSort(params).then(response => {
                this.$modal.msgSuccess("操作成功");
                this.getRecruitConfigPage()
            });
        },
        eventAdd() {
            this.eventModel = true
            this.eventTitle = '新增赛事一条龙介绍'
            this.eventForm = {
                description: null,
                image: null
            }
        },
        eventEdit(row) {
            this.eventModel = true;
            this.eventTitle = '编辑赛事一条龙介绍';
            this.eventForm.id = row.id;
            this.eventForm.description = row.description;
            this.eventForm.image = row.image;
        },
        eventSubmit() {
            let api = this.eventForm.id ? eventListEdit : eventListAdd;
            api(this.eventForm).then(response => {
                this.$modal.msgSuccess("操作成功");
                this.eventModel = false
                this.getEventList()
            });
        },
        recruitmentAdd() {
            this.recruitmentModel = true
            this.recruitmentTitle = '新增招聘简章'
            this.recruitmentForm = {
                type: null,
                name: null,
                description: null,
                remake: null
            }
        },
        recruitmentEdit(row) {
            this.recruitmentModel = true
            this.recruitmentTitle = '编辑招聘简章'
            this.recruitmentForm = { ...row }
        },
        recruitmentSubmit() {
            let api = this.recruitmentForm.id ? recruitConfigEdit : recruitConfigAdd;
            api(this.recruitmentForm).then(response => {
                this.$modal.msgSuccess("操作成功");
                this.recruitmentModel = false
                this.getRecruitConfigPage()
            });
        },
        querySearch(queryString, cb) {
            var restaurants = this.sortList;
            var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        createFilter(queryString) {
            return (restaurant) => {
                console.log(restaurant)
                return (restaurant.type.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        sortModelAdd() {
            this.sortModel = true
            // this.$refs.sortTable.$el
            //  this.setSor5()
            this.$nextTick(() => {
                this.setSor5()
            })
        }
    },
    mounted() {
        this.setSortable();
        this.setSortable1();
    },
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