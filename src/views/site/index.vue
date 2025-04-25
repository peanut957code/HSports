<template>
  <div class="max-w-md mx-auto h-screen bg-#fff">
    <div class="p-2 bg-[#fff] flex flex-col justify-between items-center font-bold fixed w-full h-[80px] z-[10]">
      <div class="w-full flex justify-between items-center">
        <span>{{ $t('venue.header', { num: dataList.length }) }}</span>
        <span>
          <van-icon name="add" size="24" color="#0572e3" @click="toCreaSite" />
        </span>
      </div>
      <div class="pb-[5px] text-[12px]">{{ $t('venue.tips') }}</div>
    </div>
    <div class="p-4 pt-[80px] pb-[100px]">
      <!-- <div class="px-[10px] pb-[10px] text-[14px]">您还未创建场地，请创建您的场地资料，供客户挑选</div> -->

      <div class="space-y-4 text-[12px]">
        <CourtCard :dataList="dataList"  @setList="getList" />
      </div>
    </div>
  </div>
</template>

<script setup name="site">
import CourtCard from './courtCard.vue';
import { onMounted, reactive, ref } from "vue";
import { useRouter } from 'vue-router';
import { list } from '@/api/venue/index'
const router = useRouter();
const dataList = ref([])
const toCreaSite = () => {
  router.push('/creaSite')
}

const getList = () => {
  list().then(res => {
    dataList.value = res.data
  })
}

onMounted(() => {
  getList()
})
</script>

<style scoped>
.bg-line {
  background: linear-gradient(to bottom, #1c8ded, #55a9f2);
  color: #fff;
}
</style>
