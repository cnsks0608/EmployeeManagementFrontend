import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="employees/index" options={{ title: 'Çalışanlar' }} />
      <Tabs.Screen name="management/index" options={{ title: 'Yönetim' }} />
      <Tabs.Screen name="profile/index" options={{ title: 'Profilim' }} />
      <Tabs.Screen name="chat/index" options={{ title: 'Chat' }} />
      <Tabs.Screen name="management/employees/index" options={{ href: null }} />
      <Tabs.Screen name="management/users/index" options={{ href: null }} />
      <Tabs.Screen name="management/logs/index" options={{ href: null }} />
    </Tabs>
  );
}