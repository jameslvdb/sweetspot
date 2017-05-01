function findJobs() {
	// Set up stuff
	var elems = document.forms["job-form"].elements;
	var url = "http://api.indeed.com/ads/apisearch?publisher=3076179328257549&v=2&latlong=1";
	
	// Get data values
	var city = elems["city"].value.toLowerCase();
	var state = elems["state"].value.toLowerCase();
	var title = elems["title"].value.toLowerCase();
	var min = elems["min"].value;
	
	// Build Location Query
	var loc = "";
	if(city && city.length > 0) loc += city;
	if(state && state.length > 0) {
		if(loc && loc.length > 0) loc += ", ";
		loc += state;
	}
	
	// Build Job Query
	var qry = "";
	if(title && title.length > 0) qry += title;
	if(min && min.length > 0) {
		if(qry && qry.length > 0) qry += " ";
		qry += min + "-";
	}
	
	// Create Final URL
	if(qry) url += "&q="+qry;
	if(loc) url += "&l="+loc;
	var encodedURL = encodeURIComponent(url);

	$.ajax({
		type: "GET",
		url: "https://radiant-woodland-13822.herokuapp.com/?url=" + encodedURL,
		dataType: "xml",
		success: function(xml) {
			var lats = [];
			var longs = [];
			var names = [];
			var descs = [];

			var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
			var results = "<ul>";
			var jobURL = "";

			$(xml).find("response").each(function() {
				$(this).find("results").each(function() {
					results += "<li>";
					$(this).find("result").each(function(i) {
						$(this).find("url").each(function() {
							var txt = $(this).text();
							jobURL = txt;
						});
						$(this).find("jobtitle").each(function() {
							var txt = $(this).text();
							names[i] = txt;
							results += letters[i]+". <a href='"+jobURL+"'> "+txt+"</a>";
						});
						$(this).find("formattedLocation").each(function() {
							var txt = $(this).text();
							results += "<p>"+txt+"</p>";
						});
						$(this).find("company").each(function() {
							var txt = $(this).text();
							results += "<p>Company: "+txt+"</p>";
						});
						$(this).find("snippet").each(function() {
							var txt = $(this).text();
							descs[i] = txt;
							results += "<p>Description: "+txt+"</p>";
						});
						$(this).find("latitude").each(function() {
							var txt = $(this).text();
							lats[i] = txt;
						});
						$(this).find("longitude").each(function() {
							var txt = $(this).text();
							longs[i] = txt;
						});
					});

					results += "</li>";
				});
			});

			results += "</ul>";
			$('#featured-jobs ul').replaceWith(results);
			addMarkers(lats, longs, names, descs, true);
		}
	});
}
