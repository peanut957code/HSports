<template>
    <div class="p-2 flex z-10 justify-between items-center font-bold fixed bg-[#fff] w-full h-[50px]">
        <div @click="onClickLeft" class="flex items-center">
            <van-icon size="20" color="#ccc" name="arrow-left" />
            <div class="text-lg font-semibold">{{ $t('siteManage.header') }}</div>
        </div>
        <!-- <span>
            <van-icon size="20" color="#000" name="pending-payment" @click="getSetInfo" />
        </span> -->
    </div>
    <div class="pt-[40px]">
        <!-- 上传图片区域 -->
        <div class="bg-white p-4 rounded-lg">
            <label class="block font-bold text-gray-700 mb-2">{{ $t('siteManage.title1') }}</label>
            <div class="flex">
                <div v-if="infoObj.photos" >
                    <img class="w-[80px] h-[80px] rounded-[10px]" :src="infoObj.photos" alt="">
                </div>
                <van-uploader class="ml-[10px]" :after-read="afterRead"></van-uploader>
            </div>
        </div>
        <div class="bg-white px-4 rounded-lg mb-4">
            <el-form ref="infoObjRef" :model="infoObj" :rules="rules" label-position="top">
                <label class="block font-bold text-gray-700 mb-2">{{ $t('siteManage.title2') }}</label>
                <!-- 场馆名称 -->
                <el-form-item :label="$t('siteManage.fullName')" prop="fullName">
                    <el-input :placeholder="$t('siteManage.fullNamePlaceholder')" v-model="infoObj.fullName" />
                </el-form-item>
                <el-form-item :label="$t('siteManage.simpleName')" prop="simpleName">
                    <el-input :placeholder="$t('siteManage.simpleNamePlaceholder')" v-model="infoObj.simpleName" />
                </el-form-item>
                <el-form-item :label="$t('siteManage.phone')" prop="phone">
                    <el-input :placeholder="$t('siteManage.phonePlaceholder')" v-model="infoObj.phone" />
                </el-form-item>
                <el-form-item :label="$t('siteManage.email')" prop="email">
                    <el-input :placeholder="$t('siteManage.emailPlaceholder')" v-model="infoObj.email" />
                </el-form-item>
                <!-- 所在省份 -->
                <el-form-item :label="$t('siteManage.addressStr')" prop="addressStr">
                    <el-input @focus="showProvincePicker = true" v-model="infoObj.addressStr" />
                </el-form-item>
                <el-form-item :label="$t('siteManage.addressCode')" prop="addressCode">
                    <el-input @focus="showCityPicker = true" v-model="infoObj.addressCode" />
                </el-form-item>
                <!-- 详细地址 -->
                <el-form-item :label="$t('siteManage.addressExpand')" prop="addressExpand">
                    <el-input :rows="4" type="textarea" :placeholder="$t('siteManage.addressExpandPlaceholder')"
                        v-model="infoObj.addressExpand" />
                </el-form-item>
            </el-form>
        </div>
        <!-- 配套设施 -->
        <div class="bg-white p-4 rounded-lg mb-4">
            <label class="block font-bold text-gray-700 mb-2">{{ $t('siteManage.title3') }}</label>
            <div class="flex">
                <div class="flex w-full justify-between" v-for="(item, index) in images" :key="index"
                    @click="toggleImage(index)">
                    <div :class="[item.active ? 'border border-[#292929]' : 'border border-[#DEDEDE]']"
                        class="w-[80px] h-[80px] rounded-[10px] flex justify-center items-center relative">
                        <van-icon name="checked" :color="item.active ? '#0572E3' : '#F0F1F3'"
                            style="position: absolute;top: 0;right:0" />
                        <img :src="item.activeSrc" class="w-[35px] h-[35px]" alt="">
                    </div>
                </div>
            </div>
        </div>

        <!-- 场馆公告 -->
        <div class="bg-white p-4 rounded-lg mb-4">
            <label class="block font-bold text-gray-700 mb-2">{{ $t('siteManage.title4') }}</label>
            <el-input v-model="infoObj.notice" :rows="4" type="textarea" maxlength="200"
                :placeholder="$t('siteManage.remarkPlaceholder')" />
        </div>

        <!-- 提交按钮 -->
        <div class="flex  justify-between mx-[10px] pb-[100px]">
            <van-button @click="onClickRight" class="w-[47%]">
                {{ $t('commn.yulan') }}
            </van-button>
            <van-button type="primary" @click="getSetInfo" class="w-[47%]">
                {{ $t('commn.confirm') }}
            </van-button>
        </div>

        <van-popup v-model:show="showProvincePicker" position="bottom" :style="{ height: '50%' }">
            <van-picker v-model="provinceValue" :confirm-button-text="$t('commn.confirm')"
                :cancel-button-text="$t('commn.cancel')" :columns="provinceColumns" @confirm="onProvinceConfirm"
                @cancel="onCancel" @change="onProvinceChange" />
        </van-popup>

        <!-- 市选择弹窗 -->
        <van-popup v-model:show="showCityPicker" position="bottom" :style="{ height: '50%' }">
            <van-picker v-model="cityValue" :confirm-button-text="$t('commn.confirm')"
                :cancel-button-text="$t('commn.cancel')" :columns="cityColumns" @confirm="onCityConfirm"
                @cancel="onCancel" />
        </van-popup>
        <!-- <div class="text-center text-gray-500 py-4">------ 没有更多 ------</div> -->
    </div>
