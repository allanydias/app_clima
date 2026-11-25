import { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { fetchWeather } from './src/weatherService';

// Mesma fonte de imagem do site (picsum sorteia uma foto). Para fixar uma só,
// use: https://picsum.photos/id/1015/1080/1920
const BACKGROUND_URI = 'https://picsum.photos/1080/1920?random=1';

export default function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSearch() {
    const name = city.trim();
    if (!name) {
      setError('Digite o nome de uma cidade.');
      return;
    }
    Keyboard.dismiss();
    setLoading(true);
    setError(null);
    try {
      setWeather(await fetchWeather(name));
    } catch (e) {
      setWeather(null);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ImageBackground
      source={{ uri: BACKGROUND_URI }}
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <StatusBar style="light" />
        <View style={styles.card}>
          <Text style={styles.title}>Clima</Text>

          <View style={styles.searchRow}>
            <TextInput
              style={styles.input}
              placeholder="Digite o nome da cidade"
              placeholderTextColor="#9a9a9a"
              value={city}
              onChangeText={setCity}
              onSubmitEditing={handleSearch}
              returnKeyType="search"
              autoCapitalize="words"
            />
            <Pressable style={styles.button} onPress={handleSearch} disabled={loading}>
              <Text style={styles.buttonText}>Buscar</Text>
            </Pressable>
          </View>

          {loading && <ActivityIndicator style={styles.feedback} color="#fff" size="large" />}

          {error && !loading && <Text style={[styles.feedback, styles.error]}>{error}</Text>}

          {weather && !loading && (
            <View style={styles.result}>
              <Text style={styles.city}>
                Tempo em {weather.city}
                {weather.country ? `, ${weather.country}` : ''}
              </Text>
              <Text style={styles.temp}>{weather.temp}°C</Text>
              <View style={styles.descRow}>
                <Image
                  style={styles.icon}
                  source={{ uri: `https://openweathermap.org/img/wn/${weather.icon}@2x.png` }}
                />
                <Text style={styles.desc}>{weather.description}</Text>
              </View>
              <Text style={styles.detail}>Sensação térmica: {weather.feelsLike}°C</Text>
              <Text style={styles.detail}>Umidade: {weather.humidity}%</Text>
              <Text style={styles.detail}>Vento: {weather.wind} km/h</Text>
            </View>
          )}

          {!weather && !loading && !error && (
            <Text style={[styles.feedback, styles.hint]}>Busque uma cidade para ver a previsão.</Text>
          )}
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, backgroundColor: '#1b2a41' },
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  card: { backgroundColor: '#000000cc', borderRadius: 25, padding: 20, width: '100%', maxWidth: 480, alignSelf: 'center' },
  title: { color: '#fff', fontSize: 32, fontWeight: '600', textAlign: 'center', marginBottom: 20 },
  searchRow: { flexDirection: 'row', gap: 10 },
  input: { flex: 1, backgroundColor: '#b3b2b22b', color: '#fff', fontSize: 18, borderRadius: 25, paddingHorizontal: 16, paddingVertical: 10 },
  button: { backgroundColor: '#4a8fe7', borderRadius: 25, paddingHorizontal: 18, justifyContent: 'center' },
  buttonText: { color: '#fff', fontWeight: '600' },
  feedback: { marginTop: 30, textAlign: 'center' },
  error: { color: '#ff7b7b', fontSize: 16 },
  hint: { color: '#9a9a9a' },
  result: { marginTop: 30 },
  city: { color: '#fff', fontSize: 20, fontWeight: '500' },
  temp: { color: '#fff', fontSize: 48, fontWeight: '300', marginTop: 10 },
  descRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  icon: { width: 64, height: 64, marginLeft: -8 },
  desc: { color: '#fff', fontSize: 18, textTransform: 'capitalize' },
  detail: { color: '#ddd', fontSize: 16, marginTop: 8 },
});