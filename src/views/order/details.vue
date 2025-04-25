<template>
  <div>
    <!-- Header -->
    <van-nav-bar fixed placeholder @click-left="goBack">
      <template #left>
        <van-icon size="20" color="#ccc" name="arrow-left" />
        <div class="text-lg font-semibold">{{ $t('order.orderDetails') }}</div>
      </template>
    </van-nav-bar>

    <div style="border: 1px solid #F1EFEF;" class="m-[10px] rounded-[10px]">
      <div class="ml-[10px] mt-[10px]">{{ $t('orderInfo.zxStatus') }}</div>
      <div class="ml-[10px] mt-[10px]">
        <span v-if="order.finalStatus == 1" :class="[order.finalStatus == 1 ? 'text-[#FF8C00]' : '']">{{
          $t('order.nav2') }} </span>
        <span v-if="order.finalStatus == 2" :class="[order.finalStatus == 2 ? 'text-[Green]' : '']">{{
          $t('order.nav3') }} </span>
        <span v-if="order.finalStatus == 3" :class="[order.finalStatus == 3 ? 'text-[red]' : '']">{{
          $t('order.disputed') }} </span>
        <span v-if="order.finalStatus == 0" :class="[order.finalStatus == 0 ? 'text-[red]' : '']">{{
          $t('order.nav4') }} </span>
      </div>
      <div class="flex justify-between mx-[10px] mt-[30px] pb-[30px]" v-if="order.finalStatus == 1">
        <van-button type="default" class="w-1/2" @click="execute(0)">{{ $t('order.revoked') }}</van-button>
        <div class="w-[10px]"></div>
        <van-button type="primary" class="w-1/2" @click="execute(2)">{{ $t('order.nav3') }}</van-button>
      </div>
    </div>
    <!-- Order Details -->
    <div class="bg-white rounded p-4">
      <div class="mb-4">
        <p class="flex justify-between text-sm text-[14px] py-[5px]">
          <span>{{ $t('order.orderId') }}</span>
          <span class="text-gray-500 flex items-center">
            {{ order.orderNo }}
            <van-icon name="copy" class="ml-1" size="14" />
          </span>
        </p>
        <p class="flex justify-between text-sm text-[14px] py-[5px]">
          <span>{{ $t('order.payMoney') }}</span>
          <span>{{ order.realAmount }}</span>
        </p>
        <p class="flex justify-between text-sm text-[14px] py-[5px]">
          <span>{{ $t('order.accant') }}</span>
          <span>{{ order.paySafe }}</span>
        </p>
        <p class="flex justify-between text-sm text-[14px] py-[5px]">
          <span>{{ $t('order.type') }}</span>
          <span v-if="order.status == 1">{{ $t('order.depositPaid') }}</span>
          <span v-if="order.status == 2">{{ $t('order.fullPayment') }}</span>
          <span v-if="order.status == 3">{{ $t('order.adminCancelled') }}</span>
          <span v-if="order.status == 4">{{ $t('order.userCancelled') }}</span>
          <span v-if="order.status == 5">{{ $t('order.venueRejected') }}</span>
        </p>
        <p class="flex justify-between text-sm text-[14px] py-[5px]">
          <span>{{ $t('order.time') }}</span>
          <span>{{ order.payTime }}</span>
        </p>
        <p class="flex justify-between text-sm text-[14px] py-[5px]">
          <span>{{ $t('order.status') }}</span>
          <span v-if="order.status == 1">{{ $t('order.depositPaid') }}</span>
          <span v-if="order.status == 2">{{ $t('order.fullPayment') }}</span>
          <span v-if="order.status == 3">{{ $t('order.adminCancelled') }}</span>
          <span v-if="order.status == 4">{{ $t('order.userCancelled') }}</span>
          <span v-if="order.status == 5">{{ $t('order.venueRejected') }}</span>
        </p>
      </div>

      <!-- Booking Info -->
      <div class="border-t pt-4">
        <h2 class="font-bold text-sm mb-2">{{ $t('orderInfo.title') }}</h2>
        <p class="flex justify-between text-sm text-[14px] py-[5px]">
          <span>{{ $t('orderInfo.reserveDate') }}</span>
          <span>{{ order.reserveTime }}</span>
        </p>
        <p class="flex justify-between text-sm text-[14px] py-[5px]">
          <span>{{ $t('orderInfo.venue') }}</span>
          <span>{{ order.vid }}</span>
        </p>
        <p class="flex justify-between text-sm text-[14px] py-[5px]">
          <span>{{ $t('orderInfo.session') }}</span>
          <span>{{ order.sid }}</span>
        </p>
        <p class="flex justify-between text-sm text-[14px] py-[5px]">
          <span>{{ $t('orderInfo.timeSlot') }}</span>
          <span>{{ order.time }}</span>
        </p>
        <p class="flex justify-between text-sm text-[14px] py-[5px]">
          <span>{{ $t('orderInfo.type') }}</span>
          <span>{{ order.type }}</span>
        </p>
        <p class="flex justify-between text-sm text-[14px] py-[5px]">
          <span>{{ $t('orderInfo.amount') }}</span>
          <span>{{ order.realAmount }}</span>
        </p>
      </div>

      <!-- Discount Info -->
      <div class="border-t pt-4">
        <h2 class="font-bold text-sm mb-2">{{ $t('orderInfo.title') }}</h2>
        <p class="flex justify-between text-sm text-[14px] py-[5px]">
          <span>{{ $t('orderInfo.yhContent') }}</span>
          <span>{{ order.isDis }}</span>
        </p>
        <p class="flex justify-between text-sm text-[14px] py-[5px]">
          <span>{{ $t('orderInfo.yhAmount') }}</span>
          <span>{{ order.disAmount || 0 }}</span>
        </p>
      </div>

      <!-- Execution Status -->
      <div class="border-t pt-4">
        <p class="flex justify-between text-sm text-[14px] py-[5px]">
          <span>{{ $t('executionStatus.time') }}</span>
          <span>
            {{ execution.completeTime }}
          </span>
        </p>
        <p class="flex justify-between text-sm text-[14px] py-[5px]">
          <span>{{ $t('orderInfo.zxStatus') }}</span>
          <span v-if="order.finalStatus == 1">{{ $t('order.nav2') }}</span>
          <span v-if="order.finalStatus == 2">{{ $t('order.nav3') }}</span>
          <span v-if="order.finalStatus == 3">{{ $t('order.disputed') }}</span>
          <span v-if="order.finalStatus == 0">{{ $t('order.nav4') }}</span>
        </p>
      </div>
    </div>

    <!-- Buttons -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';  // 引入 Vue 3 的 Composition API
import { useRoute, useRouter } from 'vue-router';  // 导入 useRoute 和 useRouter 钩子
import { getDispose } from '@/api/order/index';  // 导入接口方法

// 路由实例
const router = useRouter();
const route = useRoute();

// 响应式数据
const order = ref({});

const discount = ref({
  details: "无",
  amount: "无",
});

const execution = ref({
  status: "待执行",
});

// 获取处理数据的方法
const getDisposeData = (val) => {
  const params = {
    id: order.value.id,
    finalStatus: val,
  };
  getDispose(params).then(res => {
    if (res.code == 200) {
      goBack();
    }
  });
};

// 路由跳转到详情页
const goBack = () => {
  console.log("Go back");
  router.back();  // 使用 router.back() 实现返回
};

// 执行操作
const execute = (val) => {
  getDisposeData(val)
};

// 组件挂载时执行操作
onMounted(() => {
  const serializedVal = route.query.val;
  if (serializedVal) {
    try {
      order.value = JSON.parse(serializedVal);  // 解析为原始对象
      console.log(order.value);
    } catch (e) {
      console.error('Invalid JSON data:', e);
    }
  }
});
</script>


<style>
/* Optional custom styles */
</style>