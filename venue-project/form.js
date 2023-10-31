{
  /* <>
  <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"></script>
  <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-database.js"></script>
</>; */
}

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

document
  .getElementById("venueRequest")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    submitForm(e);
  });

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

function submitForm(e) {
  var name = getElementVal("name");
  var email = getElementVal("email");
  var phone = getElementVal("phone");
  var party = getElementVal("party");
  var venue = getElementVal("venue-selection");
  var date = getElementVal("date-request");
  var comments = getElementVal("comments");

  //   console.log(name, email, phone, party, venue, date, comments);

  //alert
  document.querySelector(".alert").style.display = "block";
  saveMessages(name, email, phone, party, venue, date, comments);
  //reset form
  document.getElementById("venueRequest").reset();

  //remove alert
  setTimeout(() => {
    document.querySelector(".alert").style.display = "none";
  }, 3000);
}

const getElementVal = (id) => {
  return document.getElementById(id).value;
};

// var dataTable = document.getElementById("data-table");

// function populateTable(date) {
//   //c;ear the existing table rows so that it won't duplicate values
//   dataTable.querySelector("tbody").innerHTML = "";

//   dataTable.forEach(function (item) {
//     var row = dataTable.querySelector("tbody").insertRow();
//     var cell1 = row.insertCell(0);
//     var cell2 = row.insertCell(1);

//     cell1.innerHTML = item.column1Data;
//     cell2.innerHTML = item.column2Data;
//   });
// }

// venueRequestDB.on("value", function (snapshot) {
//   var data = [];
//   snapshot.forEach(function (childSnapshot) {
//     data.push(childSnapshot.val());
//   });
//   populateTable(data);
// });

function SelectAllData() {
  firebase
    .database()
    .ref("venueRequest")
    .on("value", function (AllRecords) {
      AllRecords.forEach(function (CurrentRecord) {
        var name = CurrentRecord.val().name;
        var email = CurrentRecord.val().email;
        var phone = CurrentRecord.val().phone;
        var venue = CurrentRecord.val().venue;
        var date = CurrentRecord.val().date;
        var comments = CurrentRecord.val().comments;
        var party = CurrentRecord.val().party;
        AddItemsToTable(name, email, phone, venue, date, comments, party);
      });
    });
  window.onload = SelectAllData;
}
var stdNo = 0;
function AddItemsToTable(name, email, phone, venue, date, comments, party) {
  var tbody = document.getElementById("tbody1");
  var trow = document.createElement("tr");
  var td1 = document.createElement("td");
  var td2 = document.createElement("td");
  var td3 = document.createElement("td");
  var td4 = document.createElement("td");
  var td5 = document.createElement("td");
  var td6 = document.createElement("td");
  var td7 = document.createElement("td");
  var td8 = document.createElement("td");
  td1.innerHTML = ++stdNo;
  td2.innerHTML = name;
  td3.innerHTML = email;
  td4.innerHTML = phone;
  td5.innerHTML = venue;
  td6.innerHTML = date;
  td7.innerHTML = comments;
  td8.innerHTML = party;
  trow.appendChild(td1);
  trow.appendChild(td2);
  trow.appendChild(td3);
  trow.appendChild(td4);
  trow.appendChild(td5);
  trow.appendChild(td6);
  trow.appendChild(td7);
  trow.appendChild(td8);
  tbody.appendChild(trow);
}
