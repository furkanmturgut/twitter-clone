<template>
    <!-- Profile Photo  -->
    <div style="display: flex; align-items: center; justify-content: center;">
        <TWCircleImage class="tweetUserPhoto" :image="enteredPhoto" size="xxlarge" shape="circle">
        </TWCircleImage>
        <label>
            <input style="display: none; background-color: #25abe1ff;" type="file" accept="image/png,image/jpeg,image/jpg "
                @change="onUpload">
            <span> <i class="pi pi-history" style="margin-top:-10px; color: #25abe1ef; cursor: pointer;"></i> </span>
        </label>
    </div>

    <!-- Biography -->
    <label style="color: #25abe1ef; font-size: 14px; margin-left: 20px; ">Biyografi</label>
    <span>
        <TWTextarea class="inputArea" maxRows="2" :value="enteredBiography" v-model="enteredBiography" autoResize
            placeholder="Biyografi" maxlength="120">
        </TWTextarea>
        <small
            style="justify-content: end;margin-right: 20px; align-items: center; display:flex; font-size: 12px; color: #25abe1ef;">{{
                biographyLenght
            }}</small>
    </span>

    <!-- Username -->
    <label style="color: #25abe1ef; font-size: 14px; margin-left: 20px; ">Kulanıcı Adı</label>
    <span class="p-input-icon-right inputArea">
        <i class="pi pi-at" />
        <TWInputText v-model="enteredUsername" class="inputStyle" @click="errorState.display = false"
            :value="enteredUsername" placeholder="Kullanıcı Adı Belirleyin">
        </TWInputText>
    </span>
    <small
        style="justify-content: end;margin-right: 20px; align-items: center; display:flex; font-size: 12px; color: #25abe1ef;">{{
            usernameLenght
        }}</small>


    <!-- City -->
    <label style="color: #25abe1ef; font-size: 14px; margin-left: 20px; ">Şehir</label>
    <span class="p-input-icon-right inputArea">
        <i class="pi pi-map" />
        <TWInputText v-model="enteredCity" class="inputStyle" :value="enteredCity" placeholder="Şehir Belirleyin">
        </TWInputText>
    </span>
    <small
        style="justify-content: end;margin-right: 20px; align-items: center; display:flex; font-size: 12px; color: #25abe1ef;">{{
            cityLenght
        }}</small>

    <!-- Fullname -->
    <label style="color: #25abe1ef; font-size: 14px; margin-left: 20px; ">Ad Soyad</label>
    <span class="p-input-icon-right inputArea">
        <i class="pi pi-user" />
        <TWInputText v-model="enteredFullname" class="inputStyle" :value="enteredFullname"
            placeholder="Ad Soyad Belirleyin">
        </TWInputText>
    </span>
    <small
        style="justify-content: end;margin-right: 20px; align-items: center; display:flex; font-size: 12px; color: #25abe1ef;">{{
            fullnameLenght
        }}</small>

    <!-- Age -->
    <label style="color: #25abe1ef; font-size: 14px; margin-left: 20px; ">Yaşınızı Girin</label>
    <span class="p-input-icon-right inputArea">
        <i class="pi pi-calendar" />
        <TWInputText @click="errorState.age = false" v-model="enteredAge" max="99" type="number" class="inputStyle"
            :value="enteredAge" placeholder="Yaş Belirleyin">
        </TWInputText>
    </span>

    <div style="display: flex;  justify-content: end;">
        <TWButton @click="saveButton" style="background-color: #25abe1ef;">Güncelle</TWButton>
    </div>
    <div style="margin-top: 20px; ">
        <TWInlineMessage style="width: 100%; margin-bottom:8px ;" v-if="errorState.display">{{ errorMessage.display }}
        </TWInlineMessage>
        <TWInlineMessage style="width:100%" v-if="errorState.age">{{ errorMessage.age }}</TWInlineMessage>
        <TWInlineMessage severity="success" style="width:100%" v-if="errorState.success">{{ errorMessage.success }}
        </TWInlineMessage>

    </div>
</template>

