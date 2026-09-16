import { getMe, updateMe, changePassword, logout } from '@/services/profileService';
import { getEmployeeById } from '@/services/employeeService';
import { useEffect, useState } from 'react';
import { View, Text, Alert, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';
import { Button } from '@/components/ui/Button/Button';
import { Card } from '@/components/ui/Card/Card';
import { AccountDetailModal } from '@/components/profile/AccountDetailModal';
import { profileStyles as styles } from '@/styles/profile.styles';
import { colors } from '@/constants/colors';


export default function ProfileScreen() {
  const [user, setUser] = useState<any>(null);
  const [employee, setEmployee] = useState<any>(null);
  const [accountModalVisible, setAccountModalVisible] = useState(false);

  async function fetchProfile() {
    const meData = await getMe();
    setUser(meData);

    if (meData?.employeeId) {
      const employeeData = await getEmployeeById(meData.employeeId);
      setEmployee(employeeData);
    }
  }
  useEffect(() => {
    fetchProfile();  // sayfa ilk açıldığında bir kez yüklenir 
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
              // Backend'e ulaşamasak bile, kullanıcıyı çıkış yaptırmaya devam ediyoruz (tokenını sileriz)
            }
            await SecureStore.deleteItemAsync('token');
            router.replace('/login');
          },
        },
      ]
    );
  }

  function getInitials(firstName?: string, lastName?: string) {
    if (!firstName || !lastName) return '';
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  }

  return (
    <>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {getInitials(employee?.firstName, employee?.lastName)}
            </Text>
          </View>
          <Text style={styles.name}>
            {employee ? `${employee.firstName} ${employee.lastName}` : user?.username}
          </Text>
          {employee && (
            <Text style={styles.subtitle}>
              {employee.titleName} · {employee.departmentName}
            </Text>
          )}
        </View>

        <Card style={styles.infoCard} onPress={() => setAccountModalVisible(true)}>
          <View style={styles.cardHeader}>
            <View style={styles.cardTitleGroup}>
              <Ionicons name="person-circle-outline" size={20} color={colors.primary} />
              <Text style={styles.cardTitle}>Hesap Bilgileri</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.gray500} />
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Kullanıcı Adı</Text>
            <Text style={styles.value}>{user?.username || '-'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Rol</Text>
            <Text style={styles.value}>{user?.roleName || '-'}</Text>
          </View>
        </Card>


        <Card style={styles.infoCard}>
          <View style={styles.cardHeader}>
            <View style={styles.cardTitleGroup}>
              <Ionicons name="briefcase-outline" size={20} color={colors.success} />
              <Text style={styles.cardTitle}>Çalışan Bilgileri</Text>
            </View>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Ad Soyad</Text>
            <Text style={styles.value}>{employee ? `${employee.firstName} ${employee.lastName}` : '-'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Sicil No</Text>
            <Text style={styles.value}>{employee?.registrationNumber || '-'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{employee?.email || '-'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Departman</Text>
            <Text style={styles.value}>{employee?.departmentName || '-'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Unvan</Text>
            <Text style={styles.value}>{employee?.titleName || '-'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>İşe Giriş Tarihi</Text>
            <Text style={styles.value}>
              {employee?.hireDate ? new Date(employee.hireDate).toLocaleDateString('tr-TR') : '-'}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Maaş</Text>
            <Text style={styles.value}>
              {employee?.salary ? `${employee.salary.toLocaleString('tr-TR')} ₺` : '-'}
            </Text>
          </View>
        </Card>

        <View style={styles.logoutWrapper}>
          <Button title="Çıkış Yap" color={colors.dangerBg} textColor={colors.danger} size="large" onPress={handleLogout} />
        </View>
      </ScrollView>

      <AccountDetailModal
        visible={accountModalVisible}
        onClose={() => setAccountModalVisible(false)}
        user={user}
        onSuccess={() => {
          fetchProfile();
        }}
      />
    </>
  );
}