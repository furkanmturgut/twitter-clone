<template>
  <div class="cardRow">

    <div class="homeMenu">
      <img class="menuLogo" src="@/assets/x-logo.png">
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

    <div class="feedArea">
      <div>
        <div class="topBanner"><span style="font-weight: bold; margin-left: 10px;">Anaysayfa</span> <i class="pi pi-star"
            style="float: right; margin-right: 20px; margin-top: 5px;"></i>
        </div>

        <div class="enterTweet">
          <TWCircleImage class="tweetUserPhoto"
            image="https://blog.logrocket.com/wp-content/uploads/2021/09/ultimate-guide-SVGs-vue-js.png" size="large"
            shape="circle" />
          <TWTextarea class="tweetArea" v-model="value1" autoResize placeholder="Max 125 karakter ?">
          </TWTextarea>
          <div>
            <TWButton style="background-color: #25abe1ef; margin: 20px;" icon="pi pi-image"></TWButton>
            <TWButton style="float: right; background-color: #25abe1ef; margin: 20px;" label="Tweet">
            </TWButton>
          </div>
        </div>

        <div class="feedPost">
          <div style="display: flex;">
            <TWCircleImage class="tweetUserPhoto"
              image="https://blog.logrocket.com/wp-content/uploads/2021/09/ultimate-guide-SVGs-vue-js.png" size="large"
              shape="circle"></TWCircleImage>
            <span style="margin-top: 14px; margin-left: 10px;">@Username</span>
            <p class="textFeed"> TEXT</p>
          </div>
          <div class="feedAction">
            <i class="pi pi-heart"></i>
          </div>
        </div>
      </div>
    </div>

    <div class="otherArea">
      <TWAutoComplete class="searchStyle" v-model="valueSrch" :suggestions="items" @complete="search"
        placeholder="Profil ara" />
      <div style="margin-top: 30px; display: flex; justify-content: center;">Yeni Katılanlar</div>

      <div v-for="user in newUserList" :key="user.id"
        style="display: flex; flex-direction: row; margin: 10px; border: 1px solid #25abe1ef; border-radius: 8px; background-color: #f3f3f3ff;">
        <TWCircleImage class="tweetUserPhoto" :image="user.profilePhoto" size="large" shape="circle"></TWCircleImage>
        <span style="margin: 20px;">{{ user.displayName }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, query, collection, getDocs, orderBy } from 'firebase/firestore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
export default {
  name: 'HomeView',
  setup() {
    const userId = ref(null);
    const auth = getAuth();
    const firestore = getFirestore();
    const router = useRouter();
    const newUserList = ref([]);
    const fullUsersList = ref([]);

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        userId.value = user.uid;
      }

      if (user !== null) {
        user.providerData.forEach((profile) => {
          console.log("Sign-in provider: " + profile.providerId);
          console.log("  Provider-specific UID: " + profile.uid);
          console.log("  Name: " + profile.displayName);
          console.log("  Email: " + profile.email);
          console.log("  Photo URL: " + profile.photoURL);
        });
      }
    });

    const getUserFunc = async () => {
      const userQuery = query(collection(firestore, "users"), orderBy("saveDate", "asc"));
      await getDocs(userQuery).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {

          fullUsersList.value.push(doc.data());
          newUserList.value = fullUsersList.value.slice(fullUsersList.value.length - 5, fullUsersList.value.length).reverse();

        })
      });
    }
    getUserFunc();

    const signOutUser = () => {
      if (userId.value != null) {
        signOut(auth).then(() => {
          router.push({ name: 'WelcomeView' })
        });
      }
    }

    return { signOutUser, newUserList }
  }
}
</script>

<style scoped>
.searchStyle {
  height: 36px;
  display: flex;
  justify-content: center;
  margin: 20px;
}

.feedAction {
  display: flex;
  justify-content: center;
  margin-top: 70px;
}

.textFeed {
  display: flex;
  align-items: center;
  margin-top: 34px;
  font-size: 14px;
}

.feedPost {
  width: 100%;
  height: 160px;
  margin-top: 12px;
  margin-left: 4px;
  margin-right: 6px;
  background-color: #fff;
}

.tweetArea {
  margin-top: 10px;
  margin-left: 10px;
  border: 1px solid #ffff;
  width: 80%;

}

.tweetUserPhoto {
  margin-left: 10px;
  margin-top: 10px;
}

.enterTweet {
  width: 100%;
  height: 160px;
  margin-top: 1px;
  margin-left: 4px;
  background-color: #fff;
}

.topBanner {
  width: 100%;
  height: 50px;
  background-color: #fff;
  margin-left: 4px;
}

.menuLogo {
  width: 50px;
  height: 50px;
  margin-bottom: 70px;
  margin-top: 50px;
  display: flex;
  justify-content: center;
}

i {
  font-size: 20px;
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

.cardRow {
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
}

.homeMenu {
  width: 20%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-left: 50px;

}

.feedArea {
  background-color: #f3f3f3ff;
  width: 60%;
  height: 100%;


}

.otherArea {
  width: 20%;
  height: 100%;
  display: flex;
  flex-direction: column;

}
</style>