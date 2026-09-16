import { getMe, updateMe, logout } from '@/services/profileService';
import { getEmployeeById } from '@/services/employeeService';
import { useEffect, useState } from 'react';
import { View, Text, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';
import { Button } from '@/components/ui/Button/Button';

export default function ProfileScreen() {
  const [user, setUser] = useState<any>(null);
  const [employee, setEmployee] = useState<any>(null);

  useEffect(() => {
    async function fetchProfile() {
      const meData = await getMe();
      setUser(meData);

      if (meData.employeeId) {
        const employeeData = await getEmployeeById(meData.employeeId);
        setEmployee(employeeData);
      }
    }
    fetchProfile();
  }, []);

  function handleLogout() {
    Alert.alert(
      'Çıkış Yap',
      'Çıkış yapmak istediğinize emin misiniz?',
      [
        { text: 'Vazgeç', style: 'cancel' },
        {
          text: 'Çıkış Yap',
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
            } catch (error) {
              // Backend'e ulaşamasak bile, kullanıcıyı çıkış yaptırmaya devam ediyoruz
            }
            await SecureStore.deleteItemAsync('token');
            router.replace('/login');
          },
        },
      ]
    );
  }


  return (
    <View style={{ padding: 20 }}>
      <Text>Kullanıcı Adı: {user?.username}</Text>
      <Text>Email: {user?.email}</Text>
      <Text>Rol: {user?.roleName}</Text>
      <Text>Ad Soyad: {employee?.firstName} {employee?.lastName}</Text>
      <Text>Departman: {employee?.departmentName}</Text>
      <Text>Unvan: {employee?.titleName}</Text>
      <Text>Maaş: {employee?.salary}</Text>

      <View style={{ marginTop: 20 }}>
        <Button title="Çıkış Yap" color="#FBEAEA" textColor="#C0392B" onPress={handleLogout} />
      </View>
    </View>
  );








}