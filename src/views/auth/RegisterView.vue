<template>
  <div class="cardRow">
    <div class="registerArea">
      <form @submit.prevent="handleRegister">
        <h3>Üye Ol</h3>
        <span
          style="max-width: 270px; background-color: #25abe1ff; color: #fff; border: 1px solid #25abe1ff; padding: 10px; border-radius: 8px;">
          <label style="background-color: #25abe1ff;">
            <input style="display: none; background-color: #25abe1ff;"  type="file"
              @change="onUpload">
            <span v-if="!errorState.file">Profil Resmi Ekleyin</span>
            <span v-if="errorState.file">{{ errorMessage.file }} </span>
          </label>
        </span>
       
        <span class="p-input-icon-right">
          <i class="pi pi-at" style="margin-right: 10px;" />
          <TWInputText v-model="enteredUsername" class="inputStyle" placeholder="Kullanıcı Adı Belirleyiniz"
            @input="formValidations(0)"></TWInputText>
        </span>
        <TWInlineMessage class="inlineStyle" v-if="errorState.username" severity="info">{{ errorMessage.username }}
        </TWInlineMessage>

        <span class="p-input-icon-right">
          <i class="pi pi-envelope" style="margin-right: 10px;" />
          <TWInputText @input="formValidations(1)" v-model="enteredMail" class="inputStyle"
            placeholder="Email Adresi Giriniz"></TWInputText>
        </span>
        <TWInlineMessage class="inlineStyle" v-if="errorState.email" severity="info">{{ errorMessage.email }}
        </TWInlineMessage>

        <span class="p-input-icon-right">
          <i class="pi pi-lock"></i>
          <TWInputText v-model="enteredPassword" class="passStyle " type="password" placeholder="Parola Belirleyin"
            @input="formValidations(2)"></TWInputText>
          <div style="margin-top: 10px; font-size: 10px;">Üye olarak <span style="color: #25abe1ff;">Kullanıcı
              sözleşmesini</span> kabul edersiniz</div>
        </span>
        <TWInlineMessage class="inlineStyle" v-if="errorState.password" severity="info">{{ errorMessage.password }}
        </TWInlineMessage>

        <span>
          <TWButton @click="showToast" type="submit" label="Üye ol"></TWButton>
        </span>

        <TWInlineMessage class="inlineStyle" v-if="errorState.photo" severity="info">{{ errorMessage.photo }}
        </TWInlineMessage>
        <TWInlineMessage class="inlineStyle" v-if="errorState.nullProp" severity="info">{{ errorMessage.nullProp }}
        </TWInlineMessage>
      </form>
      <div class="toLoginStyle">Hesabın mı var? <router-link :to="{ name: 'LoginView' }" style="color: #25abe1ff;">Giriş
          Yap</router-link></div>
      <TWToast></TWToast>
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
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { collection, addDoc, getFirestore, serverTimestamp } from "firebase/firestore";
import { getStorage, ref as FSref, uploadBytes, getDownloadURL } from "firebase/storage";

import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';

