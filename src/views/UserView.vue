<template>
    <profile-component :filteredUser="filteredUser" :joinedDate="joinedDate" @editProfile="profileButton"></profile-component>
</template>
  
<script>
import { getUserId } from '@/firebase/authProcces';
import { onMounted, ref } from 'vue';
import { getFirestore, getDocs, collection, query } from 'firebase/firestore';
import { app } from '@/firebase/config';
import { useRouter } from 'vue-router';
import ProfileComponent from '@/components/ProfileComponent.vue';
export default {
    name: "UserView",
    components: {
        ProfileComponent
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

        const profileButton = () => {
             

                console.log("User")

            
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
  
 