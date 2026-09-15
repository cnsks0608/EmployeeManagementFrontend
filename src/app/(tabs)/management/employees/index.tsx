import { ManagementEmployeeDetailModal } from '@/components/management/employees/ManagementEmployeeDetailModal';
import { ManagementEmployeeFilterSheet } from '@/components/management/employees/ManagementEmployeeFilterSheet';
import { ManagementEmployeeFormSheet } from '@/components/management/employees/ManagementEmployeeFormSheet';
import { ManagementEmployee, ManagementEmployeeRow, ManagementEmployeeTableHeader } from '@/components/management/employees/ManagementEmployeeRow';
import { ManagementEmployeeSortModal } from '@/components/management/employees/ManagementEmployeeSortModal';
import { Button } from '@/components/ui/Button/Button';
import { Grid } from '@/components/ui/Grid/Grid';
import { Pagination } from '@/components/ui/Pagination/Pagination';
import { deleteEmployee, getAllEmployees, reactivateEmployee } from '@/services/employeeService';
import { employeesStyles } from '@/styles/employees.styles';
import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import Toast from 'react-native-toast-message';


export default function ManagementEmployeesScreen() {
  const [employees, setEmployees] = useState<ManagementEmployee[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [appliedSearch, setAppliedSearch] = useState('');
  const [appliedFilters, setAppliedFilters] = useState({});
  const [sortBy, setSortBy] = useState<string | undefined>(undefined);
  const [sortDirection, setSortDirection] = useState<string | undefined>(undefined);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [editingEmployee, setEditingEmployee] = useState<any>(undefined);


  useEffect(() => {
    async function fetchEmployees() {
      const result = await getAllEmployees({
        pageNumber,
        search: appliedSearch,
        sortBy,
        sortDirection,
        status: 'all', // Burada hem aktif hem pasif kullancıları görebiliyoruz 
        ...appliedFilters,
      });
      setEmployees(result.items);
      setTotalPages(result.totalPages);
      setTotalCount(result.totalCount);
    }
    fetchEmployees();
  }, [pageNumber, appliedSearch, appliedFilters, sortBy, sortDirection]);

  function handleSearch() {
    setPageNumber(1);
    setAppliedSearch(searchText);
  }

  function handleDelete() {
    if (!selectedEmployeeId) return;

    Alert.alert(
      'Emin misiniz?',
      'Bu çalışanı silmek istediğinize emin misiniz?',
      [
        { text: 'Vazgeç', style: 'cancel' },
        {
          text: 'Sil',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteEmployee(selectedEmployeeId);
              Toast.show({
                type: 'success',
                text1: 'Başarılı',
                text2: 'Çalışan silindi.',
              });
              setDetailModalVisible(false);
              setSelectedEmployeeId(null);
              setPageNumber(1);
              setAppliedFilters({ ...appliedFilters });
            } catch (error: any) {
              Alert.alert('Hata', error.message);
            }
          },
        },
      ]
    );
  }

  async function handleReactivate() {
    if (!selectedEmployeeId) return;

    try {
      await reactivateEmployee(selectedEmployeeId);
      Toast.show({
        type: 'success',
        text1: 'Başarılı',
        text2: 'Çalışan tekrar aktif edildi.',
      });
      setDetailModalVisible(false);
      setSelectedEmployeeId(null);
      setPageNumber(1);
      setAppliedFilters({ ...appliedFilters });
    } catch (error: any) {
      Alert.alert('Hata', error.message);
    }
  }

  function handleEdit() {
    const employee = employees.find((e) => e.id === selectedEmployeeId);
    if (!employee) return;

    setEditingEmployee({
      id: employee.id,
      registrationNumber: employee.registrationNumber,
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      salary: String(employee.salary),
      hireDate: new Date(employee.hireDate),
      titleId: employee.titleId,
      departmentId: undefined,
    });
    setDetailModalVisible(false);
    setFormMode('edit');
    setFormVisible(true);
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Yönetim / Çalışanlar',
          headerLeft: () => (
            <Pressable onPress={() => router.push('/(tabs)/management')}>
              <Ionicons name="chevron-back" size={24} color="#333" />
            </Pressable>
          ),
        }}
      />

      <View style={employeesStyles.container}>
        <View style={{ marginBottom: 10 }}>
          <Button
            title="+ Çalışan Ekle"
            size="small"
            color="#E6F1FB"
            textColor="#185FA5"
            onPress={() => {
              setFormMode('create');
              setFormVisible(true);
              setEditingEmployee(undefined);
            }}
          />
        </View>

        <View style={employeesStyles.searchRow}>
          <View style={employeesStyles.searchInputWrapper}>
            <TextInput
              style={employeesStyles.searchInputFlex}
              placeholder="İsim, soyisim ara..."
              value={searchText}
              onChangeText={setSearchText}
              onSubmitEditing={handleSearch}
            />
            {searchText.length > 0 && (
              <Pressable onPress={() => setSearchText('')}>
                <Ionicons name="close-circle" size={18} color="#999" />
              </Pressable>
            )}
          </View>
          <View style={employeesStyles.iconGroup}>
            <Button icon="options-outline" size="small" iconColor="gray" color="transparent" onPress={() => setFilterModalVisible(true)} />
            <Button icon="swap-vertical-outline" size="small" iconColor="gray" color="transparent" onPress={() => setSortModalVisible(true)} />
          </View>
          <Button title="Ara" color="#B0B0B0" size="small" onPress={handleSearch} />
        </View>

        <Text style={employeesStyles.resultCount}>{totalCount} kayıt bulundu</Text>

        <ScrollView horizontal>
          <View style={employeesStyles.tableWrapper}>
            <ManagementEmployeeTableHeader />
            <Grid
              data={employees}
              renderItem={(employee) => (
                <ManagementEmployeeRow
                  employee={employee}
                  isSelected={employee.id === selectedEmployeeId}
                  onPress={() => {
                    setSelectedEmployeeId(employee.id);
                    setDetailModalVisible(true);
                  }}
                />
              )}
            />
          </View>
        </ScrollView>

        <Pagination currentPage={pageNumber} totalPages={totalPages} onPageChange={setPageNumber} />
      </View>

      <ManagementEmployeeFilterSheet
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        onApply={(filters) => {
          setPageNumber(1);
          setAppliedFilters(filters);
        }}
      />

      <ManagementEmployeeSortModal
        visible={sortModalVisible}
        onClose={() => setSortModalVisible(false)}
        currentSortBy={sortBy}
        currentSortDirection={sortDirection}
        onApply={(option) => {
          setPageNumber(1);
          setSortBy(option.sortBy);
          setSortDirection(option.sortDirection);
        }}
      />

      <ManagementEmployeeDetailModal
        visible={detailModalVisible}
        onClose={() => {
          setDetailModalVisible(false);
          setSelectedEmployeeId(null);
        }}
        employeeId={selectedEmployeeId}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onReactivate={handleReactivate}
      />

      <ManagementEmployeeFormSheet
        visible={formVisible}
        onClose={() => {
          setFormVisible(false);
          if (formMode === 'edit') {
            setDetailModalVisible(true);
          }
        }}
        onSuccess={() => {
          setPageNumber(1);
          setAppliedFilters({ ...appliedFilters });
        }}
        mode={formMode}
        initialData={editingEmployee}
      />
    </>
  );
}