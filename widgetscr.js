
  const apiKey = '27eb547a88e1f75319c41223261018c2'; // 🔑 Replace with your OpenWeatherMap API key
  const city = 'Kolkata'; // 🏙️ Change to desired location

  async function fetchWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();

    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;

    document.getElementById('weather').innerHTML = `
      <h2>🌤️ Weather in ${city}</h2>
      <div class="weather-info">
        <p><span class="icon">🌡️</span><strong>Temperature:</strong> ${temperature} °C</p>
        <p><span class="icon">💧</span><strong>Humidity:</strong> ${humidity}%</p>
        <p><span class="icon">🌬️</span><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
      </div>
    `;
  }

  fetchWeather();