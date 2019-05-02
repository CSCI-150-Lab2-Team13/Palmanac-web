import firebase from 'firebase/app';

const config = {
  apiKey: "AIzaSyCbC-n--mjbOUSWOoTbjyxQcthtV7m5xhQ",
  authDomain: "scheduleapp-boof.firebaseapp.com",
  databaseURL: "https://scheduleapp-boof.firebaseio.com",
  projectId:"scheduleapp-boof",
  storageBucket: "scheduleapp-boof.appspot.com",
  messagingSenderId: "48199855930"
  };
const fire = firebase.initializeApp(config);
export default fire;