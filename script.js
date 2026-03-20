// Initialize map
var map = L.map('map').setView([34.5, 77.5], 6);

// Base map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
}).addTo(map);

// Load basins
fetch('data/basins.geojson')
  .then(res => res.json())
  .then(data => {
    L.geoJSON(data, {
      style: {
        color: "#6b7280",
        weight: 1,
        fillOpacity: 0
      }
    }).addTo(map);
  });

// Load glaciers
fetch('data/glaciers.geojson')
  .then(res => res.json())
  .then(data => {
    L.geoJSON(data, {
      style: {
        color: "#2563eb",
        weight: 1,
        fillOpacity: 0.5
      },
      onEachFeature: function(feature, layer) {

        layer.on('click', function() {
          document.getElementById('info-box').innerHTML =
            `<h3>Glacier ID</h3>
             <p>${feature.properties.id || "Unknown"}</p>`;
        });

      }
    }).addTo(map);
  });