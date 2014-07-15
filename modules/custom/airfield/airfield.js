/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
window.onload = function() {
//    alert('airfield.js is available');
    var data = Drupal.settings.airfield.data;
//    alert(data.lat);
    dataLatLng = new google.maps.LatLng(data.lat, data.lng);
    var mapOptions = {
        center: dataLatLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.HYBRID
    };
    var map = new google.maps.Map(document.getElementById(data.canvas), mapOptions);

    // Set marker
    var marker = new google.maps.Marker({
        map: map,
        title: data.name,
        position: dataLatLng
    });
};

