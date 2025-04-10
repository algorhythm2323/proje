// Firebase yapılandırma
const firebaseConfig = {
  apiKey: "AIzaSyAB-eeL_xXv2Ox_f-bQ50Hnl-Kp-OIWXCY",
  authDomain: "restoran-sistem-demo.firebaseapp.com",
  projectId: "restoran-sistem-demo",
  storageBucket: "restoran-sistem-demo.appspot.com",
  messagingSenderId: "555397245377",
  appId: "1:555397245377:web:07d3c6845c4e68b33e6e5a",
  databaseURL: "https://restoran-sistem-demo-default-rtdb.firebaseio.com"
};

// Firebase uygulamasını başlat
firebase.initializeApp(firebaseConfig);

// Veritabanı ve kimlik doğrulama referansları
const db = firebase.firestore();
const auth = firebase.auth();
const realdb = firebase.database();

// Koleksiyon referansları
const menuCollection = db.collection('menu');
const masalarCollection = db.collection('masalar');
const siparislerCollection = db.collection('siparisler'); 