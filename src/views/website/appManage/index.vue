<template>
    <div class="app-container">
        <!-- 顶部选项卡 -->
        <el-tabs v-model="activeTab" type="card" @tab-click="changeTabs">
            <el-tab-pane label="首页轮播图设置" name="userRecharge">
                <!-- 筛选条件 -->
                <div class="filter-section">
                    <el-row :gutter="20">
                        <el-col :span="5">
                            <el-date-picker v-model="queryParams.date" value-format="yyyy-MM-dd HH:mm:ss" clearable
                                type="datetimerange" range-separator="至" start-placeholder="开始日期"
                                end-placeholder="结束日期"></el-date-picker>
                        </el-col>
                        <el-col :span="3">
                            <el-select style="width: 100%;" v-model="queryParams.userType" placeholder="适用范围">
                                <el-option v-for="dict in dict.type.hs_user_type" :label="dict.label"
                                    :value="dict.value" :key="dict.id"></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="4">
                            <el-button type="primary" @click="getList">查询</el-button>
                            <el-button @click="reset">重置</el-button>
                        </el-col>
                        <el-col :span="10" style="text-align: right;">
                            <el-button type="primary" @click="swiperAdd">新增</el-button>
                        </el-col>
                    </el-row>
                </div>

                <!-- 表格 -->
                <el-table row-key="id" ref="table" v-loading="loading" :data="orderData" border>
                    <el-table-column type="index" label="排序"></el-table-column>
                    <el-table-column prop="sortNum" label="拖动">
                        <template #default="{ row }">
                                    <div :data-id="row.id">
                                        {{ row.id }}
                                    </div>
                                </template>
                    </el-table-column>
                    <el-table-column prop="image" label="图片地址"></el-table-column>
                    <el-table-column label="图片预览">
                        <template #default="{ row }">
                            <image-preview :src="row.image" style="width: 100px;height: 100px;" />
                        </template>
                    </el-table-column>
                    <el-table-column label="时间范围">
                        <template #default="{ row }">
                            <span>开始时间:{{ row.startTime ? row.startTime : '永久' }}</span><br />
                            <span>结束时间:{{ row.endTime ? row.endTime : '永久' }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="userType" label="适用范围">
                        <template #default="{ row }">
                            <span v-for="type in row.userType ? row.userType.split(',') : []">
                                <span v-for="dict in dict.type.hs_user_type">
                                    {{ dict.value == type ? dict.label : '' }}
                                </span>
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="状态" width="150">
                        <template #default="{ row }">
                            <el-tag :type="row.status == 0 ? 'danger' : 'success'">
                                {{ row.status == 0 ? '已下架' : '已上架' }}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="updateTime" label="最近操作时间" />
                    <el-table-column prop="updateBy" label="最近操作人"></el-table-column>
                    <el-table-column label="操作" width="120">
                        <template #default="{ row }">
                            <el-button type="text" size="small" @click="changeStatus(row)" v-if="row.status == 0"
                                style="color: green;">上架</el-button>
                            <el-button type="text" size="small" @click="changeStatus(row)" v-if="row.status == 1"
                                style="color: red;">下架</el-button>
                            <el-button type="text" size="small" @click="swiperEdit(row)">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <!-- 分页 -->
                <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum"
                    :limit.sync="queryParams.pageSize" @pagination="getList" />
            </el-tab-pane>
            <el-tab-pane label="公告设置" name="merchantRecharge">
                <!-- 筛选条件 -->
                <div class="filter-section">
                    <el-row :gutter="20">
                        <el-col :span="5">
                            <el-date-picker v-model="queryParams2.date" value-format="yyyy-MM-dd HH:mm:ss" clearable
                                type="datetimerange" range-separator="至" start-placeholder="开始日期"
                                end-placeholder="结束日期"></el-date-picker>
                        </el-col>
                        <el-col :span="3">
                            <el-select style="width: 100%;" v-model="queryParams2.userType" placeholder="适用范围">
                                <el-option v-for="dict in dict.type.hs_user_type" :label="dict.label"
                                    :value="dict.value" :key="dict.id"></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="4">
                            <el-button type="primary" @click="getList">查询</el-button>
                            <el-button @click="reset2">重置</el-button>
                        </el-col>
                        <el-col :span="10" style="text-align: right;">
                            <el-button type="primary" @click="bulletinAdd">新增</el-button>
                        </el-col>
                    </el-row>
                </div>

                <!-- 表格 -->
                <el-table row-key="id" ref="tables" v-loading="loading" :data="orderData2" border>
                    <el-table-column type="index" label="排序" />
                    <el-table-column prop="sortNum" label="拖动">
                        <template #default="{ row }">
                                    <div :data-id="row.id">
                                        {{ row.id }}
                                    </div>
                                </template>
                    </el-table-column>
                    <el-table-column prop="image" label="公告内容"></el-table-column>
                    <el-table-column prop="safeNo" label="时间范围">
                        <template #default="{ row }">
                            <span>开始时间:{{ row.startTime ? row.startTime : '永久' }}</span><br />
                            <span>结束时间:{{ row.endTime ? row.endTime : '永久' }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="userType" label="适用范围">
                        <template #default="{ row }">
                            <span v-for="type in row.userType ? row.userType.split(',') : []">
                                <span v-for="dict in dict.type.hs_user_type">
                                    {{ dict.value == type ? dict.label : '' }}
                                </span>
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="amount" label="状态" width="150">
                        <template #default="{ row }">
                            <el-tag :type="row.status == 0 ? 'danger' : 'success'">
                                {{ row.status == 0 ? '已下架' : '已上架' }}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="updateTime" label="最近操作时间" />
                    <el-table-column prop="updateBy" label="最近操作人"></el-table-column>
                    <el-table-column label="操作" width="120">
                        <template #default="{ row }">
                            <el-button type="text" size="small" @click="changeStatus2(row)" v-if="row.status == 0"
                                style="color: green;">上架</el-button>
                            <el-button type="text" size="small" @click="changeStatus2(row)" v-if="row.status == 1"
                                style="color: red;">下架</el-button>
                            <el-button type="text" size="small" @click="bulletinEdit(row)">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <!-- 分页 -->
                <pagination v-show="total2 > 0" :total="total2" :page.sync="queryParams2.pageNum"
                    :limit.sync="queryParams2.pageSize" @pagination="getList" />
            </el-tab-pane>
            <el-tab-pane label="赛事区图文设置" name="event">
                <EventPage></EventPage>
            </el-tab-pane>
            <el-tab-pane label="动态区图文设置" name="text">
                <TextPage></TextPage>
            </el-tab-pane>
        </el-tabs>

        <el-dialog :title="swiperTitle" :visible.sync="swiperModel" width="600px" append-to-body>
            <el-form ref="swiperForm" :model="swiperForm" label-width="110px">
                <el-form-item label="上传图片" prop="url">
                    <image-upload v-model="swiperForm.image" :limit="10" :width="120" :height="120" />
                </el-form-item>
                <el-form-item label="时间范围" prop="date">
                    <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" clearable v-model="swiperForm.date"
                        type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                        @change="changeDate">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="时间范围">
                    <el-checkbox v-model="isAll">永久</el-checkbox>
                </el-form-item>
                <el-form-item label="适用范围" prop="userType">
                    <el-checkbox-group v-model="swiperForm.userType">
                        <el-checkbox v-for="dict in dict.type.hs_user_type" :label="dict.value" :key="dict.value">{{
                            dict.label
                        }}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="swiperSubmit">确 定</el-button>
                <el-button @click="swiperModel = false">取 消</el-button>
            </div>
        </el-dialog>

        <el-dialog :title="bulletinTitle" :visible.sync="bulletinModel" width="600px" append-to-body>
            <el-form ref="bulletinForm" :model="bulletinForm" label-width="110px">
                <el-form-item label="公告标记" prop="tittle">
                    <el-input v-model="bulletinForm.tittle" placeholder="请输入公告标记"></el-input>
                </el-form-item>
                <el-form-item label="公告内容" prop="image">
                    <el-input type="textarea" maxlength="512" v-model="bulletinForm.image"
                        placeholder="请输入公告标记"></el-input>
                </el-form-item>
                <el-form-item label="时间范围" prop="date">
                    <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" clearable v-model="bulletinForm.date"
                        type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                        @change="changeDate2">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="时间范围">
                    <el-checkbox v-model="isAll2">永久</el-checkbox>
                </el-form-item>
                <el-form-item label="适用范围" prop="userType">
                    <el-checkbox-group v-model="bulletinForm.userType">
                        <el-checkbox v-for="dict in dict.type.hs_user_type" :label="dict.value" :key="dict.value">{{
                            dict.label
                        }}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="bulletinSubmit">确 定</el-button>
                <el-button @click="bulletinModel = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import Sortable from 'sortablejs';
import { hsHomeConfigPage, hsHomeConfigAdd, hsHomeConfigEdit, hsHomeConfigChangeSort } from "@/api/website/stencilManage";
import EventPage from './eventPage.vue';
import TextPage from './textPage.vue';
export default {
    dicts: ['hs_user_type'],
    components: {
        EventPage,
        TextPage
    },
    data() {
        return {
            activeTab: "userRecharge",
            loading: false,
            queryParams: {
                date: [],
                startTime: '',
                endTime: '',
                userType: '',
                type: 1,
                pageNum: 1,
                pageSize: 10,
            },
            queryParams2: {
                date: [],
                startTime: '',
                endTime: '',
                userType: '',
                type: 2,
                pageNum: 1,
                pageSize: 10,
            },
            total: 0,
            orderData: [],
            total2: 0,
            orderData2: [],
            swiperModel: false,
            swiperTitle: "新增",
            swiperForm: {
                date: [],
                image: "",
                userType: [],
                type: 1,
                startTime: '',
                endTime: '',
            },
            bulletinModel: false,
            bulletinTitle: "新增",
            bulletinForm: {
                date: "",
                image: "",
                userType: [],
                type: 2,
                startTime: '',
                endTime: '',
                tittle: ''
            },
            isAll: false,
            isAll2: false
        };
    },
    created() {
        this.getList();
    },
    methods: {
        changeTabs() {
            if (this.activeTab == 'userRecharge') {
                this.getList()
            } else if (this.activeTab == 'merchantRecharge'){
                this.getList2()
            }
        },
        getList() {
            this.loading = true;
            this.queryParams.startTime = this.queryParams.date[0];
            this.queryParams.endTime = this.queryParams.date[1];
            hsHomeConfigPage(this.queryParams).then(response => {
                this.orderData = response.rows;
                this.total = response.total;
                this.loading = false;
            });
        },
        getList2() {
            this.loading = true;
            this.queryParams2.startTime = this.queryParams2.date[0];
            this.queryParams2.endTime = this.queryParams2.date[1];
            hsHomeConfigPage(this.queryParams2).then(response => {
                this.orderData2 = response.rows;
                this.total2 = response.total;
                this.loading = false;
            });
        },
        reset() {
            this.queryParams = {
                date: [],
                startTime: '',
                endTime: '',
                type: 1,
                pageNum: 1,
                pageSize: 10,
            };
            this.getList()
        },
        reset2() {
            this.queryParams2 = {
                date: [],
                startTime: '',
                endTime: '',
                type: 2,
                pageNum: 1,
                pageSize: 10,
            };
            this.getList2()
        },
        swiperAdd() {
            this.swiperForm = {
                date: [],
                image: "",
                userType: [],
                type: 1,
                startTime: '',
                endTime: '',
            },
                this.swiperModel = true;
        },
        swiperSubmit() {
            if (this.isAll) {
                this.swiperForm.startTime = '';
                this.swiperForm.endTime = '';
            } else {
                this.swiperForm.startTime = this.swiperForm.date[0];
                this.swiperForm.endTime = this.swiperForm.date[1];
            }
            this.swiperForm.userType = this.swiperForm.userType.join(',');
            let api = this.swiperForm.id ? hsHomeConfigEdit : hsHomeConfigAdd
            api(this.swiperForm).then(response => {
                this.swiperModel = false;
                if (response.code == 200) {
                    this.getList();
                    this.$modal.msgSuccess('操作成功');
                }
            });
        },
        swiperEdit(row) {
            this.swiperModel = true;
            this.swiperTitle = "编辑";
            this.swiperForm.image = row.image;
            this.swiperForm.id = row.id;
            if (row.startTime && row.endTime) {
                this.swiperForm.date = [row.startTime, row.endTime];
                this.isAll = false;
            } else {
                this.swiperForm.date = []
                this.isAll = true;
            }
            if (row.userType == null) {
                this.swiperForm.userType = [];
            } else {
                this.swiperForm.userType = row.userType.split(',');
            }
        },
        changeDate(e) {
            this.swiperForm.date = e;
        },
        changeStatus(row) {
            let status = row.status == 0 ? 1 : 0
            hsHomeConfigEdit({ id: row.id, status, type: 1 }).then(response => {
                if (response.code == 200) {
                    this.$modal.msgSuccess("操作成功");
                    this.getList()
                }
            });
        },
        bulletinAdd() {
            this.bulletinForm = {
                date: [],
                image: "",
                userType: [],
                type: 2,
                startTime: '',
                endTime: '',
                tittle: ''
            },
                this.bulletinModel = true;
        },
        bulletinSubmit() {
            if (this.isAll2) {
                this.bulletinForm.startTime = '';
                this.bulletinForm.endTime = '';
            } else {
                this.bulletinForm.startTime = this.bulletinForm.date[0];
                this.bulletinForm.endTime = this.bulletinForm.date[1];
            }
            this.bulletinForm.userType = this.bulletinForm.userType.join(',');
            let api = this.bulletinForm.id ? hsHomeConfigEdit : hsHomeConfigAdd
            api(this.bulletinForm).then(response => {
                this.bulletinModel = false;
                if (response.code == 200) {
                    this.getList2();
                    this.$modal.msgSuccess('操作成功');
                }
            });
        },
        bulletinEdit(row) {
            this.bulletinModel = true;
            this.bulletinTitle = "编辑";
            this.bulletinForm.image = row.image;
            this.bulletinForm.tittle = row.tittle;
            this.bulletinForm.id = row.id;
            this.bulletinForm.date = [row.startTime, row.endTime];
            this.bulletinForm.userType = row.userType.split(',');
        },
        changeDate2(e) {
            this.bulletinForm.date = e;
        },
        changeStatus2(row) {
            let status = row.status == 0 ? 1 : 0
            hsHomeConfigEdit({ id: row.id, status, type: 2 }).then(response => {
                if (response.code == 200) {
                    this.$modal.msgSuccess("操作成功");
                    this.getList2()
                }
            });
        },
        setSortable() {
            const table = this.$refs.table.$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0];
            Sortable.create(table, {
                animation: 150,
                ghostClass: 'sortable-ghost',
                onEnd: (evt) => {

                    // 获取拖动的元素
                    const draggedElement = evt.item;

                    // 查找拖动元素对应的列的 ID
                    const draggedId = draggedElement.querySelector('[data-id]')
                        ? draggedElement.querySelector('[data-id]').getAttribute('data-id')
                        : null;

                    // 获取拖动的起始和目标索引
                    const { newIndex } = evt;

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

                    // 在这里处理拖动完成后的数据更新逻辑
                    this.setconfigChangeSort(draggedId, previousId)
                }
            });
        },
        setSortable2() {
            const table = this.$refs.tables.$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0];
            Sortable.create(table, {
                animation: 150,
                ghostClass: 'sortable-ghost',
                onEnd: (evt) => {
                    // 获取拖动的元素
                    const draggedElement = evt.item;
                    // 查找拖动元素对应的列的 ID
                    const draggedId = draggedElement.querySelector('[data-id]')
                        ? draggedElement.querySelector('[data-id]').getAttribute('data-id')
                        : null;
                    // 获取拖动的起始和目标索引
                    const { newIndex } = evt;
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
                    // 在这里处理拖动完成后的数据更新逻辑
                    this.setconfigChangeSort(draggedId, previousId)
                }
            });
        },
        setconfigChangeSort(idStart, idEnd) {
            let params = {
                idStart: Number(idStart),
                idEnd: Number(idEnd) ? Number(idEnd) : '',
                type: 1
            }
            hsHomeConfigChangeSort(params).then(response => {
                this.$modal.msgSuccess("操作成功");
                this.getList()
            });
        },
        setconfigChangeSort2(idStart, idEnd) {
            let params = {
                idStart: Number(idStart),
                idEnd: Number(idEnd) ? Number(idEnd) : '',
                type: 2
            }
            hsHomeConfigChangeSort(params).then(response => {
                this.$modal.msgSuccess("操作成功");
                this.getList2()
            });
        },
    },
    mounted() {
        this.setSortable();
        this.setSortable2()
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