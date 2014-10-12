$(function() {
  var clients = [];
  var map;
  var currentLoc;
  var maxMiles = 10;

  $('.industry-filter a').on('click', function (e) {
    e.preventDefault();

    $.ajax({
      url: '/clients',
      method: 'get',
      dataType: 'json',
      data: {
        filter: true,
        filter_name: $(this).text()
      }
    }).done(function (response) {
      clients = [];
      map.remove();
      map = generateMap();
      createClientMarkers(response.clients);
      addClientMarkers(map);
      $('.clients-list').find('.contain').html(response.html);
      $('.clients-list').slideDown(600);
    }).fail(function (response) {
      console.log("ERROR: Failed to get client data from server");
    });
  });

  $.ajax({
    url: '/clients',
    method: 'get',
    dataType: 'json'
  }).done(function(response) {
    map = generateMap();

    $('.locate-clients').on('click', function () {
      map.remove();
      clients = [];
      var menu = document.getElementById("mileage");
      maxMiles = menu.options[menu.selectedIndex].value;
      map = generateMap();
      createClientMarkers(response.clients);
      addClientMarkers(map);
    });
  }).fail(function(response) {
    console.log("ERROR: Failed to get client data from server");
  });

  var createClientMarkers = function(clientObjs) {
    for(var idx = 0; idx < clientObjs.length; idx++) {
      var clientDistanceInMiles = currentLoc.distanceTo([clientObjs[idx].location__Latitude__s, clientObjs[idx].location__Longitude__s])/1609.34;
      if(clientDistanceInMiles <= maxMiles) {
        clients.push({
          "type": "Feature",
          "properties": {
              "id": idx + 1,
              "popupContent": clientObjs[idx].Name,
              "prospect": +clientObjs[idx].id__c % 2
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

    map.locate({setView: true, maxZoom: 16, timeout: 50000});

    function onLocationFound(e) {

      var userIcon = L.AwesomeMarkers.icon({
        icon: 'child',
        markerColor: 'blue',
        prefix: 'fa'
      });

      currentLoc = e.latlng;

      L.marker(e.latlng, {icon: userIcon}).addTo(map).bindPopup("You are here");
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
        switch(feature.properties.prospect){
          case 0:
            return L.marker(latlng, {icon: L.AwesomeMarkers.icon({
                icon: '',
                markerColor: 'red',
                prefix: 'fa',
                html: feature.properties.id
              })
            });
          case 1:
            return L.marker(latlng, {icon: L.AwesomeMarkers.icon({
                icon: '',
                markerColor: 'green',
                prefix: 'fa',
                html: feature.properties.id
              })
            });
        }
      }
    }).addTo(map);
  };
});
