const socket = io();

let lat = 0.0
let lng = 0.0
mapMarker = []

socket.on('data', function (data) {
    lattag = document.getElementById('lat')
    lattag.innerHTML = `Latitude: ${data.lat}`

    lngtag = document.getElementById('lng')
    lngtag.innerHTML = `Longitude: ${data.lng}` 

    for (var i = 0; i < mapMarker.length; i++) {
        mymap.removeLayer(mapMarker[i])
    }

    var marker = L.marker([data.lat, data.lng]).addTo(mymap)
    mapMarker.push(marker)
})

var mymap = L.map('mapid').setView([-20.2148246765, -40.2387123107], 25);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 20,
    id: 'mapbox/streets-v11',
    accessToken: 'YOUR_TOKEN_HERE_https://account.mapbox.com/access-tokens/'
    }).addTo(mymap);




