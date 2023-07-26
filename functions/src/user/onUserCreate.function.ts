import {firestore} from "firebase-functions";
import * as admin from "firebase-admin";
import { User } from "../common/utils";

export default firestore.document("users/{userId}").onCreate((snap) => {
  const createdValue = snap.data() as User;

  return admin.firestore().collection("usernames").doc(createdValue.username).set({userId: snap.id});
});
