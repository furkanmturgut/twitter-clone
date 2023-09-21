import { getFirestore, collection, addDoc} from 'firebase/firestore';
import {app} from '@/firebase/config';

const firestore = getFirestore(app);

const saveTweet = async (data) => {
 
       await addDoc(collection(firestore, 'tweetLists'), data);
    
  };
  
  export default saveTweet;
