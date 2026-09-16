import { BottomSheet } from '@/components/ui/BottomSheet/BottomSheet';
import { Button } from '@/components/ui/Button/Button';
import { Dropdown } from '@/components/ui/Dropdown/Dropdown';
import { getAllDepartments, getTitlesByDepartmentId } from '@/services/companyService';
import { employeeFilterSheetStyles as styles } from '@/styles/employee-filter-sheet.styles';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useEffect, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { colors } from '@/constants/colors';

type Department = {
  id: number;
  name: string;
};

type Title = {
  id: number;
  name: string;
};

type EmployeeFilters = {
  email?: string;
  registrationNumber?: string;
  startHireDate?: string;
  endHireDate?: string;
  departmentId?: number;
  titleId?: number;
};

type EmployeeFilterSheetProps = {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: EmployeeFilters) => void;
};

export function EmployeeFilterSheet({ visible, onClose, onApply }: EmployeeFilterSheetProps) {
  const [email, setEmail] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [startHireDate, setStartHireDate] = useState<Date | undefined>(undefined);
  const [endHireDate, setEndHireDate] = useState<Date | undefined>(undefined);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [titles, setTitles] = useState<Title[]>([]);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<number | undefined>(undefined);
  const [selectedTitleId, setSelectedTitleId] = useState<number | undefined>(undefined);

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
      setSelectedTitleId(undefined);
    }
    fetchTitles();
  }, [selectedDepartmentId]);

  function formatDate(date: Date | undefined) {
    if (!date) return undefined;
    return date.toISOString().split('T')[0];
  }

  function handleApply() {

    onApply({
      email,
      registrationNumber,
      startHireDate: formatDate(startHireDate),
      endHireDate: formatDate(endHireDate),
      departmentId: selectedDepartmentId,
      titleId: selectedTitleId,
    });
    onClose();
  }

  function handleClear() {
    setEmail('');
    setRegistrationNumber('');
    setStartHireDate(undefined);
    setEndHireDate(undefined);
    setSelectedDepartmentId(undefined);
    setSelectedTitleId(undefined);
    onApply({});
    onClose();
  }

  return (
    <BottomSheet visible={visible} onClose={onClose} title="Filtrele">
      <View style={styles.field}>
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputWithClear}>
          <TextInput style={styles.inputFlex} placeholder="Email" value={email} onChangeText={setEmail} />
          {email.length > 0 && (
            <Pressable onPress={() => setEmail('')}>
              <Ionicons name="close-circle" size={18} color={colors.gray500} />
            </Pressable>
          )}
        </View>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Sicil No</Text>
        <View style={styles.inputWithClear}>
          <TextInput style={styles.inputFlex} placeholder="Sicil No" value={registrationNumber} onChangeText={setRegistrationNumber} />
          {registrationNumber.length > 0 && (
            <Pressable onPress={() => setRegistrationNumber('')}>
              <Ionicons name="close-circle" size={18} color={colors.gray500} />
            </Pressable>
          )}
        </View>
      </View>


      <View style={[styles.field, styles.dateRow]}>
        <View style={styles.dateField}>
          <Text style={styles.dateLabel}>Başlangıç Tarihi</Text>
          <View style={styles.dateWithClear}>
            <DateTimePicker
              value={startHireDate || new Date()}
              mode="date"
              display="compact"
              onChange={(event, date) => setStartHireDate(date)}
            />
            {startHireDate && (
              <Pressable onPress={() => setStartHireDate(undefined)}>
                <Ionicons name="close-circle" size={18} color={colors.gray500} />
              </Pressable>
            )}
          </View>
        </View>
        <View style={styles.dateField}>
          <Text style={styles.dateLabel}>Bitiş Tarihi</Text>
          <View style={styles.dateWithClear}>
            <DateTimePicker
              value={endHireDate || new Date()}
              mode="date"
              display="compact"
              onChange={(event, date) => setEndHireDate(date)}
            />
            {endHireDate && (
              <Pressable onPress={() => setEndHireDate(undefined)}>
                <Ionicons name="close-circle" size={18} color={colors.gray500} />
              </Pressable>
            )}
          </View>
        </View>
      </View>

      <View style={[styles.field, styles.twoColumnRow]}>
        <View style={styles.twoColumnField}>
          <Text style={styles.label}>Departman</Text>
          <Dropdown
            data={[
              { label: 'Tüm Departmanlar', value: undefined },
              ...departments.map((d) => ({ label: d.name, value: d.id })),
            ]}
            value={selectedDepartmentId}
            onChange={(value) => setSelectedDepartmentId(value as number | undefined)}
            placeholder="Tüm Departmanlar"
          />
        </View>
        <View style={styles.twoColumnField}>
          <Text style={styles.label}>Unvan</Text>
          <Dropdown
            data={[
              { label: 'Tüm Unvanlar', value: undefined },
              ...titles.map((t) => ({ label: t.name, value: t.id })),
            ]}
            value={selectedTitleId}
            onChange={(value) => setSelectedTitleId(value as number | undefined)}
            placeholder="Tüm Unvanlar"
          />
        </View>
      </View>

      <View style={styles.buttonRow}>
        <View style={styles.buttonHalf}>
          <Button title="Uygula" size="small" onPress={handleApply} />
        </View>
        <View style={styles.buttonHalf}>
          <Button title="Temizle" size="small" variant="secondary" textColor={colors.gray800} onPress={handleClear} />
        </View>
      </View>
    </BottomSheet>
  );
}


