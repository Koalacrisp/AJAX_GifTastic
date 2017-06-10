$(document).ready(function(){

	var topics = ["Buddha", "Dogs", "Nature"];

	$(document).on("click", "#topic", function(){
		var search = $(this).val();
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=dc6zaTOxFJmzC&limit=10";

		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response){
			var results = response.data;
			console.log(results);
				for(var i=0;i<results.length;i++){
					var rating = results[i].rating;
					var imageURL = results[i].images.fixed_height_still.url;
					var animURL = results[i].images.fixed_height.url;
					var gifDiv = $("<div class='item'>");
					var gifRate = $("<p>").text("Rating: " + rating);
					var ranImage = $("<img>");

					ranImage.attr("src", imageURL);
					ranImage.attr("alt", "Random GIF");
					ranImage.attr("data-state", "still");
					ranImage.attr("data-still", imageURL);
					ranImage.attr("data-animate", animURL);
					ranImage.attr("class", "gif")

					gifDiv.prepend(gifRate);
					gifDiv.prepend(ranImage);

					$(".container").prepend(gifDiv);
				}

		$(".gif").unbind().click(function(){
			var state = $(this).attr("data-state")
			
			if(state==="still"){
				$(this).attr("src", $(this).attr("data-animate"));
				$(this).attr("data-state", "animate");
			}else{
				$(this).attr("src", $(this).attr("data-still"));
				$(this).attr("data-state", "still");
			}
		});

		})
	});

	function renderButtons(){
		$(".search-buttons").empty();

		for(i=0; i<topics.length; i++){
			var createButton = $("<button>");

			createButton.attr("id", "topic");
			createButton.attr("type", "button");
			createButton.attr("value", topics[i]);
			createButton.text(topics[i]);

			$(".search-buttons").append(createButton);
		}
	}

	$("#add-button").click(function(event){
		event.preventDefault();

		var newTopic = $("#search-query").val().trim();

		topics.push(newTopic);
		renderButtons();
	});

	renderButtons();

});
