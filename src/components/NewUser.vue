<template>
  <div class="otherArea">
    <TWAutoComplete class="searchStyle" v-model="valueSearch" optionLabel="displayName"  :suggestions="items"
      @complete="search" @change="filterUser" placeholder="Profil ara">
      <template #option="slotProps">
        <div class="flex align-options-center">
          <TWCircleImage class="tweetUserPhoto" :image="slotProps.option.photo" size="large" shape="circle"></TWCircleImage>
          <div style="display: flex; align-items: center;"><span style="font-weight: bold; padding: 6px; color: #25abe1ef;">{{slotProps.option.displayName }}</span></div>
        </div>
      </template>
    </TWAutoComplete>
   
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
import { useRouter } from "vue-router";
export default {
  name: "UserComponent",
  setup() {
    const newUserList = ref([]);
    const fullUsersList = ref([]);
    const valueSearch = ref('');
    const firestore = getFirestore(app);
    const items = ref([]);
    const router = useRouter();

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

    // Aramada gelen öge seçilir
    const filterUser = () => {
      const userDetail = valueSearch.value.id;
      console.log("FT : ", userDetail);

      if (userDetail != undefined) {
        router.push({
          name: "UserView",
          params: { id: userDetail }
        })
      }
    }

    //Arama yapma alanı
    const search = () => {
      items.value = [];
      const filteredUser = fullUsersList.value.filter((item) => {
        return item.displayName.toLowerCase().includes(valueSearch.value.toLowerCase());
      });
      filteredUser.forEach((item) => {
        items.value.push({
          displayName: item.displayName,
          id: item.id,
          photo: item.profilePhoto
        })
      })

    }


    return { newUserList, search, items, valueSearch, filterUser, fullUsersList }
  }

}
</script>

<style scoped>
.searchStyle {
  height: 36px;
  display: flex;
  justify-content: center;
  margin: 16px;
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