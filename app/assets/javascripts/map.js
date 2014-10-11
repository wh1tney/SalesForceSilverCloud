// initialize the map on the "map" div with a given center and zoom
$(function() {
  $.ajax({
    url: '/clients',
    method: 'get',
    dataType: 'json'   
  }).done(function(response) {
    console.log(response);
  }).fail(function(response) {
    console.log("failed");
  })



  var map = L.map('map');

  L.tileLayer('https://{s}.tiles.mapbox.com/v3/examples.map-i87786ca/{z}/{x}/{y}.png', {
    attribution: 'Map data',
    maxZoom: 18,
    minZoom:12
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

  var geojsonFeature = {
    "type": "Feature",
    "properties": {
      "marker-color": "#000",
      "marker-symbol": "star-stroked",
      "name": "Coors Field",
      "amenity": "Baseball Stadium",
      "popupContent": "This is where the Rockies play!"
    }, 

    "geometry": {
      "type": "Point",
      "coordinates": [-122.404393, 37.784896]
    }
  };
  var style= {
      "color": "#970908", 
      "weight": 5, 
      "opacity": 0.45
    };
  L.geoJson(geojsonFeature, {
    style: style,
    onEachFeature: onEachFeature
  }).addTo(map);
});
