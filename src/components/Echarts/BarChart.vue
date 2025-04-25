<template>
    <div ref="chartRef" style="width: 100%; height: 300px;"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();
import * as echarts from 'echarts';

const chartRef = ref(null);
let chartInstance = null;

const salesData = [
    { category: 'Đã bán', value: 120 },
    { category: 'Đặt trước', value: 200 },
    { category: 'Hoàn thành', value: 150 }
];

const initChart = () => {
    chartInstance = echarts.init(chartRef.value);
    chartInstance.setOption({
        title: {
            text: t('home.bar'), // 设置标题
            textStyle: {
                fontSize: 14, // 设置字体大小
                fontWeight: 'bold', // 字体加粗（可选）
                color: '#333' // 字体颜色（可选）
            }
        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            data: salesData.map(item => item.category),
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: 'Số lượng',
                type: 'bar',
                data: salesData.map(item => item.value),
                itemStyle: {
                    color: function (params) {
                        const colorList = ['#5470C6', '#91CC75', '#FAC858'];
                        return colorList[params.dataIndex];
                    }
                }
            }
        ]
    });
};
const updateChart = () => {
    if (chartInstance) {
        chartInstance.resize(); // 调整图表大小
    }
};

onMounted(() => {
    initChart();
    window.addEventListener('resize', updateChart); // 监听窗口大小变化
});

onBeforeUnmount(() => {
    chartInstance.dispose();
    window.removeEventListener('resize', updateChart); // 移除事件监听器
});
</script>

<style scoped>
/* 自定义样式可以在这里添加 */
</style>