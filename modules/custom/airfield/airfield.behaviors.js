//==== JS closure ==============================================================
(function($) {
    //==== BEHAVIOR ================================================================
    Drupal.behaviors.airfield = {
        attach: function(context, settings) {
            // Retrieve data passed from PHP
            var data = Drupal.settings.airfield.data;
            // Check if map canvas is available
            if ($('#' + data.canvas).length) {
                generateMap(data);
            }
        }
    }
}(jQuery));
//==== FUNCTIONS ===============================================================
function generateMap(data) {
    // Initialize map on first data element
    var firstMarker = new google.maps.LatLng(data.markers[0].latitude, data.markers[0].longitude);
    var mapOptions = {
        center: firstMarker,
        zoom: parseInt((data.map.zoom) ? data.map.zoom : 15),
        mapTypeId: google.maps.MapTypeId.HYBRID
    };
    var map = new google.maps.Map(document.getElementById(data.canvas), mapOptions);

    // Add markers
    var bounds = new Array();
    var markerCount = data.markers.length;
    // Loop data.markers array
    data.markers.forEach(function(element, index, array) {
        // Create LatLng
        var myLatLng = new google.maps.LatLng(element.latitude, element.longitude);

        // Add LatLng to bounds array
        bounds.push(myLatLng);

        // Set marker if coords are not default
        if (element.title != 'default') {
            var marker = new google.maps.Marker({
                map: map,
                position: myLatLng,
                title: element.title,
                url: element.url
            });
            // If multiple markers, add link to node for each marker
            if (markerCount > 1) {
                google.maps.event.addListener(marker, 'click', function() {
                    window.location.href = this.url;
                });
            }
        }
    });

    // If multiple markers, set new map center and calculate appropriate zoom level
    if (markerCount > 1) {
        var latlngbounds = new google.maps.LatLngBounds();
        bounds.forEach(function(element, index, array) {
            latlngbounds.extend(element);
        });
        map.setCenter(latlngbounds.getCenter());
        map.fitBounds(latlngbounds);
    }
}