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

function zillowSetup()
{
	var elements = document.forms["realestate-form"].elements;
	var basicURL = "http://www.zillow.com/webservice/GetRegionChildren.htm?zws-id=X1-ZWz1frq0hcv0nf_4wzn5";
	var stateURL = basicURL + "&state=" + elements[1].value.toLowerCase();
	var cityURL = stateURL + "&city=" + elements[0].value.toLowerCase();
	var queryURL = cityURL + "&childtype=neighborhood";
	var encodedURL = encodeURIComponent(queryURL);
	console.log(encodedURL);
	$.ajax({
    	type: "GET",
    	url: "https://radiant-woodland-13822.herokuapp.com/?url=" + queryURL,
    	dataType: "xml",
    	success: console.log("Success")
	});
}

window.onload = loadScript;
