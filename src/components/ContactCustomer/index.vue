<template>
    <van-nav-bar fixed placeholder @click-left="goBack">
        <template #left>
            <van-icon size="20" color="#ccc" name="arrow-left" />
            <div class="text-lg font-semibold">{{$t('login.contactService')}}</div>
        </template>
        <template #right>

        </template>
    </van-nav-bar>
    <div>
        <div class="max-w-md mx-auto bg-white rounded-lg p-4">
            <div class="space-y-4">
                <ContactCard service="MOMO" id="MOMO" name="name" />
                <ContactCard service="ZALO" id="ZALO" name="name" />
                <ContactCard service="TG" id="TG" name="name" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const goBack = () => {
    router.back();  // 使用 router.back() 实现返回
};
</script>

<style scoped>
/* Add any additional styling here if needed */
</style>