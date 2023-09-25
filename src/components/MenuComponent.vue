<template>
  <div class="homeMenu">
    <img class="menuLogo" src="@/assets/x-logo.png">
    <div style="font-size: 20px; font-family: 'Times New Roman', Times, serif; color: #25abe1ef;">Hoşgeldin, {{ userName
    }}</div>
    <div class="menuList">
      <router-link class="routerMenu" :to="{ name: 'HomeView' }"> <i class="pi pi-home"></i> Anasayfa</router-link>
    </div>

    <div class="menuList">
      <a class="routerMenu" style="cursor: pointer;" @click="goToProfile"> <i class="pi pi-user"></i> Profil</a>
    </div>

    <div class="menuList">
      <router-link class="routerMenu" :to="{ name: 'LoginView' }"> <i class="pi pi-comments"></i>
        Mesajlar</router-link>
    </div>
    <div class="menuList hoverExit" style="cursor: pointer;" @click="signOutUser">
      <i class="pi pi-comments"></i>
      Çıkış Yap
    </div>

  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { app } from '@/firebase/config';
import { onMounted, ref } from 'vue';
export default {
  name: "MenuComponent",
  setup() {
    const userName = ref(null)
    const userId = ref(null);
    const router = useRouter();
    const auth = getAuth(app);

    //Verileri aldık firebase hatası var bakacam!
    onMounted(() => {
      onAuthStateChanged(auth, (user) => {
        if (user != null) {
          console.log("Menu veri çekti")
          userId.value = user.uid;
          user.providerData.forEach((profile) => {
            userName.value = profile.displayName;
          })
        }
      });
    });


    const signOutUser = () => {
      signOut(auth).then(() => {
        router.push({ name: 'LoginView' })
      });
    }

    const goToProfile = () => {
      router.push({
        name: 'ProfileView',
        params: { id: userId.value }
      })
    }

    return { userName, signOutUser, goToProfile }
  }

}
</script>

<style scoped>
i {
  font-size: 20px;
}

.hoverExit:hover {
  color: #25abe1ef
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