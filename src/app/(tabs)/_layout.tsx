import { Tabs } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/constants/colors';

export default function TabLayout() {

  const { user } = useAuth();
  const isAdmin = user?.roleName === 'Admin';


  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: colors.primary, tabBarInactiveTintColor: colors.gray500 }}>
      <Tabs.Screen
        name="employees/index"
        options={{
          title: 'Çalışanlar',
          tabBarIcon: ({ color, size }) => <Ionicons name="people" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="management/index"
        options={{
          title: 'Yönetim',
          href: isAdmin ? undefined : null,
          tabBarIcon: ({ color, size }) => <Ionicons name="settings" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="chat/index"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color, size }) => <Ionicons name="chatbubble-ellipses" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: 'Profilim',
          tabBarIcon: ({ color, size }) => <Ionicons name="person-circle" size={size} color={color} />,
        }}
      />
      <Tabs.Screen name="management/employees/index" options={{ href: null }} />
      <Tabs.Screen name="management/users/index" options={{ href: null }} />
      <Tabs.Screen name="management/logs/index" options={{ href: null }} />
    </Tabs>
  );
}