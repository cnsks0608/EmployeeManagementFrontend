import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }} />
    </GestureHandlerRootView>
  );
}
  //stack -> ekranlar kart gibi birbirlerinin üstlerine açılsın demek, o yüzden tab barı göremiyoruz 
  // buütün ekranlarda el hareketlerinin anlaşılmasını sağlar