<script>
import { inject, ref, computed, onMounted } from 'vue';
import { app } from '@/firebase/config';
import { getStorage, ref as FSref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, where, query, getDocs, updateDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { useRouter } from 'vue-router';
export default {
    setup() {
        const myId = ref(null);
        const firestore = getFirestore(app);
        const storage = getStorage(app);
        const auth = getAuth(app);
        const data = inject("filteredUser", ref(''));
        const router = useRouter()
        const errorState = ref({ display: false, age: false, success: false });
        const errorMessage = ref({ display: null, age: null, success: null });
        const enteredBiography = ref('');
        enteredBiography.value = data.value.biography;
        const enteredUsername = ref('');
        enteredUsername.value = data.value.displayName;
        const enteredCity = ref('');
        enteredCity.value = data.value.city;
        const enteredFullname = ref('');
        enteredFullname.value = data.value.fullname;
        const enteredAge = ref(Number);
        enteredAge.value = data.value.birthday;
        const enteredPhoto = ref(null)
        enteredPhoto.value = data.value.profilePhoto;
        const file = ref(null);
        const downloadURL = ref(null);
        downloadURL.value = data.value.profilePhoto;

        const onUpload = (e) => {
            const fileInput = e.target;
            file.value = fileInput.files[0];

            if (file.value) {

                const reader = new FileReader();
                reader.onload = () => {
                    enteredPhoto.value = reader.result;
                };
                reader.readAsDataURL(file.value);

            } else {
                file.value = null
            }
        }

        onMounted(async () => {
            onAuthStateChanged(auth, (user) => {
                if (user != null) {
                    myId.value = user.uid;
                }
            })
        })

        const saveButton = async () => {
            // Görsel güncelleme işlemi file.value yakalanan görsel
            const id = Date.now();
            const storageRef = FSref(storage, `profilePhoto/${id}`);
            if (file.value != null) {
                const fileSnapshot = await uploadBytes(
                    storageRef,
                    file.value);
                downloadURL.value = await getDownloadURL(fileSnapshot.ref);
                console.log("Download URL : ", downloadURL.value);
                enteredPhoto.value = downloadURL.value
            }

            // Veri güncelleme işlemi
            if (enteredUsername.value.trim().length > 3) {
                errorState.value.display = false;
                if (enteredAge.value <= 99) {
                    const q = query(collection(firestore, "users"), where("id", "==", myId.value));
                    const querySnapshot = await getDocs(q);
                    // Güncellenen yer 'users'
                    if (querySnapshot.size > 0) {
                        const document = querySnapshot.docs[0];
                        const updateData = {
                            biography: enteredBiography.value,
                            birthday: Number(enteredAge.value),
                            city: enteredCity.value,
                            displayName: enteredUsername.value,
                            fullname: enteredFullname.value,
                            profilePhoto: enteredPhoto.value,
                        };
                        //Tweet Listesinde güncelleme yapıldı
                        const q2 = query(collection(firestore, "tweetLists"), where("userId", "==", myId.value));
                        await getDocs(q2).then((querySnapshot) => {
                            querySnapshot.forEach((doc)=> {
                                const documentData = doc.data();
                            const updatedData = { ...documentData, profile: enteredPhoto.value,displayName:enteredUsername.value };
                            updateDoc(doc.ref, updatedData)
                            });
                            
                        })
                        // Firebase Auth içinde yer alan verilerin güncellenmesi
                        updateProfile(auth.currentUser, { displayName: enteredUsername.value, photoURL: enteredPhoto.value });

                        await updateDoc(document.ref, updateData);
                        errorState.value.success = true;
                        errorMessage.value.success = "Güncelleme başarılı yönlendiriliyorsunuz"
                        setTimeout(() => {
                            // router.go(0) ile sayfayı yenilemesini sağladık.
                            router.go(0);
                        }, 500);
                    }
                } else {
                    errorState.value.age = true;
                    errorMessage.value.age = "Geçerli bir yaş arallığı giriniz"
                }

            } else {
                errorState.value.display = true;
                errorMessage.value.display = "En az 3 karakter kullanıcı adı oluşturun."
            }
        }

        // Uzunluk kontrolleri yapıldı
        const biographyLenght = computed(() => {
            return enteredBiography.value.length <= 120 ? enteredBiography.value.length + "/120" : 'Maxiumum 120 karakterle sınırlıdır'
        });

        const usernameLenght = computed(() => {
            return enteredUsername.value.length <= 30 ? enteredUsername.value.length + "/30" : 'Maxiumum 30 karakterle sınırlıdır'
        });

        const cityLenght = computed(() => {
            return enteredCity.value.length <= 30 ? enteredCity.value.length + "/30" : "Maximum 30 karakterle sınırlıdır";
        });

        const fullnameLenght = computed(() => {
            return enteredFullname.value.length <= 40 ? enteredFullname.value.length + "/40" : "Maximum 40 karakterle sınırlıdır";
        });

        return {
            //Data
            data,
            //EnteredValue
            enteredPhoto,
            enteredBiography,
            enteredUsername,
            enteredCity,
            enteredFullname,
            enteredAge,
            //Length
            cityLenght,
            biographyLenght,
            usernameLenght,
            fullnameLenght,
            //Message
            errorMessage,
            errorState,
            // Action
            onUpload,
            saveButton
        }
    }
}
</script>

<style scoped>
.tweetUserPhoto {
    margin-left: 20px;
    margin-top: 10px;
    width: 80px;
    height: 80px;

}

.inputStyle {
    width: 100%;
    height: 40px;
    background-color: #f3f3f3ff;
    border: 1px solid #f3f3f3ff;
    border-radius: 8px;

}

.inputArea {
    width: 90%;
    margin: 14px
}
</style>