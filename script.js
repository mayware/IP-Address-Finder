const apiKey = 'at_oHrWgfnerTeU7a1PtCxLxlKjojMaj';
const url = 'https://geo.ipify.org/api/v2/country,city?apiKey=at_oHrWgfnerTeU7a1PtCxLxlKjojMaj&ipAddress=';
let address = document.querySelector('.address-value');
let town = document.querySelector('.town-value');
let coordinates = document.querySelector('.coor-value');
let zone = document.querySelector('.zone-value');
let isp = document.querySelector('.isp-value');
let input = document.querySelector('.search-field');
let myMap;
myMap = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

function getIP(e) {
    e.preventDefault();
    if (input.value != '' && input.value != null) {
        fetch(`${url}${input.value}`)
            .then(res => res.json())
            .then(data => trackData(data))
    }
    input.value = ''
}

function trackData(info) {
    address.innerHTML = info.ip;
    town.innerHTML = `${info.location.city},${info.location.country}`;
    coordinates.innerHTML = `Lat ${info.location.lat} <br> Lng ${info.location.lng}`
    zone.innerHTML = `UTC ${info.location.timezone}`;
    isp.innerHTML = info.isp;
    var marker = L.marker([info.location.lat, info.location.lng]).addTo(myMap);
    myMap.setView([info.location.lat, info.location.lng], 13)
}
