import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyD1aRZ_CM2Qx5aTbl5N3yAjHA3yKoFKv7s",
  authDomain: "minicourse-64dfc.firebaseapp.com",
  projectId: "minicourse-64dfc",
  storageBucket: "minicourse-64dfc.firebasestorage.app",
  messagingSenderId: "282299027294",
  appId: "1:282299027294:web:5b9816eef6145e943109cf",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestForToken = async () => {
  try {
    const currentToken = await getToken(messaging, {
      vapidKey:
        "BFGDKetbNJbMXP-WVtPAJCcmxtlVLteNYZYRUelP_ilzFdAL_dbimf5NkbYngak0x5uw9xjXw7sV6yEz-CprPXE",
    });
    if (currentToken) {
      console.log("current token for client: ", currentToken);
      return currentToken;
    } else {
      console.log(
        "No registration token available. Request permission to generate one.",
      );
      return null;
    }
  } catch (err) {
    console.log("An error occurred while retrieving token. ", err);
    return null;
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });

export { app, messaging };
