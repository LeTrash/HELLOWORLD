const firebaseConfig = {
  apiKey: "AIzaSyCRJ5PnudFcgK1LfizQTIwgkEsbJPoElCQ",
  authDomain: "venue-request.firebaseapp.com",
  databaseURL: "https://venue-request-default-rtdb.firebaseio.com",
  projectId: "venue-request",
  storageBucket: "venue-request.appspot.com",
  messagingSenderId: "959735603392",
  appId: "1:959735603392:web:70ea036740aa2cef650d25",
};

firebase.initializeApp(firebaseConfig);

firebase.database().ref("venueRequest");
