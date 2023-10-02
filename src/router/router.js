import { createRouter, createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import HomeView from "@/views/HomeView.vue";

const routes = [
  { path: "/", component: ()=>import("@/views/auth/WelcomeView.vue"), name: "WelcomeView" },
  { path: "/register", component: ()=> import("@/views/auth/RegisterView.vue"), name: "RegisterView" },
  { path: "/login", component: ()=>import("@/views/auth/LoginView.vue"), name: "LoginView" },
  {
    path: "/forgot-password",
    component: ()=>import("@/views/auth/ForgotPassword.vue"),
    name: "ForgotPassword",
  },
  {
    path: "/home",  
    component: HomeView,
    name: "HomeView",
    meta: { requiresAuth: true },
  },
  { path: "/:catchAll(.*)", component: ()=>import("@/components/ErrorComponent.vue"), name: "ErrorComponent" },
  {path:"/user/:id" ,props:true,component:()=>import("@/views/UserView.vue"),name:"UserView",meta:{requiresAuth:true}},
  {path:"/messages/:id",props:true,component:()=>import("@/views/MessageView.vue"),name:"MessageView",meta:{requiresAuth:true}},
  {path:"/chat/:id",props:true,component:()=>import("@/views/ChatScreen.vue"),name:"ChatView",meta:{requiresAuth:true}}

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
