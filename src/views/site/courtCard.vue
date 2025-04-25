<template>
    <div class="items mb-[20px]" v-for="item in dataList" :key="item">
        <div class=" bg-[#f7f7f7] relative">
            <div class="flex items-center  p-2  rounded-tl-md rounded-tr-md">
                <!-- <img src="https://via.placeholder.com/150x100" alt="场地图片" class="rounded-md w-[60%] h-auto ml-[10px]" /> -->
                <van-swipe class="rounded-md w-[60%] h-[120px] ml-[10px]" autoplay="3000">
                    <van-swipe-item class="w-full flex items-center justify-center" v-for="i in JSON.parse(item.photos)"
                        :key="i.name">
                        <img :src="i.url" alt="">
                    </van-swipe-item>
                </van-swipe>
                <div class="w-[40%] h-auto text-left  text-[#afafaf]">
                    <div class="flex justify-center mb-[10px]">
                        <van-icon name="delete-o" size="20px" class="mr-[10px]" @click="deleteItem(item)" />
                        <van-icon name="edit" size="20px" @click="editItem(item)" />
                    </div>
                    <div class="text-3xl font-bold text-[#333] text-center">{{ item.num }}#</div>
                    <div class="text-sm mt-2 text-center">
                        {{ $t('venue.height', { num: item.length || 0 }) }}<br />
                        {{ $t('venue.width', { num: item.width || 0 }) }}
                    </div>
                </div>
            </div>
            <div class="flex space-x-4  px-4 pb-4">
                <span
                    class="border border-gray-300 px-2 py-1 rounded text-sm text-[#afafaf] flex-auto flex justify-center">{{
                        item.env == 1 ? $t('commn.outdoor') : $t('commn.indoor') }}</span>
                <span
                    class="border border-gray-300 px-2 py-1 rounded text-sm text-[#afafaf] flex-auto flex justify-center">
                    <span class="" v-if="item.turf == 1">{{ $t('commn.naturalGrass') }}</span>
                    <span v-if="item.turf == 2">{{ $t('commn.artificialGrass') }}</span>
                    <span v-if="item.turf == 3">{{ $t('commn.compositeFloor') }}</span>
                    <span v-if="item.turf == 0">{{ $t('commn.others') }}</span>
                </span>
                <span
                    class="border border-gray-300 px-2 py-1 rounded text-sm text-[#afafaf] flex-auto flex justify-center">
                    <span v-if="item.standard == 5">{{ $t('commn.fiveAside') }}</span>
                    <span v-if="item.standard == 7">{{ $t('commn.sevenAside') }}</span>
                    <span v-if="item.standard == 11">{{ $t('commn.elevenAside') }}</span>
                </span>
            </div>
        </div>
        <div class="grid grid-cols-3 gap-2 text-center py-2">
            <div class="rounded-md" v-for="is in item.sitePrices" style="border:1px solid #EFF3F9">
                <div class="text-[#ccc] text-sm">{{ is.begin }} - {{ is.end }} </div>
                <div class="text-[#333] font-bold">{{ is.price || 0 }}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineEmits } from 'vue';
import { showDialog } from 'vant';
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();
import { useRouter } from 'vue-router';
const router = useRouter();
import { venueSiteDelete } from '@/api/venue/index'
const props = defineProps({
    number: String,
    length: String,
    width: String,
    dataList: {
        type: Array,
        default: () => []
    }
})
// 定义触发的事件
const emit = defineEmits(['setList']);

const setList = () => {
    emit('setList');
}
const deleteItem = (val) => {
    showDialog({
        title: t('commn.tips'),
        message: t('commn.delete'),
        confirmButtonText: t('commn.confirm')
    }).then(() => {
        venueSiteDelete(val.id).then(res => {
            if (res.code == 200) {
                setList()
            }
        })
    });
}
const editItem = (val) => {
    router.push({
        path: '/editSite',
        query: { id: val.id } // 将参数作为查询参数传递
    });
}

</script>

<style scoped></style>
