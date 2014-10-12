$(function() {
  var clients = [];

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

  var createClientMarkers = function(clientObjs) {
    for(var idx = 0; idx < clientObjs.length; idx++) {
      clients.push({
        "type": "Feature",
        "properties": {
            "popupContent": clientObjs[idx].Name,
        },
        "geometry": {
            "type": "Point",
            "coordinates": [clientObjs[idx].location__Longitude__s, clientObjs[idx].location__Latitude__s]
        }
      })
    }
  }
  
  var generateMap = function() {

    var map = L.map('map');

    L.tileLayer('https://{s}.tiles.mapbox.com/v3/wobanner.jo67ee4a/{z}/{x}/{y}.png', {
      attribution: 'Map data',
      maxZoom: 18,
      minZoom: 12
    }).addTo(map);

    map.locate({setView: true, maxZoom: 16});

    function onLocationFound(e) {
      var radius = e.accuracy / 2;

      var userIcon = L.AwesomeMarkers.icon({
        icon: 'child',
        markerColor: 'blue',
        prefix: 'fa'
      });

      L.marker(e.latlng, {icon: userIcon}).addTo(map).bindPopup("You are here").openPopup();
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

    var clientIcon = L.AwesomeMarkers.icon({
      icon: 'child',
      markerColor: 'red',
      prefix: 'fa'
    });

    L.geoJson(clients, {
      onEachFeature: onEachFeature,
      pointToLayer: function (feature, latlng) {
          return L.marker(latlng, {icon: clientIcon});
      }
    }).addTo(map);
  }
});
