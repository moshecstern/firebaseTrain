$(document).ready(function () {

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
        console.log(snapshot.val());
        console.log(snapshot.val().trainName);
        console.log(snapshot.val().destination);
        console.log(snapshot.val().firstTrainTime);
        console.log(snapshot.val().frequency);

        // new table row <tr>
        var newRow = $("<tr>");
        // make 5 <td>'s 
        // td 1. trainName    
        var trainNameTD = $("<td>" + snapshot.val().trainName + "</td>");
        // append td to tr
        newRow.append(trainNameTD);

        // destination <td> has destination  
        var destinationTD = $("<td>" + snapshot.val().destination+ "</td>");
        newRow.append(destinationTD);

        // frequency <td> has frequency
        var frequencyTD = $("<td>" + snapshot.val().frequency+ "</td>");
        newRow.append(frequencyTD);

        // next arival = math function.  check frequency, what time first train started, and current time 
        // use activity 21 for math calculations
        // minutes away <td> also requires the same math function

        // append <td>'s to <tr> 
        // append <tr> to <tbody>
        $("tbody").append(newRow);
    }); // end of pulling data from firebase and adding to our form

    // input validation - make sure user filled out all fields and military time only
    // put in front of input function



    // train name

    // destination

    // first train time (military time)

    // frequency (min)  


    // activities 17-21 will help
}); // end of javascript