export default {
  name: 'RegisterView',
  setup() {
    const auth = getAuth();
    const firestore = getFirestore();
    const storage = getStorage();
    const router = useRouter();
    const enteredMail = ref(null);
    const enteredUsername = ref(null);
    const enteredPassword = ref(null);
    const errorState = ref({ username: false, email: false, password: false, nullProp: false, file: false});
    const errorMessage = ref({ username: null, email: null, password: null, nullProp: null, file: null });
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    const passRegex = /^(?!\s)(.{6,})(?<!\s)$/;
    const usernameRegex = /^(?!\s)(.{5,})(?<!\s)$/;
    const toast = useToast();
    const types = ["image/png", "image/jpeg", "image/jpg"];
    const file = ref(null)

    const formValidations = (type) => {
      switch (type) {
        case 0:
          if (!enteredUsername.value == '' && usernameRegex.test(enteredUsername.value)) {
            errorState.value.username = false
          } else {
            errorState.value.username = true;
            errorMessage.value.username = "En az 5 karakter içeren kullanıcı adı oluşturun"
          }
          break;

        case 1:
          if (!enteredMail.value == '' && emailRegex.test(enteredMail.value)) {
            errorState.value.email = false
          } else {
            errorState.value.email = true;
            errorMessage.value.email = "Geçerli bir email adresi oluşturun"
          }
          break;

        case 2:
          if (!enteredPassword.value == '' && passRegex.test(enteredPassword.value)) {
            errorState.value.password = false
          } else {
            errorState.value.password = true;
            errorMessage.value.password = "En az 6 karakter şifre oluşturun"
          }
          break;
     
      }
    }

    const showToast = () => {
      if (usernameRegex.test(enteredUsername.value) && emailRegex.test(enteredMail.value) && passRegex.test(enteredPassword.value) && file.value != null && file.value != undefined) {

        toast.add({ severity: 'success', summary: 'Kayıt Başarılı', detail: 'Anasayfaya yönlendiriliyorsunuz', life: 2000 })
      }
    }
    const onUpload = (e) => {
      if (e.target.files[0] != undefined && e.target.files[0] != null) {
        errorState.value.file = true
        errorMessage.value.file = "Profil Resmi Eklendi";
      }

      const selected = e.target.files[0];
      if (selected && types.includes(selected.type)) {
        file.value = selected;
      }
    }

    const handleRegister = async () => {
      console.log("DURUM:", file.value);

      if (usernameRegex.test(enteredUsername.value) && emailRegex.test(enteredMail.value) && passRegex.test(enteredPassword.value) && file.value != null && file.value != undefined) {
        createUserWithEmailAndPassword(auth, enteredMail.value, enteredPassword.value)
          .then(async (userCreintial) => {
            const user = userCreintial.user;
            const id = Date.now();
            const storageRef = FSref(storage, `profilePhoto/${id}`);
            const fileSnapshot = await uploadBytes(
              storageRef,
              file.value
            );
            const downloadURL = await getDownloadURL(fileSnapshot.ref);
            console.log("DU:", downloadURL);
            console.log("FORMAT: ", typeof downloadURL)
            addDoc(collection(firestore, 'users'), {
              id: auth.currentUser.uid,
              displayName: enteredUsername.value,
              email: enteredMail.value,
              saveDate: serverTimestamp(),
              profilePhoto: downloadURL || '',

            });
            setTimeout(() => {
              if (!errorState.value.username) {
                showToast()
                router.push({ name: 'HomeView' })
              }
            }, 1000);

            return updateProfile(user, {
              displayName: enteredUsername.value,
              photoURL: downloadURL || ''
            });

          }).catch((error) => {
            errorState.value = true;
            console.log("Register Error: ", error);
            const member = "Firebase: Error (auth/email-already-in-use).";
            if (member == null) {
              errorMessage.value = "Bu email sisteme zaten kayıtlı";

            } else {
              errorMessage.value = "Lütfen tüm alanları doldurunuz";
            }
          })
      } else {
        errorState.value.nullProp = true
        errorMessage.value.nullProp = "Görsel ekleyin ve tüm alanları doldurun"
        console.log("HATA")
      }

    }
    return { enteredMail, enteredPassword, enteredUsername, handleRegister, formValidations, errorState, errorMessage, showToast, onUpload }
  }

}
</script>

<style scoped>
@media (max-width: 440px) {
  .registerArea {
    padding: 26px;
    margin-left: 10px;
  }
}


.inlineStyle {
  width: 270px;
  height: 40px;
  text-align: center;
  margin-top: 10px;
}

.toLoginStyle {
  margin-top: 30px;
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

.passStyle {
  width: 270px;
  height: 40px;
  background-color: #f3f3f3ff;
  margin-top: 15px;
  border: 1px solid #f3f3f3ff;
  border-radius: 8px;
}

button {
  margin-top: 30px;
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
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: absolute;

}
</style>