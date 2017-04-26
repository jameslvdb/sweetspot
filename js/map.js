//Center of the US
var coordsOfUS = new google.maps.LatLng(37.09024, -95.712891);
var map;
var currentMarkers = new Array();

function loadScript()
{
	//Create the map
	var mapOptions =
	{
	    center: coordsOfUS,
	    zoom: 5,
	    mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	var script = document.createElement('script');
	script.type = 'text/javascript';
	document.body.appendChild(script);
	map = new google.maps.Map(document.getElementById('map'), mapOptions);

	//Test adding markers by coordinates
	var latitudes = [37, 37.4, 37.8];
	var longitudes = [-95, -96, -94];
	addMarkers(latitudes, longitudes);

	$( "realestate-form" ).submit(function( event ) {
		zillowCall();
  		event.preventDefault();
	});
}

function addMarkers(latitudes, longitudes)
{
	for(var i = 0; i < latitudes.length; i++)
	{
		var marker = new google.maps.Marker(
			{
				position: new google.maps.LatLng(latitudes[i], longitudes[i]),
				map: map,
				title: 'Hello, world!'
			}
		);
		currentMarkers[i] = marker;
	}
}

function zillowCall()
{
	var elements = document.forms["realestate-form"].elements;
	for (i = 0; i < elements.length; i++) {
		if (elements[i].value) {
			console.log(elements[i].value);
		}
	}
}

window.onload = loadScript;
