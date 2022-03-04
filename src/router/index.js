import { createRouter, createWebHistory } from "vue-router";
import { get_token } from "../services/jwt.service";
import roles from "../services/roles";
import jwtDecode from "jwt-decode";

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
          role: roles.ADMIN,
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
          role: roles.ADMIN,
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
          role: roles.ADMIN,
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
          role: roles.ADMIN,
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
          role: roles.ADMIN,
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
          role: roles.ADMIN,
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
          role: roles.ADMIN,
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
          role: roles.ADMIN,
          link: "notifications",
          title: {
            ru: "Уведомления",
            uz: "Bildirishnomalar",
          },
        },
        children: [
          {
            path: "add",
            name: "addNotification",
            component: () => import("@/views/admin/Notifications/edit.vue"),
            meta: {
              role: roles.ADMIN,
              link: "notifications",
              title: {
                ru: "Уведомления",
                uz: "Bildirishnomalar",
              },
            },
          },
          {
            path: "edit/:id",
            name: "editNotification",
            component: () => import("@/views/admin/Notifications/edit.vue"),
            meta: {
              role: roles.ADMIN,
              link: "notifications",
              title: {
                ru: "Уведомления",
                uz: "Bildirishnomalar",
              },
            },
            props: true,
          },
        ],
      },
      {
        path: "feedback",
        name: "Feedback",
        component: () => import("@/views/admin/Feedback/index.vue"),
        meta: {
          role: roles.ADMIN,
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
          role: roles.ADMIN,
          link: "showrooms",
          title: {
            ru: "Шоурумы",
            uz: "Shourumalar",
          },
        },
        children: [
          {
            path: "add",
            name: "addShowroom",
            component: () => import("@/views/admin/Showrooms/edit.vue"),
            meta: {
              role: roles.ADMIN,
              link: "showrooms",
              title: {
                ru: "Шоурумы",
                uz: "Shourumalar",
              },
            },
          },
          {
            path: "edit/:id",
            name: "editShowroom",
            component: () => import("@/views/admin/Showrooms/edit.vue"),
            meta: {
              role: roles.ADMIN,
              link: "showrooms",
              title: {
                ru: "Шоурумы",
                uz: "Shourumalar",
              },
            },
            props: true,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/auth/Login.vue"),
  },
  {
    path: "/forgot-password",
    name: "Forgot Password",
    component: () => import("@/views/auth/ForgotPassword.vue"),
  },
  {
    path: "/404",
    name: "PageNotFound",
    component: () => import("@/views/auth/PageNotFound.vue"),
  },
  {
    path: "/:catchAll(.*)*",
    redirect: "/404",
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

router.beforeEach((to, from, next) => {
  const jwt = get_token();
  const role = jwt ? jwtDecode(jwt.access_token).user_role : null;

  const publicPages = ["/login", "/404"];
  const authRequired = !publicPages.includes(to.path);

  if (to.meta.role === role) next();
  else if (authRequired && !jwt) next({ name: "Login" });
  else if (to.name === "Login" && jwt) next({ to: "/" });
  else if (!authRequired) next();
  else next({ name: "PageNotFound" });
});

export default router;
