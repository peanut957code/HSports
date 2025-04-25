<template>
    <div class="min-h-screen p-2">
        <van-cell-group :border="false">
            <div class="px-[10px] pb-[20px]">
                <div class="flex justify-between my-[10px]">
                    <span>
                        <van-icon @click="doSth" name="arrow-left" size="24" />
                    </span>
                    <!-- <div class="flex justify-end">
                        <img class="w-[20px] h-[20px] mx-[5px]" src="../../assets/nav1.png" alt="">
                        <img class="w-[20px] h-[20px] mx-[5px]" @click="changeLanguages" src="../../assets/nav2.png" alt="">
                        <img class="w-[20px] h-[20px] mx-[5px]" src="../../assets/nav3.png" alt="">
                        <img class="w-[20px] h-[20px] mx-[5px]" @click="goToUrl('contactCustomer')" src="../../assets/nav4.png" alt="">
                    </div> -->
                </div>
                <div class="flex items-center w-full justify-between">
                    <div class="w-[40px] h-[40px] relative rounded-full  border-2 border-[#404040]" @click="goToUrl('editAvatar')">
                        <img class="absolute z-10 right-[0px]" src="../../assets/right.png" alt="">
                        <img class="min-w-[37px] h-full rounded-[50%]" :src="obj.logo" alt="">
                    </div>
                    <span class="text-[17px]">{{ obj.name }}</span>
                    <!-- <div class="ml-auto">
                        <van-icon size="24px" name="edit" @click="goToUrl('editAvatar')" />
                    </div> -->
                </div>
                <div class="flex justify-between items-center py-[10px]">
                    <div class="flex justify-between w-full">
                        <span class="text-[#FFA500] rounded px-3  mr-3 flex justify-center items-center"></span>
                        <div>
                            <div class=" flex flex-col items-end">
                                <span class="text-[#9a9a9a] text-[12px]">{{ $t('home.balance') }}:</span>
                                <span class="text-[#000] text-[14px]">{{ obj.otherIncome || 0 }}</span>
                            </div>
                            <div class="flex text-[12px] justify-end">
                                <div class="text-[#9a9a9a]">
                                    <van-icon name="photograph" />
                                    ({{ obj.freezeAmount || 0 }})
                                </div>
                            </div>
                        </div>
                    </div>
                    <div></div>
                </div>
                <!-- Progress Bar -->
                <div class="relative w-full h-2 mt-4 bg-gray-300 rounded-full overflow-hidden shadow-lg">
                    <!-- Shadow -->
                    <div class="absolute inset-0  bg-gray-100"></div>
                    <!-- Progress -->
                    <div class="relative z-10 h-full bg-gradient-to-r bg-[#fbe109] rounded-full"
                        style="width: 75%; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    </div>
                </div>
            </div>
            <van-cell-group :border="false">
                <div class="ml-[10px] mt-[10px] text-[12px] text-[#ccc]">{{ $t('sideBar.management') }}</div>
                <van-cell :border="false" :title="$t('sideBar.staffManagement')" @click="goToUrl()"
                    is-link>
                    <template #icon>
                        <img class="w-[24px] h-[24px]" src="../../assets/tab/1.png" alt="">
                    </template>
                </van-cell>
                <van-cell :border="false" :title="$t('sideBar.venueManagement')" @click="goToUrl('siteManage')" is-link>
                    <template #icon>
                        <img class="w-[24px] h-[24px]" src="../../assets/tab/2.png" alt="">
                    </template>
                </van-cell>
                <van-cell :border="false" :title="$t('sideBar.adManagement')" is-link @click="goToUrl()">
                    <template #icon>
                        <img class="w-[24px] h-[24px]" src="../../assets/tab/3.png" alt="">
                    </template>
                </van-cell>
                <van-cell :border="false" :title="$t('sideBar.insuranceManagement')" is-link @click="goToUrl()">
                    <template #icon>
                        <img class="w-[24px] h-[24px]" src="../../assets/tab/4.png" alt="">
                    </template>
                </van-cell>
                <van-cell :border="false" :title="$t('sideBar.discountManagement')" is-link @click="goToUrl()">
                    <template #icon>
                        <img class="w-[24px] h-[24px]" src="../../assets/tab/5.png" alt="">
                    </template>
                </van-cell>
                <van-cell :border="false" :title="$t('sideBar.financialManagement')" @click="goToUrl()"
                    is-link>
                    <template #icon>
                        <img class="w-[24px] h-[24px]" src="../../assets/tab/6.png" alt="">
                    </template>
                </van-cell>
                <van-cell :border="false" :title="$t('sideBar.reviewManagement')" is-link @click="goToUrl()">
                    <template #icon>
                        <img class="w-[24px] h-[24px]" src="../../assets/tab/7.png" alt="">
                    </template>
                </van-cell>
            </van-cell-group>
            <van-cell-group :border="false">
                <div class="ml-[10px] mt-[10px] text-[12px] text-[#ccc]">{{ $t('sideBar.systemSettings') }}</div>
                <van-cell :border="false" :title="$t('sideBar.notificationSettings')" @click="goToUrl('notifyManage')"
                    is-link>
                    <template #icon>
                        <img class="w-[24px] h-[24px]" src="../../assets/tab/8.png" alt="">
                    </template>
                </van-cell>
                <van-cell :border="false" :title="$t('sideBar.versionInfo')" is-link>
                    <template #icon>
                        <img class="w-[24px] h-[24px]" src="../../assets/tab/9.png" alt="">
                    </template>
                    <template #right-icon>
                        <span class="text-red-500">•</span>
                    </template>
                </van-cell>
            </van-cell-group>
            <van-cell :border="false">
                <template #icon>
                    <img class="w-[24px] h-[24px]" src="../../assets/tab/10.png" alt="">
                </template>
                <template #title>
                    <div class="flex justify-between w-full">
                        <div class="text-left" @click="logut">{{ $t('sideBar.logout') }}</div>
                        <div class="text-[12px] max-w-[100px]">{{ name }}</div>
                    </div>
                </template>
            </van-cell>
        </van-cell-group>
    </div>
</template>

<script setup name="sideBar">
const props = defineProps({
    obj: Object,
});
import { showToast } from 'vant';
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'; 
const { t, locale } = useI18n();
const router = useRouter()
const name = localStorage.getItem('username')
import { changeLanguage } from '../../language/index';
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

const emit = defineEmits(["doSth"]);
const doSth = () => {
    emit('doSth');
}

const changeLanguages = () =>{
    let lang = localStorage.getItem('language')
    if(lang){
        if(lang == 'zh'){
            locale.value = 'vi'
            changeLanguage('vi')
        }else{
            locale.value = 'zh'
            changeLanguage('zh')
        }
    }else{
        locale.value = 'vi'
        changeLanguage('vi')
    }
    console.log(lang)
}

const logut = () => {
    localStorage.removeItem('token')
    router.push({ name: 'login' })
}
</script>

<style scoped>
/* Add any additional styling here if needed */
:deep(.van-cell__title) {
    display: flex;
    align-items: center;
}
</style>