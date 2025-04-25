<script setup>
import { useDarkMode, useToggleDarkMode } from "@/hooks/useToggleDarkMode";
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();

const onClickRight = () => {
  useToggleDarkMode();
};
// function handleLang(val) {
//   locale.value = val;
//   localStorage.setItem('language', val)
// };
</script>

<template>
  <!-- @click-right="onClickRight" -->
  <van-nav-bar fixed placeholder>
    <template #right>
      <!-- <div v-if="locale == 'en_US'" @click="handleLang('zh_CN')">English</div>
      <div v-else @click="handleLang('en_US')">中文</div> -->
      <!-- <van-icon class="mr-[10px] mt-[5px]" color="#000" size="20" name="comment-o" /> -->
      <!-- <svg-icon class="text-[18px]" :name="useDarkMode() ? 'light' : 'dark'" /> -->
    </template>
  </van-nav-bar>
</template>

<style scoped></style>