</template>

<script setup name="SiteManage">
import { onMounted, ref, watch, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { setInfo } from '@/api/mock/index';
import { upload } from '@/api/home/index';
import { showToast } from 'vant';
import img1 from '../../assets/1.png';
import img2 from '../../assets/2.png';
import img3 from '../../assets/3.png';
import img4 from '../../assets/4.png';
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();

const router = useRouter();
const provinceValue = ref([]);
const cityValue = ref([]);
const showProvincePicker = ref(false);
const showCityPicker = ref(false);
const columns = ref([
    {
        province: "Hà Nội",
        cities: [
            "Ba Đình",
            "Hoàn Kiếm",
            "Tây Hồ",
            "Long Biên",
            "Cầu Giấy",
            "Đống Đa",
            "Hai Bà Trưng",
            "Hà Đông",
            "Thanh Xuân"
        ]
    },
    {
        province: "Hồ Chí Minh",
        cities: [
            "Quận 1",
            "Quận 3",
            "Quận 5",
            "Quận 7",
            "Quận 10",
            "Tân Bình",
            "Bình Thạnh",
            "Thủ Đức",
            "Phú Nhuận"
        ]
    },
    {
        province: "Đà Nẵng",
        cities: [
            "Hải Châu",
            "Thanh Khê",
            "Sơn Trà",
            "Ngũ Hành Sơn",
            "Liên Chiểu",
            "Cẩm Lệ",
            "Hòa Vang"
        ]
    },
    {
        "province": "Hải Phòng",
        "cities": [
            "Hồng Bàng",
            "Ngô Quyền",
            "Lê Chân",
            "Kiến An",
            "Hải An",
            "Đồ Sơn",
            "Dương Kinh"
        ]
    },
    {
        "province": "Cần Thơ",
        "cities": [
            "Ninh Kiều",
            "Bình Thủy",
            "Cái Răng",
            "Ô Môn",
            "Thốt Nốt",
            "Phong Điền"
        ]
    },
    {
        "province": "An Giang",
        "cities": [
            "Long Xuyên",
            "Châu Đốc",
            "Tân Châu",
            "An Phú",
            "Chợ Mới"
        ]
    },
    {
        "province": "Bình Dương",
        "cities": [
            "Thủ Dầu Một",
            "Dĩ An",
            "Thuận An",
            "Tân Uyên",
            "Bến Cát"
        ]
    },
    {
        "province": "Bình Phước",
        "cities": [
            "Đồng Xoài",
            "Phước Long",
            "Bình Long",
            "Lộc Ninh",
            "Chơn Thành"
        ]
    },
    {
        "province": "Bình Thuận",
        "cities": [
            "Phan Thiết",
            "La Gi",
            "Tuy Phong",
            "Bắc Bình",
            "Hàm Thuận Bắc"
        ]
    },
    {
        "province": "Đồng Nai",
        "cities": [
            "Biên Hòa",
            "Long Khánh",
            "Nhơn Trạch",
            "Vĩnh Cửu",
            "Trảng Bom"
        ]
    },
    {
        "province": "Đồng Tháp",
        "cities": [
            "Cao Lãnh",
            "Sa Đéc",
            "Hồng Ngự",
            "Tam Nông",
            "Châu Thành"
        ]
    },
    {
        "province": "Kiên Giang",
        "cities": [
            "Rạch Giá",
            "Hà Tiên",
            "Phú Quốc",
            "Kiên Lương",
            "Châu Thành"
        ]
    },
    {
        "province": "Lâm Đồng",
        "cities": [
            "Đà Lạt",
            "Bảo Lộc",
            "Di Linh",
            "Đức Trọng",
            "Lạc Dương"
        ]
    },
    {
        "province": "Nghệ An",
        "cities": [
            "Vinh",
            "Cửa Lò",
            "Thái Hòa",
            "Quỳnh Lưu",
            "Diễn Châu"
        ]
    },
    {
        "province": "Quảng Ninh",
        "cities": [
            "Hạ Long",
            "Cẩm Phả",
            "Móng Cái",
            "Uông Bí",
            "Đông Triều"
        ]
    },
    {
        "province": "Thừa Thiên Huế",
        "cities": [
            "Huế",
            "Hương Thủy",
            "Hương Trà",
            "Phong Điền",
            "Quảng Điền"
        ]
    }
])

const rules = reactive({
    fullName: [{ required: true, message: t('siteManage.fullNamePlaceholder'), trigger: 'blur' }],
    simpleName: [{ required: true, message: t('siteManage.simpleNamePlaceholder'), trigger: 'blur' }],
    phone: [{ required: true, message: t('siteManage.phonePlaceholder'), trigger: 'blur' }],
    email: [{ required: true, message: t('siteManage.emailPlaceholder'), trigger: 'blur' }],
    addressStr: [{ required: true, message: t('siteManage.addressStr'), trigger: 'blur' }],
    addressCode: [{ required: true, message: t('siteManage.addressCode'), trigger: 'blur' }],
    addressExpand: [{ required: true, message: t('siteManage.addressExpandPlaceholder'), trigger: 'blur' }]
})

// 初始化省份数据列
const provinceColumns = ref(columns.value.map(province => ({
    text: province.province,  // 将省份名称存储为文本
    value: province.province   // 将省份名称作为值
})));
const cityColumns = ref([]);
const selectedProvince = ref("");


const images = ref([
    { active: false, activeSrc: img1, value: 1 },
    { active: false, activeSrc: img2, value: 2 },
    { active: false, activeSrc: img3, value: 3 },
    { active: false, activeSrc: img4, value: 4 }
]);
const infoObjRef = ref(null)
const infoObj = ref({
    logo: null,
    fullName: null,
    simpleName: null,
    phone: null,
    email: null,
    addressStr: "",
    addressCode: "",
    addressExpand: null,
    notice: null,
    photos: null,
});


// 选择省时更新
const onProvinceChange = (value) => {
    selectedProvince.value = value;
    updateCityColumns();  // 更新市选择框
};

// 更新市选择框
const updateCityColumns = () => {
    const selectedProvinceData = columns.value.find(province => province.province === selectedProvince.value.selectedValues[0]);
    if (selectedProvinceData) {
        // 如果找到匹配的省份，更新市区列
        cityColumns.value = selectedProvinceData.cities.map(city => ({ text: city, value: city }));
    } else {
        // 如果没有找到，清空市区列
        cityColumns.value = [];
    }

};

// 省选择确认
const onProvinceConfirm = (value) => {
    infoObj.value.addressStr = value.selectedValues[0];
    provinceValue.value = value.selectedValues
    showProvincePicker.value = false;
};

// 市选择确认
const onCityConfirm = (value) => {
    infoObj.value.addressCode = value.selectedValues[0];
    cityValue.value = value.selectedValues
    showCityPicker.value = false;
};

// 取消选择
const onCancel = () => {
    showProvincePicker.value = false;
    showCityPicker.value = false;
};
// 监听省份选择更新市数据
watch(selectedProvince, () => {
    if (selectedProvince.value) {
        updateCityColumns();  // 当选择省份时更新市选择数据
    }
});
const afterRead = (file) => {
    // 你可以将文件上传到服务器，或者进行其他操作
    upload(file).then(res => {
        if (res.code == 200) {
            infoObj.value.photos = res.data.url;
        }
    });
};

// 更新 images 中的 active 状态
const updateActiveStatus = () => {
    images.value.forEach(image => {
        // 如果 images 中的 value 在 selectedImages 中，设置 active 为 true
        image.active = selectedImages.value.includes(image.value);
    });
};
const selectedImages = ref([]);
const toggleImage = (index) => {
    images.value[index].active = !images.value[index].active;
    const imageValue = images.value[index].value;

    if (images.value[index].active) {
        // 添加图片时去重
        if (!selectedImages.value.includes(imageValue)) {
            selectedImages.value.push(imageValue);
        }
    } else {
        const i = selectedImages.value.indexOf(imageValue);
        if (i > -1) {
            selectedImages.value.splice(i, 1);
        }
    }
    updateActiveStatus();
};

const onClickLeft = () => {
    router.back();
};
const onClickRight = () => {
    setInfo().then(res => {
        if (res.code == 200) {
            if (res.data.fullName) {
                router.push('/siteManageDetail');
            } else {
                showToast('Vui lòng điền đầy đủ thông tin');
            }
        }
    });
};

const getSetInfo = () => {
    infoObj.value.installation = selectedImages.value.join(',');
    if (!infoObj.value.phone) {
        showToast('Vui lòng điền đầy đủ thông tin');
        return;
    } else {
        // 判断是 10 位数还是 11 位数
        if (infoObj.value.phone.length !== 10 && infoObj.value.phone.length !== 11) {
            showToast('Vui lòng nhập đúng định dạng số điện thoại');
            return;
        }
    }
    if (!infoObj.value.email) {
        showToast('Vui lòng điền đầy đủ thông tin');
        return;
    } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(infoObj.value.email)) {
            showToast('Vui lòng nhập địa chỉ email hợp lệ');
            return
        }
    }
    infoObjRef.value.validate((valid) => {
        if (valid) {
            setInfo(infoObj.value).then(res => {
                if (res.code == 200) {
                    showToast('Chỉnh sửa thành công');
                }
            });
        }
    });

};

