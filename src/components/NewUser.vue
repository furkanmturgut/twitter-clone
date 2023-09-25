<template>
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
</template>

<script>
import {
  getFirestore,
  query,
  collection,
  getDocs,
  orderBy,
} from "firebase/firestore";
import { app } from "@/firebase/config.js";
import { ref } from 'vue';
export default {
  name: "UserComponent",
  setup() {
    const newUserList = ref([]);
    const fullUsersList = ref([]);

    const firestore = getFirestore(app);

    const getUserFunc = async () => {
      const userQuery = query(
        collection(firestore, "users"),
        orderBy("saveDate", "asc")
      );
      await getDocs(userQuery).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          fullUsersList.value.push(doc.data());
          newUserList.value = fullUsersList.value
            .slice(fullUsersList.value.length - 5, fullUsersList.value.length)
            .reverse();
        });
      });
    };

    getUserFunc();


    return { newUserList }
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

.otherArea {
  width: 20%;
  height: 100%;
  display: flex;
  flex-direction: column;

}

.tweetUserPhoto {
  margin-left: 10px;
  margin-top: 10px;
}
</style>