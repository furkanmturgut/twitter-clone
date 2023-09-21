import {
  getFirestore,
  query,
  collection,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { app } from "@/firebase/config";

const firestore = getFirestore(app);

export async function getTweetFunc() {
  const tweetLists = [];

  const tweetQuery = query(
    collection(firestore, "tweetLists"),
    orderBy("tweetDate", "asc")
  );
  onSnapshot(tweetQuery, (querySnapshot) => {
    tweetLists.value = [];
    querySnapshot.forEach((doc) => {
      tweetLists.value.push(doc.data());
    });
  });

  return tweetLists;
}
