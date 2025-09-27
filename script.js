async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const resultDiv = document.getElementById("result");

  if (!city) {
    resultDiv.innerHTML = "❌ Ingresa una ciudad.";
    return;
  }

  try {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true`);
    const data = await response.json();
    
    resultDiv.innerHTML = `
      <h3>${city}</h3>
      <p>🌡️ ${data.current_weather.temperature} °C</p>
      <p>💨 ${data.current_weather.windspeed} km/h</p>
    `;
  } catch (err) {
    resultDiv.innerHTML = "❌ Error obteniendo datos.";
  }
}
