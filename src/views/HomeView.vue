<template>
  <div class="cardRow">
    <menu-component></menu-component>
   
    <home-component></home-component>

    <TWToast></TWToast>

    <user-component></user-component>

    
  </div>
</template>

<script>
// import {  signOut } from 'firebase/auth';
// import { getFirestore, query, collection, getDocs, orderBy, addDoc, serverTimestamp ,onSnapshot} from 'firebase/firestore';
// import { getDatabase, ref as RDref ,set,serverTimestamp as serv } from "firebase/database";
// import { ref, computed } from 'vue';
// import { useRouter } from 'vue-router';
// import { useToast } from 'primevue/usetoast';
import MenuComponent from '@/components/MenuComponent.vue';
import UserComponent from '@/components/UserComponent.vue';
import HomeComponent from '@/components/HomeComponent.vue';
export default {
  name: 'HomeView',
  components:{
    MenuComponent,
    UserComponent,
    HomeComponent,
  },
  setup() {
  //   const userId = ref(null);
  //   const toast = useToast();
  //   const firestore = getFirestore();
  //   const database = getDatabase();
  //   const router = useRouter();
  //   const newUserList = ref([]);
  //   const fullUsersList = ref([]);
  //   const userProfilePhoto = ref(null);
  //   const enteredTweet = ref('');
  //   const userName = ref(null);
  //   const tweetList = ref([]);

  //   const tweetLenght = computed(() => {
  //     return enteredTweet.value.length <= 172 ? enteredTweet.value.length + "/172" : 'Maxiumum 172 karakterle sınırlıdır'
  //   })

  

  //   const getUserFunc = async () => {
  //     const userQuery = query(collection(firestore, "users"), orderBy("saveDate", "asc"));
  //     await getDocs(userQuery).then((querySnapshot) => {
  //       querySnapshot.forEach((doc) => {
  //         fullUsersList.value.push(doc.data());
  //         newUserList.value = fullUsersList.value.slice(fullUsersList.value.length - 5, fullUsersList.value.length).reverse();

  //       })
  //     });
  //   }
  //   getUserFunc();

  //   const getTweetFunc = async ()=> {
  //     const tweetQuery = query(collection(firestore,"tweetLists"),orderBy("tweetDate", "desc"));
  //     onSnapshot(tweetQuery,(querySnapshot)=> {
  //       tweetList.value = []
  //       querySnapshot.forEach((doc)=>  {
  //         tweetList.value.push(doc.data());
  //       });
    

  //     });
  //   }

  //   getTweetFunc();

    

  //   const addTweet = () => {
  //     if (enteredTweet.value.length != 0) {
  //       addDoc(collection(firestore, "tweetLists"), {
  //         userId: userId.value,
  //         tweet: enteredTweet.value,
  //         tweetDate: serverTimestamp(),
  //         profile:userProfilePhoto.value,
  //         displayName: userName.value
  //       }).then(() => {
  //         console.log("OK TWEET")
  //         enteredTweet.value = ''
  //         toast.add({ severity: "info", life: 2000, detail: "Tweet Gönderildi", summary: "Tweet" })
  //       });

  //       // User Twwet List 
  //       const randomId = Date.now();
  //      set(RDref(database,'userTweets/'+userId.value+ '/'+randomId ),{
  //       userId:userId.value,
  //       tweets:enteredTweet.value,
  //       tweetDate:serv()
  //      }).then(()=> {
  //       enteredTweet.value = ''
  //      })
  //     }
  //   }
  //   return { signOutUser, newUserList, userProfilePhoto, tweetLenght, enteredTweet, addTweet,tweetList,userName }
   }
}
</script>

<style scoped>


.cardRow {
  display: flex;
}


</style>