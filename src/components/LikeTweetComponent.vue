<template>
    <div class="feedPost" v-for="like in myLike" :key="like.tweetId">
        <div style="display: flex; flex-direction: row;">
            <TWCircleImage @click="userProfile(like.userId)" class="tweetUserPhoto" :image="like.profile" size="large"
                shape="circle"></TWCircleImage>
            <span style="display: flex;  align-items: center; margin-left: 10px; color: rgb(214, 190, 190);">@{{
                like.displayName }}</span>

            <div
                style=" display: flex; align-items: center; justify-content: end; margin-right: 16px; width: 100%; color: rgb(156, 141, 141);">
                <p>{{ like.tweetDate.toDate().toLocaleDateString() + ' ' +
                    like.tweetDate.toDate().toLocaleTimeString(undefined, options) }}</p>
            </div>
        </div>
        <div>
            <p class="textFeed">{{ like.tweet }}</p>
        </div>

        <div class="feedAction">
            <i @click="likeButton" class="pi pi-heart " style="margin-top: 8px;">
                <span style="color: black; ">{{ ' ' + like.totalLike }} </span></i>
        </div>
    </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { getFirestore, collection, query, onSnapshot } from 'firebase/firestore';
import { app } from '@/firebase/config';
import { useRouter } from 'vue-router';
export default {
    name: 'LikeTweet',
    setup() {
        const firestore = getFirestore(app);
        const myLike = ref([]);
        const userID = ref(null);
        const router = useRouter()

        userID.value = router.currentRoute.value.params.id;

        const userProfile = (selectUser) => {
            console.log("SELECTED ID: ", selectUser)
            console.log("User ID : ",userID.value)
            if (selectUser ==  userID.value) {
                router.push({ name: "ProfileView", params: { id: selectUser } })
            } else {
                router.push({ name: "UserView", params: { id: selectUser } })
            }
        }



        userID.value = router.currentRoute.value.params.id;
        console.log("Router PArams Like:",userID.value)
       onMounted(()=> {
        let likeArray = [];
        const q = query(collection(firestore, "tweetLists"));
            onSnapshot(q, (querySnapshot) => {
                querySnapshot.forEach(() => {
                    likeArray = [];
                });
            });

            onSnapshot(q,(querySnapshot)=>{
                querySnapshot.forEach((item)=>{
                    likeArray.push(item.data())

                    console.log("Data 2: ",likeArray);

                     myLike.value = likeArray.filter((item)=>{
                        return item.likeUser.some((user)=> user ==userID.value
)
                    });

                    console.log("My Like : ",myLike)

                });
            })
       });

       return {myLike,userProfile}
    }
}

</script>

<style scoped>
.feedPost {
    width: 98%;
    height: 160px;
    margin-top: 12px;
    margin-left: 1%;
    margin-right: 1%;
    background-color: #fff;
    border-bottom: 3px solid #9999;

}

.tweetUserPhoto {
    margin-left: 10px;
    margin-top: 10px;
}

.feedAction {
    display: flex;
    justify-content: center;
    border-top: 1px solid #f3f3f3ff;
    margin: 30px;

}

.textFeed {
    width: 100%;
    text-align: center;
    margin: 0;
}
</style>