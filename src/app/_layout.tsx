import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { AuthProvider } from '@/context/AuthContext';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }} />
        <Toast />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
//stack -> ekranlar kart gibi birbirlerinin üstlerine açılsın demek, o yüzden tab barı göremiyoruz 
// bütün ekranlarda el hareketlerinin anlaşılmasını sağlar