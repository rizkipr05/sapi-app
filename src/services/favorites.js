import AsyncStorage from '@react-native-async-storage/async-storage';
const KEY = 'app_favorites_v1';

export async function getFavorites() {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

export async function setFavorites(ids = []) {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(ids));
  } catch {}
}

export async function toggleFavorite(id) {
  const curr = await getFavorites();
  const has = curr.includes(id);
  const next = has ? curr.filter(x => x !== id) : [...curr, id];
  await setFavorites(next);
  return new Set(next); // balikin sebagai Set biar enak dipakai di state
}

export async function isFavorite(id) {
  const curr = await getFavorites();
  return curr.includes(id);
}
