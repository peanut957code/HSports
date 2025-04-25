<template>
    <van-nav-bar fixed placeholder @click-left="onClickLeft">
        <template #left>
            <van-icon size="20" color="#ccc" name="arrow-left" />
            <div class="text-lg font-semibold">{{ $t('financialManage.title') }}</div>
        </template>
        <template #right>
            <span class="text-blue-500">{{ $t('financialManage.viewLedger') }}</span>
        </template>
    </van-nav-bar>
    <div>
        <div>
            <div class="rounded-lg content-wrapper">
                <div class="p-4 bg-[#F7F7F7]">
                    <div class="text-sm text-gray-500">{{ $t('financialManage.totalBalance') }}:</div>
                    <div class="flex items-center">
                        <img class="w-[20px] h-[20px]" src="../../assets/money.png" alt="">
                        <span class="ml-[5px]">9,321,712,123</span>
                    </div>
                </div>
                <div class="bg-[#fff] py-3">
                    <div class="px-4 mb-4">
                        <span class="text-[14px] font-bold">{{ $t('financialManage.currentMonth', { month: '2024年12月' })
                            }}</span>
                        <div class="text-[12px] bg-[#F0F1F3] p-2 flex  rounded-[50px] text-[#A7A7A7]">
                            <span class="flex-grow text-center active">{{ $t('financialManage.viewAll') }}</span>
                            <span class="flex-grow text-center">{{ $t('financialManage.returnToCurrentMonth') }}</span>
                            <span class="flex-grow text-center">{{ $t('financialManage.previousMonth') }}</span>
                        </div>
                    </div>
                    <div class="px-4">
                        <div class="grid grid-cols-2 gap-2 mb-4">
                            <div class=" p-4 rounded-lg text-center border">
                                <div class="text-sm text-gray-500">7,000,000,000</div>
                                <div class="text-xs">{{ $t('financialManage.venueIncome') }}</div>
                            </div>
                            <div class="p-4 rounded-lg text-center border">
                                <div class="text-sm text-gray-500">1,000,000,000</div>
                                <div class="text-xs">{{ $t('financialManage.otherIncome') }}</div>
                            </div>
                        </div>
                        <div class="grid grid-cols-3 gap-2 mb-4">
                            <div class="p-4 rounded-lg text-center border">
                                <div class="text-sm text-gray-500">88</div>
                                <div class="text-xs">{{ $t('financialManage.fullVenueOrders') }}</div>
                            </div>
                            <div class="p-4 rounded-lg text-center border">
                                <div class="text-sm text-gray-500">8</div>
                                <div class="text-xs">{{ $t('financialManage.challengeOrders') }}</div>
                            </div>
                            <div class="p-4 rounded-lg text-center border">
                                <div class="text-sm text-gray-500">18</div>
                                <div class="text-xs">{{ $t('financialManage.walkInOrders') }}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="p-[10px]">
                    <el-form ref="form" :model="form" label-width="80px" label-position="top">
                        <el-form-item :label="$t('financialManage.venueName')">
                            <el-input size="large" :placeholder="$t('financialManage.venueNamePlaceholder')"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('financialManage.entryTime')">
                            <el-input size="large" :placeholder="$t('financialManage.entryTimePlaceholder')"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('financialManage.accountNumber')">
                            <el-input size="large" :placeholder="$t('financialManage.accountNumberPlaceholder')">
                                <template #suffix>
                                    <van-icon name="edit" />
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item :label="$t('financialManage.accountHolder')">
                            <el-input size="large"
                                :placeholder="$t('financialManage.accountHolderPlaceholder')">
                                <template #suffix>
                                    <van-icon name="edit" />
                                </template>
                            </el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="bg-[#F7F7F7] pt-3">
                    <div class="grid grid-cols-2 gap-2 p-4 bg-[#fff] m-[16px] rounded-[10px]">
                        <div class="bg-[#fff] p-4 rounded-lg text-center">
                            <div class="text-sm text-gray-500">1,321,712,123</div>
                            <div class="text-xs">{{ $t('financialManage.preIncome') }}</div>
                        </div>
                        <div class="bg-[#fff] p-4 rounded-lg text-center">
                            <div class="text-sm text-gray-500">8,000,000,000</div>
                            <div class="text-xs">{{ $t('financialManage.minWithdrawalAmount') }}</div>
                        </div>
                    </div>
                    <div class="text-center text-xs text-gray-500 mb-4">
                        {{ $t('financialManage.withdrawalProcessingTime') }}
                    </div>
                    <div class="p-4 pb-[80px] bg-[#fff]">
                        <van-button type="primary" block>{{ $t('financialManage.withdraw') }}</van-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const onClickLeft = () => {
    router.back();
}
</script>

<style scoped>
/* Add any additional styling here if needed */
.items {
    width: 100%;
    height: 80px;
    background-color: #fff;
    border-radius: 10px;
    /* 圆角半径 */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    /* 阴影效果 */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    color: #333;
    overflow: hidden;
}
.active{
    background-color: #fff;
    color: #000;
    border-radius: 40px;
    margin: -5px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>