// initialize the map on the "map" div with a given center and zoom
$(function() {
  var map = L.map('map');

  L.tileLayer('https://{s}.tiles.mapbox.com/v3/examples.map-i87786ca/{z}/{x}/{y}.png', {
      attribution: 'Map data',
      maxZoom: 18
  }).addTo(map);

  map.locate({setView: true, maxZoom: 16});
});


