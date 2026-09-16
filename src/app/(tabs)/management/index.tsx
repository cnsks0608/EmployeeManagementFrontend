import { managementStyles as styles } from '@/styles/management.styles';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

export default function ManagementScreen() {
  return (
    <View style={styles.container}>
      <Pressable style={styles.card} onPress={() => router.push('/(tabs)/management/employees')}>
        <View style={[styles.iconBox, styles.iconBoxBlue]}>
          <Ionicons name="people" size={22} color="#185FA5" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.cardTitle}>Çalışanlar</Text>
          <Text style={styles.cardSubtitle}>Ekle, düzenle, sil</Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color="#999" />
      </Pressable>
      <Pressable style={styles.card} onPress={() => router.push('/(tabs)/management/users')}>
        <View style={[styles.iconBox, styles.iconBoxGreen]}>
          <Ionicons name="person-circle" size={22} color="#3B6D11" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.cardTitle}>Kullanıcılar</Text>
          <Text style={styles.cardSubtitle}>Hesap ve rol yönetimi</Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color="#999" />
      </Pressable>

      <Pressable style={styles.card} onPress={() => router.push('/(tabs)/management/logs')}>
        <View style={[styles.iconBox, styles.iconBoxAmber]}>
          <Ionicons name="document-text" size={22} color="#854F0B" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.cardTitle}>Loglar</Text>
          <Text style={styles.cardSubtitle}>Sistem etkinlik kayıtları</Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color="#999" />
      </Pressable>
    </View>
  );
}