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

window.onload = loadScript;