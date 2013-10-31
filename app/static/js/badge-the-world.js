$(document).ready(function() {
  var map = L.mapbox.map('map', 'echristensen.map-77cfk1ql')
  .setView([10, 10], 3);

  url = "https://spreadsheets.google.com/feeds/cells/0Av2oW_ggQ8i-dFBOMk1Mc2NPT0l4SEVYeGxLSm9td2c/od6/public/basic?alt=json-in-script&callback=?";
  $.getJSON(url, function(resp) {
    var data = getData(resp);
    for (var i = 0; i < data.length; i++) {
      addLocation(data[i]);
    }
  });

  function addLocation(location) {
    var geocoder = L.mapbox.geocoder('echristensen.map-77cfk1ql')
    var address = location;

    if (address) {
      geocoder.query(address, function(err, result) {
        if (err) {
          return false;
        }

        L.mapbox.markerLayer({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [ result.latlng[1], result.latlng[0] ]
          },
          properties: {
            title: 'Badges are being issued here!',
            description: 'Just one of me',
            'marker-size': 'small',
            'marker-color': '#f0a'
          }
        }).addTo(map);
      });
    }


  }
});


function getData(resp) {
  var data = [];
  var cells = resp.feed.entry;

  for (var i=0; i < cells.length ;i++) {
    if (cells[i].title.$t[0] == 'E') {
      data.push(cells[i].content.$t);
    }
  }

  data.shift();
  return data;
}