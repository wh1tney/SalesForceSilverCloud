// initialize the map on the "map" div with a given center and zoom
$(function() {
  var map = L.map('map', {
      center: [51.505, -0.09],
      zoom: 13
  });

  L.tileLayer('https://{s}.tiles.mapbox.com/v3/examples.map-i87786ca/{z}/{x}/{y}.png', {
      attribution: 'Map data',
      maxZoom: 18
  }).addTo(map);

});


