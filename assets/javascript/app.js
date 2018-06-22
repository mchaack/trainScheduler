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

  // Initial Values
  var trainName = "";
  var destination = "";
  var firstTime = "";
  var frequency = "";

//button for adding trains
$('#submitButton').on('click', function(){

	//gets user input
	var trainName = $('#trainNameInput').val().trim();
	var destination = $('#destinationInput').val().trim();
	var firstTime = moment($('#timeInput').val().trim(), "HH:mm").format("");
	var frequency = $('#frequencyInput').val().trim();

	//creates local holder for train times
	trainData.ref().push({

		trainName: trainName,
		destination: destination,
		firstTime: firstTime,
		frequency: frequency,
	
	});
	//uploads data to the database
	

	
	//clears all of the text boxes
	$('#trainNameInput').val("");
	$('#destinationInput').val("");
	$('#timeInput').val("");
	$('#frequencyInput').val("");

	return false;
});

//when a new item is added (child) do this function
trainData.ref().on("child_added", function(childSnapshot, prevChildKey){

	// console.log(childSnapshot.val());

	//store everything into a variable
	var trainName = childSnapshot.val().trainName;
	var destination = childSnapshot.val().destination;
	var firstTime = childSnapshot.val().firstTime;
	var frequency = childSnapshot.val().frequency;

	//train info
	// console.log(trainName);
	// console.log(destination);
	// console.log(firstTime);
	// console.log(frequency);

	//convert first time (push back 1 year to make sure it comes before current time)
	var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
	// console.log(firstTimeConverted);

	//current time
	var currentTime = moment();
	// console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

	//difference between the times
	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	// console.log("DIFFERENCE IN TIME: " + diffTime);

	//time apart (remainder)
	var tRemainder = diffTime % frequency;
	// console.log(tRemainder);

	//minute until train
	var tMinutesTillTrain = frequency - tRemainder;
	// console.log("MINUTES TIL TRAIN: " + tMinutesTillTrain);

	//next train
	var nextTrain = moment().add(tMinutesTillTrain, "minutes");
	var nextTrainConverted = moment(nextTrain).format("hh:mm a");
	// console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));

	//add each trains data into the table
	$("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + "Every " + frequency + " minutes" + "</td><td>" + nextTrainConverted + "</td><td>" + tMinutesTillTrain + "</td></tr>");

});


