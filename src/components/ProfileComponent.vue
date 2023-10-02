<template>
    <div class="feedArea">
        <!-- back button & username & total tweet -->
        <div class="topBanner">
            <div style="width: 50px; height: 50px; display: flex; justify-content: center; align-items: center; ">
                <i class="pi pi-arrow-left" style=" margin-left: 20px; color: #25abe1ef; font-weight: bold;"></i>
            </div>

            <div style="display: flex; flex-direction: column; margin-left: 20px; justify-content: center;">
                <span style="font-weight: bold;  ">{{ filteredUser.fullname }}</span>
                <span style="font-size: 12px; color: #918c8c ;">{{ tweetList.length }} Tweet</span>
            </div>
        </div>

        <!-- Profile Photo & username & follow and share buttons -->
        <div class="profileHeader">
            <div style="display: flex; flex-direction: column;  width: 50%; height:120px ;">
                <TWCircleImage class="tweetUserPhoto" :image="filteredUser.profilePhoto" size="xxlarge" shape="circle">
                </TWCircleImage>
                <span style="font-weight: bold;  margin-left: 20px; margin-top: 10px; ">{{ filteredUser.fullname != null ?
                    filteredUser.fullname : '-' }}</span>
                <span style="font-size: 14px; margin-left: 20px; color: #c5c1c1;">@{{ filteredUser.displayName }}</span>
            </div>
            <!-- follow and share button  -->
            <div
                style="display: flex; width: 100%; height:auto; justify-content: flex-end; margin-right: 20px; align-items: center;">
                <TWButton class="shareButtonStyle" icon="pi pi-ellipsis-h"></TWButton>
                <TWButton :loading="loading" @click="profileButton(filteredUser.id)" class="followStyle">{{ isUser ? 'Düzenle' : followChange ? 'Takip Et':
                    'Takip Ediliyor' }}</TWButton>
            </div>

        </div>

        <div class="descArea">
            <!-- bio text -->
            <p :class="[filteredUser.biography != '' ? 'bioActive' : 'bioInActive']">
                {{ filteredUser.biography == '' && isUser ? 'Düzenleme yapmak için düzenleye tıkla' : filteredUser.biography }}</p>
            <!-- bio info (city age) -->
            <div style="display: flex; flex-direction: row; align-items: center; margin-left: 20px; color: #696969;">
                <span style="margin-right: 20px;">
                    <i class="pi pi-map-marker"> {{ filteredUser.city != '' ? ' ' + filteredUser.city : ' -' }}</i>
                </span>
                <span>
                    <i class="pi pi-calendar"> {{ filteredUser.birthday != '' ? ' ' + filteredUser.birthday + ' yaşında' : ' -' }}</i>
                </span>
            </div>
            <!--joined date -->
            <span style="margin-left: 20px; margin-top: 8px; font-size: 16px; color: #696969;">
                <i class=" pi pi-megaphone"> {{ ' ' + joinedDate + ' tarihinde katıldı' }}</i>
            </span>

            <!-- following and followers -->
            <div style="display: flex; flex-direction: row; margin-left: 20px; margin-top: 20px;">
                <span style="margin-right: 20px;"> <strong>{{ followMe == 0 ? '0':followMe }} </strong> Takipçi</span>
                <span><strong>{{ filteredUser.following == undefined ? '0':filteredUser.following.length }}</strong> Takip Edilen</span>
            </div>

            <div>
                <TWTabView>
                    <TWTabPanel>
                        <template #header>
                            <span @click="selectedTab('tweet')"
                                :class="{ active: tweetValue, inActive: !tweetValue }">Tweetler</span>
                        </template>
                        <!-- Tweetleri listeniyor bu özellik  -->
                        <tweet-component  :tweetList="tweetList"></tweet-component>

                    </TWTabPanel>
                    <TWTabPanel>
                        <template #header>
                            <span @click="selectedTab('like')"
                                :class="{ active: likeValue, inActive: !likeValue }">Beğeniler</span>
                        </template>
                        <like-tweet-component></like-tweet-component>
                    </TWTabPanel>
                </TWTabView>
            </div>
            <TWDialog></TWDialog>
        </div>
    </div>
</template>
  

<script>
import { getFirestore, collection, query, where, onSnapshot } from 'firebase/firestore';
import { app } from '@/firebase/config';
import { onMounted, ref } from 'vue';
import TweetComponent from './TweetComponent.vue';
import LikeTweetComponent from './LikeTweetComponent.vue';
import { useRouter } from 'vue-router';
export default {
    components: { TweetComponent,LikeTweetComponent },
    props: ["filteredUser", "joinedDate", "isUser","followMe","followChange"],
    emits: ["editProfile"],

    setup(props, { emit }) {
        const firestore = getFirestore(app);
        const tweetList = ref([]);
        const tweetValue = ref(false);
        const likeValue = ref(false);
        const userID = ref(null);
        const router = useRouter()
        const selectedState = ref("tweet");

        userID.value = router.currentRoute.value.params.id;

        const profileButton = (userId) => {
            emit("editProfile", userId)
        }

        onMounted(() => {
            myTweetList();

        })

        const myTweetList = async () => {
            const q = query(collection(firestore, "tweetLists"), where("userId", "==", userID.value));
            onSnapshot(q,(querySnapshot)=> {
                querySnapshot.forEach(()=> {
                    tweetList.value = []
                })
            });

            onSnapshot(q,(querySnapshot)=> {
                querySnapshot.forEach((item)=> {
                    tweetList.value.push(item.data());
                })
            });
        }

        // Selected TabManu redesign
        const selectedTab = (key) => {
            if (key === "tweet") {
                tweetValue.value = true;
                selectedState.value = "tweet"
                likeValue.value = false
            } else if (key === "like") {
                tweetValue.value = false;
                selectedState.value = "like"
                likeValue.value = true;
            } else {
                tweetValue.value = true;
            }
        }
        selectedTab();

        return { selectedTab, profileButton, tweetList, tweetValue, likeValue ,selectedState}
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
    height: max-content;
    margin-bottom: 16px;
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
