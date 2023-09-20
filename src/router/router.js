import { createRouter, createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import RegisterView from "../views/auth/RegisterView.vue";
import WelcomeView from "@/views/auth/WelcomeView.vue";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/auth/LoginView.vue";
import ForgotPassword from "@/views/auth/ForgotPassword.vue";
import ErrorComponent from "@/components/ErrorComponent.vue";

const routes = [
  { path: "/", component: WelcomeView, name: "WelcomeView" },
  { path: "/register", component: RegisterView, name: "RegisterView" },
  { path: "/login", component: LoginView, name: "LoginView" },
  {
    path: "/forgot-password",
    component: ForgotPassword,
    name: "ForgotPassword",
  },
  {
    path: "/home",
    component: HomeView,
    name: "HomeView",
    meta: { requiresAuth: true },
  },
  { path: "/:catchAll(.*)", component: ErrorComponent, name: "ErrorComponent" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const auth = getAuth();
  onAuthStateChanged(auth, async (user) => {
    if (requiresAuth && !user) {
      next("/login");
    } else if (requiresAuth == false && user) {
      next("/home");
    } else {
      next();
    }
  });
});

export default router;
