import { defineStore } from "pinia";

export const useAppStore = defineStore('app', {
    state: () => ({
        visitedPage: false,  // 存储是否进入过某个页面
    }),
    actions: {
        setVisitedPage(status) {
            this.visitedPage = status;
        },
    },
});