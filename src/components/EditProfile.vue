<template>
    <TWToast></TWToast>

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

    <label style="color: #25abe1ef; font-size: 14px; margin-left: 20px; ">Yaşınızı Girin</label>
    <span class="p-input-icon-right inputArea">
        <i class="pi pi-calendar" />
        <TWInputText @click="errorState.age = false" v-model="enteredAge" max="99" type="number" class="inputStyle" :value="enteredAge"
            placeholder="Yaş Belirleyin">
        </TWInputText>
    </span>

    <div style="display: flex;  justify-content: end;">
        <TWButton @click="saveButton" style="background-color: #25abe1ef;">Güncelle</TWButton>
    </div>
    <div style="margin-top: 20px; ">
        <TWInlineMessage style="width: 100%; margin-bottom:8px ;" v-if="errorState.display">{{ errorMessage.display }}</TWInlineMessage>
        <TWInlineMessage  style="width:100%" v-if="errorState.age">{{ errorMessage.age }}</TWInlineMessage>
        <TWInlineMessage severity="success" style="width:100%" v-if="errorState.success">{{ errorMessage.success }}</TWInlineMessage>

    </div>
</template>

<script>
import { inject, ref, computed } from 'vue';
import { getFirestore, query, collection, where, getDocs, updateDoc } from 'firebase/firestore';
import { app } from '@/firebase/config';
import { useRouter } from 'vue-router';
export default {
    setup() {
        const firestore = getFirestore(app);
        const data = inject("filteredUser", ref(''));
        const router = useRouter()
        const errorState = ref({ display: false, age: false,success:false });
        const errorMessage = ref({ display: null, age: null,success:null });
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

        const saveButton = async () => {
            if (enteredUsername.value.trim().length > 3) {
                errorState.value.display = false;
                if (enteredAge.value <= 99) {
                    const q = query(collection(firestore, "users"), where("id", "==", data.value.id));
                    const querySnapshot = await getDocs(q);
                    if (querySnapshot.size > 0) {
                        const document = querySnapshot.docs[0];
                        const updateData = {
                            biography: enteredBiography.value,
                            birthday: Number(enteredAge.value),
                            city: enteredCity.value,
                            displayName: enteredUsername.value,
                            fullname: enteredFullname.value
                        };

                        await updateDoc(document.ref, updateData);
                        errorState.value.success = true;
                        errorMessage.value.success = "Güncelleme başarılı yönlendiriliyorsunuz"
                        setTimeout(() => {
                            router.push({name:'HomeView'})

                        }, 2500);
                    }
                } else {
                    errorState.value.age = true;
                    errorMessage.value.age = "Lütfen geçerli bir yaş girin"
                }
            } else {
                errorState.value.display = true;
                errorMessage.value.display = "En az 3 harf içeren bir kullanıcı adı girin";
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


        return { saveButton, data, biographyLenght, enteredBiography, enteredUsername, usernameLenght, enteredCity, cityLenght, enteredFullname, fullnameLenght, errorMessage, errorState, enteredAge }
    }
}
</script>

<style scoped>
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