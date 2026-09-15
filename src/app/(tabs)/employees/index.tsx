import { EmployeeDetailModal } from '@/components/employees/EmployeeDetailModal';
import { EmployeeFilterSheet } from '@/components/employees/EmployeeFilterSheet';
import { Employee, EmployeeRow, EmployeeTableHeader } from '@/components/employees/EmployeeRow';
import { EmployeeSortModal } from '@/components/employees/EmployeeSortModal';
import { Button } from '@/components/ui/Button/Button';
import { Grid } from '@/components/ui/Grid/Grid';
import { Pagination } from '@/components/ui/Pagination/Pagination';
import { getAllEmployees } from '@/services/employeeService';
import { employeesStyles } from '@/styles/employees.styles';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';

export default function EmployeesScreen() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [appliedSearch, setAppliedSearch] = useState('');
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({});
  const [sortBy, setSortBy] = useState<string | undefined>(undefined);
  const [sortDirection, setSortDirection] = useState<string | undefined>(undefined);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);

  useEffect(() => {
    async function fetchEmployees() {
      const result = await getAllEmployees({ pageNumber, search: appliedSearch, sortBy, sortDirection, ...appliedFilters });
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

  return (
    <View style={employeesStyles.container}>
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
          <EmployeeTableHeader />
          <Grid
            data={employees}
            renderItem={(employee) => (
              <EmployeeRow
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

      <EmployeeFilterSheet
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        onApply={(filters) => {
          setPageNumber(1);
          setAppliedFilters(filters);
        }}
      />

      <EmployeeSortModal
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

      <EmployeeDetailModal
        visible={detailModalVisible}
        onClose={() => {
          setDetailModalVisible(false);
          setSelectedEmployeeId(null);
        }}
        employeeId={selectedEmployeeId}
      />
    </View>
  );
}