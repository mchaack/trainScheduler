// Initialize Firebase
var config = {
	apiKey: "AIzaSyADQajPnHY8TyoHAZlUdC9mxP5zMwadlAQ",
	authDomain: "trainschedule-f25e4.firebaseapp.com",
	databaseURL: "https://trainschedule-f25e4.firebaseio.com",
	projectId: "trainschedule-f25e4",
	storageBucket: "trainschedule-f25e4.appspot.com",
	messagingSenderId: "458460884429"
};
firebase.initializeApp(config);

var trainData = firebase.database();


var trainName = "";
var destination = "";
var firstTime = "";
var frequency = "";

//button for adding trains
$('#submitButton').on('click', function () {


	var trainName = $('#trainNameInput').val().trim();
	var destination = $('#destinationInput').val().trim();
	var firstTime = moment($('#timeInput').val().trim(), "HH:mm").format("");
	var frequency = $('#frequencyInput').val().trim();


	trainData.ref().push({

		trainName: trainName,
		destination: destination,
		firstTime: firstTime,
		frequency: frequency,

	});

	$('#trainNameInput').val("");
	$('#destinationInput').val("");
	$('#timeInput').val("");
	$('#frequencyInput').val("");

	return false;
});

trainData.ref().on("child_added", function (childSnapshot, prevChildKey) {

	var trainName = childSnapshot.val().trainName;
	var destination = childSnapshot.val().destination;
	var firstTime = childSnapshot.val().firstTime;
	var frequency = childSnapshot.val().frequency;

	var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
	// console.log(firstTimeConverted);


	var currentTime = moment();
	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	var tRemainder = diffTime % frequency;
	var tMinutesTillTrain = frequency - tRemainder;
	var nextTrain = moment().add(tMinutesTillTrain, "minutes");
	var nextTrainConverted = moment(nextTrain).format("hh:mm a");

	$("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + "Every " + frequency + " minutes" + "</td><td>" + nextTrainConverted + "</td><td>" + tMinutesTillTrain + "</td></tr>");

});


