import { BottomSheet } from '@/components/ui/BottomSheet/BottomSheet';
import { Button } from '@/components/ui/Button/Button';
import { Dropdown } from '@/components/ui/Dropdown/Dropdown';
import { getAllEmployees } from '@/services/employeeService';
import { createUser, updateUser } from '@/services/userService';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import Toast from 'react-native-toast-message';

type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  email:string;
  registrationNumber: string;
};

type UserFormData = {
  id?: number;
  username: string;
  roleType: string;
  employeeId: number | undefined;
};

type ManagementUserFormSheetProps = {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
  mode: 'create' | 'edit';
  initialData?: UserFormData;
};

export function ManagementUserFormSheet({ visible, onClose, onSuccess, mode, initialData }: ManagementUserFormSheetProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [roleType, setRoleType] = useState<string | undefined>(undefined);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | undefined>(undefined);

  useEffect(() => {
    async function fetchEmployees() {
      const result = await getAllEmployees({ pageSize: 1000, status: 'active', hasNoUser:true});
      setEmployees(result.items);
    }
    fetchEmployees();
  }, [visible]);

  useEffect(() => {
    if (initialData) {
      setUsername(initialData.username);
      setRoleType(initialData.roleType);
      setSelectedEmployeeId(initialData.employeeId);
    } else {
      setUsername('');
      setPassword('');
      setConfirmPassword('');
      setRoleType(undefined);
      setSelectedEmployeeId(undefined);
    }
  }, [initialData, visible]);

  async function handleSave() {
    if (!username) {
      Toast.show({
        type: 'error',
        text1: 'Eksik Bilgi',
        text2: 'Lütfen kullanıcı adı girin.',
      });
      return;
    }

    if (!roleType) {
      Toast.show({
        type: 'error',
        text1: 'Eksik Bilgi',
        text2: 'Lütfen bir rol seçin.',
      });
      return;
    }

    if (mode === 'create') {
      if (!selectedEmployeeId) {
        Toast.show({
          type: 'error',
          text1: 'Eksik Bilgi',
          text2: 'Lütfen bir çalışan seçin.',
        });
        return;
      }

      if (!password || password.length < 6) {
        Toast.show({
          type: 'error',
          text1: 'Geçersiz Şifre',
          text2: 'Şifre en az 6 karakter olmalı.',
        });
        return;
      }

      if (password !== confirmPassword) {
        Toast.show({
          type: 'error',
          text1: 'Şifreler Uyuşmuyor',
          text2: 'Girdiğiniz şifreler birbiriyle eşleşmiyor.',
        });
        return;
      }
    }

    try {
      if (mode === 'create') {
        await createUser({
          username,
          password,
          confirmPassword,
          roleType,
          employeeId: selectedEmployeeId!,
        });
        Toast.show({
          type: 'success',
          text1: 'Başarılı',
          text2: 'Kullanıcı başarıyla oluşturuldu.',
        });
      } else if (initialData?.id) {
        await updateUser(initialData.id, {
          username,
          roleType,
        });
        Toast.show({
          type: 'success',
          text1: 'Başarılı',
          text2: 'Kullanıcı başarıyla güncellendi.',
        });
      }
      onSuccess();
      onClose();
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Hata',
        text2: error.message,
      });
    }
  }

  function handleCancel() {
    const hasChanges = mode === 'create'
      ? (username ||  password || confirmPassword || roleType || selectedEmployeeId)
      : (
          username !== initialData?.username ||
          roleType !== initialData?.roleType
        );

    if (hasChanges) {
      Alert.alert(
        'Emin misiniz?',
        'Kaydedilmemiş değişiklikleriniz kaybolacak.',
        [
          { text: 'Vazgeç', style: 'cancel' },
          {
            text: 'Çık',
            style: 'destructive',
            onPress: () => {
              setUsername('');
              setPassword('');
              setConfirmPassword('');
              setRoleType(undefined);
              setSelectedEmployeeId(undefined);
              onClose();
            },
          },
        ]
      );
    } else {
      onClose();
    }
  }

  return (
    <BottomSheet visible={visible} onClose={onClose} title={mode === 'create' ? 'Kullanıcı Ekle' : 'Kullanıcı Düzenle'}>
      <View style={styles.field}>
        <Text style={styles.label}>Kullanıcı Adı</Text>
        <View style={styles.inputWithClear}>
          <TextInput style={styles.inputFlex} placeholder="Kullanıcı Adı" value={username} onChangeText={setUsername} autoCapitalize="none" />
          {username.length > 0 && (
            <Pressable onPress={() => setUsername('')}>
              <Ionicons name="close-circle" size={18} color="#999" />
            </Pressable>
          )}
        </View>
      </View>


      {mode === 'create' && (
        <View style={[styles.field, styles.twoColumnRow]}>
          <View style={styles.twoColumnField}>
            <Text style={styles.label}>Şifre</Text>
            <View style={styles.inputWithClear}>
              <TextInput style={styles.inputFlex} placeholder="Şifre" value={password} onChangeText={setPassword} secureTextEntry={!showPassword} autoCapitalize="none" />
              <Pressable onPress={() => setShowPassword(!showPassword)}>
                <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={18} color="#999" />
              </Pressable>
              {password.length > 0 && (
                <Pressable onPress={() => setPassword('')}>
                  <Ionicons name="close-circle" size={18} color="#999" />
                </Pressable>
              )}
            </View>
          </View>
          <View style={styles.twoColumnField}>
            <Text style={styles.label}>Şifre Onay</Text>
            <View style={styles.inputWithClear}>
              <TextInput style={styles.inputFlex} placeholder="Şifre Onay" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry={!showConfirmPassword} autoCapitalize="none" />
              <Pressable onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Ionicons name={showConfirmPassword ? 'eye-off' : 'eye'} size={18} color="#999" />
              </Pressable>
              {confirmPassword.length > 0 && (
                <Pressable onPress={() => setConfirmPassword('')}>
                  <Ionicons name="close-circle" size={18} color="#999" />
                </Pressable>
              )}
            </View>
          </View>
        </View>
      )}

      <View style={styles.field}>
        <Text style={styles.label}>Rol</Text>
        <Dropdown
          data={[
            { label: 'Admin', value: 'Admin' },
            { label: 'User', value: 'User' },
          ]}
          value={roleType}
          onChange={(value) => setRoleType(value as string | undefined)}
          placeholder="Rol seçin"
          searchable={false}
        />
      </View>

      {mode === 'create' && (
        <View style={styles.field}>
          <Text style={styles.label}>Bağlı Çalışan</Text>
          <Dropdown
            data={employees.map((e) => ({
              label: `${e.firstName} ${e.lastName} - ${e.registrationNumber}`,
              value: e.id,
            }))}
            value={selectedEmployeeId}
            onChange={(value) => setSelectedEmployeeId(value as number | undefined)}
            placeholder="Çalışan seçin"
            maxHeight={240}
            listHeaderLabel="İsim Soyisim       -      Sicil No"
          />
        </View>
      )}

      <View style={styles.buttonRow}>
        <View style={styles.buttonHalf}>
          <Button title="İptal" size="small" variant="secondary" textColor="#333" onPress={handleCancel} />
        </View>
        <View style={styles.buttonHalf}>
          <Button title="Kaydet" size="small" onPress={handleSave} />
        </View>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  twoColumnRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  twoColumnField: {
    flex: 1,
  },
  inputWithClear: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    gap: 6,
  },
  inputFlex: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 14,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 40,
  },
  buttonHalf: {
    flex: 1,
  },
});