<template>
  <menu-component></menu-component>

  <profile-component :filteredUser="filteredUser" :joinedDate="joinedDate" :isUser="isUserControl"
    @editProfile="profileButton(filteredUser.displayName)">

  </profile-component>

  <new-user></new-user>
</template>

<script>
import { getUserId } from '@/firebase/authProcces';
import { onMounted, ref, provide } from 'vue';
import { getFirestore, getDocs, collection, query } from 'firebase/firestore';
import { app } from '@/firebase/config';
import { useRouter } from 'vue-router';
import ProfileComponent from '@/components/ProfileComponent.vue';
import { defineAsyncComponent } from 'vue';
import { useDialog } from 'primevue/usedialog';
import MenuComponent from '@/components/MenuComponent.vue';
import NewUser from '@/components/NewUser.vue';
export default {
  components: { ProfileComponent, MenuComponent, NewUser },
  name: "ProfileView",

  setup() {
    const userID = ref(null);
    const myID = getUserId();
    const router = useRouter();
    const isUserControl = ref(false);
    const firestore = getFirestore(app);
    const usersData = ref([]);
    let filteredUser = ref([]);
    const joinedDate = ref(null);
    const EditProfile = defineAsyncComponent(() =>
      import('@/components/EditProfile.vue')
    );
    const dialog = useDialog();

    // Verimi EditProfile provide ile yolladım
    provide("filteredUser", filteredUser);
    
    const userControlFunc = () => {
      if (String(myID) == String(userID.value)) {
        isUserControl.value = true
        console.log("Aga bu ok")
      } else {
        isUserControl.value = false       
         console.log("Aga bu no")

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

        filteredUser.value = usersData.value.find((item) => {
          return item.id == userID.value;

        });

        joinedDate.value = filteredUser.value.saveDate.toDate().toLocaleDateString();

      });

    });

    //Edit Prfoil için dialog ekranı
    const profileButton = (a) => {
      console.log("A", a);
      dialog.open(EditProfile, {
        props: {
          header: 'Profili Güncelle',
          style: {
            width: '450px',
          },

          modal: true,
        },

      });
    }

    return { isUserControl, profileButton, filteredUser, joinedDate }
  }
}
</script>


<style scoped >
.bioActive {
  margin-left: 20px;
  margin-top: 26px;
  font-size: 14px;
  color: #696969;
}

.bioInActive {
  margin-left: 20px;
  margin-top: 26px;
  font-size: 14px;
  color: #25abe1ef;
  cursor: pointer;
  text-decoration: underline;
}

.active {
  color: #25abe1ef
}

.inActive {
  color: #696969
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