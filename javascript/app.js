// global variables
var trainName = "";
var destination = "";
var frequency = "";
var firstTrain = "";

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDK7l5LWJOsCvEl2L5OZYdfXXBBukW45Z4",
    authDomain: "train-scheduling-6bcbf.firebaseapp.com",
    databaseURL: "https://train-scheduling-6bcbf.firebaseio.com",
    projectId: "train-scheduling-6bcbf",
    storageBucket: "train-scheduling-6bcbf.appspot.com",
    messagingSenderId: "286048736152"
};

// iniatializing firebase
firebase.initializeApp(config);

// storing my database in a variable
var database = firebase.database();

// submit button function
$(document).on("click", "#addTrain", function (event) {
    event.preventDefault();

    // stores the input in variables
    trainName = $("#trainName").val().trim();
    destination = $("#destination").val().trim();
    frequency = $("#frequency").val().trim();
    firstTrain = $("#firstTrain").val().trim();
    
    // making table rows and puting them in variables
    var tableRow = $("<tr>");
    var tableData1 = $("<td>");
    tableData1.text(trainName);
    var tableData2 = $("<td>");
    tableData2.text(destination);
    var tableData3 = $("<td>");
    tableData3.text(frequency);
    var tableData4 = $("<td>");
    tableData4.text(firstTrain);
    var tableData5 = $("<td>");
    tableData5.text();

    // pushing and not setting tables in firebase
    database.ref().push({
        trainName: trainName,
        trainDestination: destination,
        trainLeaving: firstTrain,
        trainFrequency: frequency,
        
        // adds times stamp to entries 
        trainAddedTimestamp: firebase.database.ServerValue.TIMESTAMP
    });
});