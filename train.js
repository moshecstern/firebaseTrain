$(document).ready(function () {

   

    // <body onload="load()">

    // 1. create 4 var to initilize var
    var trainName = "";
    var destination = "";
    var firstTrainTime = 0;
    var frequency = 0;



    // 2. add firebase info and add cdn link in html
    var firebaseConfig = {
        apiKey: "AIzaSyDKHFTDnuDXgnFwiC-J4zumVxoXElsaqKs",
        authDomain: "school-project-ad02a.firebaseapp.com",
        databaseURL: "https://school-project-ad02a.firebaseio.com",
        projectId: "school-project-ad02a",
        storageBucket: "school-project-ad02a.appspot.com",
        messagingSenderId: "409581060449",
        appId: "1:409581060449:web:fe3dc237e2f3441b1ac520"
    };
    firebase.initializeApp(firebaseConfig);

    var database = firebase.database();


    // 3. build on click function for submit
    $("#submit").on("click", function () {
        // use the 4 var to capture input values from 4 input boxes
        trainName = $("#name").val();
        destination = $("#destination").val();
        firstTrainTime = $("#firstTrainTime").val();
        frequency = $("#frequency").val();
        // console.log all var to check if we are capturing var
        console.log(trainName);
        console.log(destination);
        console.log(firstTrainTime);
        console.log(frequency);
        //use ref.push firebase function to send those var to database
        database.ref().push({
            trainName: trainName,
            destination: destination,
            firstTrainTime: firstTrainTime,
            frequency: frequency
        }); // end of pushing data into firebase
        // check on firebase to see if firebase is recieving info

    })// end on click function

    // 4. use on child added to listen for new database values (works like for loop)
    database.ref().on("child_added", function (snapshot) {
        var snapVal = snapshot.val();
        console.log(snapshot.val());
        console.log(snapshot.val().trainName);
        console.log(snapshot.val().destination + " destination");
        console.log(snapshot.val().firstTrainTime +" first train time");
        console.log(snapshot.val().frequency + " train frequency in min");

        // new table row <tr>
        var newRow = $("<tr>");
        // make 5 <td>'s 
        // td 1. trainName    
        var trainNameTD = $("<td>" + snapshot.val().trainName + "</td>");
        // append td to tr
        newRow.append(trainNameTD);

        // destination <td> has destination  
        var destinationTD = $("<td>" + snapshot.val().destination + "</td>");
        newRow.append(destinationTD);

        // frequency <td> has frequency
        var frequencyTD = $("<td>" + snapshot.val().frequency + "</td>");
        newRow.append(frequencyTD);

        // next arival = math function. 
        //  check frequency, what time first train started, and current time
        var trainsFirstStart = snapVal.firstTrainTime;

        //first time
        var firstTimeConverted = moment(trainsFirstStart, "HH:mm").subtract(1, "years");
        console.log(firstTimeConverted + "first time converted");

        // current time
        var currentTime = moment();
        console.log(moment(currentTime).format("HH:mm") + " current time");

        // diff between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log(moment(diffTime).format("HH:mm"));

        // time apart (remainderr)
        var tRemainder = diffTime % snapVal.frequency;
        console.log(tRemainder + " tRemainder");

        // min untill next arrival (train)
        var tMinutesTillTrain = snapVal.frequency - tRemainder;
        console.log("minutes till train " + tMinutesTillTrain);

        // next train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log(moment(nextTrain).format("hh:mm") + " next train is");
        var nextTrainDiv = $("<td>"+moment(nextTrain).format("HH:mm") + "</td>");
        //  var nextTrainDiv = $("<td>"+nextTrain.format("HH:mm") + "</td>");
        newRow.append(nextTrainDiv);

        // minutes away <td> also requires the same math function
        var minutesUntilTrain = $("<td>" + tMinutesTillTrain + "</td>")
        newRow.append(minutesUntilTrain);

        // adding delete button
        // var deleteBttn = $("<button>").text("Remove");
        // var deleteBttn = $("<button id= 'deleteBtn'>Remove</button>");
        // newRow.append(deleteBttn);

        // append <td>'s to <tr> 
        // append <tr> to <tbody>
        // delete button on click function
        
        $("tbody").append(newRow);
        
    }); // end of pulling data from firebase and adding to our form
            // $((this)).on("click", function(){
            //     // console.log("clicking!"+ (this));
            //     console.log($(this).parent());
            //     $(this).remove((this).parent);
            //     $("#weirddiv").append(this);
            // })





    // input validation - make sure user filled out all fields and military time only
    // put in front of input function


}); // end of javascript