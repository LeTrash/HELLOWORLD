const firebaseConfig = {
  apiKey: "AIzaSyCRJ5PnudFcgK1LfizQTIwgkEsbJPoElCQ",
  authDomain: "venue-request.firebaseapp.com",
  databaseURL: "https://venue-request-default-rtdb.firebaseio.com",
  projectId: "venue-request",
  storageBucket: "venue-request.appspot.com",
  messagingSenderId: "959735603392",
  appId: "1:959735603392:web:70ea036740aa2cef650d25",
};

//initialize firebase
firebase.initializeApp(firebaseConfig);
//reference database
var venueRequestDB = firebase.database().ref("venueRequest");

document.getElementById("venueRequest").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  var name = getElementVal("name");
  var email = getElementVal("email");
  var phone = getElementVal("phone");
  var party = getElementVal("party");
  var venue = getElementVal("venue-selection");
  var date = getElementVal("date-request");
  var comments = getElementVal("comments");

  //   console.log(name, email, phone, party, venue, date, comments);
  saveMessages = (name, email, phone, party, venue, date, comments);
}

const saveMessages = (name, email, phone, party, venue, date, comments) => {
  var newRequestForm = venueRequestDB.push();

  newRequestForm.set({
    name: name,
    email: email,
    phone: phone,
    party: party,
    venue: venue,
    date: date,
    comments: comments,
  });
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};
