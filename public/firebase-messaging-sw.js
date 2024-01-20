/* eslint-disable no-undef */
// importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

firebase.initializeApp({
  apiKey: 'AIzaSyBRZFSe-wZBxuq1H1klKDORGNMfZv9Y3G8',
  authDomain: 'vite-admin-5a901.firebaseapp.com',
  projectId: 'vite-admin-5a901',
  storageBucket: 'vite-admin-5a901.appspot.com',
  messagingSenderId: '124670154438',
  appId: '1:124670154438:web:014e098730d7f2c27f69c7',
  measurementId: 'G-72Q91M6QZ9'
});

// Retrieve firebase messaging
const messaging = firebase.messaging();
const channel = new BroadcastChannel('notifications');

// messaging.onBackgroundMessage((payload) => {
//   console.log('[firebase-messaging-sw.js] Received background message ', payload);
//   channel.postMessage(payload);
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: payload.notification.image,
//   };

//   self.registration.showNotification(notificationTitle || 'no title', notificationOptions);
// });
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  channel.postMessage(payload);
  const { body, title } = payload.notification;
  // Customize notification here
  const notificationTitle = '1';
  const notificationOptions = {
    body: '2',
    icon: '/images/Logo-2.png?w=3840&q=70'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
