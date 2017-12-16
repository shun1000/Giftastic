//Initial array of teams   
$(document).ready(function() {

  var topics = ["Chargers", "Giants", "Seahawks", "Chiefs", "Raiders", "Rams", "Patriots", "Dolpins", "Lions", "Vikings", "Packers", "Jets", "Cardinals", "49ers"];    

  //  create topics array buttons
  function renderButtons(){
    $('#buttons-view').empty();

    for (var i = 0; i < topics.length; i++) {
            //create all buttons
            var a = $('<button>');
            a.addClass('team');
            a.attr('data-name', topics[i]);
            a.text(topics[i]);
            $('#buttons-view').append(a);
          }
        }    
        renderButtons();

//on button click
$(document).on('click', '.team', function() {

    //new variable will log the text data from each button
    var team = $(this).html(); 
    // console.log(martialArts);

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + team +" football"+ "&api_key=qrnIEZZFwKhPE5GrO8T8ReYcAPRUfAMd&limit=10"+"&rating=g";
    // console.log(queryURL);

    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {

      var results = response.data;
        console.log(results);
        //empties the div before adding more gifs
        $('#teams-view').empty();
        for ( var j=0; j < results.length; j++) {
                    var imageDiv = $('<div>');
                    var imageView = results[j].images.fixed_height.url;
                    var still = results[j].images.fixed_height_still.url;
                        // console.log(imageView);  

        var gifImage = $('<img>').attr("src", still).attr('data-animate', imageView).attr('data-still', still);
                    gifImage.attr('data-state', 'still');
                    $('#teams-view').prepend(gifImage);
                    gifImage.on('click', playGif);

        // Pulling ratings for each team
        var rating = results[j].rating;
            // console.log(rating);
        var displayRated= $('<p>').text("Rating: " + rating);
        $('#teams-view').prepend(displayRated);
  } // end for loop

}); // done response

        //function to stop and animate gifs
        function playGif() { 
                    var state = $(this).attr('data-state');
                    // console.log(state);
                 if (state == 'still'){
                     $(this).attr('src', $(this).data('animate'));
                      $(this).attr('data-state', 'animate');
                 } else{
                     $(this).attr('src', $(this).data('still'));
                     $(this).attr('data-state', 'still');
                    }

                } //end of on click function

      }); //end of document on click 

          //adding new button to array
        $(document).on('click', '#add-team', function(){
            if ($('#team-input').val().trim() == ''){
              alert('Input can not be left blank');
           }
           else {
            var teams = $('#team-input').val().trim();
            topics.push(teams);
            $('#team-input').val('');
            renderButtons();
            return false;

            }

        });
                      

        }); // end click function