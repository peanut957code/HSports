<template>
  <div ref="chartRef" style="width: 100%; height: 300px;"></div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();
import * as echarts from 'echarts';

const props = defineProps({
  recentData: {
    type: Array,
    default: () => []
  },
  lastWeekData: {
    type: Array,
    default: () => []
  }
});

const chartRef = ref(null);
let chartInstance = null;

const initChart = () => {
  chartInstance = echarts.init(chartRef.value);
  chartInstance.setOption({
    title: {
      // text: '近期数据与上一周同一天对比'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: [ t('home.line1'),  t('home.line2')]
    },
    xAxis: {
      type: 'category',
      data: props.recentData.map(item => item.date), // 假设数据中有 date 字段
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: t('home.line1'),
        type: 'line',
        data: props.recentData.map(item => item.value),
        itemStyle: {
          color: '#5470C6'
        }
      },
      {
        name: t('home.line2'),
        type: 'line',
        data: props.lastWeekData.map(item => item.value),
        itemStyle: {
          color: '#91CC75'
        }
      }
    ]
  });
};

watch([() => props.recentData, () => props.lastWeekData], initChart);

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