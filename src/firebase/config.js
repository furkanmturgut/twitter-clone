import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAuP8Uf5cPkJHs_WZ0T6_zajUUgKXI7nfU",
  authDomain: "twitter-clone-de58a.firebaseapp.com",
  projectId: "twitter-clone-de58a",
  storageBucket: "twitter-clone-de58a.appspot.com",
  messagingSenderId: "428615973121",
  appId: "1:428615973121:web:f7794a38c041c9d6c28300",
  databaseURL:
    "https://twitter-clone-de58a-default-rtdb.europe-west1.firebasedatabase.app",
};

const app = initializeApp(firebaseConfig);

export { app };
 