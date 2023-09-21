<template>
  <div class="homeMenu">
    <img class="menuLogo" src="@/assets/x-logo.png">
    <div style="font-size: 20px; font-family: 'Times New Roman', Times, serif; color: #25abe1ef;">Hoşgeldin, {{ userName
    }}</div>
    <div class="menuList">
      <router-link class="routerMenu" :to="{ name: 'LoginView' }"> <i class="pi pi-home"></i> Anasayfa</router-link>
    </div>

    <div class="menuList">
      <router-link class="routerMenu" :to="{ name: 'LoginView' }"> <i class="pi pi-user"></i> Profil</router-link>
    </div>

    <div class="menuList">
      <router-link class="routerMenu" :to="{ name: 'LoginView' }"> <i class="pi pi-comments"></i>
        Mesajlar</router-link>
    </div>
    <div class="menuList" style="cursor: pointer;" @click="signOutUser">
      <i class="pi pi-comments"></i>
      Çıkış Yap
    </div>

  </div>
</template>

<script>
import { getUserDisplay, getUserId } from '@/firebase/authProcces.js';
import { useRouter } from 'vue-router';
import { getAuth,signOut } from 'firebase/auth';
export default {
  name: "MenuComponent",
  setup() {
    const userName = getUserDisplay();
    const userId = getUserId();
    const router = useRouter();
    const auth = getAuth();

    console.log("Deneme: ", userName);
    console.log("DNM: ", userId);

    const signOutUser = () => {
      signOut(auth).then(() => {
        router.push({name:'LoginView'})
      })
    }

    return { userName,signOutUser }
  }

}
</script>

<style scoped>
i {
  font-size: 20px;
}

.menuLogo {
  width: 50px;
  height: 50px;
  margin-bottom: 70px;
  margin-top: 50px;
  display: flex;
  justify-content: center;
}

.homeMenu {
  width: 20%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-left: 50px;

}

.menuList {
  margin-top: 20px;
  font-size: 20px;

}

.routerMenu {
  text-decoration: none;
  color: #000;
}

.routerMenu:hover {
  color: #25abe1ef
}
</style>