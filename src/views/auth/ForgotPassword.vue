<template>
    <div class="cardRow">
        <div class="registerArea">
            <form @submit.prevent="handleForgot">
                <h3>Parola Sıfırla</h3>
                <span class="p-input-icon-right">
                    <i class="pi pi-envelope" style="margin-right: 10px;" />
                    <TWInputText v-model="enteredMail" class="inputStyle" placeholder="Email Adresi Giriniz"></TWInputText>
                </span>
                <TWInlineMessage class="inlineStyle" v-if="errorState" severity="info">{{ errorMessage  }}</TWInlineMessage>
                <span>
                    <TWButton @click="openToast" type="submit" label="Parola Sıfırla"></TWButton>
                </span>
            </form>
            <div class="toLoginStyle">Giriş Yapmak İster Misin?  <router-link :to="{ name: 'LoginView' }"
                    style="color: #25abe1ff;">Giriş
                    Yap</router-link></div>
        </div>
        <div class="sloganArea">
            <div
                style="font-size:calc(1.5rem + .75vw); font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">
                Olan biten
                burada</div>
            <div class="rightStyle"> <img src="@/assets/x-logo.png" style="width: 100px;" alt=""></div>
            <TWToast></TWToast>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { sendPasswordResetEmail, getAuth } from 'firebase/auth'
import { useToast } from 'primevue/usetoast';
export default {
    name: 'ForgotPassword',
    setup() {
        const enteredMail = ref(null);
        const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        const errorState = ref(false);
        const errorMessage = ref(null);
        const auth = getAuth();
        const toast = useToast();

        const openToast = () => {
            if (emailRegex.test(enteredMail.value)) {
            toast.add({severity:'success',detail:'Sıfırlama Bağlantısı Gönderildi',life:2000,summary:'Parola Sıfırlama'})
            }
        }

        const handleForgot = () => {
            if (emailRegex.test(enteredMail.value)) {
                errorState.value = false;
                sendPasswordResetEmail(auth,enteredMail.value)
            } else {
                errorState.value = true;
                errorMessage.value = "Geçeri bir email giriniz."
            }
        }

        return { handleForgot, enteredMail, errorMessage, errorState,openToast }
    }

}
</script>


<style scoped>
@media (max-width: 440px) {
    .registerArea {
        padding: 20px;
    }
}


.inlineStyle {
    width: 270px;
    height: 40px;
    text-align: center;
    margin-top: 10px;
}

.toLoginStyle {
    margin-top: 10px;
    position: relative;
}

.sloganArea {
    float: right;
    width: 35%;
    height: 100%;
    float: left;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background-color: #25abe1ff;
}

.registerArea {
    width: 65%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

}

.inputStyle {
    width: 270px;
    height: 40px;
    background-color: #f3f3f3ff;
    margin: 15px;
    border: 1px solid #f3f3f3ff;
    border-radius: 8px;
}


button {
    margin-top: 20px;
    width: 270px;
    height: 40px;
    background-color: #25abe1ff;
    border: 1px solid #25abe1ff;
    border-radius: 8px;
    color: #fff;

}


a {
    text-decoration: none;
}

button:hover {
    background-color: rgb(20, 133, 209);
}

form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.rightStyle {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    margin-top: 30px;
}

.cardRow {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    position: absolute;

}
</style>