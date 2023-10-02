<template>
    <menu-component></menu-component>
    <div class="feedArea">
        <!-- back button & fullname & username -->
        <div class="topBanner">
            <div style="width: 50px; height: 50px; display: flex; justify-content: center; align-items: center; ">
                <i class="pi pi-arrow-left" style=" margin-left: 20px; color: #25abe1ef; font-weight: bold;"></i>
            </div>

            <div style="display: flex; flex-direction: column; margin-left: 20px; justify-content: center;">
                <span style="font-weight: bold;  ">{{selectedUser}}</span>
                <span style="font-size: 12px; color: #918c8c ;">{{selectedUser.displayName}}</span>
            </div>
        </div>
        <!-- Chat Area -->
        <div class="chatArea">
            <div class="incoming-msg">
                <span>Deneme deneme</span>
                <span
                    style="display: flex; justify-content: flex-end; align-items: end; margin-right:4px;  font-size: 12px; height: 40px;">19.10</span>
            </div>

            <div class="send-msg">
                <span>Deneme yanıtı</span>
                <span
                    style="display: flex; justify-content: flex-end; align-items: end; margin-right:4px;  font-size: 12px; height: 40px;">19.10</span>
            </div>
        </div>
        <div style="display: flex; flex-direction: row;">
            <TWInputText class="sendArea" placeholder="Mesaj yaz..." v-model="messageContent"></TWInputText>
            <TWButton class="btnStyle" @click="sendMessage">Gönder</TWButton>
           
        </div>
        <div>
            {{ selectedUser }}
        </div>
    </div>
    <new-user></new-user>
</template>

<script>
import NewUser from '@/components/NewUser.vue';
import MenuComponent from '@/components/MenuComponent.vue';
import { onMounted, ref } from 'vue';
// import { getUserId } from '@/firebase/authProcces';
import { useRouter } from 'vue-router';
import { getFirestore,where,collection,getDocs,query } from 'firebase/firestore';
import { app } from '@/firebase/config';
export default {
    components: {
        NewUser, MenuComponent
    },
    name: "ChatScreen",
    setup() {
        const router = useRouter();
        const userId = ref(router.currentRoute.value.params.id)
        // const messageContent = ref(null);
        // const myId = getUserId();
        const selectedUser =ref([]);
        const firestore = getFirestore(app);

        onMounted(async()=>{
            const q = query(collection(firestore,"users"),where("id","==",userId.value));
            await getDocs(q).then((querySnapshot)=>{
                querySnapshot.forEach((item)=>{
                    selectedUser.value.push(item.data());

                });
            });
        });

        console.log("Selected User: ",selectedUser.value)

        

        return {selectedUser}
    }

}
</script>

<style scoped>
.btnStyle {
    margin-right: 1%;
    background-color: #000;
}

.btnStyle:hover {
    background-color: #fff;
    color: #000
}

.sendArea {
    width: 90%;
    margin-left: 1%;

}

.send-msg {
    width: 40%;
    height: 60px;
    background-color: #fff;
    border-radius: 6px;
    margin: 0px 10px;
}

.incoming-msg {
    width: 40%;
    height: 60px;
    background-color: #a6e1f3;
    border-radius: 6px;
    margin: 60px 10px;
    float: right;
}

.chatArea {
    background-color: #25abe1ef;
    width: 98%;
    margin: 0 1%;
    height: 500px;

}

.topBanner {
    margin-right: 1%;
    margin-left: 1%;
    width: 98%;
    height: 50px;
    background-color: #fff;
    display: flex;
    flex-direction: row;
    border-bottom: 3px solid #ececec;
}
</style>