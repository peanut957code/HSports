<template>
  <van-tabbar v-model="active" :placeholder="true" :route="true" fixed>
    <van-tabbar-item v-for="(item, index) in tabbarData" :key="index" :icon="item.icon" :to="item.to">
      {{ item.title }}
    </van-tabbar-item>
  </van-tabbar>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from 'vue-router';

const { t } = useI18n();
const active = ref(0);
const route = useRoute();
const router = useRouter();

import home from "@/assets/home.png";
import home_active from "@/assets/home_active.png";
import site from "@/assets/site.png";
import site_active from "@/assets/site_active.png";
import client from "@/assets/client.png";
import client_active from "@/assets/client_active.png";
import order from "@/assets/order.png";
import order_active from "@/assets/order_active.png";
import marketing from "@/assets/marketing.png";
import marketing_active from "@/assets/marketing_active.png";
const tabbarData = computed(() => {
  return [
    {
      icon: 'home-o',
      activeIcon:home_active,
      title: t('tabbar.home'),
      to: {
        name: "home"
      }
    },
    {
      icon: 'circle',
      activeIcon:site_active,
      title: t('tabbar.site'),
      to: {
        name: "site"
      }
    },
    // {
    //   icon:client,
    //   activeIcon:client,
    //   title: t('tabbar.client'),
    //   to: {
    //     name: "client"
    //   }
    // },
    {
      icon: 'contact-o',
      activeIcon:order_active,
      title: t('tabbar.order'),
      to: {
        name: "order"
      }
    },
    // {
    //   icon: 'contact-o',
    //   activeIcon:marketing,
    //   title: t('tabbar.marketing'),
    //   to: {
    //     name: "marketing"
    //   }
    // }
  ]
});
</script>

<style>

</style>
