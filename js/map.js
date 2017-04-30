//Center of the US
var coordsOfUS = new google.maps.LatLng(37.09024, -95.712891);
var map;
var currentJobMarkers = new Array();
var currentRealEstateMarkers = new Array();

function loadScript()
{
	//Create the map
	var mapOptions =
	{
	    center: coordsOfUS,
	    zoom: 5,
	    mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	// var script = document.createElement('script');
	// script.type = 'text/javascript';
	// document.body.appendChild(script);
	map = new google.maps.Map(document.getElementById('map'), mapOptions);

	//Test adding markers by coordinates
	// var latitudes = [37, 37.4, 37.8];
	// var longitudes = [-95, -96, -94];
	// var names = ['one', 'two', 'three'];
	// var descriptions = ['descOne', 'descTwo','descThree'];
	// addJobMarkers(latitudes, longitudes, names, descriptions, true);
}

function addJobMarkers(latitudes, longitudes, names, descriptions, isJob)
{
	var labels = 'ABCDEFGHIJ';

	//Clear all old markers
	resetMarkers(isJob);


	for(var i = 0; i < latitudes.length; i++)
	{
		var marker;
		if(isJob)
		{
			marker = new google.maps.Marker(
				{
					position: new google.maps.LatLng(latitudes[i], longitudes[i]),
					map: map,
					icon: {
						url: 'http://i.imgur.com/YuokAd3.png',
						size: new google.maps.Size(20, 30),
						origin: new google.maps.Point(0, 0),
						anchor: new google.maps.Point(0, 20),
						scaledSize: new google.maps.Size(20, 30),
						labelOrigin: new google.maps.Point(10, 11)
					},
					title: names[i],
	     			animation: google.maps.Animation.DROP,
					infoWindowShown: true,
					label: labels[i]
				}
			);
		}
		else
		{
			marker = new google.maps.Marker(
				{
					position: new google.maps.LatLng(latitudes[i], longitudes[i]),
					map: map,
					icon: {
						url: 'http://i.imgur.com/OoSsCTj.png',
						size: new google.maps.Size(20, 30),
						origin: new google.maps.Point(0, 0),
						anchor: new google.maps.Point(0, 20),
						scaledSize: new google.maps.Size(20, 30),
						labelOrigin: new google.maps.Point(10, 11)
					},
					title: names[i],
	     			animation: google.maps.Animation.DROP,
					infoWindowShown: true,
					label: labels[i]
				}
			);
		}

		//Set what the tooltip will say
		var html = '<b>' + names[i] + '</b> <p></p>' + descriptions[i];

		//Set up the marker to display its tooltip when clicked
		var infowindow = new google.maps.InfoWindow
		(
			{
	        	content: 'nothing',
	        	pixelOffset: new google.maps.Size(-40,0)
	        }
        );
        marker.html = html;
        marker.addListener('click', function()
	        {
	        	infowindow.setContent(this.html);
	        	infowindow.open(map, this);
	        }
        );
	}
}

function resetMarkers(isJob)
{
	if(isJob)
	{
		for(var i = 0; i < currentJobMarkers.length; i++)
		{
			currentJobMarkers[i].setMap(null);
		}
	}
	else
	{
		for(var i = 0; i < currentRealEstateMarkers.length; i++)
		{
			currentRealEstateMarkers[i].setMap(null);
		}
	}
}

function zillowSetup()
{
	// gets all of the elements in the real estate form
	var elements = document.forms["realestate-form"].elements;
	// sets up the zillow url that I'm going to use
	var basicURL = "http://www.zillow.com/webservice/GetRegionChildren.htm?zws-id=X1-ZWz1frq0hcv0nf_4wzn5";
	// append the search parameters to the url
	var stateURL = basicURL + "&state=" + elements[1].value.toLowerCase();
	var cityURL = stateURL + "&city=" + elements[0].value.toLowerCase();
	var queryURL = cityURL + "&childtype=neighborhood";
	// encodes the url so that the proxy can use it properly
	var encodedURL = encodeURIComponent(queryURL);
	// console.log(encodedURL);
	var minBudget = parseInt(elements[4].value);
	var maxBudget = parseInt(elements[5].value);
	// console.log('minBudget: ' + minBudget);
	var zillowData = zillowAjax(encodedURL, minBudget, maxBudget, elements);
	if (zillowData) {
		console.log("zillowData success");
	}
}

function zillowAjax(url, min, max, formElements) {
	// $.ajax is the jQuery function for making a query
	$.ajax({
		type: "GET",
		// this url is the heroku app that I'm using as a proxy
		url: "https://radiant-woodland-13822.herokuapp.com/?url=" + url,
		dataType: "xml",
		success: function(xml) {
			// regions is an array of all neighborhoods that match our
			// search criteria based on min and max budgets. This is
			// achieved using the $.grep function.

			// usage is $.grep(<array>, function(){});
            var regions = $.grep($(xml).find('list region'), function(region) {
				var zindexElem = $(region).find('zindex')[0];
				if (!zindexElem) {
					console.log("bailing out on " + zindexElem);
					return false;
				}
				var zindex = parseInt($(zindexElem).text());
				console.log(zindex);
				return zindex <= max && zindex >= min;
			});
			// for each region that matches our criteria, show the data
			// on the console
			var resultString = "<ul>";
			var letters = "ABCDEFGHIJ";
			var tempURL;
			$(regions).slice(0,10).each(function(i) {
				resultString += "<li>";
				$(this).find('url').each(function() {
					tempURL = $(this).text();
					console.log("URL: " + tempURL);
				});
				$(this).find('name').each(function() {
					var name = $(this).text();
					resultString += letters[i] + ". <a href='" + tempURL + "'>" + name + "</a>";
					var city = formElements[0].value;
					var state = formElements[1].value;
					resultString += "<p>" + city + ", " + state + "</p>";
					console.log("Name: " + name);
				});
				$(this).find('zindex').each(function() {
					var zindex = $(this).text();
					resultString += "<p>Zindex: $" + zindex + "</p>";
					console.log("Zindex: " + zindex);
				});
				$(this).find('latitude').each(function() {
					var lat = $(this).text();
					console.log("Latitude: " + lat);
				});
				$(this).find('longitude').each(function() {
					var long = $(this).text();
					console.log("Longitude: " + long);
				});
				resultString += "</li>";
			});
			resultString += "</ul>";
			$('#featured-real-estate ul').replaceWith(resultString);
    	}
	});
}

window.onload = loadScript;
