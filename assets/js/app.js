
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

    //Train Button Submit
    $("#submitTrain").on("click", function(event){
        event.preventDefault();

        //Object for temp train data
        var newTrain = {
            name: trainName,
            destination: trainDestination,
            frequency: trainFrequency,
            // arrival: trainArrival,
            // minaway: trainMinAway
        };//Object END


        //Grab train form input when submitted
        var trainName = ("#train-name").val().trim();
        // var trainDestination = ("#trainDestination").val().trim();
        // var trainFrequency = ("#trainFrequency").val().trim();
        // var trainArrival = ("#").val().trim();

        //UPLOAD TRAIN DATA TO FIREBASE
        trainDatabase.ref().push(newTrain);

        //LOG TO CONSOLE
        console.log(newTrain.name);
        // console.log(newTrain.destination);
        // console.log(newTrain.frequency);
        // console.log(newTrain.arrival);


        alert("Train added to the table.")

        

    });//TRAIN BUTTON END

});//Document.ready END


