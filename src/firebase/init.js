import firebase from 'firebase'
import firestore from 'firebase/firestore'

// Initialize Firebase
var config = {
  apiKey: "AIzaSyA279-wNG0tRJoQaRRIwSTJb65kFvJkHWg",
  authDomain: "vue-grain-bowls.firebaseapp.com",
  databaseURL: "https://vue-grain-bowls.firebaseio.com",
  projectId: "vue-grain-bowls",
  storageBucket: "vue-grain-bowls.appspot.com",
  messagingSenderId: "99098638696"
};
const firebaseApp = firebase.initializeApp(config);


//export firestore database

export default firebaseApp.firestore()
