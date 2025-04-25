<template>
    <van-nav-bar fixed placeholder @click-left="onClickLeft">
        <template #left>
            <van-icon size="20" color="#ccc" name="arrow-left" />
            <div class="text-lg font-semibold">{{ $t('creaSite.addSite') }}</div>
        </template>
    </van-nav-bar>
    <div class="flex items-center justify-center bg-[#fff]">
        <div class="w-full max-w-lg">
            <!-- 设置场地照片 -->
            <div class="w-full font-bold bg-[#fff]">
                <div class="w-full p-2 text-[#000] flex items-center justify-between">
                    <span class="border-l-4 border-white pl-2">{{ $t('creaSite.setSitePhoto') }}</span>
                    <!-- <span> -->
                    <!-- <van-uploader :after-read="afterRead">
                            <van-icon name="plus" />
                        </van-uploader> -->
                    <!-- </span> -->
                </div>
                <div v-if="imgList.length == 0"
                    class=" flex bg-[#F1EFEF] m-auto w-[90%] rounded-[10px] justify-center items-center h-[150px]">
                    <van-uploader :after-read="afterRead"></van-uploader>
                </div>
                <div class="flex justify-center items-center h-[150px] mt-[10px]" v-if="imgList.length > 0">
                    <van-swipe class="bg-[#F1EFEF] rounded-[10px] w-[90%] h-[170px]" autoplay="3000">
                        <van-swipe-item class="w-full h-40 flex items-center justify-center"
                            v-for="(item, index) in imgList" :key="item.name">
                            <img :src="item.url" class="w-full h-full">
                            <!-- 删除按钮 -->
                            <van-icon class="dele" name="delete" size="18" @click="deleteImage(index)" />
                        </van-swipe-item>
                    </van-swipe>
                </div>

            </div>

            <!-- 编辑场地资料 -->
            <div class=" w-full mt-[20px] font-bold p-2 text-[#000] flex items-center justify-between">
                <span class="border-l-4 border-white pl-2">{{ $t('creaSite.editSiteInfo') }}</span>
            </div>
            <div class="bg-[#fff] p-4">
                <div class="flex flex-col">
                    <div class="min-w-[80px]">{{ $t('creaSite.siteNumber') }}</div>
                    <el-input type="number" min="1" max="99" v-model="venueObj.num"
                        :placeholder="$t('creaSite.completeNumber')" />
                </div>
            </div>

            <!-- 场地材质 -->
            <div class="w-full shadow-md p-2 font-bold text-[#000] flex items-center justify-between">
                <span class="border-l-4 border-white pl-2">{{ $t('creaSite.siteEnvironment') }}</span>
            </div>
            <div class="bg-[#fff] p-2 text-[12px]">
                <div class="flex items-center">
                    <div class="px-4 py-1 border rounded mx-[5px]"
                        :class="{ 'border-blue-500 text-blue-500': item.value === venueObj.env }" v-for="item in item1"
                        :key="item.value" @click="setEnv(item.value)">{{ item.label }}</div>
                </div>
            </div>

            <!-- 场地规格 -->
            <div class="bg-[#fff] w-full font-bold p-2 text-[#000] flex items-center justify-between">
                <span class="border-l-4 border-white pl-2">{{ $t('creaSite.siteMaterial') }}</span>
            </div>
            <div class="bg-[#fff] px-4 text-[12px]">
                <div class="flex items-center">
                    <div class="px-1 py-1 flex justify-center items-center border rounded mr-[10px]"
                        v-for="item in item2" :key="item"
                        :class="{ 'border-blue-500 text-blue-500': item.value === venueObj.turf }"
                        @click="setTurf(item.value)">{{ item.label }}</div>
                </div>
            </div>

            <!-- 场地规格 -->
            <div class=" w-full  p-2 text-[#000] flex items-center justify-between">
                
                <span class="border-l-4 font-bold border-white pl-2">{{ $t('creaSite.siteSpecification') }}</span>
            </div>
            <div class="px-4 text-[12px]">
                <div class="flex items-center">
                    <div class="px-1 py-1 flex justify-center items-center border rounded mx-[5px]"
                        v-for="item in item3" :key="item"
                        :class="{ 'border-blue-500 text-blue-500': item.value === venueObj.standard }"
                        @click="setStandard(item.value)">{{ item.label }}</div>
                </div>
                <div class="flex items-center mt-[10px]">
                    <div class="flex items-center">
                        <div class="mr-[10px]">{{ $t('creaSite.length') }}</div>
                        <el-input type="text" v-model="venueObj.length" :placeholder="$t('creaSite.enter')"/>
                    </div>
                    <div class="flex items-center">
                        <div class="mr-[10px]">{{ $t('creaSite.width') }}</div>
                        <el-input type="text" v-model="venueObj.width" :placeholder="$t('creaSite.enter')"/>
                    </div>
                </div>
            </div>

            <div class=" w-full font-bold p-2 text-[#000] flex items-center justify-between">
                <span class="border-l-4 border-white pl-2">{{ $t('creaSite.siteTimeAndPrice') }}</span>
                <span class="text-[16px] font-bold flex justify-between">
                    <van-icon name="plus" @click="addSchedule" />
                </span>
            </div>
            <div class="bg-[#fff] px-4 mb-[50px]">
                <div v-for="(schedule, index) in schedules" :key="index" class="flex items-center">
                    <span class="mr-2">{{ index + 1 }}</span>
                    <el-input type="text" v-model="schedule.begin" @click="openTimePicker('begin', index)"/>
                    <span class="mr-2">Đến</span>
                    <el-input type="text" v-model="schedule.end" @click="openTimePicker('end', index)"/>
                    <span class="mr-2">d</span>
                    <el-input type="number" v-model="schedule.price" />
                    <van-icon name="delete-o" size="24px" @click="removeSchedule(index)"/>
                </div>
            </div>
        </div>
    </div>
    <div class="w-[95%] m-auto pb-[30px]">
        <van-button  @click="setAdd" class="w-full" type="primary">{{ $t('commn.confirm') }}</van-button>
    </div>
    <!-- 时间选择弹框 -->
    <van-popup v-model:show="showBottom" position="bottom" :style="{ height: '50%' }">
        <van-time-picker @cancel="showBottom = false" @confirm="confirmTime" :columns-type="['hour', 'minute']"
            min-time="00:00" max-time="23:59" v-model="currentTime" title="选择时间" />
    </van-popup>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { ref, reactive, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getHsSiteInfo, venueSiteEdit } from '@/api/venue/index';
