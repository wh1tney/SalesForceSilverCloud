$(function() {
  var clientMarkers = [];

  $.ajax({
    url: '/clients',
    method: 'get',
    dataType: 'json'
  }).done(function(response) {
    createClientMarkers(response);
    generateMap();
  }).fail(function(response) {
    console.log("ERROR: Failed to get client data from server");
  })

  var createClientMarkers = function(clients) {
    for(var idx = 0; idx < clients.length; idx++) {
      clientMarkers.push({
        "type": "Feature",
        "properties": {
            "popupContent": clients[idx].Name
        },
        "geometry": {
            "type": "Point",
            "coordinates": [clients[idx].location__Longitude__s, clients[idx].location__Latitude__s]
        }
      })
    }
  }
  
  var generateMap = function() {

    var map = L.map('map');

    L.tileLayer('https://{s}.tiles.mapbox.com/v3/jframel.jo7hhmk5/{z}/{x}/{y}.png', {
      attribution: 'Map data',
      maxZoom: 18,
      minZoom: 12
    }).addTo(map);

    map.locate({setView: true, maxZoom: 16});

    function onLocationFound(e) {
      var radius = e.accuracy / 2;

      L.marker(e.latlng).addTo(map).bindPopup("You are within " + radius + " meters from this point").openPopup();

      L.circle(e.latlng, radius).addTo(map);
    }

    function onLocationError(e) {
      alert(e.message);
    }

    map.on('locationfound', onLocationFound);
    map.on('locationerror', onLocationError);

    function onEachFeature(feature, layer) {
      if (feature.properties && feature.properties.popupContent) {
        layer.bindPopup(feature.properties.popupContent);
      }
    };

    L.geoJson(clientMarkers, {
      onEachFeature: onEachFeature
    }).addTo(map);
  }
});
