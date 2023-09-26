<template>
    <div class="feedPost" v-for="tweet in tweetList" :key="tweet.tweetDate">
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
            <i @click="likeButton(tweet)" :class="[tweet.likeState ? 'pi pi-heart-fill' : 'pi pi-heart']" class=" likeStyle"
                style="margin-top: 8px;"> <span style="color: black; ">{{ ' '+tweet.totalLike }}</span></i>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { getFirestore, collection, where, query, getDocs, updateDoc } from 'firebase/firestore';
import { app } from '@/firebase/config';
export default {
    props: ["tweetList"],
    name: "TweetComponent",
    setup() {
        const firestore = getFirestore(app);
        const likeSave = ref(null);
        const options = { hour: '2-digit', minute: '2-digit' };

        const likeButton = async (tweet) => {
            if (tweet.likeState == true) {
                tweet.likeState = false

                console.log("False")
                likeSave.value = tweet.totalLike - 1;

            } else {
                tweet.likeState = true;
                likeSave.value = tweet.totalLike + 1;
                console.log("True")

            }

            const q2 = query(collection(firestore, "tweetLists"), where("tweetId", "==", tweet.tweetId));
            await getDocs(q2).then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const documentData = doc.data();
                    const updatedData = { ...documentData, totalLike:likeSave.value ,likeState:tweet.likeState};
                    updateDoc(doc.ref, updatedData)
                });

            })
        }



        return { options, likeButton }
    }


}
</script>

<style scoped>
.likeStyle {
    color: red;

}

.likeStyle:hover {
    color: red
}

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