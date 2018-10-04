
$(document).ready(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDf2d5fRn1bbWhpzIL_RZFAhihS48bFWSc",
        authDomain: "ustrainstation.firebaseapp.com",
        databaseURL: "https://ustrainstation.firebaseio.com",
        projectId: "ustrainstation",
        storageBucket: "ustrainstation.appspot.com",
        messagingSenderId: "404814393220"
    };
    firebase.initializeApp(config);

    //Database variable to firebase database
    var trainDatabase = firebase.database();

    //Adding Train Submit Button
    $("#submitTrain").on("click", function (event) {
      
        event.preventDefault();//Prevent Browser from submiting the form - and gives js the go ahead

        //Creating local "temporary" object to hold info
        

        //Grabing User input from HTML Form
        var trainName = $("#train-name").val().trim();
        var trainDestination = $("#trainDestination").val().trim();
        var trainFrequency = $("#trainFrequency").val().trim();
        var firstTrainTime = $("#trainTime").val().trim();
        // var trainArrival = moment($("#trainTime").val().trim(), "1234", "hmm").format("HH:mm")
        // var trainMinAway = $("#").val().trim();///Needs to be calculated ///
        var firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");

        //var currentTime = moment();

        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

        var tRemainder = diffTime % trainFrequency;

        var tMinutesTillTrain = trainFrequency - tRemainder;

        var nextTrain = moment().add(tMinutesTillTrain, "minutes");

        var newTrain = {
            name: trainName,
            destination: trainDestination,
            frequency: trainFrequency,
            firstTrainTime : firstTrainTime,
            nextTrain: moment(nextTrain).format("hh:mm"),
            minaway: tMinutesTillTrain
        };//OBJECT END

       
       
        

        //Uploads Train data to the trainDatabase
        trainDatabase.ref().push(newTrain);

       
      
        //Clear all text-boxes
        $("#train-name").val("");
        $("#trainDestination").val("");
        $("#trainFrequency").val("");
        $("#trainTime").val("");
        // $("#").val("");


//TRAIN ARRIVAL MOMENT FUNCTION
// var trainArrivalMath = function(firstTrainTime,trainFrequency) {
//     var trainFrequency = 3;

//     //First Time push 1 year
//     var firstTimeConverted = moment(firtTime, "HH:mm").subtrackt(1,"years");
//     console.log(firstTimeConverted);




//};//TRAIN ARRIVAL FUNCTION END



}); //SUBMIT BUTTON END

    //FIREBASE EVENT to add train to database
    trainDatabase.ref().on("child_added", function(childSnapshot){
        console.log(childSnapshot.val());

        //Storing to variable
        var trainName = childSnapshot.val().name;
        var trainDestination = childSnapshot.val().destination;
        var trainFrequency = childSnapshot.val().frequency;
        var nextTrain = childSnapshot.val().nextTrain;
        var minaway = childSnapshot.val().minaway;
        


        //Need to calculate frequency and arrival with time of the train
        //////////////ENTER CODE BELOW//////////

        //CREATING TABLE ROWS
        var newRow = $("<tr>").append(
            $("<td>").text(trainName),
            $("<td>").text(trainDestination),
            $("<td>").text(trainFrequency),
            $("<td>").text(nextTrain),
            $("<td>").text(minaway),
        );//TABLE ROW END

        $('#tableBody').append(newRow);


        
    });//FIREBASE EVENT END

    







});//Document.ready END


