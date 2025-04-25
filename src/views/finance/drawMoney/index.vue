<template>
  <div class="app-container">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="用户提款设置" name="userWithdrawalSettings">
        <!-- 用户提款设置内容 -->
        <el-card>
            <div slot="header" class="clearfix">
              <span>用户提款条件</span>
            </div>
            <el-checkbox-group v-model="checkedConditions">
              <el-checkbox label="无需以下条件"></el-checkbox>
              <el-checkbox label="需绑定电子邮箱"></el-checkbox>
              <el-checkbox label="需绑定手机号码"></el-checkbox>
              <el-checkbox label="需绑定手机号码和电子邮箱"></el-checkbox>
            </el-checkbox-group>
          <el-table :data="userWithdrawalConditions" style="width: 100%">
            <el-table-column prop="userLevel" label="用户等级"></el-table-column>
            <el-table-column prop="dailyLimitTimes" label="单日提款次数"></el-table-column>
            <el-table-column prop="dailyLimitTotal" label="单日提款总额"></el-table-column>
            <el-table-column prop="singleLimitMin" label="单笔提款最低"></el-table-column>
            <el-table-column prop="singleLimitMax" label="单笔提款最高"></el-table-column>
            <el-table-column prop="pointExchangeRatio" label="积分兑换比例"></el-table-column>
          </el-table>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="商户提款设置" name="merchantWithdrawalSettings">
        <!-- 商户提款设置内容 -->
        <el-card>
          <div slot="header" class="clearfix">
            <span>通用商户提款设置</span>
            <div  style="padding-bottom: 10px;padding-top: 10px"><span style="color: red">*</span>单日提款次数：1</div>
            <div  style="padding-bottom: 10px"><span style="color: red">*</span>单日提款总额：5000000</div>
            <div  style="padding-bottom: 10px"><span style="color: red">*</span>单日提款次数：5000000</div>
            <div  style="padding-bottom: 10px"><span style="color: red">*</span>单笔提款最低：5000000</div>
            <div  style="padding-bottom: 10px"><span style="color: red">*</span>单笔提款最高：5000000</div>
          </div>
          <el-table :data="commonMerchantWithdrawalData" style="width: 100%">
            <el-table-column prop="id" label="序号"></el-table-column>
            <el-table-column prop="merchantId" label="商户编号"></el-table-column>
            <el-table-column prop="dailyWithdrawalTimes" label="单日提款次数"></el-table-column>
            <el-table-column prop="dailyWithdrawalTotal" label="单日提款总额"></el-table-column>
            <el-table-column prop="singleWithdrawalMin" label="单笔提款最低"></el-table-column>
            <el-table-column prop="singleWithdrawalMax" label="单笔提款最高"></el-table-column>
            <el-table-column prop="status" label="状态"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="small">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="提款手续费设置" name="withdrawalFeeSettings">
        <!-- 提款手续费设置内容 -->
        <el-card>
          <div slot="header" class="clearfix">
            <span>提款手续费设置</span>
          </div>
          <el-table :data="withdrawalFeeData" style="width: 100%">
            <el-table-column prop="userType" label="用户类型"></el-table-column>
            <el-table-column prop="withdrawalMode" label="提款模式"></el-table-column>
            <el-table-column prop="feeType" label="手续费类型"></el-table-column>
            <el-table-column prop="fee" label="手续费"></el-table-column>
            <el-table-column prop="lastOpTime" label="最近操作时间"></el-table-column>
            <el-table-column prop="lastOpUser" label="最近操作人"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="small">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkedConditions:[],
      activeTab: 'userWithdrawalSettings',
      // 用户提款条件数据
      userWithdrawalConditions: [
        {
          userLevel: '普通用户',
          dailyLimitTimes: 1,
          dailyLimitTotal: 100000,
          singleLimitMin: 50000,
          singleLimitMax: 100000,
          pointExchangeRatio: 1.00
        },
        {
          userLevel: '蓝色VIP',
          dailyLimitTimes: 2,
          dailyLimitTotal: 1000000,
          singleLimitMin: 1000000,
          singleLimitMax: 1000000,
          pointExchangeRatio: 2.00
        },
        {
          userLevel: '橙色VIP',
          dailyLimitTimes: 3,
          dailyLimitTotal: 3000000,
          singleLimitMin: 3000000,
          singleLimitMax: 3000000,
          pointExchangeRatio: 5.00
        }
      ],
      // 通用商户提款设置数据
      commonMerchantWithdrawalData: [
        {
          id: 1,
          merchantId: 'ksdhj1',
          dailyWithdrawalTimes: 6,
          dailyWithdrawalTotal: 8000000,
          singleWithdrawalMin: 300000,
          singleWithdrawalMax: 1000000,
          status: '开启'
        },
        // 其他数据项
      ],
      // 自定义商户提款设置数据
      customMerchantWithdrawalData: [
        {
          id: 1,
          merchantId: 'ksdhj1',
          dailyWithdrawalTimes: 7,
          dailyWithdrawalTotal: 8000000,
          singleWithdrawalMin: 300000,
          singleWithdrawalMax: 1000000,
          status: '关闭'
        },
        // 其他数据项
      ],
      // 提款手续费设置数据
      withdrawalFeeData: [
        {
          userType: '普通用户',
          withdrawalMode: '内扣',
          feeType: '固定金额',
          fee: 3.00,
          lastOpTime: '2022-10-20 17:00:00',
          lastOpUser: 'admin1'
        },
        // 其他数据项
      ]
    };
  }
};
</script>

<style scoped>
</style>
