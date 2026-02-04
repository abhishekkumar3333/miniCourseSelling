import admin from "firebase-admin";

// You must add your serviceAccountKey.json file to the backend folder!
// If you intentionally skip this, the notification feature will crash.
let serviceAccount;
try {
  // Using absolute path dynamically or relative to where index.js is run
  // Assuming serviceAccountKey.json is in the root of 'backend'
  serviceAccount = await import(
    "file:///c:/Bringletech/MiniCourseSelling/backend/serviceAccountKey.json",
    {
      assert: { type: "json" },
    }
  );
} catch (error) {
  console.warn(
    "WARNING: serviceAccountKey.json not found in backend root. Notifications will not work.",
  );
}

if (serviceAccount && !admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount.default),
  });
} else if (!serviceAccount) {
  // initialize with default creds if available (e.g. google cloud env) or just warn
  console.warn("Firebase Admin not initialized due to missing key.");
}

export const sendNotification = async (fcmToken, title, body) => {
  if (!admin.apps.length) {
    console.error("Firebase Admin not initialized.");
    return;
  }

  try {
    const message = {
      notification: {
        title: title,
        body: body,
      },
      token: fcmToken,
    };

    const response = await admin.messaging().send(message);
    console.log("Successfully sent message:", response);
    return response;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};
