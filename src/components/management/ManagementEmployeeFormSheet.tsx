import { BottomSheet } from '@/components/ui/BottomSheet/BottomSheet';
import { Button } from '@/components/ui/Button/Button';
import { Dropdown } from '@/components/ui/Dropdown/Dropdown';
import { getAllDepartments, getTitlesByDepartmentId } from '@/services/companyService';
import { createEmployee, updateEmployee } from '@/services/employeeService';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';


type Department = {
  id: number;
  name: string;
};

type Title = {
  id: number;
  name: string;
};

type EmployeeFormData = {
  id?: number;
  registrationNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  salary: string;
  hireDate: Date | undefined;
  titleId: number | undefined;
  departmentId: number | undefined;
};

type ManagementEmployeeFormSheetProps = {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
  mode: 'create' | 'edit';
  initialData?: EmployeeFormData;
};

// mode: 'create' | 'edit' -> formun hangi işlem için açıldığını belirtiyor
// initialData?: EmployeeFormData; -> Opsiyonel, eğer düzenleme modundaysak, mevcut çalışanın bilgilerini buradan alacağız, formu onlarla dolduracağız. Eğer ekleme modundaysak, bu hiç verilmeyecek, form boş açılacak.


export function ManagementEmployeeFormSheet({ visible, onClose, onSuccess, mode, initialData }: ManagementEmployeeFormSheetProps) {
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [salary, setSalary] = useState('');
  const [departments, setDepartments] = useState<Department[]>([]);
  const [titles, setTitles] = useState<Title[]>([]);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<number | undefined>(undefined);
  const [selectedTitleId, setSelectedTitleId] = useState<number | undefined>(undefined);
  const [hireDate, setHireDate] = useState<Date | undefined>(undefined);


  useEffect(() => {
    if (initialData) {
      setRegistrationNumber(initialData.registrationNumber);
      setFirstName(initialData.firstName);
      setLastName(initialData.lastName);
      setEmail(initialData.email);
      setSalary(initialData.salary);
      setHireDate(initialData.hireDate);
      setSelectedDepartmentId(initialData.departmentId);
      setSelectedTitleId(initialData.titleId);
    } else {
      setRegistrationNumber('');
      setFirstName('');
      setLastName('');
      setEmail('');
      setSalary('');
      setHireDate(undefined);
      setSelectedDepartmentId(undefined);
      setSelectedTitleId(undefined);
    }
  }, [initialData, visible]);

  useEffect(() => {
    async function fetchDepartments() {
      const result = await getAllDepartments();
      setDepartments(result);
    }
    fetchDepartments();
  }, []);

  useEffect(() => {
    async function fetchTitles() {
      if (selectedDepartmentId) {
        const result = await getTitlesByDepartmentId(selectedDepartmentId);
        setTitles(result);
      } else {
        const allDepartments = await getAllDepartments();
        const allTitlesPromises = allDepartments.map((dept: Department) => getTitlesByDepartmentId(dept.id));
        const allTitlesArrays = await Promise.all(allTitlesPromises);
        setTitles(allTitlesArrays.flat());
      }
    }
    fetchTitles();
  }, [selectedDepartmentId]);


  async function handleSave() {
    const parsedSalary = Number(salary);

    if (!registrationNumber || !firstName || !lastName || !email) {
      Alert.alert('Hata', 'Lütfen tüm zorunlu alanları doldurun.');
      return;
    } // Normalde backendden hata mesajı dönüyor ancak biz backende istek attıktan sonra cevabı beklememek için frontendde de hata mesajı yazıyoruz direkt görünsün diye cevap beklemeden 

    if (!salary || isNaN(parsedSalary)) {
      Alert.alert('Hata', 'Maaş geçerli bir sayı olmalı.');
      return;
    }

    if (!hireDate) {
      Alert.alert('Hata', 'Lütfen işe giriş tarihi seçin.');
      return;
    }

    if (!selectedTitleId) {
      Alert.alert('Hata', 'Lütfen bir unvan seçin.');
      return;
    }

    const dto = {
      registrationNumber,
      firstName,
      lastName,
      email,
      salary: parsedSalary,
      hireDate: hireDate.toISOString().split('T')[0],
      titleId: selectedTitleId,
    };

    try {
      if (mode === 'create') {
        await createEmployee(dto);
      } else if (initialData?.id) {
        await updateEmployee(initialData.id, dto);
      }
      onSuccess();
      onClose();
    } catch (error: any) {
      Alert.alert('Hata', error.message);
    }

  }

  function handleCancel() {
    setRegistrationNumber('');
    setFirstName('');
    setLastName('');
    setEmail('');
    setSalary('');
    setHireDate(undefined);
    setSelectedDepartmentId(undefined);
    setSelectedTitleId(undefined);
    onClose();
  }

  return (
    <BottomSheet visible={visible} onClose={onClose} title={mode === 'create' ? 'Çalışan Ekle' : 'Çalışan Düzenle'}>
      <View style={styles.field}>
        <Text style={styles.label}>Sicil No</Text>
        <View style={styles.inputWithClear}>
          <TextInput style={styles.inputFlex} placeholder="Sicil No" value={registrationNumber} onChangeText={setRegistrationNumber} />
          {registrationNumber.length > 0 && (
            <Pressable onPress={() => setRegistrationNumber('')}>
              <Ionicons name="close-circle" size={18} color="#999" />
            </Pressable>
          )}
        </View>
      </View>

      <View style={[styles.field, styles.twoColumnRow]}>
        <View style={styles.twoColumnField}>
          <Text style={styles.label}>Ad</Text>
          <View style={styles.inputWithClear}>
            <TextInput style={styles.inputFlex} placeholder="Ad" value={firstName} onChangeText={setFirstName} />
            {firstName.length > 0 && (
              <Pressable onPress={() => setFirstName('')}>
                <Ionicons name="close-circle" size={18} color="#999" />
              </Pressable>
            )}
          </View>
        </View>
        <View style={styles.twoColumnField}>
          <Text style={styles.label}>Soyad</Text>
          <View style={styles.inputWithClear}>
            <TextInput style={styles.inputFlex} placeholder="Soyad" value={lastName} onChangeText={setLastName} />
            {lastName.length > 0 && (
              <Pressable onPress={() => setLastName('')}>
                <Ionicons name="close-circle" size={18} color="#999" />
              </Pressable>
            )}
          </View>
        </View>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputWithClear}>
          <TextInput style={styles.inputFlex} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
          {email.length > 0 && (
            <Pressable onPress={() => setEmail('')}>
              <Ionicons name="close-circle" size={18} color="#999" />
            </Pressable>
          )}
        </View>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Maaş</Text>
        <View style={styles.inputWithClear}>
          <TextInput style={styles.inputFlex} placeholder="Maaş" value={salary} onChangeText={setSalary} keyboardType="number-pad" />
          {salary.length > 0 && (
            <Pressable onPress={() => setSalary('')}>
              <Ionicons name="close-circle" size={18} color="#999" />
            </Pressable>
          )}
        </View>
      </View>

      <View style={styles.dateField}>
        <Text style={styles.dateLabel}>İşe Giriş Tarihi</Text>
        <View style={styles.dateWithClear}>
          <DateTimePicker
            value={hireDate || new Date()}
            mode="date"
            display="compact"
            onChange={(event, date) => setHireDate(date)}
          />
          {hireDate && (
            <Pressable onPress={() => setHireDate(undefined)}>
              <Ionicons name="close-circle" size={18} color="#999" />
            </Pressable>
          )}
        </View>
      </View>

      <View style={[styles.field, styles.twoColumnRow]}>
        <View style={styles.twoColumnField}>
          <Text style={styles.label}>Departman</Text>
          <Dropdown
            data={departments.map((d) => ({ label: d.name, value: d.id }))}
            value={selectedDepartmentId}
            onChange={(value) => setSelectedDepartmentId(value as number | undefined)}
            placeholder="Departman seçin"
            maxHeight={240}
          />
        </View>
        <View style={styles.twoColumnField}>
          <Text style={styles.label}>Unvan</Text>
          <Dropdown
            data={titles.map((t) => ({ label: t.name, value: t.id }))}
            value={selectedTitleId}
            onChange={(value) => setSelectedTitleId(value as number | undefined)}
            placeholder="Unvan seçin"
            maxHeight={240}
          />
        </View>
      </View>

      <View style={styles.buttonRow}>
        <View style={styles.buttonHalf}>
          <Button title="İptal" size= "small" variant="secondary" textColor="#333" onPress={handleCancel} />
        </View>
        <View style={styles.buttonHalf}>
          <Button title="Kaydet" size= "small" onPress={handleSave} />
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    fontSize: 14,
  },
  twoColumnRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  twoColumnField: {
    flex: 1,
  },
  dateField: {
    marginTop: 16,
  },
  dateLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 6,
  },
  inputWithClear: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  inputFlex: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 14,
  },
  dateWithClear: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 40 ,
  },
  buttonHalf: {
    flex: 1,
  },
});