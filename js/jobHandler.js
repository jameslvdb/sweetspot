function findJobs() {
	// Set up stuff
	var elems = document.forms["job-form"].elements;
	var url = "http://api.indeed.com/ads/apisearch?publisher=3076179328257549";
	
	// Get data values
	var city = elems["city"].value.toLowerCase();
	var state = elems["state"].value.toLowerCase();
	var zip = elems["zip"].value.toLowerCase();
	var title = elems["title"].value.toLowerCase();
	var min = elems["min"].value;
	var radius = elems["radius"].value;
	
	// Build Location Query
	var loc = "";
	if(city && city.length > 0) loc += city;
	if(state && state.length > 0) {
		if(loc && loc.length > 0) loc += ", ";
		loc += state;
	}
	if(zip && zip.length > 0) {
		if(loc && loc.length > 0) loc += ", ";
		loc += zip;
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
	if(radius) url += "&radius="+radius;
	var encodedURL = encodeURIComponent(url);

	$.ajax({
		type: "GET",
		url: "https://radiant-woodland-13822.herokuapp.com/?url=" + encodedURL,
		dataType: "xml",
		success: function(xml) {
			alert(xml);
		}
	});
}
