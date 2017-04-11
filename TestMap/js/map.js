//Center of the US
var coordsOfUS = new google.maps.LatLng(37.09024, -95.712891);
var map;
var currentMarkers = new Array();

function loadScript()
{
	var mapOptions = 
	{
		//Center of the US
	    center: coordsOfUS,
	    zoom: 5,
	    mapTypeId: google.maps.MapTypeId.ROADMAP
	}

	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&' + 'callback=initialize';
	document.body.appendChild(script);
	map = new google.maps.Map(document.getElementById('map'), mapOptions);


	//test adding markers by coordinates
	var latitudes = [37, 37.4, 37.8];
	var longitudes = [-95, -96, -94];
	addMarkers(latitudes, longitudes);
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



window.onload = loadScript;