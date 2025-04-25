<template>
    <div class="flex flex-col items-center justify-center">
        <van-nav-bar fixed placeholder class="home" @click-left="onClickLeft">
            <template #left>
                <div class="flex items-center">
                    <van-icon name="arrow-left" size="24" color="#333" />
                    <span> Chỉnh sửa thông tin</span>
                </div>
            </template>
        </van-nav-bar>
        <!-- Avatar Section -->
        <div class="w-full max-w-md bg-white">
            <div class="flex flex-col items-center p-4">
                <!-- Current Avatar -->
                <div class="relative w-32 h-32 mb-4">
                    <img :src="avatarUrl" alt="Avatar" class="w-full h-full rounded-full border-4 border-blue-500"
                        v-if="avatarUrl" />
                    <div v-else class="w-full h-full rounded-full border-4 border-blue-500"></div>
                </div>
                <!-- Upload Button -->
                <van-uploader :after-read="afterRead">
                    <van-button type="primary" class="px-4 py-2">
                        Tải ảnh lên
                    </van-button>
                </van-uploader>
            </div>
            <!-- Avatar Carousel -->
            <div class="p-3">
                <div
                    class="flex items-center justify-start w-full space-x-2 overflow-x-auto p-2 bg-white rounded-lg scrollbar-hide">
                    <div v-for="(i, index) in defaultAvatarList" :key="index" @click="setDefaultImg(i.image)"
                        class="w-16 h-16 flex-shrink-0  rounded-full">
                        <img :src="i.image" alt="Avatar" class="w-full h-full rounded-full" />
                    </div>
                </div>
            </div>


            <!-- Previously Used Avatars -->
            <h2 class="text-lg font-bold text-gray-800 pt-4 px-4">
                Ảnh đại diện đã sử dụng
            </h2>
            <div class="grid grid-cols-5 gap-4 p-4">
                <div v-for="i in dataList" :key="i" class="w-[60px] h-[60px] overflow-hidden rounded-[50%]"
                    @click="setImg(i.image)">
                    <img :src="i.image" alt="Avatar" class="object-cover w-full h-full" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getHisAvatar, uploadAvatar, setInfo, defaultAvatar } from '@/api/mock/index'
const router = useRouter();

const onClickLeft = () => {
    router.back();
}

const dataList = ref([])
const getAvatar = () => {
    getHisAvatar().then(res => {
        dataList.value = res.data
    })
}
const afterRead = (file) => {
    console.log(file)
    // 你可以将文件上传到服务器，或者进行其他操作
    uploadAvatar(file).then(res => {
        if (res.code == 200) {
            getSetInfo()
        }
    })
};

const avatarUrl = ref('')
const getSetInfo = () => {
    setInfo().then(res => {
        if (res.code == 200) {
            if (res.data) {
                avatarUrl.value = res.data.logo;
                getAvatar()
            } else {
                avatarUrl.value = defaultAvatarList.value[0].image;
            }
        }
    });
};


const defaultAvatarList = ref([])
const getdefaultAvatar = () => {
    defaultAvatar().then(res => {
        if (res.code == 200) {
            defaultAvatarList.value = res.data;
            getSetInfo()
            getAvatar()
        }
    });
}
const setDefaultImg = (img) => {
    setImg(img)
}
const setImg = (img) => {
    let params = {
        logo: img
    }
    setInfo(params).then(res => {
        if (res.code == 200) {
            avatarUrl.value = res.data.logo;
        }
    });
}
onMounted(() => {
    getdefaultAvatar()

})
</script>

<style scoped>
/* 在全局 CSS 文件中添加 */
.scrollbar-hide {
    -ms-overflow-style: none;
    /* IE 和 Edge */
    scrollbar-width: none;
    /* Firefox */
}

.scrollbar-hide::-webkit-scrollbar {
    display: none;
    /* Chrome、Safari 和 Opera */
}
</style>