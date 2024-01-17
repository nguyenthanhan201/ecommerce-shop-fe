// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getMessaging, getToken } from 'firebase/messaging';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBRZFSe-wZBxuq1H1klKDORGNMfZv9Y3G8',
  authDomain: 'vite-admin-5a901.firebaseapp.com',
  projectId: 'vite-admin-5a901',
  storageBucket: 'vite-admin-5a901.appspot.com',
  messagingSenderId: '124670154438',
  appId: '1:124670154438:web:014e098730d7f2c27f69c7',
  measurementId: 'G-72Q91M6QZ9'
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// firebase storage
const storage = getStorage(firebaseApp);

// firebase auth
const authentication = getAuth(firebaseApp);

export const getMessagingToken = async () => {
  const messaging = getMessaging(firebaseApp);
  let currentToken = '';
  if (!messaging) return;
  try {
    // currentToken = await messaging.getToken({
    //   vapidKey: "",
    // });
    // const authToken = await JSON.parse(localStorage.getItem("token") || "{}");
    // BJMhONePIMNWN5o7KPo0NU-m8vMH_kmJxa2v3JBvLua7ZV6DVtJDedAvZDQPZ3jaZEQ-Xy43OlMzxTXA07vizOU
    // console.log("FCM registration token", currentToken);
    // post("/user-device/token", {
    //   user_id: authToken.user.id,
    //   firebase_token: currentToken,
    // }).then((res) => {
    //   // console.log("👌 ~ res", res)
    // });

    // Add the public key generated from the console here.
    await getToken(messaging).then((res) => {
      if (res) {
        // console.log('👌 ~ FCM registration token', res);
        // Send the token to your server and update the UI if necessary
        currentToken = res;
      } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
      }
    });
  } catch (error) {
    console.log('An error occurred while retrieving token. ', error);
  }
  return currentToken;
};

const messaging = typeof window !== 'undefined' ? getMessaging(firebaseApp) : null;

export { authentication, messaging, storage };
