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
            <i @click="likeButton(tweet)" class="pi pi-heart " style="margin-top: 8px;">
                <span style="color: black; ">{{ ' ' + tweet.totalLike }} </span></i>
        </div>
    </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { getFirestore, collection, query, getDocs, where, updateDoc, onSnapshot } from 'firebase/firestore';
import { app } from '@/firebase/config';
import { getUserId } from '@/firebase/authProcces';
export default {
    props: ["tweetList"],
    name: "TweetComponent",
    setup() {
        const firestore = getFirestore(app);
        const likeState = ref(false);
        const myId = getUserId();
        let totalLikes = ref(null);
        const options = { hour: '2-digit', minute: '2-digit' };
        const likeArray = ref([]);
        onMounted(async () => {
            const q = query(collection(firestore, "likes"));
            onSnapshot(q, (querySnapshot) => {
                querySnapshot.forEach(() => {
                    likeArray.value = [];
                });
            });
            onSnapshot(q, (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    likeArray.value.push(doc.data());

                });
            });

        });
        //finish onMounted

        const likeButton = async (tweet) => {
            // içindeki twitler filtrelendi
            const filterArray = likeArray.value.filter((item) => {
                return item.tweetId == tweet.tweetId;
            });
            // console.log("Total Like : ", filterArray[0].totalLike)
            // like içinde olan beğenen kullanıcı arrayleri 
            const likeUserArray = filterArray[0].likeUser;

            //Kullanıcıya göre filterelendi
            const filterLikeUser = likeUserArray.filter((item) => {
                return item == myId
            });


            // console.log("Length : ", filterLikeUser.length)
            filterLikeUser.length >= 1 ? likeState.value = true : likeState.value = false;
            let likeCount = filterArray[0].totalLike;
            console.log("Like count type: ", typeof likeCount)

            if (likeState.value == true) {
                likeState.value = false
                console.log("Data : ", likeUserArray)
                const indexToRemove = likeUserArray.indexOf(myId);
                if (indexToRemove !== -1) {
                    likeUserArray.splice(indexToRemove, 1);
                    totalLikes = likeCount - 1;

                    console.log("Count Silme", totalLikes)
                    console.log("Sildi", likeUserArray)
                }

                console.log("False")

            } else {
                likeState.value = true;
                likeUserArray.push(myId);
                totalLikes = likeCount + 1

                console.log("Count Ekleme", totalLikes)

                console.log("Ekledi ", likeUserArray)
                console.log("True")
            }

            const q2 = query(collection(firestore, "likes"), where("tweetId", "==", tweet.tweetId));
            await getDocs(q2).then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const documentData = doc.data();
                    const updatedData = { ...documentData, likeUser: likeUserArray, totalLike: totalLikes };
                    updateDoc(doc.ref, updatedData)
                });

            });

            const queryTweets = query(collection(firestore, "tweetLists"), where("tweetId", "==", tweet.tweetId));
            await getDocs(queryTweets).then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const documentData = doc.data();
                    const updatedData = { ...documentData, totalLike: totalLikes };
                    updateDoc(doc.ref, updatedData);
                })
            })
        }

        return { options, likeButton, likeState, totalLikes }
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