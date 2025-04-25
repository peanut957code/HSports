<template>
  <div ref="chartRef" :style="{ width: width, height: height }"></div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import * as echarts from "echarts";

const props = defineProps({
  percentage: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  width:{
    type: String,
    default:'100%'
  },
  height:{
    type: String,
    default:'100px'
  }
});

const chartRef = ref(null);
let chartInstance = null;

const renderChart = () => {
  if (chartInstance) {
    chartInstance.dispose();
  }

  chartInstance = echarts.init(chartRef.value);

  const option = {
    series: [
      {
        type: "pie",
        radius: ["70%", "90%"], // 控制内外环的半径
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: "center",
          formatter: `${props.percentage}%`, // 显示百分比
          fontSize: 30, // 百分比文字大小
          color: "#4ca6fa", // 中间百分比文字颜色设置为蓝色
          fontWeight: "bold",
        },
        data: [
          {
            value: props.percentage, // 已完成部分
            itemStyle: {
              color: "#4ca6fa", // 已完成部分设置为蓝色
            },
          },
          {
            value: props.total - props.percentage, // 剩余部分
            itemStyle: {
              color: "#fff", // 剩余部分设置为浅灰色
            },
          },
        ],
      },
    ],
  };

  chartInstance.setOption(option);
};

watch(
  () => props.percentage,
  () => {
    renderChart();
  }
);

onMounted(() => {
  renderChart();
});
</script>

<style scoped>
/* 根据需要调整外层容器的样式 */
</style>
