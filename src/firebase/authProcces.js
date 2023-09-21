import {getAuth,onAuthStateChanged} from 'firebase/auth';
import {ref} from 'vue';
import {app} from '@/firebase/config.js'

const auth = getAuth(app);
const userDisplay = ref(null);
const userId = ref(null);
const userPhoto = ref(null);

onAuthStateChanged(auth,(user)=> {
    if(user != null){
        userId.value = user.uid;
        user.providerData.forEach((profile)=> {
            userDisplay.value = profile.displayName;
            userPhoto.value = profile.photoURL;
        })
    }
});

export const getUserDisplay = () => userDisplay.value;
export const getUserId = () => userId.value;
export const getUserPhoto = () => userPhoto.value
