import {firestore} from "firebase-functions";
import * as admin from "firebase-admin";
import { User } from "../common/utils";

export default firestore.document("users/{userId}").onDelete((snap) => {
  const deletedValue = snap.data() as User;

  if (!deletedValue.username) {
    return null;
  }

  return admin.firestore().collection("usernames").doc(deletedValue.username).delete();
});
