import { createRouter, createWebHashHistory } from "vue-router";
import { showToast } from 'vant';
import routes from "./routes";
import { useCachedViewStoreHook } from "@/store/modules/cachedView";
import NProgress from "@/utils/progress";
import setPageTitle from "@/utils/set-page-title";
import { useAppStore } from '@/store/modules/useAppStore';
const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      // 如果返回上一页，保持原位置
      return savedPosition;
    } else {
      // 默认滚动到顶部
      return { top: 0 };
    }
  },
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  const appStore = useAppStore();
  const token = localStorage.getItem('token'); // 假设 token 存储在 localStorage
  if (from.name === 'common') {
    appStore.setVisitedPage(true);
  }else{
    appStore.setVisitedPage(false);
  }
  // 如果需要登录且没有 token，跳转到登录页
  if (to.meta.requiresAuth && !token) {
    appStore.setVisitedPage(false);  // 退出时设置为 false
    next({ name: 'login' });  // 跳转到登录页
  } else if (to.name === 'marketing' || to.name === 'client') {
    showToast('Chưa mở');
    next(false);  // 阻止导航
  } else {
    // 路由缓存
    useCachedViewStoreHook().addCachedView(to);
    // 设置页面标题
    setPageTitle(to.meta.title);
    next();  // 允许导航
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;