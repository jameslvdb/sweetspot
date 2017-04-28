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
	var script = document.createElement('script');
	script.type = 'text/javascript';
	document.body.appendChild(script);
	map = new google.maps.Map(document.getElementById('map'), mapOptions);

	//Test adding markers by coordinates
	// var latitudes = [37, 37.4, 37.8];
	// var longitudes = [-95, -96, -94];
	// var names = ['one', 'two', 'three'];
	// var descriptions = ['descOne', 'descTwo','descThree'];
	// addJobMarkers(latitudes, longitudes, names, descriptions, false);
	// setTimeout(function() {addJobMarkers(latitudes, longitudes, names, descriptions, false);}, 2000);
	
}

function addJobMarkers(latitudes, longitudes, names, descriptions, isJob)
{
	var labels = 'ABCDEFGHIJ';

	//Clear all old markers
	resetMarkers(isJob);


	for(var i = 0; i < latitudes.length; i++)
	{
		var marker = new google.maps.Marker(
			{
				position: new google.maps.LatLng(latitudes[i], longitudes[i]),
				map: map,
				title: names[i],
     			animation: google.maps.Animation.DROP,
				infoWindowShown: true,
				label: labels[i]
			}
		);

		//Change marker depending on whether it is a job or real estate
		if(isJob)
		{
			//marker.setIcon('http://maps.google.com/mapfiles/kml/paddle/blu-blank.png');
			currentJobMarkers[i] = marker;		
		}
		else
		{
			//marker.setIcon('http://maps.google.com/mapfiles/kml/paddle/red-blank.png');	
			currentRealEstateMarkers[i] = marker;	
		}

		//Set what the tooltip will say
		var html = '<b>' + names[i] + '</b> <p></p>' + descriptions[i];


		//Set up the marker to display its tooltip when clicked
		var infowindow = new google.maps.InfoWindow
		(
			{
	        	content: 'nothing'
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

window.onload = loadScript;