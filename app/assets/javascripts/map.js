$(function() {
  var clients = [];
  var map;
  var currentLoc;

  $.ajax({
    url: '/clients',
    method: 'get',
    dataType: 'json'
  }).done(function(response) {
    map = generateMap();

    $('.locate-clients').on('click', function () {
      createClientMarkers(response);
      addClientMarkers(map);
    });
  }).fail(function(response) {
    console.log("ERROR: Failed to get client data from server");
  });

  var createClientMarkers = function(clientObjs) {
    for(var idx = 0; idx < clientObjs.length; idx++) {
      var clientDistanceInMiles = currentLoc.distanceTo([clientObjs[idx].location__Latitude__s, clientObjs[idx].location__Longitude__s])/1609.34;
      if(clientDistanceInMiles <= 10) {
        clients.push({
          "type": "Feature",
          "properties": {
              "id": idx + 1,
              "popupContent": clientObjs[idx].Name
          },
          "geometry": {
              "type": "Point",
              "coordinates": [clientObjs[idx].location__Longitude__s, clientObjs[idx].location__Latitude__s]
          }
        })
      }
    }
  };

  var generateMap = function() {

    var map = L.map('map');

    L.tileLayer('https://{s}.tiles.mapbox.com/v3/wobanner.jo67ee4a/{z}/{x}/{y}.png', {
      attribution: 'Map data',
      maxZoom: 18,
      minZoom: 12
    }).addTo(map);

    map.locate({setView: true, maxZoom: 16});

    function onLocationFound(e) {

      var userIcon = L.AwesomeMarkers.icon({
        icon: 'child',
        markerColor: 'blue',
        prefix: 'fa'
      });

      currentLoc = e.latlng;

      L.marker(e.latlng, {icon: userIcon}).addTo(map).bindPopup("You are here").openPopup();
    }

    function onLocationError(e) {
      alert(e.message);
    }

    map.on('locationfound', onLocationFound);
    map.on('locationerror', onLocationError);

    addClientMarkers(map);

    return map;
  };

  var addClientMarkers = function (map) {
    function onEachFeature(feature, layer) {
      if (feature.properties && feature.properties.popupContent) {
        layer.bindPopup(feature.properties.popupContent);
      }
    }

    L.geoJson(clients, {
      onEachFeature: onEachFeature,
      pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: L.AwesomeMarkers.icon({
          icon: '',
          markerColor: 'red',
          prefix: 'fa',
          html: feature.properties.id
        })
        });
      }
    }).addTo(map);
  };
});
