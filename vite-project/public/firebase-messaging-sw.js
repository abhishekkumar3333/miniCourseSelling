importScripts(
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js",
);

firebase.initializeApp({
  apiKey: "AIzaSyD1aRZ_CM2Qx5aTbl5N3yAjHA3yKoFKv7s",
  authDomain: "minicourse-64dfc.firebaseapp.com",
  projectId: "minicourse-64dfc",
  storageBucket: "minicourse-64dfc.firebasestorage.app",
  messagingSenderId: "282299027294",
  appId: "1:282299027294:web:5b9816eef6145e943109cf",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload,
  );

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/vite.svg",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
