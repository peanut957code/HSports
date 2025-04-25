import Layout from "@/layout/index.vue";
import login from "@/views/login/index.vue";

import siteManageDetail from '@/components/SiteManage/siteManageDetail.vue';

const routes = [
  {
    path: "/",
    name: "root",
    component: Layout,
    redirect: { name: "login" },
    children: [
      {
        path: "home",
        name: "home",
        component:  () => import("@/views/home/index.vue"),
        meta: {
          title: "Trang chủ",
          noCache: true
        }
      },
      {
        path: "site",
        name: "site",
        component: () => import("@/views/site/index.vue"),
        meta: {
          title: "Địa điểm",
          noCache: true
        }
      },
      {
        path: "client",
        name: "client",
        component: () => import("@/views/client/index.vue"),
        meta: {
          title: "Công cụ"
        }
      },
      {
        path: "order",
        name: "order",
        component: () => import("@/views/order/index.vue"),
        meta: {
          title: "Đơn hàng",
          noCache: true
        }
      },
      {
        path: "marketing",
        name: "marketing",
        component: () => import("@/views/marketing/index.vue"),
        meta: {
          title: "Tiếp thị"
        }
      },
    ]
  },
  {
    path: "/login",
    name: "login",
    component: login,
    meta: {
      title: "Đăng nhập"
    }
  },
  {
    path: "/common",
    name: "common",
    component: () => import("@/views/common/index.vue"),
    meta: {
      title: "Trang công cộng"
    }
  },
  {
    path: "/echartsPieDetails",
    name: "echartsPieDetails",
    component: () => import("@/views/home/echartsPieDetails.vue"),
    meta: {
      title: "Chi tiết"
    }
  },
  {
    path: "/details",
    name: "details",
    component: () => import("@/views/order/details.vue"),
    meta: {
      title: "Chi tiết"
    }
  },
  {
    path: "/userlist",
    name: "userlist",
    component: () => import("@/views/client/userlist.vue"),
    meta: {
      title: "Danh sách khách hàng"
    }
  },
  {
    path: "/creaSite",
    name: "creaSite",
    component: () => import("@/views/site/creaSite.vue"),
    meta: {
      title: "Tạo địa điểm"
    }
  },
  {
    path: "/editSite",
    name: "editSite",
    component: () => import("@/views/site/editSite.vue"),
    meta: {
      title: "Chỉnh sửa địa điểm"
    }
  },
  {
    path: "/siteManageDetail",
    name: "siteManageDetail",
    component: siteManageDetail,
    meta: {
      title: "Chi tiết địa điểm"
    }
  },
];

export default routes;