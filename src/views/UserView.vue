<template>
    <menu-component></menu-component>
    <profile-component :filteredUser="filteredUser" :joinedDate="joinedDate" @editProfile="profileButton"
        :isUser="isUserControl" :followMe="followMe" :followChange="followChange"></profile-component>
    <new-user></new-user>
</template>
  
<script>
import { getUserId } from '@/firebase/authProcces';
import { onMounted, ref, defineAsyncComponent,provide } from 'vue';
import { getFirestore, collection, query, onSnapshot, getDocs, updateDoc, where } from 'firebase/firestore';
import { app } from '@/firebase/config';
import { useRouter } from 'vue-router';
import ProfileComponent from '@/components/ProfileComponent.vue';
import MenuComponent from '@/components/MenuComponent.vue';
import NewUser from '@/components/NewUser.vue';
import { useDialog } from 'primevue/usedialog';

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
        const followMe = ref(null);
        const followChange = ref(null);
        const EditProfile = defineAsyncComponent(() =>
            import('@/components/EditProfile.vue')
        );
        const dialog = useDialog();

        // Verimi EditProfile provide ile yolladım
        provide("filteredUser", filteredUser);

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
            onSnapshot(userQuery, (querySnapshot) => {
                querySnapshot.forEach(() => {
                    usersData.value = [];
                });
            });

            onSnapshot(userQuery, (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    usersData.value.push(doc.data());
                });
                filteredUser.value = usersData.value.find((item) => {
                    return item.id == userID.value;
                });
                // Tarihi postta gösterme işlemi
                joinedDate.value = filteredUser.value.saveDate.toDate().toLocaleDateString();

                // takipçlerim
                const followMeList = usersData.value.filter((item) => {
                    return item.following.includes(userID.value);
                });
                followMe.value = followMeList.length

            });

        }); // onMounted

        const profileButton = async (userId) => {
            // Eğer kullanıcı düzenleme yapacaksa
            if (isUserControl.value) {
                console.log("sea user benim");
                dialog.open(EditProfile, {
                    props: {
                        header: 'Profili Güncelle',
                        style: {
                            width: '450px',
                        },

                        modal: true,
                    },

                });

                // kullanıcı takip işlemleri
            } else {
                const following = usersData.value.filter((item) => {
                    return item.id == myID;
                });
                //Benim buradayım be buradayım vallahi de buradayım billahi de buradayım.
                console.log("Benim bilgiler : ", following);

                //Takip ettiklerim listesi
                const followUser = following[0].following;
                console.log("Benim takip ettiklerim tam liste : ", followUser);

                // button değişikliği içine benim takip ettiğimde bu var mı ?
                followChange.value = followUser.includes(userID.value);
                console.log("Follow Change : ", followChange.value);


                // gelen id benim takip ettiklerimde var mı ?
                const followControl = followUser.includes(userId)
                console.log("Takip ettiğim de seçili kullanıcı var mı?", followControl);

                //Varsa sil yoksa ekle
                if (followControl) {
                    const indexToRemove = followUser.indexOf(userId);
                    if (indexToRemove !== -1) {
                        followUser.splice(userId, 1)
                        console.log("Sildi", followUser)
                    }
                } else {
                    console.log("Ekledi")
                    followUser.push(userId);
                    console.log("Follow User : ", followUser)
                }

                const addFollow = query(collection(firestore, "users"), where("id", "==", myID));
                await getDocs(addFollow).then((querySnapshot) => {
                    querySnapshot.forEach(async (item) => {
                        const docData = item.data();
                        const updateData = { ...docData, following: followUser };
                        await updateDoc(item.ref, updateData);
                    })
                })
            }
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

        return { selectedTab, tweetValue, likeValue, isUserControl, profileButton, filteredUser, joinedDate, followMe, followChange }
    }
}
</script>
  
 