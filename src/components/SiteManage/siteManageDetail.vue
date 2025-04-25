<template>
    <div class="h-screen">
        <div class="container mx-auto bg-white  rounded-lg">
            <div class=" absolute top-[10px] left-[10px] z-10">
                <van-icon name="arrow-left" size="28" color="#e5e7eb" @click="onClickLeft" />
            </div>
            <div class="w-full p-4">
                <van-swipe class="rounded w-full h-[150px]" autoplay="3000">
                    <van-swipe-item class="w-full h-40 flex items-center justify-center">
                        <img :src="obj.photos" alt="">
                    </van-swipe-item>
                </van-swipe>
            </div>

            <div class="flex  px-4">
                <div class="w-[40px] h-[40px] relative z-[1]">
                    <span
                        class="text-sm text-gray-600 w-full h-full overflow-hidden bg-gray-200 rounded-full flex items-center justify-center">
                        <img :src="obj.logo" alt="" class="min-w-[30px] h-full object-cover">
                    </span>
                </div>
                <div class="ml-[10px] font-bold text-[13px]"> {{ obj.fullName }}</div>
            </div>
            <div class="mt-[10px] text-[12px] text-[#ccc]  px-4">{{ obj.notice }}</div>
            <div class="flex items-center mt-[5px] justify-between p-2">
                <div class="flex items-center justify-center">
                    <van-icon class="mr-[5px]" color="#000" name="location" size="18" />
                    <div class="text-[12px] text-[#333]">{{ obj.addressStr }}{{ obj.addressCode }}{{ obj.addressExpand
                        }}
                    </div>
                </div>
                <div>
                    <img src="../../assets/location.png" class="w-[18px]" alt="">
                </div>
            </div>
            <div class="flex items-center mt-[5px] justify-between p-2">
                <div class="flex text-[12px] items-center text-[#333]"><van-icon color="#000" name="phone-circle"
                        size="18" class="mr-[5px]" />
                    {{ obj.phone }}</div>
                <van-button type="primary" size="mini"> Gọi điện</van-button>
            </div>
            <div class="flex items-center mt-[5px] justify-between p-2">
                <div class="flex text-[12px] items-center text-[#333]"><van-icon color="#000" name="comment-circle"
                        size="18" class="mr-[5px]" />
                    {{ obj.email }}</div>
                <van-button type="primary" size="mini">Gửi email</van-button>
            </div>
            <div class="p-[10px] flex flex-col justify-between">
                <div class="mt-2 text-[#000] font-bold">Cơ sở vật chất</div>
                <div class="flex items-center mt-[10px]">
                    <div v-for="item in (obj.installation ? obj.installation.split(',') : [])" class="w-[80px] h-[80px] mx-[5px] rounded-[10px] flex justify-center items-center border border-[#DEDEDE]">
                        <img class="w-[25px] h-[25px] mx-[5px]"  :src="getImagePath(item)">
                    </div>
                </div>
            </div>
        </div>
        <div class="p-[10px]">
            <span class="mt-2 font-bold text-[#000]">Sân</span>
        </div>
        <div class="px-[18px] pt-[10px] pb-[50px]">
            <CourtCard :dataList="dataList"></CourtCard>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { list } from '@/api/venue/index'
import { setInfo } from '@/api/mock/index'
import CourtCard from '../../views/site/courtCard.vue';
import { ref, onMounted } from 'vue';
const router = useRouter();
const onClickLeft = () => {
    router.back();
}
const dataList = ref([])
const getList = () => {
    list().then(res => {
        dataList.value = res.data
    })
}
const obj = ref({})
const getSetInfo = () => {
    setInfo().then(res => {
        if (res.code == 200) {
            obj.value = res.data
        }
    })
}

const getImagePath = (item) => {
    // 动态获取图片路径
    try {
        return new URL(`../../assets/${item}.png`, import.meta.url).href;
    } catch (error) {
        console.error(`图片加载失败: ${item}`, error);
        return ''; // 返回空路径以防止错误
    }
}
onMounted(() => {
    getList()
    getSetInfo()
})
</script>

<style scoped>
/* 其他样式可以在这里添加 */
.items {
    border-radius: 20px;
    /* 圆角半径 */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    /* 阴影效果 */
}

.bg-btn {
    background-image: url('../../assets/bg-btn.png');
    background-repeat: no-repeat;
    text-align: center;
    color: #fff;
}
</style>