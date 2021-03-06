///////////////////////////
//Firebase configuration //
///////////////////////////

var config = {
  apiKey: "AIzaSyBMxbRavlaUZpJQWiMiCoFuT1hT_un6iQ0",
  authDomain: "ballmer-peak-project1.firebaseapp.com",
  databaseURL: "https://ballmer-peak-project1.firebaseio.com",
  projectId: "ballmer-peak-project1",
  storageBucket: "",
  messagingSenderId: "520183238866"
};

firebase.initializeApp(config);

var database = firebase.database();

console.log(getDescription("Hulk"));
console.log(logActivity("Hulk"));


function juploadstop(result) {
  if (result == 0) {
    $(".imageholder").html("");

  }
  // the result will be the path to the image
  else if (result != 0) {
    $(".imageholder").html("");
    // imageplace is the class of the div where you want to add the image  
    $(".imageplace").append("<img src='" + result + "'>");
  }
}

$('#submit_form').on("click", function () {
  $.ajax({
    type: 'POST',
    url: path / fileUpload.php,
    data: image_input_name
  });

  //after submitting, get the url of the image form the server

  $('#div_to_display_image').html("<img src='path/image_file.jpg' alt='this' />");

});


var compareFace = function () {

  var name = $(this).attr("data-name");
  var queryURL = "https://api-us.faceplusplus.com/facepp/v3/search" +
    name + "AuLF26cH7L5MFtwVuC9hhqCQbiB6K8HR";

  $.ajax({
    url: queryURL,
    method: "POST"
  })
    .then(function (response) {
      var results = response.data;
      for (var i = 0; i < results.length; i++) {

        //   var gifDiv = $("<div class='item'>");
        //   gifDiv.addClass("gifDiv");
        //   // pulling rating of gif
        //   // var rating = results[i].rating;
        //   var rating = $("<p>").text("Rating: " + results[i].rating);
        //   gifDiv.append(rating);
        //   // pulling gif
        //   var nameImage = $("<img>");
        //   nameImage.attr("src", results[i].images.fixed_height_small_still.url);
        //   nameImage.attr("data-still", results[i].images.fixed_height_small_still.url);
        //   nameImage.attr("data-animate", results[i].images.fixed_height_small.url);
        //   nameImage.attr("data-state", "still");
        //   // nameImage.attr("onclick", playPause)
        //   nameImage.addClass("image");
        //   gifDiv.append(nameImage);

        $("#marvel-anc").append(gifDiv);
      }
    });
}

//   displaying the uploaded image
$('#submit').click(function () {
  var photo = $('#input').val();
  $('#prof-pic').attr('<img src=' + photo + '>')
});


///////////////////////////////////////////////////////
// comparing the uploaded image with array of heroes //
///////////////////////////////////////////////////////



//////////////////////////////////////////////
// displaying details about the marvel hero //
//////////////////////////////////////////////

function getDescription(heroName) {

  // This is our API key.
  var APIKey = "51bf07f7552914c23894d501b60792a9";
  var queryURL = "https://gateway.marvel.com:443/v1/public/characters?name=" + heroName + "&apikey=" + APIKey;
  var marvelResponse = ""
  var marvelCharacter = ""

  // We then created an AJAX call
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {

    //the object returns the description here:
    console.log("first: " + response.data.results[0].description);
    marvelResponse = response.data.results[0].description;
    console.log("second: " + marvelResponse);

    console.log(response);

    console.log("fourth: " + response.data.results[0].name);
    marvelCharacter = response.data.results[0].name;
  
    console.log("Fifth: " +marvelCharacter);
  
    //display the description in the char-bio div
    $("#char-bio").text(marvelResponse);
    //display name in character div
    $("#char-title").text(marvelCharacter);

  });

}





/////////////////////////////////////////////////////
// pushing past results from Firebase to the table //
/////////////////////////////////////////////////////

function logActivity(hero) {

  //local variables to hold hero name and date
  var heroName = hero
  var matchDate = moment().format("MM/DD/YYYY");

  var newMatch = {
    hero: heroName,
    date: matchDate
  };

  // Uploads employee data to the database
  database.ref().push(newMatch);

  // Create Firebase event for adding the search to the databas
  database.ref().on("child_added", function (childSnapshot) {

    //capture the childsnapshot values
    var lastHeroName = childSnapshot.val().hero;
    var lastMatchDate = childSnapshot.val().date;

    //create a new row i the table
    var newRow = $("<tr>").append(
      $("<td>").text("On " + lastMatchDate + " you were matched with " + lastHeroName),
    );
  
    // Append the new row to the train table
    $("#resultsList > tbody").append(newRow);

  });

}


//OFFICIAL NAMES
// Ant-Man - no name
// Black Panther - no description
// Black Widow - no description
// Bucky -  no description
// Captain America
// Captain Marvel - no name
// Deadpool - no description
// Hawkeye -  no description
// Hank Pym -  no description
// Hela - no name
//                                        Hulk
//                                        Iron Man
// Iron Monger - no description
// Jessica Jones -  no description
// Loki -  no discription
// Nakia -  no discription
// Nick Fury -  no discription
// Professor X-  no discription
// Quicksilver -  no discription
// Rhones - no name
// Scarlet Witch - no description
//                                         Spider-Man
// Starlord  -  no discription
//                                        Wasp
//                                        Thor 
// Valkyrie - no name
//                                        Wolverine