onMounted(() => {
    setInfo().then(res => {
        if (res.code == 200) {
            infoObj.value.photos = res.data.photos;
            infoObj.value.fullName = res.data.fullName;
            infoObj.value.simpleName = res.data.simpleName;
            infoObj.value.phone = res.data.phone;
            infoObj.value.email = res.data.email;
            infoObj.value.addressStr = res.data.addressStr;
            infoObj.value.addressCode = res.data.addressCode;
            infoObj.value.addressExpand = res.data.addressExpand;
            infoObj.value.notice = res.data.notice;
            infoObj.value.installation = res.data.installation;
            const installation = res.data.installation.split(',').filter(value => value !== '').map(Number).filter((value, index, self) => self.indexOf(value) === index);  // 去重
            // 合并安装数据与当前已选择的图片数据
            selectedImages.value = [...new Set([...selectedImages.value, ...installation])];
            updateActiveStatus();
            provinceValue.value = infoObj.value.addressStr ? [infoObj.value.addressStr] : [];
            cityValue.value = infoObj.value.addressCode ? [infoObj.value.addressCode] : [];
            if (infoObj.value.addressStr) {
                const selectedProvinceData = columns.value.find(province => province.province === infoObj.value.addressStr);
                if (selectedProvinceData) {
                    // 如果找到匹配的省份，更新市区列
                    cityColumns.value = selectedProvinceData.cities.map(city => ({ text: city, value: city }));
                } else {
                    // 如果没有找到，清空市区列
                    cityColumns.value = [];
                }
            }
        }
    });
});
</script>

<style scoped>
</style>