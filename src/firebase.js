import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyAmE_mI1P602tWRuxy7qqATD_0-RkAEL4o",
    authDomain: "scrapple-98b0c.firebaseapp.com",
    databaseURL: "https://scrapple-98b0c.firebaseio.com",
    projectId: "scrapple-98b0c",
    storageBucket: "scrapple-98b0c.appspot.com",
    messagingSenderId: "519791639512",
    appId: "1:519791639512:web:9877d96ed1b4336cf1d0ad",
    measurementId: "G-LVCMYD4KEX"
};
 
firebase.initializeApp(firebaseConfig);
firebase.analytics();
export const db = firebase.firestore();
export const auth = firebase.auth();

export default db;