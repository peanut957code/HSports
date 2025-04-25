<template>
    <div>
        <van-nav-bar fixed placeholder @click-left="onClickLeft">
            <template #left>
                <van-icon size="20" color="#ccc" name="arrow-left" />
                <div class="text-lg font-semibold">{{ t('notify.notifySettings') }}</div>
            </template>
        </van-nav-bar>
        <van-cell-group :border="false" class="border m-4 p-1 rounded-[10px]">
            <van-cell :title="t('notify.allNotifications')" :border="false">
                <template #right-icon>
                    <van-switch size="20px" v-model="settings.allNotifications" />
                </template>
            </van-cell>
            <van-cell :title="t('notify.accountNotifications')" :border="false">
                <template #title>
                    <span>{{ t('notify.accountNotifications') }}</span>
                </template>
                <template #right-icon>
                    <van-switch size="20px" v-model="settings.accountNotifications" />
                </template>
            </van-cell>
            <van-cell :title="t('notify.systemAnnouncements')" :border="false">
                <template #title>
                    <span>{{ t('notify.systemAnnouncements') }}</span>
                </template>
                <template #right-icon>
                    <van-switch size="20px" v-model="settings.systemAnnouncements" />
                </template>
            </van-cell>
        </van-cell-group>
        
        <van-cell-group :border="false" class="border m-4 p-1 rounded-[10px]">
            <van-cell :title="t('notify.messageAlerts')" :border="false">
                <template #right-icon>
                    <van-switch size="20px" v-model="settings.messageAlerts" />
                </template>
            </van-cell>
            <van-cell :title="t('notify.teamMessages')" :border="false">
                <template #title>
                    <span>{{ t('notify.teamMessages') }}</span>
                </template>
                <template #right-icon>
                    <van-switch size="20px" v-model="settings.teamMessages" />
                </template>
            </van-cell>
            <van-cell :title="t('notify.matchMessages')" :border="false">
                <template #title>
                    <span>{{ t('notify.matchMessages') }}</span>
                </template>
                <template #right-icon>
                    <van-switch size="20px" v-model="settings.matchMessages" />
                </template>
            </van-cell>
            <van-cell :title="t('notify.friendMessages')" :border="false">
                <template #title>
                    <span>{{ t('notify.friendMessages') }}</span>
                </template>
                <template #right-icon>
                    <van-switch size="20px" v-model="settings.friendMessages" />
                </template>
            </van-cell>
        </van-cell-group>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const router = useRouter();

const settings = ref({
    allNotifications: true,
    accountNotifications: true,
    systemAnnouncements: false,
    messageAlerts: true,
    teamMessages: false,
    matchMessages: true,
    friendMessages: true,
})

const onClickLeft = () => {
    router.back();
}
</script>

<style scoped>
/* Add any additional styling here if needed */
</style>