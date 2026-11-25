# app_clima

App mobile de previsão do tempo feito com **React Native + Expo**, que consome a **OpenWeather API** e exibe temperatura, descrição, sensação térmica, umidade e vento da cidade pesquisada.

Projeto acadêmico (Atividade Individual 04) de consumo de APIs.

## Como rodar

```bash
npm install
cp .env.example .env   # preencha as variáveis
npx expo start
```

Abra no celular com o app **Expo Go** (QR code) ou aperte `w` para rodar no navegador.

## Configuração da API

Crie uma chave gratuita em https://openweathermap.org/api e escolha uma opção no `.env`:

- **Proxy (recomendado):** deploy na Vercel com a variável `OPENWEATHER_KEY` e `EXPO_PUBLIC_API_URL=https://seu-app.vercel.app`. A chave fica no servidor (`api/weather.js`).
- **Direto (testes):** `EXPO_PUBLIC_OPENWEATHER_KEY=sua_chave`. Variáveis `EXPO_PUBLIC_*` ficam embutidas no app.

## Estrutura

- `App.js` — tela e estados (cidade, loading, erro, resultado)
- `src/weatherService.js` — chamada à API e tratamento de erros
- `api/weather.js` — função serverless (proxy) que esconde a chave

## Tecnologias

React Native, Expo, OpenWeather API
