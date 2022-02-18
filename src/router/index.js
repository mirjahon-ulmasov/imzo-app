import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
  },
  {
    path: "/",
    component: () => import("@/layout/admin/Layout.vue"),
    children: [
      {
        path: "inbox",
        name: "Inbox",
        component: () => import("@/views/admin/Dashboard/Inbox.vue"),
        meta: {
          role: "admin",
          link: "inbox",
          title: {
            ru: "Входящие",
            uz: "Kirish qutisi",
          },
        },
      },
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/admin/Dashboard/index.vue"),
        meta: {
          role: "admin",
          link: "dashboard",
          title: {
            ru: "Приборная панель",
            uz: "Boshqaruv paneli",
          },
        },
      },
      {
        path: "users",
        name: "Users",
        component: () => import("@/views/admin/Users/index.vue"),
        meta: {
          role: "admin",
          link: "users",
          title: {
            ru: "Пользователи",
            uz: "Foydalanuvchilar",
          },
        },
      },
      {
        path: "requests",
        name: "Requests",
        component: () => import("@/views/admin/Requests/index.vue"),
        meta: {
          role: "admin",
          link: "requests",
          title: {
            ru: "Заявки",
            uz: "Ilovalar",
          },
        },
      },
      {
        path: "orders",
        name: "Orders",
        component: () => import("@/views/admin/Orders/index.vue"),
        meta: {
          role: "admin",
          link: "orders",
          title: {
            ru: "Заказы",
            uz: "Buyurtmalar",
          },
        },
      },
      {
        path: "main",
        name: "Main",
        component: () => import("@/views/admin/Main/index.vue"),
        meta: {
          role: "admin",
          link: "main",
          title: {
            ru: "Главное меню",
            uz: "Asosiy menyu",
          },
        },
      },
      {
        path: "products",
        name: "Products",
        component: () => import("@/views/admin/Products/index.vue"),
        meta: {
          role: "admin",
          link: "products",
          title: {
            ru: "Продукция",
            uz: "Mahsulotlar",
          },
        },
      },
      {
        path: "notifications",
        name: "Notifications",
        component: () => import("@/views/admin/Notifications/index.vue"),
        meta: {
          role: "admin",
          link: "notifications",
          title: {
            ru: "Уведомления",
            uz: "Bildirishnomalar",
          },
        },
      },
      {
        path: "feedback",
        name: "Feedback",
        component: () => import("@/views/admin/Feedback/index.vue"),
        meta: {
          role: "admin",
          link: "feedback",
          title: {
            ru: "Раздел отзывы",
            uz: "Sharhlar bo'limi",
          },
        },
      },
      {
        path: "showrooms",
        name: "Showrooms",
        component: () => import("@/views/admin/Showrooms/index.vue"),
        meta: {
          role: "admin",
          link: "showrooms",
          title: {
            ru: "Шоурумы",
            uz: "Shourumalar",
          },
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkActiveClass: "active",
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes,
});

export default router;
