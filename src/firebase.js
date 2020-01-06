import firebase from 'firebase/app'
import 'firebase/app'
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAtt9dmW-bDf3WEnmClzLhTgWkZAktCYQc",
  authDomain: "finaldb-b801a.firebaseapp.com",
  databaseURL: "https://finaldb-b801a.firebaseio.com",
  projectId: "finaldb-b801a",
  storageBucket: "finaldb-b801a.appspot.com",
  messagingSenderId: "737374005165",
  appId: "1:737374005165:web:54a00b01d3c03bf7"
  };

  

firebase.initializeApp(config);

const firebaseDB = firebase.firestore();
firebaseDB.settings({timestampsInSnapshots : true})
const firebaseUsers = firebaseDB.collection('users');
const firebaseAdmin = firebaseDB.collection('admin');
const firebaseComplains = firebaseDB.collection('complains');


export {
    firebase,
    firebaseUsers,
    firebaseAdmin,
    firebaseComplains
    
}