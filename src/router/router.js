import { createRouter, createWebHistory } from "vue-router";
import RegisterView from '../views/auth/RegisterView.vue';
import WelcomeView from '@/views/auth/WelcomeView.vue';
import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/auth/LoginView.vue';
import ForgotPassword from '@/views/auth/ForgotPassword.vue';
 

const routes = [
    {path:"/",component:WelcomeView,name:"WelcomeView"},
    {path:"/register",component:RegisterView,name:"RegisterView"},
    {path:"/login",component:LoginView,name:"LoginView"},
    {path:"/forgot-password",component:ForgotPassword,name:"ForgotPassword"},
    {path:"/home",component:HomeView,name:"HomeView"},


];

const router = createRouter({
    history:createWebHistory(),
    routes
});

export default router;