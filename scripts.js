

//const key = 'COLOCA_A_CHAVE_DO_OPENWEATHERMAP_AQUI'

function dataOnScreen(dados) {
  
  document.querySelector(".city").innerHTML = "Tempo em " + dados.name
  document.querySelector(".temp").innerHTML = Math.floor(dados.main.temp) + "°C"
  document.querySelector(".text-temp").innerHTML = dados.weather[0].description
  document.querySelector(".humidity").innerHTML = "Umidade: " + dados.main.humidity + "%"
  document.querySelector(".img-temp").src = `https://openweathermap.org/img/wn/` + dados.weather[0].icon + `.png`
}

async function searchCity(city) {
  //função assicrona

  //const dados = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`).then (answer => answer.json())

  const resposta = await fetch(`/api/weather?city=${encodeURIComponent(city)}`)
  const dados = await resposta.json()

  if (dados.cod === "404" || dados.cod === 404) {
    alert("Cidade não encontrada.")
    return
  }

  // await esperar que o servidor responda 
  //then pegar a resposta
  //units=metric é para passar farihain para celsion

  dataOnScreen(dados)

}

function clickInput() {
  const city = document.querySelector('.city-input').value

  searchCity(city)
}


