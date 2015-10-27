var MAPSPACE = function(jquery) {
	'use strict'

	var FIFTY_PERCENT = 0.5;
	var map = null;
	var jq = jquery;
	var lastRes = null;

	return {

		initMap : function() {
			map = new google.maps.Map(document.getElementById('map'), {
				zoom: 13,
				center: {lat: 62.6500118, lng: -160.1946203},
				mapTypeId: google.maps.MapTypeId.TERRAIN
			});
		},

		drawLine : function(guestLat, guestLng, hostLat, hostLng) {
			var resPath = new google.maps.Polyline({
				path: [{lat: guestLat, lng: guestLng}, {lat: hostLat, lng: hostLng}],
				geodesic: true,
				strokeColor: '#FF0000',
				strokeOpacity: 1.0,
				strokeWeight: 2
			});

			resPath.setMap(map);
		},  // drawLine

		getNewRes : function() {
			$.ajax({
				url: "http://localhost:8080/map/reservation?lastRes=" + lastRes,
				dataType: "json"
			}).done(function() {
				;
			});
		},

		setNewMapCenter : function(newLatLng) {
			var currentLatLng = map.getCenter();
			var halfwayLatLng = google.maps.geometry.spherical.interpolate(currentLatLng, newLatLng, FIFTY_PERCENT);
			console.log("current ->  " + currentLatLng + " new ->  " + newLatLng + " halfway ->  " + halfwayLatLng);
			map.panTo(halfwayLatLng);
		}
	};
}($);
