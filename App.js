// WAJIB di paling atas (sebelum import navigasi)
import 'react-native-gesture-handler';

import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthProvider, useAuth } from './src/context/AuthProvider';

import EditProfileScreen from './src/screens/EditProfileScreen';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import RegisterScreen from './src/screens/RegisterScreen';

// === Tambahan layar chat ===
import ChatRoomScreen from './src/screens/ChatRoomScreen';
import ChatsScreen from './src/screens/ChatsScreen';
// import FavoritesScreen jika ada

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const ProfileStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();

/* ===================== PROFILE STACK ===================== */
function ProfileStackScreens() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="ProfileMain" component={ProfileScreen} />
      <ProfileStack.Screen name="EditProfile" component={EditProfileScreen} />
    </ProfileStack.Navigator>
  );
}

/* ===================== HOME STACK (list -> detail -> chats) ===================== */
function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeList" component={HomeScreen} />
      <HomeStack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <HomeStack.Screen name="Chats" component={ChatsScreen} />
      <HomeStack.Screen name="ChatRoom" component={ChatRoomScreen} />
      {/* <HomeStack.Screen name="Favorites" component={FavoritesScreen} /> */}
    </HomeStack.Navigator>
  );
}

/* ===================== HOME TABS ===================== */
function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#3f4d0b',
        tabBarInactiveTintColor: '#777',
        tabBarStyle: { backgroundColor: '#e6ead7' },
      }}
    >
      {/* ⬇️ PAKAI HOME STACK DI SINI, BUKAN HomeScreen LANGSUNG */}
      <Tab.Screen
        name="HomeTab"
        component={HomeStackScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={HomeScreen} // placeholder; ganti ke CartScreen jika sudah ada
        options={{
          title: 'Cart',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStackScreens}
        options={{
          title: 'Akun',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

/* ===================== ROOT NAVIGATION ===================== */
function RootNavigator() {
  const { loading, user } = useAuth();
  if (loading) return null; // bisa ganti Splash

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="Home" component={HomeTabs} />
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

/* ===================== MAIN APP ===================== */
export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
