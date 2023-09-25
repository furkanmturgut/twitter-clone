<template>
  <div class="cardRow">
    <div class="registerArea">
      <form class="formStyle" @submit.prevent="handleLogin">
        <h3>Giriş Yap</h3>
        <div class="p-input-icon-right inputArea">
          <i class="pi pi-envelope" />
          <TWInputText v-model="enteredMail" @input="formValidations(0)" class="inputStyle"
            placeholder="Email Adresi Giriniz"></TWInputText>
        </div>

        <span class="p-input-icon-right inputArea" >
          <i class="pi pi-lock" />
          <TWInputText v-model="enteredPassword" class="inputStyle" type="password" placeholder="Parola Belirleyin">
          </TWInputText>
        </span>
        <span>
          <TWButton  type="submit" label="Giriş Yap"></TWButton>
        </span>
        <span>
          <TWButton @click="toForgot('/forgot-password')" class="forgotButton" type="submit" label="Şifremi Unuttum">
          </TWButton>
        </span>
        <TWInlineMessage class="inlineStyle" v-if="errorState" severity="info">{{ errorMessage }}</TWInlineMessage>

      </form>
      <div class="toLoginStyle">Hesabın yok mu? <router-link :to="{ name: 'RegisterView' }" style="color: #25abe1ff;">Üye
          Ol</router-link></div>

    </div>
    <div class="sloganArea">
      <div
        style="font-size:calc(1.5rem + .75vw); font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">
        Olan biten
        burada</div>
      <div class="rightStyle"> <img src="@/assets/x-logo.png" style="width: 100px;" alt=""></div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';
export default {
  name: 'LoginView',
  setup() {
    const auth = getAuth();
    const enteredMail = ref(null);
    const enteredPassword = ref(null);
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    const errorState = ref(false);
    const errorMessage = ref(null);
    const router = useRouter();

    function toForgot(event) {
      router.push(`${event}`)
    }

    const formValidations = (type) => {
      switch (type) {
        case 0:
          if (emailRegex.test(enteredMail.value)) {
            errorState.value = false;
            if (enteredPassword.value >= 6) {
              handleLogin();
            }

          } else {
            errorState.value = true;
            errorMessage.value = "Geçerli bir eposta giriniz";
          }
          break;
      }
    }

    const handleLogin = () => {
      signInWithEmailAndPassword(auth, enteredMail.value, enteredPassword.value)
        .then(() => {
          router.push({ name: 'HomeView' })

        }).catch((error) => {
          if (error.message) {
            errorState.value = true;
            errorMessage.value = "Email veya parola hatalı"
            const passError = "Firebase: Error (auth/wrong-password).";
            if (passError == error.message) {
              errorMessage.value = "Parola hatalı";
            }
          }

        });

    }

    return { handleLogin, formValidations, enteredMail, enteredPassword, errorMessage, errorState, toForgot }
  }

}
</script>

<style scoped>
@media only screen and (max-width: 600px) {
  .inputArea {
    width: 90%;
    margin-bottom: 20px;

  }

}

@media only screen and (min-width: 601px) {
  .inputArea {
    width: 60%;
    margin: 20px 10px;

  }
}



.formStyle {
  width: 100%;
  height: auto;
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
  width: 100%;
  height: 40px;
  background-color: #f3f3f3ff;
  border: 1px solid #f3f3f3ff;
  border-radius: 8px;
}

.passStyle {
  width: 270px;
  height: 40px;
  background-color: #f3f3f3ff;
  margin-top: 15px;
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

.forgotButton {
  margin-top: 20px;
  width: 270px;
  height: 40px;
  background-color: #ffff;
  border: 1px solid #25abe1ff;
  border-radius: 8px;
  color: #25abe1ff;
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

}</style>