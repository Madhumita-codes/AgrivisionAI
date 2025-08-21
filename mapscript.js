const cityCoordinates = {
  "delhi": [28.7041, 77.1025],
  "mumbai": [19.0760, 72.8777],
  "chennai": [13.0827, 80.2707],
  "kolkata": [22.5726, 88.3639],
  "bengaluru": [12.9716, 77.5946],
  "hyderabad": [17.3850, 78.4867],
  "ahmedabad": [23.0225, 72.5714],
  "pune": [18.5204, 73.8567],
  "jaipur": [26.9124, 75.7873],
  "kochi": [9.9312, 76.2673]
};

let map = L.map('map').setView([22.9734, 78.6569], 5);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

let marker;

function locateCity() {
  const dropdown = document.getElementById("cityDropdown");
  const selectedCity = dropdown.value;
  const error = document.getElementById("error");
  const weatherCard = document.getElementById("weatherCard");

  if (selectedCity && cityCoordinates[selectedCity]) {
    const [lat, lon] = cityCoordinates[selectedCity];
    updateMap(lat, lon, selectedCity.toUpperCase());
  } else {
    error.textContent = "❌ Please select a valid city.";
    weatherCard.classList.add("hidden");
  }
}

function fetchWeather(lat, lon, label) {
  const apiKey = "0773f2a119a940901e081c2aaf881783"; // Insert your OpenWeatherMap API key
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      document.getElementById("cityName").textContent = label;
      document.getElementById("temp").textContent = data.main.temp;
      document.getElementById("wind").textContent = data.wind.speed;
      document.getElementById("humidity").textContent = data.main.humidity;
      document.getElementById("weatherCard").classList.remove("hidden");
    })
    .catch(err => {
      console.error(err);
      document.getElementById("error").textContent = "⚠️ Failed to fetch weather data.";
    });
}

function updateMap(lat, lon, label = "Your Location") {
  if (marker) map.removeLayer(marker);
  map.setView([lat, lon], 12);
  marker = L.marker([lat, lon]).addTo(map).bindPopup(label).openPopup();
  fetchWeather(lat, lon, label);
}

function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        updateMap(lat, lon, "Your Location");
      },
      (error) => {
        console.warn("Location access denied. You can still use the dropdown.");
      }
    );
  } else {
    console.warn("Geolocation is not supported by this browser.");
  }
}

// Automatically try to fetch user location on page load
window.onload = getUserLocation;