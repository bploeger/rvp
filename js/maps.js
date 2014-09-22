/**
 * Configuration Variables
 */

var APISource = "http://wex.arkturis.com/maps";


/**
 * Define Global Variables
 */

var map;
var markers = [];
var infowindowopen = false;
var mapCen;


/**
 * attachInfoWindow() binds InfoWindow to a Marker 
 * Creates InfoWindow instance if it does not exist already 
 * @extends Marker
 * @param InfoWindow options
 */
google.maps.Marker.prototype.attachInfoWindow = function (options){
  var map_ = this.getMap();
  map_.bubble_ = map_.bubble_ || new google.maps.InfoWindow();
  google.maps.event.addListener(this, 'click', function () {
    map_.bubble_.setOptions(options);
    map_.bubble_.open(map_, this);
    infowindowopen = true;
  });
  map_.infoWindowClickShutter = map_.infoWindowClickShutter || 
  google.maps.event.addListener(map_, 'click', function () {
    map_.bubble_.close();
    infowindowopen = false;
  });
}

/**
 * accessInfoWindow()
 * @extends Map
 * @returns {InfoWindow} reference to the InfoWindow object instance
 * Creates InfoWindow instance if it does not exist already 
 */
google.maps.Map.prototype.accessInfoWindow = function (){
  this.bubble_ = this.bubble_ || new google.maps.InfoWindow();
  return this.bubble_;
}

/**
 * clearMarkers()
 * @extends Map
 * @returns null object
 * Removes all markers from the map for redraw
 */
google.maps.Map.prototype.clearMarkers = function() {
    for(var i=0; i < markers.length; i++){
        markers[i].setMap(null);
    }
    markers = new Array();
};


//Program Functions

function initialize() {
	var mapOptions = {
	  center: new google.maps.LatLng(39.8333, -98.58333),
	  zoom: 4,
	  mapTypeId: google.maps.MapTypeId.TERRAIN,
	  disableDefaultUI: true,
	  draggable: false,
	  zoomControl: false,
	  scrollwheel: false,
	  disableDoubleClickZoom: true
	};
	map = new google.maps.Map(document.getElementById("map_canvas"),
	    mapOptions);

	loadData();
	mapCen = map.getCenter();
	/*google.maps.event.addListener(map, 'idle', loadData);*/

	google.maps.event.addDomListener(map, 'idle', function() {
			mapCen = map.getCenter();
			console.log ('idle' + mapCen);
		});

	google.maps.event.addDomListener(map, 'click', function() {
		map.setOptions({
				draggable: true, 
				zoomControl: true, 
				scrollwheel: true, 
				disableDoubleClickZoom: false});
	});

	google.maps.event.addDomListener(window, 'resize', function() {
		map.setCenter(mapCen);
		console.log ('Resized!' + mapCen);
	});
	}





function loadData() {
	if (!infowindowopen) map.clearMarkers();
	$.getJSON ( APISource , function(data) {
		$.each (data, function ( key, val) {
			var Latlng = new google.maps.LatLng(val.lat,val.lng);
			var marker = new google.maps.Marker({
	    		position: Latlng,
	    		title: val.name,
	    		description: val.description
	    	});
			markers.push(marker);
		});
		setMarkers(markers);
	});	
}

function setMarkers(markers) {
	$.each (markers, function ( key, marker) {
		marker.setMap(map);
		if (marker.description == '') {
			marker.attachInfoWindow({
			content: '<div class="infowindow"><h6>'+marker.title+'</h6><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna massa, sollicitudin sed justo in, egestas vestibulum felis. Mauris semper eros vel turpis fermentum vestibulum. Sed a massa pretium, lobortis arcu vel, volutpat quam. Quisque maximus, erat sit amet placerat pellentesque, nisl lorem aliquam tellus, non commodo libero est in tortor. Sed enim lacus, interdum sed arcu in, vulputate maximus magna. Curabitur massa diam, vehicula sit amet pretium a, dignissim id ante. Nam lacinia nulla vel ante eleifend, ut lacinia est viverra.</p></div>',
			disableAutoPan: 1,
			});
		} else {
			marker.attachInfoWindow({
			content: '<div class="infowindow"><h6>'+marker.title+'</h6><p>'+marker.description+'</p></div>',
			disableAutoPan: 1,
			});
		}

	});
}

//Added listener to start the Magic on page load
google.maps.event.addDomListener(window, 'load', initialize);

