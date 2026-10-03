importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js','https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');
firebase.initializeApp({apiKey:"AIzaSyB2ziv39cpnOyyfamabO1ujhU-1CyIdRaE",authDomain:"plusinmath-web.firebaseapp.com",projectId:"plusinmath-web",storageBucket:"plusinmath-web.firebasestorage.app",messagingSenderId:"444492731461",appId:"1:444492731461:web:14529f08d9ccf047dabf2c"});
firebase.messaging();
self.addEventListener('notificationclick',function(e){e.notification.close();e.waitUntil(clients.openWindow('/courses.html'));});
