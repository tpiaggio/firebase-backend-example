import {firestore} from "firebase-functions";
import * as admin from "firebase-admin";
import { User } from "../common/utils";

const db = admin.firestore();

export default firestore.document("users/{userId}").onUpdate((change, context) => {
  const newValue = change.after.data() as User;
  const previousValue = change.before.data() as User;

  // We'll only update if the username has changed.
  if (newValue.username == previousValue.username) {
    return null;
  }

  const {userId} = context.params;
  const batch = db.batch();
  if (previousValue.username) {
    batch.delete(db.collection("usernames").doc(previousValue.username));
  }
  batch.set(db.collection("usernames").doc(newValue.username), {userId});
  return batch.commit();
});
