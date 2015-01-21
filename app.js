$(document).ready( function() {
	$('.movie-getter').submit( function(event){
		// zero out results if previous search has run
		$('.results').html('');
		// get the value of the tags the user submitted
		var tags = $(this).find("input[name='tags']").val();
		getMovie(tags);
	});


});




// this function takes the results object from Rotten Tomatoes
// and creates info about search results to be appended to DOM
var showSearchResults = function(query, resultNum) {
	var results = resultNum + ' results for <strong>' + query;
	return results;
};

// takes error string and turns it into displayable DOM element
var showError = function(error){
	var errorElem = $('.templates .error').clone();
	var errorText = '<p>' + error + '</p>';
	errorElem.append(errorText);
};

// takes a string of semi-colon separated tags to be searched
// for on Rotten Tomatoe
var getMovie = function(tags) {
	
	// the parameters we need to pass in our request to Rotten Tomatoe's API
	var request = {tagged: tags,
					site: 'rottentomatoes',
					order: 'desc',
					sort: 'creation'};

	var key = 'ftpj8paq4fc8xrs8bwvw2cqw';
	
	var result = $.ajax({
		url: 'http://api.rottentomatoes.com/api/public/v1.0/movies.json',
		data: {
			apikey: key,
			q: tags
		},
		dataType: "jsonp",
		type: "GET",
		})
	.done(function(result){
		var searchResults = showSearchResults(request.tagged, result.movies.length);

		$('.search-results').html(searchResults);

		$.each(result.movies, function(i, item) {
			var film = showMovie(item);
			$('.results').append(movie);
		});
	})
	.fail(function(jqXHR, error, errorThrown){
		var errorElem = showError(error);
		$('.search-results').append(errorElem);
	});

};



// this function takes the movies object returned by Rotten Tomatoes
// and creates new result to be appended to DOM
var showMovie = function(movie) {
	
	// clone our result template code
	var result = $('.templates .films').clone();

	// Set Movies properties in result
	var title = result.find('.title');
	var poster = result.find('.poster');
	

	//set title and poster properties in result
	title.text(movie.movies.title);
	poster.attr('src', movie.movies.posters.original);
	poster.text(movie.movies.posters.original);
	
	// set the release_dates property in result
	var date = result.find('.date-released');
	date.text(movie.movies.release_dates.theater);


	// set the rating property in result
	var rating = result.find('.rating');
	rating.text(movie.movies.release_dates.theater);

	// set the synopsis property in result
	var synopsis = result.find('.synop');
	synopsis.text(movie.movies.synopsis);

	return result;
};