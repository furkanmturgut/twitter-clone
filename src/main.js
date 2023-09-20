import { createApp } from 'vue'
import App from './App.vue'
import router  from './router/router.js'
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Avatar from 'primevue/avatar';
import Textarea from 'primevue/textarea';
import ConfirmDialog from 'primevue/confirmdialog';
import ConfirmationService from 'primevue/confirmationservice';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import AutoComplete from 'primevue/autocomplete';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import "primevue/resources/themes/lara-light-indigo/theme.css";
import FileUpload from 'primevue/fileupload';
import InlineMessage from 'primevue/inlinemessage';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAuP8Uf5cPkJHs_WZ0T6_zajUUgKXI7nfU",
  authDomain: "twitter-clone-de58a.firebaseapp.com",
  projectId: "twitter-clone-de58a",
  storageBucket: "twitter-clone-de58a.appspot.com",
  messagingSenderId: "428615973121",
  appId: "1:428615973121:web:f7794a38c041c9d6c28300"
};
initializeApp(firebaseConfig);

const app = createApp(App);

app.use(router);
app.use(PrimeVue);
app.use(ConfirmationService);
app.use(ToastService);

// PrimeVue
app.component("TWButton",Button);
app.component("TWInputText",InputText);
app.component("TWPassword",Password);
app.component("TWInlineMessage",InlineMessage);
app.component("TWConfirmDialog",ConfirmDialog);
app.component("TWToast",Toast);
app.component("TWCircleImage",Avatar);
app.component("TWTextarea",Textarea);
app.component("TWAutoComplete",AutoComplete);
app.component("TWUploadButton",FileUpload);

app.mount('#app');
