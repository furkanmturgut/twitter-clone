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
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';


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
app.component("TWTabPanel",TabPanel);
app.component("TWTabView",TabView);

app.mount('#app');
