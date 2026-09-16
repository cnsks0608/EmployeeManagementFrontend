import { Modal } from '@/components/ui/Modal/Modal';
import { Button } from '@/components/ui/Button/Button';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { updateMe, changePassword, deleteMe } from '@/services/profileService';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';
import { colors } from '@/constants/colors';

type AccountDetailModalProps = {
  visible: boolean;
  onClose: () => void;
  user: any;
  onSuccess: () => void;
};

export function AccountDetailModal({ visible, onClose, user, onSuccess }: AccountDetailModalProps) {
  const [username, setUsername] = useState('');
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const isAnyPasswordInputTouched =
    currentPassword.length > 0 ||
    newPassword.length > 0 ||
    confirmPassword.length > 0;


  useEffect(() => {
    if (user) {
      setUsername(user.username);
    }
  }, [user, visible]);

  function hasChanges() {
    return (
      (username !== user?.username && username.trim() !== '') ||
      newPassword !== '' ||
      confirmPassword !== ''
    );
  }

  function resetAndClose() {
    setUsername(user?.username || '');
    setIsEditingUsername(false);
    setIsPasswordOpen(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    onClose();
  }

  function handleClose() {
    if (hasChanges()) {
      Alert.alert(
        'Emin misiniz?',
        'Kaydedilmemiş değişiklikleriniz kaybolacak.',
        [
          { text: 'Vazgeç', style: 'cancel' },
          {
            text: 'Çık',
            style: 'destructive',
            onPress: resetAndClose,
          },
        ]
      );
    } else {
      resetAndClose()
    }
  }

  async function handleSave() {
    const usernameChanged = username !== user?.username && username.trim() !== '';
    const passwordChanged = isPasswordOpen && currentPassword !== '' && newPassword !== '' && confirmPassword !== '';

    // Değişiklik yapılmadıysa başarı toast'ı basmadan kapat
    if (!usernameChanged && !passwordChanged) {
      resetAndClose();
      return;
    }

    if (isAnyPasswordInputTouched) {
      if (!currentPassword || !newPassword || !confirmPassword) {
        Toast.show({
          type: 'error',
          text1: 'Eksik Bilgi',
          text2: 'Lütfen, tüm şifre alanlarını doldurun.',
        });
        return;
      }

      if (newPassword !== confirmPassword) {
        Toast.show({
          type: 'error',
          text1: 'Şifreler Uyuşmuyor',
          text2: 'Girdiğiniz şifreler birbiriyle eşleşmiyor.',
        });
        return;
      }
    }

    try {
      if (usernameChanged) {
        await updateMe({ username });
      }

      if (passwordChanged) {
        await changePassword({ currentPassword, newPassword, confirmPassword });
      }

      Toast.show({
        type: 'success',
        text1: 'Başarılı',
        text2: 'Bilgileriniz güncellendi.',
      });

      onSuccess();
      resetAndClose();
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Hata',
        text2: error.message,
      });
    }
  }

  function handleDeleteAccount() {
    Alert.alert(
      'Hesabınızı Silmek İstiyor musunuz?',
      'Bu işlem, geri alınamaz.',
      [
        { text: 'Vazgeç', style: 'cancel' },
        {
          text: 'Hesabımı Sil',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteMe();
              await SecureStore.deleteItemAsync('token');
              router.replace('/login');
            } catch (error: any) {
              Toast.show({
                type: 'error',
                text1: 'Hata',
                text2: error.message,
              });
            }
          },
        },
      ]
    );
  }

  return (
    <Modal visible={visible} onClose={handleClose} style={styles.modalSize} scrollable={true}>

      {/* Profil Avatar Bölümü */}
      <View style={styles.avatarSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.username?.substring(0, 2).toUpperCase()}
          </Text>
        </View>
        <Text style={styles.headerTitle}>{user?.username}</Text>
        <Text style={styles.headerSubtitle}>{user?.roleName}</Text>
      </View>


      <View style={styles.infoSection}>

        {/* Kullanıcı Adı Satırı */}
        <View style={styles.infoRow}>
          <Ionicons name="person-outline" size={16} color={colors.gray500} />
          <Text style={styles.infoLabelWithMargin}>Kullanıcı Adı</Text>

          {isEditingUsername ? (
            <View style={styles.inlineInputContainer}>
              <TextInput
                style={styles.inlineInput}
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
              />
              {username.length > 0 && (
                <Pressable
                  onPress={() => {
                    setUsername(user?.username || '');
                    setIsEditingUsername(false);
                  }}
                >
                  <Ionicons name="close-circle" size={16} color={colors.gray500} />
                </Pressable>
              )}
            </View>
          ) : (
            <Pressable style={styles.valueGroup} onPress={() => setIsEditingUsername(true)}>
              <Text style={styles.infoValue}>{username}</Text>
              <Ionicons name="chevron-forward" size={16} color={colors.gray500} style={styles.chevronIcon} />
            </Pressable>
          )}
        </View>


        {/* Şifre Değiştir Başlığı */}
        <Pressable style={styles.passwordCardHeader} onPress={() => setIsPasswordOpen(!isPasswordOpen)}>
          <View style={styles.valueGroup}>
            <Ionicons name="key-outline" size={16} color={colors.gray500} />
            <Text style={styles.passwordLabel}>Şifre Değiştir</Text>
          </View>
          <Ionicons name={isPasswordOpen ? 'chevron-up' : 'chevron-forward'} size={16} color={colors.gray500} />
        </Pressable>


        {/* Şifre Değiştir Formu */}
        {isPasswordOpen && (
          <View style={styles.passwordForm}>
            <Text style={styles.inputLabel}>Mevcut Şifre</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                secureTextEntry={!showCurrentPassword}
                value={currentPassword}
                onChangeText={setCurrentPassword}
              />
              <Pressable onPress={() => setShowCurrentPassword(!showCurrentPassword)}>
                <Ionicons name={showCurrentPassword ? 'eye-off' : 'eye'} size={16} color={colors.gray500} />
              </Pressable>
              {currentPassword.length > 0 && (
                <Pressable onPress={() => setCurrentPassword('')}>
                  <Ionicons name="close-circle" size={16} color={colors.gray500} />
                </Pressable>
              )}
            </View>

            <Text style={styles.inputLabel}>Yeni Şifre</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                secureTextEntry={!showNewPassword}
                value={newPassword}
                onChangeText={setNewPassword}
              />
              <Pressable onPress={() => setShowNewPassword(!showNewPassword)}>
                <Ionicons name={showNewPassword ? 'eye-off' : 'eye'} size={16} color={colors.gray500} />
              </Pressable>
              {newPassword.length > 0 && (
                <Pressable onPress={() => setNewPassword('')}>
                  <Ionicons name="close-circle" size={16} color={colors.gray500} />
                </Pressable>
              )}
            </View>

            <Text style={styles.inputLabel}>Yeni Şifre (Tekrar)</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <Pressable onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Ionicons name={showConfirmPassword ? 'eye-off' : 'eye'} size={16} color={colors.gray500} />
              </Pressable>
              {confirmPassword.length > 0 && (
                <Pressable onPress={() => setConfirmPassword('')}>
                  <Ionicons name="close-circle" size={16} color={colors.gray500} />
                </Pressable>
              )}
            </View>
          </View>
        )}


        {/* Hesabımı Sil Satırı */}
        <Pressable style={styles.passwordCardHeader} onPress={handleDeleteAccount}>
          <View style={styles.valueGroup}>
            <Ionicons name="trash-outline" size={16} color={colors.danger} />
            <Text style={styles.deleteLabel}>
              Hesabımı Sil
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color={colors.danger}/>
        </Pressable>

      </View>


      {/* Aksiyon Butonları */}
      <View style={styles.buttonRow}>
        <View style={styles.buttonHalf}>
          <Button title="İptal" size="small" variant="secondary" textColor={colors.gray800} onPress={handleClose} />
        </View>
        <View style={styles.buttonHalf}>
          <Button title="Kaydet" size="small" onPress={handleSave} />
        </View>
      </View>

    </Modal>
  );
}

