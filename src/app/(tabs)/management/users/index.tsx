import { managementStyles as styles } from '@/styles/management.styles';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { colors } from '@/constants/colors';

export default function ManagementScreen() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Pressable style={styles.card} onPress={() => router.push('/(tabs)/management/employees')}>
          <View style={[styles.iconBox, styles.iconBoxBlue]}>
            <Ionicons name="people" size={22} color={colors.primary} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>Çalışanlar</Text>
            <Text style={styles.cardSubtitle}>Ekle, düzenle, sil</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.gray500} />
        </Pressable>
        <Pressable style={styles.card} onPress={() => router.push('/(tabs)/management/users')}>
          <View style={[styles.iconBox, styles.iconBoxGreen]}>
            <Ionicons name="person-circle" size={22} color={colors.success} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>Kullanıcılar</Text>
            <Text style={styles.cardSubtitle}>Hesap ve rol yönetimi</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.gray500} />
        </Pressable>

        <Pressable style={styles.card} onPress={() => router.push('/(tabs)/management/logs')}>
          <View style={[styles.iconBox, styles.iconBoxAmber]}>
            <Ionicons name="document-text" size={22} color={colors.warning} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>Loglar</Text>
            <Text style={styles.cardSubtitle}>Sistem etkinlik kayıtları</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.gray500} />
        </Pressable>
      </View>
    </ScrollView>
  );
}