<template>
    <ContactCustomer v-if="componentToShow === 'contactCustomer'" />
    <EditAvatar v-if="componentToShow === 'editAvatar'" />
    <NotifyManage v-if="componentToShow === 'notifyManage'" />
    <PeopleManage v-if="componentToShow === 'peopleManage'" />
    <SiteManage v-if="componentToShow === 'siteManage'" />
    <FinancialManage v-if="componentToShow === 'financialManage'" />
    
</template>

<script setup>
import { onMounted,ref } from 'vue';
import { useRoute } from 'vue-router';
import ContactCustomer from '@/components/ContactCustomer/index.vue'
import EditAvatar from '@/components/EditAvatar/index.vue'
import NotifyManage from '@/components/NotifyManage/index.vue'
import PeopleManage from '@/components/PeopleManage/index.vue'
import SiteManage from '@/components/SiteManage/index.vue'
import FinancialManage from '@/components/FinancialManage/index.vue'

const route = useRoute();
const componentToShow = ref('');

onMounted(() => {
    // 获取路由中的查询参数并根据其值来决定显示哪个组件
    const param = route.query.param;
    componentToShow.value = param
    console.log( componentToShow.value)
});
</script>
