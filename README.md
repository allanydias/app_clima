# App Clima (React Native + Expo)

Aplicativo mobile de previsão do tempo feito com React Native e Expo. O usuário digita uma cidade e o app exibe temperatura, sensação térmica, descrição, umidade e vento, consumindo a OpenWeather API.

## Como funciona

O app não guarda a chave da OpenWeather. Ele chama um proxy (`api/weather.js`, hospedado na Vercel), que adiciona a chave no servidor e repassa a resposta da OpenWeather.

## Tecnologias

- React Native
- Expo
- OpenWeather API
- Vercel (função serverless como proxy)

## Como rodar

```bash
npm install
cp .env.example .env
npx expo start
```

No `.env`, defina a URL do proxy:

```
EXPO_PUBLIC_API_URL=https://app-clima-virid-nine.vercel.app
```

Abra o app no celular com o **Expo Go**, escaneando o QR code. Em ambientes como o GitHub Codespaces, use `npx expo start --tunnel`.

## Estrutura

- `App.js`: tela principal
- `src/weatherService.js`: chamada à API e tratamento dos dados
- `api/weather.js`: proxy serverless que guarda a chave da OpenWeather
