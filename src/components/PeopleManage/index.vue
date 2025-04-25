<template>
    <van-nav-bar fixed placeholder @click-left="onClickLeft">
        <template #left>
            <van-icon size="20" color="#ccc" name="arrow-left" />
            <div class="text-lg font-semibold">{{ $t('peopleManage.title') }}</div>
        </template>
    </van-nav-bar>
    <div class="max-w-md mx-auto bg-white rounded-lg">
        <p class="text-xs text-gray-500 p-4">
            {{ $t('peopleManage.description') }}
        </p>
        <div class="w-full shadow-md p-2 text-[#000] flex items-center justify-between">
            <span class="border-l-4 border-white pl-2">{{ $t('peopleManage.createGroup') }}</span>
            <div><van-icon name="add" color="#0572e3" /></div>
        </div>
        <van-collapse v-model="activeNames">
            <van-collapse-item :title="$t('peopleManage.sales')" name="sales">
                <div class="flex justify-between items-center mb-2">
                    <div class="flex items-center">
                        <span class="material-icons text-gray-600"><van-icon name="delete-o" /></span>
                        <span class="ml-2 text-blue-500 cursor-pointer">{{ $t('peopleManage.addEmployee') }}</span>
                    </div>
                    <span>{{ $t('peopleManage.employeeCount', { count: 2 }) }}</span>
                </div>
                <div class="border-t py-2">
                    <div class="flex justify-between items-center py-2">
                        <span>isport666</span>
                        <div class="flex space-x-4">
                            <button class="text-blue-500">{{ $t('peopleManage.password') }}</button>
                            <button class="text-blue-500">{{ $t('peopleManage.permissions') }}</button>
                            <button class="text-blue-500">{{ $t('peopleManage.disable') }}</button>
                        </div>
                    </div>
                    <div class="flex justify-between items-center py-2">
                        <span>isport777</span>
                        <div class="flex space-x-4">
                            <button class="text-blue-500">{{ $t('peopleManage.password') }}</button>
                            <button class="text-blue-500">{{ $t('peopleManage.permissions') }}</button>
                            <button class="text-blue-500">{{ $t('peopleManage.disable') }}</button>
                        </div>
                    </div>
                </div>
            </van-collapse-item>
            <van-collapse-item :title="$t('peopleManage.support')" name="support">
                <div class="flex justify-between items-center mb-2">
                    <div class="flex items-center">
                        <span class="material-icons text-gray-600"><van-icon name="delete-o" /></span>
                        <span class="ml-2 text-blue-500 cursor-pointer">{{ $t('peopleManage.addEmployee') }}</span>
                    </div>
                    <span>{{ $t('peopleManage.employeeCount', { count: 1 }) }}</span>
                </div>
                <div class="border-t py-2">
                    <div class="flex justify-between items-center py-2">
                        <span>isport888</span>
                        <div class="flex space-x-4">
                            <button class="text-blue-500">{{ $t('peopleManage.password') }}</button>
                            <button class="text-blue-500">{{ $t('peopleManage.permissions') }}</button>
                            <button class="text-blue-500">{{ $t('peopleManage.disable') }}</button>
                        </div>
                    </div>
                </div>
            </van-collapse-item>
        </van-collapse>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const activeNames = ref([])
const onClickLeft = () => {
    router.back();
}
</script>

<style scoped>
.material-icons {
    font-size: 24px;
}
</style>