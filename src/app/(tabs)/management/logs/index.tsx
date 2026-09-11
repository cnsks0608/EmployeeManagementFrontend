import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

export default function ManagementLogsScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Pressable onPress={() => router.push('/(tabs)/management')} style={{ padding: 16 }}>
        <Ionicons name="chevron-back" size={24} color="#333" />
      </Pressable>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loglar</Text>
      </View>
    </View>
  );
}