<template>
    <div class="flex items-center border p-4 rounded-lg">
        <div
            class="flex-shrink-0 w-12 h-12 border  rounded-full flex items-center justify-center text-lg font-semibold overflow-hidden">
            {{ service }}
        </div>
        <div class="ml-4 flex-1">
            <div class="font-bold text-[#292929] text-[14px]">{{ id }}</div>
            <div class="text-[#292929] text-[12px]">{{ id }}</div>
            <div class="text-[12px] text-[#A7A7A7]">{{ name }}</div>
        </div>
        <div class="ml-4 text-gray-600">
            <img src="../../assets/message.png" alt="">
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
        service: String,
        id: String,
        name: String,
});
</script>

<style scoped>
/* Add any additional styling here if needed */
</style>