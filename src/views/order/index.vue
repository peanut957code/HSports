<template>
    <van-nav-bar class="z-10" fixed placeholder @click-left="onClickLeft">
        <template #left>
            <div class="text-lg font-semibold">{{ $t('order.header') }}</div>
        </template>
        <template #right>
            <van-icon name="service-o" @click="goToUrl('contactCustomer')" size="24" color="#000" />
        </template>
    </van-nav-bar>
    <div class="px-4 flex items-center bg-[#fff]">
        <div :class="[activeTab == index ? 'active' : '']"
            class="bg-[#fff] text-[#333] text-[12px] mt-[10px] px-3 py-2 " v-for="(item, index) in navList"
            @click="onClickTab(index, item)">{{ item.title }}</div>
    </div>
    <div class="flex flex-col overflow-y-auto">
        <div class="flex-1 overflow-y-auto text-[14px] bg-[#fff] p-4">
            <div v-for="(order, index) in ordersList" :key="index" style="border: 1px solid #F1EFEF;"
                class="p-4 mb-2 rounded-[15px] text-[14px]" @click="toDetile(order)">
                <div class="flex justify-between items-center pb-[10px]">
                    <span class="text-[#333] font-bold">{{ $t('order.payId') }}</span>
                    <div>
                        <span v-if="order.finalStatus == 1" :class="[order.finalStatus == 1 ? 'text-[#FF8C00]' : '']">{{
                            $t('order.nav2') }} </span>
                        <span v-if="order.finalStatus == 2" :class="[order.finalStatus == 2 ? 'text-[Green]' : '']">{{
                            $t('order.nav3') }} </span>
                        <span v-if="order.finalStatus == 3" :class="[order.finalStatus == 3 ? 'text-[red]' : '']">{{
                            $t('order.disputed') }} </span>
                        <span v-if="order.finalStatus == 0" :class="[order.finalStatus == 0 ? 'text-[red]' : '']">{{
                            $t('order.nav4') }} </span>
                        <van-icon name="arrow" />
                    </div>
                </div>
                <span class="text-gray-700">{{ $t('order.orderId') }}: {{ order.orderNo }}</span>
                <div class="text-sm text-gray-700 text-[14px]">
                    <div class="flex justify-between py-[5px]">
                        <span>{{ $t('order.payMoney') }}</span>
                        <span>{{ order.realAmount }}</span>
                    </div>
                    <div class="flex justify-between  text-[14px] py-[5px]">
                        <span>{{ $t('order.accant') }}</span>
                        <span>{{ order.paySafe }}</span>
                    </div>
                    <div class="flex justify-between  text-[14px] py-[5px]">
                        <span>{{ $t('order.type') }}</span>
                        <span v-if="order.status == 1">{{ $t('order.depositPaid') }}</span>
                        <span v-if="order.status == 2">{{ $t('order.fullPayment') }}</span>
                        <span v-if="order.status == 3">{{ $t('order.adminCancelled') }}</span>
                        <span v-if="order.status == 4">{{ $t('order.userCancelled') }}</span>
                        <span v-if="order.status == 5">{{ $t('order.venueRejected') }}</span>
                    </div>
                    <div class="flex justify-between  text-[14px] py-[5px]">
                        <span>{{ $t('order.time') }}</span>
                        <span>{{ order.payTime }}</span>
                    </div>
                    <div class="flex justify-between  text-[14px] pt-[5px]">
                        <span>{{ $t('order.status') }}</span>
                        <span v-if="order.status == 1" :class="[order.status == 1 ? 'text-[green]' : '']">{{
                            $t('order.depositPaid') }}</span>
                        <span v-if="order.status == 2" :class="[order.status == 2 ? 'text-[green]' : '']">{{
                            $t('order.fullPayment') }}</span>
                        <span v-if="order.status == 3" :class="[order.status == 3 ? 'text-[red]' : '']">{{
                            $t('order.adminCancelled') }}</span>
                        <span v-if="order.status == 4" :class="[order.status == 4 ? 'text-[red]' : '']">{{
                            $t('order.userCancelled') }}</span>
                        <span v-if="order.status == 5" :class="[order.status == 5 ? 'text-[red]' : '']">{{
                            $t('order.venueRejected') }}</span>
                    </div>
                </div>
            </div>
            <van-pagination @change="changePage" v-model="currentPage" mode="simple" :total-items="total"
                :items-per-page="10">
                <template #prev-text>
                    <van-icon name="arrow-left" />
                </template>
                <template #next-text>
                    <van-icon name="arrow" />
                </template>
            </van-pagination>
        </div>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRouter } from 'vue-router';
import { getConsumePage } from '@/api/order/index'
import { useI18n } from 'vue-i18n';
const { t, locale } = useI18n();

const router = useRouter();
const activeTab = ref(0)
const ordersList = ref([])

const currentPage = ref(1)
const total = ref(0)
const navList = [
    { name: '', title: t('order.nav1') },
    { name: 1, title: t('order.nav2') },
    { name: 2, title: t('order.nav3') },
    { name: 3, title: t('order.nav4') }
]

const getConsumePageData = (val) => {
    let params = {
        finalStatus: val ? val : '',
        pageNum: currentPage.value
    }
    getConsumePage(params).then(res => {
        if (res.code == 200) {
            ordersList.value = res.rows
            total.value = res.total
        }
    })
}

const goToUrl = (url) => {
    if (url) {
        router.push({
            path: '/common',
            query: {
                param: url,  // 携带的查询参数
            }
        });
    } else {
        showToast('Chưa mở');
    }

}


const onClickTab = (index, val) => {
    activeTab.value = index
    getConsumePageData(val.name)
}

const changePage = (val) => {
    console.log(val)
    currentPage.value = val
    getConsumePageData()
}

const toDetile = (val) => {
    const serializedVal = JSON.stringify(val);
    router.push({ name: 'details', query: { val: serializedVal } })
}

onMounted(() => {
    getConsumePageData()
})
</script>

<style scoped>
/* Optional: Add custom Tailwind styles here if needed */
.active {
    /* background: #1c8ded; */
    color: #000;
    border-bottom: 3px solid #1c8ded;
}
</style>