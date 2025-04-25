<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="收款银行卡设置" name="first">
        <el-form :inline="true" :model="formInline" class="demo - form - inline">
          <el-form-item label="银行卡卡号">
            <el-input v-model="formInline.cardNumber" placeholder="银行卡卡号"></el-input>
          </el-form-item>
          <el-form-item label="银行名称">
            <el-input v-model="formInline.bankName" placeholder="银行名称"></el-input>
          </el-form-item>
          <el-form-item label="适用范围">
            <el-select v-model="formInline.scope">
              <el-option label="全部" :value="0"></el-option>
              <el-option label="会员" :value="1"></el-option>
              <el-option label="代理" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-button type="primary" @click="onSearch">查询</el-button>
          <el-button @click="onReset">重置</el-button>
          <el-button type="success" @click="onAdd">新增</el-button>
        </el-form>
        <el-table  style="width: 100%">
          <el-table-column type="index" label="排序"></el-table-column>
          <el-table-column prop="cardNumber" label="银行卡号"></el-table-column>
          <el-table-column prop="bankName" label="银行名称"></el-table-column>
          <el-table-column prop="holderName" label="持卡人姓名"></el-table-column>
          <el-table-column prop="scope" label="适用范围"></el-table-column>
          <el-table-column prop="minAmount" label="单笔最小金额"></el-table-column>
          <el-table-column prop="maxAmount" label="单笔最大金额"></el-table-column>
          <el-table-column prop="fee" label="手续费"></el-table-column>
          <el-table-column prop="status" label="状态"></el-table-column>
          <el-table-column prop="lastOpTime" label="最近操作时间"></el-table-column>
          <el-table-column prop="lastOpUser" label="最近操作人"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small">禁用</el-button>
              <el-button type="text" size="small">启用</el-button>
              <el-button type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize" @pagination="getList" />
      </el-tab-pane>
      <el-tab-pane label="收款三方账号设置" name="second">
        <el-form :inline="true" :model="queryParams" class="demo - form - inline">
          <el-form-item label="三方账号">
            <el-input v-model="queryParams.accountNo" placeholder="银行卡卡号"></el-input>
          </el-form-item>
          <el-form-item label="账号名称">
            <el-input v-model="queryParams.accountName" placeholder="银行名称"></el-input>
          </el-form-item>
          <el-form-item label="适用范围">
            <el-select v-model="queryParams.scope">
              <el-option label="全部" :value="0"></el-option>
              <el-option label="会员" :value="1"></el-option>
              <el-option label="代理" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-button type="primary" @click="onSearch">查询</el-button>
          <el-button @click="onReset">重置</el-button>
        </el-form>
        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="onAdd"
                    v-hasPermi="['finance:channel:add']">新增</el-button>
            </el-col>
            <right-toolbar  @queryTable="getList"></right-toolbar>
        </el-row>
        <el-table v-loading="loading" :data="tableData" style="width: 100%">
          <el-table-column prop="sort" label="排序"></el-table-column>
          <el-table-column prop="accountNo" label="收款第三方账号"></el-table-column>
          <el-table-column prop="accountName" label="账号名称"></el-table-column>
          <el-table-column prop="logo" label="LOGO">
            <template #default="{ row }">
              <img :src="row.logo" style="width: 100px; height: 100px" />
            </template>
          </el-table-column>
          <el-table-column prop="qrCode" label="收款二维码">
            <template #default="{ row }">
              <img :src="row.qrCode" style="width: 100px; height: 100px" />
            </template>
          </el-table-column>
          <el-table-column prop="scope" label="适用范围">
            <template #default="{ row }">
              <span>{{ row.scope === 0 ? '全部' : row.scope === 1 ? '会员' : '代理' }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="startAmount" label="单笔最小金额"></el-table-column>
          <el-table-column prop="endAmount" label="单笔最大金额"></el-table-column>
          <el-table-column prop="feePercent" label="手续费"></el-table-column>
          <el-table-column prop="status" label="状态">
            <template #default="{ row }">
              <el-tag v-if="row.status === 0" type="danger">禁用</el-tag>
              <el-tag v-else type="success">启用</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="updateTime" label="最近操作时间"></el-table-column>
          <el-table-column prop="updateBy" label="最近操作人"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" v-if="scope.row.status == 0" @click="editStatus(scope.row)">启用</el-button>
              <el-button type="text" size="small" v-if="scope.row.status == 1" @click="editStatus(scope.row)">禁用</el-button>
              <el-button type="text" size="small" @click="edit(scope)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize" @pagination="getList" />
      </el-tab-pane>
    </el-tabs>

    <el-dialog :title="title" :visible.sync="dialogVisible" width="600px">
      <el-form :model="formData" :rules="rules" ref="formRef" label-width="120px">
        <el-form-item label="排序" prop="sort">
          <el-input v-model="formData.sort" placeholder="0-99数字，越小排序越前"></el-input>
        </el-form-item>

        <el-form-item label="收款账户ID" prop="accountNo" required>
          <el-input v-model="formData.accountNo" placeholder="请输入收款账户ID"></el-input>
        </el-form-item>

        <el-form-item label="收款账户名称" prop="accountName" required>
          <el-input v-model="formData.accountName" placeholder="请输入收款账户名称"></el-input>
        </el-form-item>

        <el-form-item label="适用范围" prop="scope">
          <el-radio-group v-model="formData.scope">
            <el-radio :label="0">全部</el-radio>
            <el-radio :label="1">会员</el-radio>
            <el-radio :label="2">代理</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="单笔最小金额" prop="startAmount">
          <el-input v-model="formData.startAmount" placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item label="单笔最大金额" prop="endAmount" required>
          <el-input v-model="formData.endAmount" placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item label="收款二维码" prop="qrCode">
          <image-upload v-model="formData.qrCode"></image-upload>
        </el-form-item>
        <el-form-item label="LOGO" prop="logo">
          <image-upload v-model="formData.logo" limit="1"></image-upload>
        </el-form-item>
        <!-- <el-form-item label="快捷金额" prop="quickAmounts">
            <el-input v-model="formData.quickAmounts" placeholder="用英文逗号分开，最多可以设置8个"></el-input>
          </el-form-item> -->
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </div>
    </el-dialog>



  </div>
</template>
<script>
import { list, update, add } from "@/api/finance/channel";
export default {
  data() {
    return {
      loading: false,
      activeName: 'first',
      title: "新增收款三方账号",
      formInline: {
        cardNumber: '',
        bankName: '',
        scope: '',
      },
      tableData: [
      ],
      total: 0,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        accountNo: null,
        accountName: null,
        scope: null
      },
      dialogVisible: false,
      formData: {
        sort: "",
        accountNo: "",
        accountName: "",
        scope: "",
        startAmount: "",
        endAmount: "",
        qrCode: null,
        logo: null,
        // quickAmounts: "",
      },
      rules: {
        sort: [{ required: true, message: "请输入排序", trigger: "blur" }],
        accountNo: [{ required: true, message: "请输入收款账户ID", trigger: "blur" }],
        accountName: [{ required: true, message: "请输入收款账户名称", trigger: "blur" }],
        scope: [{ required: true, message: "请选择适用范围", trigger: "blur" }],
        startAmount: [{ required: true, message: "请输入单笔最小金额", trigger: "blur" }],
        endAmount: [{ required: true, message: "请输入单笔最大金额", trigger: "blur" }],
      },
    };
  },
  methods: {
    onSearch() {
      // 处理查询逻辑
      this.getList();
    },
    onReset() {
      // 处理重置逻辑
      this.formInline.cardNumber = '';
      this.formInline.bankName = '';
      this.formInline.scope = '';
      this.queryParams = {
        pageNum: 1,
        pageSize: 10,
        accountNo: null,
        accountName: null,
        scope: null
      }
      this.getList();
    },
    onAdd() {
      // 新增时，清空表单数据并显示弹框
      this.dialogVisible = true;
      this.title = "新增收款三方账号";
      this.formData = {
        sort: "",
        accountNo: "",
        accountName: "",
        scope: null,
        startAmount: "",
        endAmount: "",
        qrCode: null,
        logo: null,
      };
    },
    edit(val) {
      // 编辑时，填充当前点击的行数据并显示弹框
      console.log(val.row)
      this.dialogVisible = true;
      this.title = "编辑收款三方账号";
      this.formData = {
        sort: val.row.sort || "",
        accountNo: val.row.accountNo || "",
        accountName: val.row.accountName || "",
        scope: val.row.scope,
        startAmount: val.row.startAmount || "",
        endAmount: val.row.endAmount || "",
        qrCode: val.row.qrCode || null,
        logo: val.row.logo|| null,
        id: val.row.id || '',
      };
    },
    editStatus(val) {
      // 编辑状态
      console.log(val)
      let params = {
        id: val.id,
        sort: val.sort,
        accountNo: val.accountNo,
        accountName: val.accountName,
        scope: val.scope,
        startAmount: val.startAmount ,
        endAmount: val.endAmount,
        qrCode: val.qrCode,
        logo: val.logo,
        status: val.status === 0 ? 1 : 0
      }
      update(params).then(response => {
            if (response.code === 200) {
              this.getList();
              this.$message.success("修改成功");
            }
          });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    getList() {
      this.loading = true;
      list(this.queryParams).then(response => {
        this.tableData = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    handleSave() {
      // 处理保存逻辑
      this.$refs["formRef"].validate(valid => {
        if (valid) {
          // 判断是新增还是编辑，依据是否有 `formData.accountNo` 区分
          const saveAction = this.formData.id ? update : add;
          saveAction(this.formData).then(response => {
            if (response.code === 200) {
              this.getList();
              this.dialogVisible = false;
              this.$message.success("保存成功");
            }
          });
        }
      });
    },
  },

  mounted() {
    this.getList();
  },
};
</script>
<style scoped></style>