const styles = StyleSheet.create({
  modalSize: {
    width: 340,
  },
  avatarSection: {
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primaryBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  avatarText: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.gray800,
  },
  headerSubtitle: {
    fontSize: 13,
    color: colors.gray600,
    marginBottom: 10,
  },
  infoSection: {
    borderTopWidth: 1,
    borderTopColor:colors.borderLight,
    paddingTop: 18,
    gap: 18,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 4,
  },
  infoLabel: {
    fontSize: 13,
    color: colors.gray600,
    width: 90,
  },
  infoLabelWithMargin: {
    fontSize: 13,
    color: colors.gray600,
    width: 90,
    marginRight: 16,
  },
  infoValue: {
    fontSize: 13,
    color: colors.gray800,
    flex: 1,
  },
  valueGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  chevronIcon: {
    marginLeft: 6,
  },
  inlineInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: 8,
    paddingHorizontal: 8,
    flex: 1,
    gap: 10,
  },
  inlineInput: {
    flex: 1,
    paddingVertical: 4,
    fontSize: 13,
  },
  passwordCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  passwordLabel: {
    fontSize: 13,
    color: colors.gray600,
    marginLeft: 10,
  },
  deleteLabel: {
    fontSize: 13,
    color: colors.danger,
    marginLeft: 10,
  },
  passwordForm: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    gap: 4,
  },
  inputLabel: {
    fontSize: 12,
    color: colors.gray600,
    marginTop: 8,
    marginBottom: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.borderDefault,
    borderRadius: 8,
    paddingHorizontal: 10,
    gap: 6,
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 13,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  buttonHalf: {
    flex: 1,
  },
});