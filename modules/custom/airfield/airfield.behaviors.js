//==== JS closure ==============================================================
(function($) {
    //==== BEHAVIOR ================================================================
    Drupal.behaviors.airfield = {
        attach: function(context, settings) {
//     alert('airfield.behaviors.js is available.');
            var data = Drupal.settings.airfield.data;
//            console.log(data.canvas);
            if ($('#' + data.canvas).length) {
                generateMap(data);
            }
        }
    }
}(jQuery));
//==== FUNCTIONS ===============================================================

//function createNodeMap(data) {
//    var centerLatLng = new google.maps.LatLng(data.lat, data.lng);
//    var mapOptions = {
//        center: centerLatLng,
//        zoom: 15,
//        mapTypeId: google.maps.MapTypeId.HYBRID
//    };
//    var map = new google.maps.Map(document.getElementById(data.canvas), mapOptions);
//
//    // Set marker
//    var marker = new google.maps.Marker({
//        map: map,
//        title: data.name,
//        position: centerLatLng
//    });
//}

function generateMap(data) {
    // Build latlng array
    var aLatLng = new Array();
    data.markers.forEach(function(element, index, array) {
        console.log(element);
        var latlng = new google.maps.LatLng(element.latitude, element.longitude);
        aLatLng.push(latlng);
    });

    // Initialize map on first data element
    var mapOptions = {
        center: aLatLng[0],
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.HYBRID
    };
    var map = new google.maps.Map(document.getElementById(data.canvas), mapOptions);

    // Add markers
    data.markers.forEach(function(element, index, array) {
        // Create LatLng
        var myLatlng = new google.maps.LatLng(element.latitude, element.longitude);

        // Set marker
        var marker = new google.maps.Marker({
            map: map,
            position: myLatlng,
            title: element.title,
            url: element.url
        });
        if (aLatLng.length > 1) {
            google.maps.event.addListener(marker, 'click', function() {
                window.location.href = this.url;
            });
        }

    });

    if (aLatLng.length > 1) {
        // Determine map bounds and center
        var latlngbounds = new google.maps.LatLngBounds();
        aLatLng.forEach(function(element, index, array) {
            latlngbounds.extend(element);
        });
        map.setCenter(latlngbounds.getCenter());
        map.fitBounds(latlngbounds);
    }
}