import { upload } from '@/api/home/index'
import { showToast } from 'vant';
const { t } = useI18n()

const route = useRoute();
const router = useRouter();

// 定义响应式数据
const venueObj = ref({
    num: null,
    photos: null,
    env: null,
    turf: null,
    standard: null,
    length: null,
    width: null,
    sellTime: null,
    sitePrices: []
});
const item1 = ref([{ label: t('commn.indoor'), value: 0 }, { label: t('commn.outdoor'), value: 1 }])
const item2 = ref([{ label: t('commn.naturalGrass'), value: 1 }, { label: t('commn.artificialGrass'), value: 2 }, { label: t('commn.compositeFloor'), value: 3 }, { label: t('commn.others'), value: 0 }])
const item3 = ref([{ label: t('commn.fiveAside'), value: 5 }, { label: t('commn.sevenAside'), value: 7 }, { label: t('commn.elevenAside'), value: 11 }, { label: t('commn.others'), value: 0 }])
const schedules = ref([
    { begin: '12:00', end: '13:00', price: '' },
]);
const showBottom = ref(false); // 弹框显示
const currentTime = ref([]); // 当前选中的时间
const currentField = ref(''); // 当前选中的时间字段 ('begin' 或 'end')
const currentIndex = ref(null); // 当前编辑的索引

// 打开时间选择弹框
const openTimePicker = (field, index) => {
    currentField.value = field;
    currentIndex.value = index;
    showBottom.value = true;
};

// 确认时间选择
const confirmTime = () => {
    if (currentField.value === 'begin') {
        console.log(currentTime.value)
        schedules.value[currentIndex.value].begin = `${currentTime.value[0]}:${currentTime.value[1]}`;
    } else if (currentField.value === 'end') {
        schedules.value[currentIndex.value].end = `${currentTime.value[0]}:${currentTime.value[1]}`;
    }
    showBottom.value = false; // 关闭弹框
};
// 路由跳转
const onClickLeft = () => {
    router.back();
};

// 添加时间段
const addSchedule = () => {
    schedules.value.push({ begin: '', end: '', price: '' });
};

// 删除时间段
const removeSchedule = (index) => {
    if (schedules.value.length > 1) {
        schedules.value.splice(index, 1);
    }
};
// 上传图片的逻辑
const imgList = ref([])
const afterRead = (file) => {
    // 你可以将文件上传到服务器，或者进行其他操作
    upload(file).then(res => {
        if (res.code == 200) {
            imgList.value.push(res.data)
        }
    })
};
//删除图片按钮
const deleteImage = (index) => {
    imgList.value.splice(index, 1);
}

const setEnv = (value) => {
    venueObj.value.env = value;
};

const setTurf = (value) => {
    venueObj.value.turf = value;
};
const setStandard = (value) => {
    venueObj.value.standard = value;
};
const getHsSiteInfoData = (id) => {
    getHsSiteInfo(id).then(res => {
        if(res.code == 200){
            venueObj.value = {...res.data}
            schedules.value = res.data.sitePrices
            imgList.value = res.data.photos ? JSON.parse(res.data.photos) : []
        }
    })
}
// 添加操作
const setAdd = () => {
    // 表单验证
    console.log(venueObj.value)
    venueObj.value.sitePrices = schedules
    venueObj.value.photos = JSON.stringify(imgList.value)
    if (!venueObj.value.num) {
        showToast('Vui lòng điền đầy đủ thông tin');
        return;
    }

    if (!venueObj.value.photos || venueObj.value.photos === '[]') {
        showToast('Vui lòng điền đầy đủ thông tin');
        return;
    }

    if (venueObj.value.env !== 0 && venueObj.value.env !== 1) {
        showToast('Vui lòng điền đầy đủ thông tin');
        return;
    }

    if (!venueObj.value.turf) {
        showToast('Vui lòng điền đầy đủ thông tin');
        return;
    }

    if (!venueObj.value.standard) {
        showToast('Vui lòng điền đầy đủ thông tin');
        return;
    }

    if (!venueObj.value.length || !venueObj.value.width) {
        showToast('Vui lòng điền đầy đủ thông tin');
        return;
    }

    venueSiteEdit(venueObj.value).then(res => {
        // 处理添加操作
        if (res.code == 200) {
            onClickLeft()
            showToast('Chỉnh sửa thành công');
        }
    });
};
watch(
    () => venueObj.value.num, // 监听 venueObj.num
    (newVal) => {
        if (newVal < 1) {
            venueObj.value.num = null;
        } else if (newVal > 99) {
            venueObj.value.num = 99;
        }
    }
);
onMounted(() => {
    console.log(route.query.id)
    const id = Number(route.query.id);
    getHsSiteInfoData(id)
})
</script>


<style scoped>
/* 可以在这里添加自定义样式 */
.dele {
    position: absolute;
    top: 5px;
    right: 5px;
    color: #000;
}
</style>