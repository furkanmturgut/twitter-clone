<template>
  <div class="cardRow">
    <menu-component></menu-component>

    <div class="feedArea">
      <!-- back button & username & total tweet -->
      <div class="topBanner">
        <div style="width: 50px; height: 50px; display: flex; justify-content: center; align-items: center; ">
          <i class="pi pi-arrow-left" style=" margin-left: 20px; color: #25abe1ef; font-weight: bold;"></i>
        </div>

        <div style="display: flex; flex-direction: column; margin-left: 20px; justify-content: center;">
          <span style="font-weight: bold;  ">Kullanıcı Adı</span>
          <span style="font-size: 12px; color: #918c8c ;">68 Tweet</span>
        </div>
      </div>

      <!-- Profile Photo & username & follow and share buttons -->
      <div class="profileHeader">
        <div style="display: flex; flex-direction: column;  width: 50%; height:120px ;">
          <TWCircleImage class="tweetUserPhoto" :image="photoUrl" size="xxlarge" shape="circle"></TWCircleImage>
          <span style="font-weight: bold;  margin-left: 20px; margin-top: 10px; ">Kullanıcı Adı</span>
          <span style="font-size: 14px; margin-left: 20px; color: #c5c1c1;">@{{ userName }}</span>
        </div>
        <!-- follow and share button  -->
        <div
          style="display: flex; flex-direction: row; width: 50%; height:120px; justify-content: center; align-items: center;">
          <TWButton class="shareButtonStyle" icon="pi pi-ellipsis-h"></TWButton>
          <TWButton @click="profileButton" class="followStyle">{{ isUserControl ? 'Düzenle' : 'Takip Et' }}</TWButton>
        </div>
      </div>

      <div class="descArea">
        <!-- bio text -->
        <p style="margin-left: 20px; font-size: 14px; color: #696969	;">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam velit doloribus labore. Aspernatur incidunt impedit alias at non! Quos, maxime!</p>
        <!-- bio info (city born) -->
        <div style="display: flex; flex-direction: row; align-items: center; margin-left: 20px; color: #696969;">
          <span style="margin-right: 20px;">
            <i class="pi pi-map-marker"> Akjsaray</i>
          </span>
          <span>
            <i class="pi pi-calendar"> 14 Ocak</i>
          </span>
        </div>
        <!--joined date -->
        <span style="margin-left: 20px; margin-top: 8px; font-size: 16px; color: #696969;">
          <i class=" pi pi-megaphone"> 30 Şubat katıldı</i>
        </span>

        <!-- following and followers -->
        <div style="display: flex; flex-direction: row; margin-left: 20px; margin-top: 20px;">
          <span style="margin-right: 20px;"> <strong>0 </strong>Takipçi</span>
          <span><strong>0 </strong>Takip Edilen</span>
        </div>

        <div>
          <TWTabView>
            <TWTabPanel>
              <template #header>
                <span @click="selectedTab('tweet')" :class="{ active: tweetValue, inActive: !tweetValue }">Tweetler</span>
              </template>

            </TWTabPanel>
            <TWTabPanel>
              <template #header>
                <span @click="selectedTab('like')" :class="{ active: likeValue, inActive: !likeValue }">Beğeniler</span>
              </template>
              begen
            </TWTabPanel>
          </TWTabView>

        </div>

      </div>

    </div>

    <user-component></user-component>
  </div>
</template>

<script>
import MenuComponent from '@/components/MenuComponent.vue';
import UserComponent from '@/components/UserComponent.vue';
import { getUserPhoto, getUserDisplay, getUserId } from '@/firebase/authProcces';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getFirestore, getDocs, collection, query } from 'firebase/firestore';
import { app } from '@/firebase/config';
export default {
  name: "ProfileView",
  components: { MenuComponent, UserComponent },
  setup() {

    const userID = ref(null);
    const tweetValue = ref(false);
    const likeValue = ref(false);
    const userName = getUserDisplay();
    const photoUrl = getUserPhoto();
    const myID = getUserId();
    const router = useRouter();
    const isUserControl = ref(false);
    const firestore = getFirestore(app);
    const usersData = ref([]);
    // const filteredUser = ref([]);

    const userControlFunc = () => {
      if (String(myID) == String(userID.value)) {
        console.log("Aynı");
        isUserControl.value = true
      } else {
        console.log("Farklı");
        isUserControl.value = false
      }

      return isUserControl.value
    }

    userID.value = router.currentRoute.value.params.id;
    onMounted(async () => {
      userControlFunc();
      const userQuery = query(collection(firestore, "users"));
      await getDocs(userQuery).then((querySnapshot) => {
        querySnapshot.forEach((users) => {
          usersData.value.push(users.data());
        });
      });
      
    });

    const filteredUser = usersData.value.find((item) => {
     return  item.id === myID;
    });
    console.log("Filtered User data : ", filteredUser);

    const profileButton = () => {
      console.log("Click");
      // console.log("FT: ", filteredUser.value[0].biography)

    }

    // Selected TabManu redesign
    const selectedTab = (key) => {
      if (key === "tweet") {
        tweetValue.value = true;
        likeValue.value = false
      } else if (key === "like") {
        tweetValue.value = false;
        likeValue.value = true;
      } else {
        tweetValue.value = true;
      }
    }
    selectedTab();

    return { selectedTab, tweetValue, likeValue, userName, photoUrl, isUserControl, profileButton, filteredUser }
  }
}
</script>


<style scoped >
.active {
  color: #25abe1ef
}

.inActive {
  color: #696969
}

.tabStyle:hover {
  color: #696969;
}

.followStyle {
  width: 100px;
  height: 40px;
  border-radius: 16px;
  background-color: #fff;
  color: #25abe1ef;
}

.shareButtonStyle {
  width: 60px;
  height: 40px;
  background-color: #fff;
  color: #25abe1ef;
  border-radius: 26px;
  margin-right: 10px;
}

.shareButtonStyle:hover {
  background-color: #25abe1ef;
  color: #fff;
}


.tweetUserPhoto {
  margin-left: 20px;
  margin-top: 10px;
  width: 80px;
  height: 80px;

}

.descArea {
  width: 98%;
  height: 500px;
  background-color: #fff;
  margin-right: 1%;
  margin-left: 1%;
  display: flex;
  flex-direction: column;
}

.profileHeader {
  width: 98%;
  height: auto;
  background-color: #fff;
  margin-top: 3px;
  margin-right: 1%;
  margin-left: 1%;
  display: flex;
  flex-direction: row;
}

.topBanner {
  margin-right: 1%;
  margin-left: 1%;
  width: 98%;
  height: 50px;
  background-color: #fff;
  display: flex;
  flex-direction: row;
}
</style>