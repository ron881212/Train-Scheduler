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
    $("#warning").html("");

    // stores the input in variables
    trainName = $("#trainName").val().trim();
    destination = $("#destination").val().trim();
    frequency = $("#frequency").val().trim();
    firstTrain = $("#firstTrain").val().trim();

    // a little form valadation
    if ((trainName !== "") && (destination !== "") && (frequency !== "") && (firstTrain !== "")) {
        if(isNaN($("#frequency").val())) {
            $("#warning").html("<span>Frequency must be a number</span>");
            return false;
        } else {
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
            $("#trainName").val("");
            $("#destination").val("");
            $("#frequency").val("");
            $("#firstTrain").val("");
        }
    } else {
        $("#warning").html("<span>Must fill out all forms</span>");
    }

});

// function to update site everytime child is added
database.ref().on("child_added", function (snapshot) {
    var sv = snapshot.val();
    console.log(sv.trainName);
    console.log(sv.trainDestination);
    console.log(sv.trainLeaving);
    console.log(sv.trainFrequency);
    // current time
    var currentTime = moment().format('HH:mm');
    
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(sv.trainLeaving, "HH:mm").subtract(1, "years");
   
    // Getting the difference between the times 
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    
    // Getting the reminder
    var tRemainder = diffTime % sv.trainFrequency;

    // Minutes Until Train
    var tMinutesTillTrain = sv.trainFrequency - tRemainder;

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");



    var tableRow = $("<tr>");
    var tableData1 = $("<td>");
    tableData1.text(sv.trainName);
    var tableData2 = $("<td>");
    tableData2.text(sv.trainDestination);
    var tableData3 = $("<td>");
    tableData3.text(sv.trainFrequency);
    var tableData4 = $("<td>");
    tableData4.text(nextTrain.format("hh:mm a"));
    var tableData5 = $("<td>");
    tableData5.text(tMinutesTillTrain);

    tableRow.append(tableData1, tableData2, tableData3, tableData4, tableData5);
    $(".table").append(tableRow);

}, function (error) {
    console.log("Errors: " + error);
});
