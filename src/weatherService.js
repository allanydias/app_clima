// Se EXPO_PUBLIC_API_URL estiver definido, usa o proxy (api/weather.js).
// Caso contrário, usa EXPO_PUBLIC_OPENWEATHER_KEY e chama a OpenWeather direto.

const API_URL = process.env.EXPO_PUBLIC_API_URL;
const API_KEY = process.env.EXPO_PUBLIC_OPENWEATHER_KEY;

function buildUrl(city) {
  const q = encodeURIComponent(city);
  if (API_URL) {
    return `${API_URL.replace(/\/$/, '')}/api/weather?city=${q}`;
  }
  if (API_KEY) {
    return `https://api.openweathermap.org/data/2.5/weather?q=${q}&appid=${API_KEY}&lang=pt_br&units=metric`;
  }
  throw new Error('Configure EXPO_PUBLIC_API_URL ou EXPO_PUBLIC_OPENWEATHER_KEY no arquivo .env');
}

export async function fetchWeather(city) {
  const response = await fetch(buildUrl(city));
  const data = await response.json().catch(() => ({}));

  if (response.status === 404) throw new Error('Cidade não encontrada.');
  if (!response.ok) throw new Error(data.message || data.error || 'Erro ao buscar dados do clima.');

  return {
    city: data.name,
    country: data.sys?.country,
    temp: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    humidity: data.main.humidity,
    wind: Math.round((data.wind?.speed ?? 0) * 3.6), // m/s -> km/h
  };
}
