<template>
    <div>
        <!-- 筛选条件 -->
        <div class="filter-section">
            <el-row :gutter="20">
                <el-col :span="4">
                  <el-input placeholder="标题" v-model="queryParams.title"></el-input>
                </el-col>
                <el-col :span="4">
                    <el-date-picker style="width: 100%;" @change="handleTimeChange" v-model="queryParamsDate"
                        value-format="yyyy-MM-dd HH:mm:ss" clearable type="datetimerange" range-separator="至"
                        start-placeholder="发布时间" end-placeholder="发布时间"></el-date-picker>
                </el-col>
                <el-col :span="4">
                  <el-input placeholder="详情链接" v-model="queryParams.detailsUrl"></el-input>
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
        <el-table row-key="id" ref="tables" v-loading="loading" :data="orderData" border>
            <el-table-column type="index" label="排序" />
            <el-table-column prop="title" label="标题" />
            <el-table-column prop="images" label="图片">
                <template #default="{ row }">
                    <image-preview :src="row.images" style="width: 100px;height: 100px;" />
                </template>
            </el-table-column>
            <el-table-column prop="createBy" label="发布人" />
            <el-table-column prop="currentProcess" label="浏览数量">
                <template  #default="{ row }">
                    <span>0</span>
                </template>
            </el-table-column>
            <el-table-column prop="processType" label="点赞数量">
                <template  #default="{ row }">
                    <span>0</span>
                </template>
            </el-table-column>
            <el-table-column prop="beginDate" label="分享数量">
                <template  #default="{ row }">
                    <span>0</span>
                </template>
            </el-table-column>
            <el-table-column prop="createTime" label="发布时间" />
            <el-table-column prop="detailsUrl" label="详情链接" />
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
                        {{ row.status == 0 ? '已下架' : row.status == 1 ? '已上架' : ''}}
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
                    <el-form-item label="动态标题" prop="title">
                        <el-input v-model="form.title" type="text" placeholder="最多512个字" maxlength="512"
                            show-word-limit></el-input>
                    </el-form-item>

                    <el-form-item label="动态正文" prop="content">
                        <el-input v-model="form.content" type="textarea" placeholder="最多2560个字" maxlength="2560"
                            show-word-limit rows="10"></el-input>
                    </el-form-item>

                    <!-- 赛事封面 -->
                    <el-form-item label="动态图片" prop="images">
                        <image-upload v-model="form.images" :limit="10" :width="860" :height="360" />
                    </el-form-item>

                    <!-- 赛事详情 -->
                    <el-form-item label="详情页面" prop="detailsUrl">
                        <el-input v-model="form.detailsUrl" placeholder="链接"></el-input>
                    </el-form-item>

                    <!-- 适用范围 -->
                    <el-form-item label="适用范围" prop="userType">
                        <el-checkbox-group v-model="form.userType">
                            <el-checkbox v-for="dict in dict.type.hs_user_type" :key="dict.value" :label="dict.value">
                                {{ dict.label }}
                            </el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
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
import { list, add, edit } from "@/api/website/textPage";

export default {
    dicts: ['hs_user_type'],
    data() {
        return {
            queryParams: {
                startTime: null,
                endTime: null,
                title: null,
                detailsUrl: null,
                status:null,
                userType: [],
                pageNum: 1,
                pageSize: 10,
            },
            queryParamsDate: [],
            total: 0,
            loading: false,
            orderData: [],
            title: '',
            model: false,
            form: {
                title: '',
                content: '',
                images: '',
                detailsUrl: '',
                userType: []
            },
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
            this.title = '新增动态'
            this.form = {
                title: '',
                content: '',
                images: '',
                detailsUrl: '',
                userType: []
            }
        },
        edit(row) {
            this.model = true
            this.title = '编辑动态'
            this.form = { ...row }
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
                userType:'',
                pageNum: 1,
                pageSize: 10,
            },
                this.queryParamsDate = []
            this.getList()
        },
        submit() {
            let api = this.form.id ? edit : add

            this.form.userType = this.form.userType.join(',')
            api(this.form).then(res => {
                if (res.code == 200) {
                    this.model = false
                    this.getList()
                }
            })
        },
        changeDate() { }
    },
    mounted() {
        this.getList()
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