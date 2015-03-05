$(document).ready(function() {
	var map = L.mapbox.map('map', 'echristensen.map-77cfk1ql', { tileLayer: { noWrap: false} }).setView([10, 10], 3);

	for (var i = 0; i < data.length; i++) {
		addLocation(data[i]);
	}

	function addLocation(entry) {
		var geocoder = L.mapbox.geocoder('echristensen.map-77cfk1ql');
		var address = '';
		if (entry.postcode != "") address += entry.postcode;
		if ((entry.postcode != "") && (entry.location != "")) address += ', ';
		if (entry.location != "") address += entry.location;

		console.log(address)

		if (address) {
			geocoder.query(address, function(err, result) {
				if (err) {
					console.log("false", entry)
					return false;
				}

				var description = entry.idea + '<p>';
				if (entry.numberOfPeople) {
					description += '<b>Number of people impacted:</b> ' + entry.numberOfPeople + '<br>';
				}
				if (entry.created_at) {
					description += '<b>Date of pledge:</b> ' + entry.created_at.split(' ')[0] + '<br>';
				}

				var marker = L.mapbox.markerLayer({
					type: 'Feature',
					geometry: {
						type: 'Point',
						coordinates: [ result.latlng[1], result.latlng[0] ]
					},
					properties: {
						title: address,
						description: description,
						'marker-size': 'small',
						'marker-color': '#f0a'
					}
				}).addTo(map);

				if (entry._id == '54f829b643bbf5157bcf55e0') {

					map.setView([result.latlng[0], result.latlng[1]], 5);

					marker.eachLayer(function(m) {
						m.openPopup();
					});
				}
			});
		}


	}
});

function parseData(resp) {
	var data = [];
	var cells = resp.feed.entry;
	var currentRow = 0;
	var currentRowData = {};

	for (var i=0; i < cells.length ;i++) {
		var currentCell = cells[i];
		var cellTitle = currentCell.title.$t;

		var firstNumIndex;
		for (firstNumIndex = 0; firstNumIndex < cellTitle.length && isNaN(cellTitle[firstNumIndex]); firstNumIndex++) {}

		var cellCol = cellTitle.substring(0,firstNumIndex);
		var cellRow = cellTitle.substring(firstNumIndex);

		if (cellRow != currentRow) {
			if (currentRowData.location) {
				data.push(currentRowData);
			}
			currentRowData = {};
			currentRow = cellRow;
		}

		switch (cellCol) {
			case 'A':
				currentRowData.created_at = currentCell.content.$t;
				break;
			case 'B':
				currentRowData.createBadge = currentCell.content.$t;
				break;
			case 'C':
				currentRowData.idea = currentCell.content.$t;
				break;
			case 'D':
				currentRowData.numberOfPeople = currentCell.content.$t;
				break;
			case 'E':
				currentRowData.location = currentCell.content.$t;
				break;
		}
	}

	data.shift();
	return data;
}