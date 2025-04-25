<template>
    <div class="fixed top-0 w-full bg-white  p-4 z-10">
        <div class="flex justify-between items-center">
            <div>
                <van-icon @click="onClickLeft" name="arrow-left" />
                <span class="text-lg font-semibold">{{ t('echartsPie.historySalesProgress') }}</span>
            </div>
            <span class="text-sm text-gray-500">{{ t('echartsPie.makePlan') }}</span>
        </div>
    </div>
    <div class=" w-full h-[64px]"></div>
    <div class="overflow-auto p-4">
        <div class="rounded-lg border mb-4 p-4 flex " v-for="(item, index) in data" :key="index">
            <!-- <div class="flex-shrink-0 w-[100px] h-20 rounded-full flex items-center justify-center text-2xl">
                <PieChart :percentage="item.completed" :total="item.estimate" />
            </div> -->
            <div class="flex-grow">
                <div class="font-medium text-lg">THÁNG {{ item.yearMonth }}</div>
                <div class="text-sm text-gray-600">{{ t('echartsPie.capacity') }}: {{ item.volume }} </div>
                <div class="text-sm text-gray-600">{{ t('echartsPie.planned') }}: {{ item.estimate }} </div>
                <div class="text-sm text-gray-600">{{ t('echartsPie.completed') }}: {{ item.completed }} </div>
                <div class="text-sm text-gray-600">{{ t('echartsPie.notes') }}: {{ item.remark }}</div>
            </div>
            <div class="flex flex-col justify-center">
                <div class="flex h-[30px] justify-between">
                    <van-icon color="#000" size="25px" name="description-o" />
                    <van-icon color="#000" size="25px" name="records-o" />
                </div>
                <div>
                    <div class="flex-shrink-0 w-[100px] h-20 rounded-full flex items-center justify-center text-2xl">
                        <PieChart width="100%" height="80px" :percentage="item.completed" :total="item.estimate" />
                    </div>
                </div>
            </div>
        </div>
        <div class="text-center text-gray-500 py-4">{{ t('echartsPie.noMore') }}</div>
    </div>
</template>

<script setup name="echartsPie">
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const router = useRouter();
import PieChart from '@/components/Echarts/PieChart.vue';
import { getCurrentPercentHis } from '@/api/home/index'
import { onMounted, ref } from 'vue';

const data = ref([])

const getCurrentPercentHisData = () => {
    getCurrentPercentHis().then(res => {
        if (res.code == 200) {
            data.value = res.data
        }
    })
}
const onClickLeft = () => {
    router.back();
}
onMounted(() => {
    getCurrentPercentHisData()
})
</script>