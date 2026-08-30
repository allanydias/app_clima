// api/weather.js

export default async function handler(req, res) {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: "Cidade não informada" });
  }

  const key = process.env.OPENWEATHER_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${key}&lang=pt_br&units=metric`;

  try {
    const resposta = await fetch(url);
    const dados = await resposta.json();
    res.status(resposta.status).json(dados);
  } catch (erro) {
    res.status(500).json({ error: "Erro ao buscar dados do clima" });
  }
}