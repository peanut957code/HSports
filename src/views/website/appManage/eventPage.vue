<template>
    <div>
        <!-- 筛选条件 -->
        <div class="filter-section">
            <el-row :gutter="20">
                <el-col :span="4">
                    <el-date-picker style="width: 100%;" @change="handleDateChange" v-model="dateRange"
                        value-format="yyyy-MM-dd HH:mm:ss" clearable type="datetimerange" range-separator="至"
                        start-placeholder="时间范围(开始)" end-placeholder="时间范围(结束)"></el-date-picker>
                </el-col>
                <el-col :span="4">
                    <el-date-picker style="width: 100%;" @change="handleTimeChange" v-model="queryParamsDate"
                        value-format="yyyy-MM-dd HH:mm:ss" clearable type="datetimerange" range-separator="至"
                        start-placeholder="赛事开始时间" end-placeholder="赛事结束时间"></el-date-picker>
                </el-col>
                <el-col :span="2">
                    <el-select style="width: 100%;" v-model="queryParams.eventType" placeholder="赛事类型">
                        <el-option v-for="dict in typeSelectList" :label="dict.cnName" :value="dict.code"
                            :key="dict.code"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="2">
                    <el-select style="width: 100%;" v-model="queryParams.currentProcess" placeholder="赛事阶段">
                        <el-option v-for="dict in processSelectList" :label="dict.cnName" :value="dict.code"
                            :key="dict.code"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="2">
                    <el-select style="width: 100%;" v-model="queryParams.userType" placeholder="适用范围">
                        <el-option v-for="dict in dict.type.hs_user_type" :label="dict.label" :value="dict.value"
                            :key="dict.id"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="2">
                    <el-select style="width: 100%;" v-model="queryParams.status" placeholder="状态">
                        <el-option label="下架" :value="0"></el-option>
                        <el-option label="上架" :value="1"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="getList">查询</el-button>
                    <el-button @click="reset">重置</el-button>
                </el-col>
                <el-col :span="4" style="text-align: right;">
                    <el-button type="primary" @click="add">新增</el-button>
                </el-col>
            </el-row>
        </div>

        <!-- 表格 -->
        <el-table row-key="id" ref="table" v-loading="loading" :data="orderData" border>
            <el-table-column type="index" label="排序" />
            <el-table-column prop="sortNum" label="拖动">
                <template #default="{ row }">
                    <div :data-id="row.id">
                        {{ row.id }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="fullName" label="赛事名称"></el-table-column>
            <el-table-column prop="coverPicture" label="赛事封面">
                <template #default="{ row }">
                    <image-preview :src="row.coverPicture" style="width: 100px;height: 100px;" />
                </template>
            </el-table-column>
            <el-table-column prop="eventType" label="赛事类型">
                <template #default="{ row }">
                    <span>{{ row.eventTypeStr.cnName }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="currentProcess" label="赛事阶段">
                <template #default="{ row }">
                    <span>{{ row.currentProcessStr.cnName }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="processType" label="赛事进程">
                <template #default="{ row }">
                    <span>{{ row.processTypeStr.cnName }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="beginDate" label="赛事开始日期" />
            <el-table-column prop="eventUrl" label="赛事详情链接" />
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
                        {{ row.status == 0 ? '已下架' : row.status == 1 ? '已上架' : '无' }}
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
                    <el-button type="text" size="small" @click="edit(row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum"
            :limit.sync="queryParams.pageSize" @pagination="getList" />

        <el-dialog :title="title" :visible.sync="model" width="1200px" append-to-body>
            <el-form ref="form" :model="form" label-width="120px">
                <el-row>
                    <!-- 赛事名称 -->
                    <el-col :span="24">
                        <el-form-item label="赛事名称" prop="fullName">
                            <el-input v-model="form.fullName" type="textarea" placeholder="最多512个字" maxlength="512"
                                show-word-limit rows="3"></el-input>
                        </el-form-item>
                    </el-col>

                    <!-- 赛事类型 -->
                    <el-col :span="24">
                        <el-form-item label="赛事类型" prop="eventType">
                            <el-radio-group v-model="form.eventType" class="vertical-radio-group">
                                <el-radio v-for="item in typeSelectList" :key="item.code" :label="item.code">
                                    {{ item.cnName }} {{ item.viName }}
                                </el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>

                    <!-- 赛事阶段 -->
                    <el-col :span="12">
                        <el-form-item label="赛事阶段" prop="currentProcess">
                            <el-radio-group v-model="form.currentProcess" class="vertical-radio-group">
                                <el-radio v-for="item in processSelectList" :key="item.code" :label="item.code">
                                    {{ item.cnName }} {{ item.viName }}
                                </el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>

                    <!-- 赛事进程 -->
                    <el-col :span="12">
                        <el-form-item label="赛事进程" prop="processType">
                            <el-radio-group v-model="form.processType">
                                <el-radio v-for="item in currentProcesses" :key="item.code" :label="item.code">
                                    {{ item.cnName }} {{ item.viName }}
                                </el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>

                    <!-- 赛事详情 -->
                    <el-col :span="24">
                        <el-form-item label="赛事详情" prop="eventUrl">
                            <el-input v-model="form.eventUrl" placeholder="链接"></el-input>
                        </el-form-item>
                    </el-col>
                    <!-- 赛事封面 -->
                    <el-col :span="12">
                        <el-form-item label="赛事封面" prop="coverPicture">
                            <image-upload v-model="form.coverPicture" :limit="10" :width="860" :height="360" />
                        </el-form-item>
                    </el-col>

                    <!-- 开赛时间 -->
                    <el-col :span="12">
                        <el-form-item label="开赛时间" prop="beginDate">
                            <el-date-picker v-model="form.beginDate" value-format="yyyy-MM-dd" type="date"
                                placeholder="开始日期" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <!-- 时间范围 -->
                    <el-col :span="24">
                        <el-form-item label="时间范围" prop="date">
                            <el-date-picker v-model="form.date" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss"
                                range-separator="至" start-placeholder="时间范围(开始)" end-placeholder="时间范围(结束)"
                                style="width: calc(80% - 50px);"></el-date-picker>
                            <el-checkbox v-model="isPermanent" label="1" style="margin-left: 10px;">
                                永久
                            </el-checkbox>
                        </el-form-item>
                    </el-col>

                    <!-- 适用范围 -->
                    <el-col :span="24">
                        <el-form-item label="适用范围" prop="userType">
                            <el-checkbox-group v-model="form.userType">
                                <el-checkbox v-for="dict in dict.type.hs_user_type" :key="dict.value"
                                    :label="dict.value">
                                    {{ dict.label }}
                                </el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>

            <template #footer>
                <el-button type="primary" @click="submit">确认</el-button>
                <el-button @click="model = false">取消</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import Sortable from 'sortablejs';
import { list, add, edit, changeSort, typeSelect, processSelect } from "@/api/website/eventPage";
export default {
    dicts: ['hs_user_type'],
    data() {
        return {
            queryParams: {
                beginDate: null,
                stopDate: null,
                startTime: null,
                endTime: null,
                eventType: null,
                currentProcess: null,
                userType: null,
                pageNum: 1,
                pageSize: 10,
            },
            dateRange: [],
            queryParamsDate: [],
            total: 0,
            loading: false,
            orderData: [],
            title: '',
            model: false,
            form: {
                fullName: '',
                eventType: '',
                currentProcess: '',
                processType: '',
                coverPicture: '',
                beginDate: '',
                eventUrl: '',
                date: '',
                userType: []
            },
            typeSelectList: [],
            processSelectList: [],
            isPermanent: false
        }
    },
    methods: {
        getList() {
            this.loading = true
            list(this.queryParams).then(res => {
                this.loading = false
                this.orderData = res.rows
                this.total = res.total
            })
        },
        handleDateChange(value) {
            if (value && value.length === 2) {
                this.queryParams.beginDate = value[0];
                this.queryParams.stopDate = value[1];
            } else {
                this.queryParams.beginDate = null;
                this.queryParams.stopDate = null;
            }
        },
        handleTimeChange(value) {
            if (value && value.length === 2) {
                this.queryParams.startTime = value[0];
                this.queryParams.endTime = value[1];
            } else {
                this.queryParams.startTime = null;
                this.queryParams.endTime = null;
            }
        },
        changeStatus(row) {
            let status = row.status == 0 ? 1 : 0
            edit({ id: row.id, status }).then(response => {
                if (response.code == 200) {
                    this.$modal.msgSuccess("操作成功");
                    this.getList()
                }
            });
        },
        add() {
            this.model = true
            this.title = '新增赛事区图文'
            this.form = {
                fullName: '',
                eventType: '',
                currentProcess: '',
                processType: '',
                coverPicture: '',
                beginDate: '',
                eventUrl: '',
                date: '',
                userType: []
            }
        },
        edit(row) {
            this.model = true
            this.title = '编辑赛事区图文'
            this.form = { ...row }
            this.form.date = [row.startTime, row.endTime]
            this.form.userType = row.userType.split(',');
        },
        reset() {
            this.queryParams = {
                beginDate: null,
                stopDate: null,
                startTime: null,
                endTime: null,
                eventType: null,
                currentProcess: null,
                userType: null,
                pageNum: 1,
                pageSize: 10,
            },
                this.dateRange = [],
                this.queryParamsDate = []
            this.getList()
        },
        submit() {
            let api = this.form.id ? edit : add

            if (this.isPermanent == false) {
                this.form.startTime = this.form.date[0]
                this.form.endTime = this.form.date[1]
            } else {
                this.form.startTime = ''
                this.form.endTime = ''
            }
            this.form.userType = this.form.userType.join(',')
            api(this.form).then(res => {
                if (res.code == 200) {
                    this.model = false
                    this.getList()
                }
            })
        },
        getTypeSelect() {
            typeSelect().then(res => {
                this.typeSelectList = res.data
            })
        },
        getProcessSelect() {
            processSelect().then(res => {
                this.processSelectList = res.data
            })
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
        setconfigChangeSort(idStart, idEnd) {
            let params = {
                idStart: Number(idStart),
                idEnd: Number(idEnd) ? Number(idEnd) : '',
            }
            changeSort(params).then(response => {
                this.$modal.msgSuccess("操作成功");
                this.getList()
            });
        },
    },
    computed: {
        // 根据当前选择的赛事阶段动态返回对应的赛事进程
        currentProcesses() {
            const currentProcess = this.form.currentProcess;
            const selectedStage = this.processSelectList.find(
                (item) => item.code === currentProcess
            );
            return selectedStage ? selectedStage.process : [];
        },
    },
    mounted() {
        this.getList()
        this.getTypeSelect()
        this.getProcessSelect()
        this.setSortable()
    }
}
</script>

<style scoped>
.filter-section {
    margin: 20px 0;
}

/* 让 el-radio 竖排显示 */
.vertical-radio-group .el-radio {
    display: block;
    margin-bottom: 10px;
}
</style>