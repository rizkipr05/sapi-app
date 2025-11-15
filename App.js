import 'react-native-gesture-handler';

import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { AuthProvider, useAuth } from './src/context/AuthProvider';
import { CartProvider } from './src/context/CardProvider';
import { OrderProvider } from './src/context/OrderProvider';
import { ProductProvider } from './src/context/ProductProvider';

/* ========== Screens (buyer & seller) ========== */
import CartScreen from './src/screens/CardScreen';
import CheckoutScreen from './src/screens/CheckoutScreen';
import EditProfileScreen from './src/screens/EditProfileScreen';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import RegisterScreen from './src/screens/RegisterScreen';

import ChatRoomScreen from './src/screens/ChatRoomScreen';
import ChatsScreen from './src/screens/ChatsScreen';
import OrderHistoryScreen from './src/screens/OrderHistoryScreen';
import PaymentSuccessScreen from './src/screens/PaymentSuccessScreen';

import AddProductScreen from './src/screens/seller/AddProductScreen';
import SellerChatRoomScreen from './src/screens/seller/SellerChatRoomScreen';
import SellerChatsScreen from './src/screens/seller/SellerChatsScreen';
import SellerEditProfileScreen from './src/screens/seller/SellerEditProfileScreen';
import SellerHomeScreen from './src/screens/seller/SellerHomeScreen';
import SellerProductsScreen from './src/screens/seller/SellerProductsScreen';
import SellerProfileScreen from './src/screens/seller/SellerProfileScreen';
import SellerSalesHistoryScreen from './src/screens/seller/SellerSalesHistoryScreen';

/* ========== Navigators ========== */
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

// stack untuk menu toko (home, produk, chat, dll)
const SellerStack = createNativeStackNavigator();
// stack khusus tab Akun penjual (profil toko, dll)
const SellerProfileStack = createNativeStackNavigator();

/* === Buyer stacks/tabs === */
function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeList" component={HomeScreen} />
      <HomeStack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <HomeStack.Screen name="Chats" component={ChatsScreen} />
      <HomeStack.Screen name="ChatRoom" component={ChatRoomScreen} />
      <HomeStack.Screen name="Checkout" component={CheckoutScreen} />
      <HomeStack.Screen name="PaymentSuccess" component={PaymentSuccessScreen} />
    </HomeStack.Navigator>
  );
}

function ProfileStackScreens() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="ProfileMain" component={ProfileScreen} />
      <ProfileStack.Screen name="EditProfile" component={EditProfileScreen} />
      <ProfileStack.Screen name="Orders" component={OrderHistoryScreen} />
    </ProfileStack.Navigator>
  );
}

function BuyerTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#3f4d0b',
        tabBarInactiveTintColor: '#777',
        tabBarStyle: { backgroundColor: '#e6ead7' },
      }}
    >
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
        name="CartTab"
        component={CartScreen}
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

/* === Seller stacks/tabs === */

// stack untuk tab "Toko Saya"
function SellerStackScreen() {
  return (
    <SellerStack.Navigator screenOptions={{ headerShown: false }}>
      <SellerStack.Screen name="SellerHome" component={SellerHomeScreen} />
      <SellerStack.Screen name="SellerChatRoom" component={SellerChatRoomScreen} />
      <SellerStack.Screen name="SellerProducts" component={SellerProductsScreen} />
      <SellerStack.Screen name="SellerAddProduct" component={AddProductScreen} />
      <SellerStack.Screen name="SellerChats" component={SellerChatsScreen} />
      <SellerStack.Screen name="SellerSalesHistory" component={SellerSalesHistoryScreen} />
    </SellerStack.Navigator>
  );
}

// stack untuk tab "Akun" penjual
function SellerProfileStackScreen() {
  return (
    <SellerProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <SellerProfileStack.Screen
        name="SellerProfileMain"
        component={SellerProfileScreen}
      />
      <SellerProfileStack.Screen
        name="SellerEditProfile"
        component={SellerEditProfileScreen}
      />
    </SellerProfileStack.Navigator>
  );
}

function SellerTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#3f4d0b',
        tabBarInactiveTintColor: '#777',
        tabBarStyle: { backgroundColor: '#e6ead7' },
      }}
    >
      <Tab.Screen
        name="SellerTabHome"
        component={SellerStackScreen}
        options={{
          title: 'Toko Saya',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="storefront-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="SellerProfile"
        component={SellerProfileStackScreen}
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

/* === Root Navigator === */
function RootNavigator() {
  const { loading, user } = useAuth();
  if (loading) return null;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        user.role === 'seller' ? (
          <Stack.Screen name="SellerRoot" component={SellerTabs} />
        ) : (
          <Stack.Screen name="Home" component={BuyerTabs} />
        )
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

/* === App Root (Providers) === */
export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <OrderProvider>
          <ProductProvider>
            <NavigationContainer>
              <RootNavigator />
            </NavigationContainer>
          </ProductProvider>
        </OrderProvider>
      </CartProvider>
    </AuthProvider>
  );
}
