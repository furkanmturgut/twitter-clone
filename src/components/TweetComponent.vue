<template>
    <div class="feedPost" v-for="tweet in tweetList" :key="tweet.tweetId">
        <div style="display: flex; flex-direction: row;">
            <TWCircleImage @click="userProfile(tweet.userId)" class="tweetUserPhoto" :image="tweet.profile" size="large"
                shape="circle"></TWCircleImage>
            <span style="display: flex;  align-items: center; margin-left: 10px; color: rgb(214, 190, 190);">@{{
                tweet.displayName }}</span>

            <div
                style=" display: flex; align-items: center; justify-content: end; margin-right: 16px; width: 100%; color: rgb(156, 141, 141);">
                <p>{{ tweet.tweetDate.toDate().toLocaleDateString() + ' ' +
                    tweet.tweetDate.toDate().toLocaleTimeString(undefined, options) }}</p>
            </div>
        </div>
        <div>
            <p class="textFeed">{{ tweet.tweet }}</p>
        </div>

        <div class="feedAction">
            <i @click="likeButton(tweet)" :class="[tweet.likeUser.includes(myID) ? 'pi pi-heart-fill' :'pi pi-heart' ]" style="margin-top: 8px; color: red;">
                <span style="color: black; ">{{ ' ' + tweet.totalLike }} </span></i>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { getFirestore, collection, query, getDocs, where, updateDoc } from 'firebase/firestore';
import { app } from '@/firebase/config';
import { getUserId } from '@/firebase/authProcces';
import {useRouter} from 'vue-router';
export default {
    props: ["tweetList"],
    name: "TweetComponent",
    setup() {
        const firestore = getFirestore(app);
        const likeState = ref(false);
        const router = useRouter();
        const userID = ref(null);
        const myID = getUserId();
        let totalLikes = ref(null);
        const options = { hour: '2-digit', minute: '2-digit' };
        const likeArray = ref([]);

        userID.value = router.currentRoute.value.params.id;
    
        const userProfile = (selectUser) => {
            
            if (selectUser !=  userID.value) {
                console.log("Buradan gitti")
                router.push({ name: "UserView", params: { id: selectUser } })

            }
        }

        const likeButton = async (tweet) => {
            // içindeki twitler filtrelendi
            likeArray.value = tweet;
            // console.log("Like User Array :", likeArray.value.likeUser)

            const likeUserArray = likeArray.value.likeUser;
            // console.log("Like User Array :", likeArray.value[0])
            //Kullanıcıya göre filterelendi
            const filterLikeUser = likeUserArray.filter((item) => {
                return item ==  myID;
            });


            filterLikeUser.length >= 1 ? likeState.value = true : likeState.value = false;
            let likeCount = likeArray.value.totalLike;
            // console.log("Like count type: ", typeof likeCount)

            if (likeState.value == true) {
                likeState.value = false
                // console.log("Data : ", likeUserArray)
                const indexToRemove = likeUserArray.indexOf( myID);
                if (indexToRemove !== -1) {
                    likeUserArray.splice(indexToRemove, 1);
                    totalLikes = likeCount - 1;
                }

            } else {
                likeState.value = true;
                likeUserArray.push( myID);
                totalLikes = likeCount + 1
            }

            const queryTweets = query(collection(firestore, "tweetLists"), where("tweetId", "==", tweet.tweetId));
            await getDocs(queryTweets).then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const documentData = doc.data();
                    const updatedData = { ...documentData, totalLike: totalLikes, likeUser: likeUserArray };
                    updateDoc(doc.ref, updatedData);
                })
            })
        }

        return { options, likeButton, likeState, totalLikes,userProfile ,myID}
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