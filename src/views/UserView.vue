<template>
    <menu-component></menu-component>
    <profile-component :filteredUser="filteredUser" :joinedDate="joinedDate"
        @editProfile="profileButton" :isUser="isUserControl"></profile-component>
    <new-user></new-user>
</template>
  
<script>
import { getUserId } from '@/firebase/authProcces';
import { onMounted, ref } from 'vue';
import { getFirestore, getDocs, collection, query } from 'firebase/firestore';
import { app } from '@/firebase/config';
import { useRouter } from 'vue-router';
import ProfileComponent from '@/components/ProfileComponent.vue';
import MenuComponent from '@/components/MenuComponent.vue';
import NewUser from '@/components/NewUser.vue';

export default {
    name: "UserView",
    components: {
        ProfileComponent,
        MenuComponent,
        NewUser
    },
    setup() {
        const userID = ref(null);
        const tweetValue = ref(false);
        const likeValue = ref(false);
        const myID = getUserId();
        const router = useRouter();
        const isUserControl = ref(false);
        const firestore = getFirestore(app);
        const usersData = ref([]);
        let filteredUser = ref([]);
        const joinedDate = ref(null)

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
        console.log("USER ID: ", userID.value)
        onMounted(async () => {
            userControlFunc();
            buttonControl()
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

        const buttonControl = () => {
            console.log("AAA")
            // get(userRef).then((snapshot) => {
            //     if (snapshot.exists()) {
            //         const veri = snapshot.val();
            //         buttonTypeControl.value = true
            //         console.log("Gelen veri : ", veri)
            //     } else {
            //         buttonTypeControl.value = false
            //         console.log("Veri bulunamadı!")
            //     }
            // }).catch((error) => {
            //     console.log("Error : ", error);
            // })

        }

        const profileButton = () => {
            // const userRef = RTref(realtime,  myID);
            // const data = 
            //     {userId: userID.value};
            // set(userRef, data).then(() => {
            //     console.log("OK")
            // }).catch((error) => {
            //     console.log("Hata: ", error);
            // });

            //USER DATA'DAN GELEN VERİYİ İŞLEYEREK SONUCA GİDİLİR
           
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

        return { selectedTab, tweetValue, likeValue, isUserControl, profileButton, filteredUser, joinedDate }
    }
}
</script>
  
 