import { BottomSheet } from '@/components/ui/BottomSheet/BottomSheet';
import { Button } from '@/components/ui/Button/Button';
import { Dropdown } from '@/components/ui/Dropdown/Dropdown';
import { getAllEmployees } from '@/services/employeeService';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { colors } from '@/constants/colors';

type Employee = {
    id: number;
    firstName: string;
    lastName: string;
    registrationNumber: string;
};

type ManagementUserFilters = {
    role?: string;
    employeeId?: number;
    status?: string;
};

type ManagementUserFilterSheetProps = {
    visible: boolean;
    onClose: () => void;
    onApply: (filters: ManagementUserFilters) => void;
};

export function ManagementUserFilterSheet({ visible, onClose, onApply }: ManagementUserFilterSheetProps) {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [selectedRole, setSelectedRole] = useState<string | undefined>(undefined);
    const [selectedStatus, setSelectedStatus] = useState<string | undefined>(undefined);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | undefined>(undefined);

    useEffect(() => {
        async function fetchEmployees() {
            const result = await getAllEmployees({ pageSize: 1000, status: 'all' });
            setEmployees(result.items);
        }
        fetchEmployees();
    }, []);
    
    function handleApply() {
        onApply({
            role: selectedRole,
            employeeId: selectedEmployeeId,
            ...(selectedStatus && { status: selectedStatus }),
        });
        onClose();
    }

    function handleClear() {
        setSelectedRole(undefined);
        setSelectedStatus(undefined);
        setSelectedEmployeeId(undefined);
        onApply({});
        onClose();
    } 

    return (
  <BottomSheet visible={visible} onClose={onClose} title="Filtrele">
    <View style={{ marginBottom: 20 }}>
      <Text style={{ fontSize: 12, color: colors.gray600, marginBottom: 4 }}>Rol</Text>
      <Dropdown
        data={[
          { label: 'Admin', value: 'Admin' },
          { label: 'User', value: 'User' },
        ]}
        value={selectedRole}
        onChange={(value) => setSelectedRole(value as string | undefined)}
        placeholder="Tüm Roller"
        searchable={false}
      />
    </View>

    <View style={{ marginBottom: 20 }}>
      <Text style={{ fontSize: 12, color: colors.gray600, marginBottom: 4 }}>Durum</Text>
      <Dropdown
        data={[
          { label: 'Aktif', value: 'active' },
          { label: 'Silinmiş', value: 'deleted' },
        ]}
        value={selectedStatus}
        onChange={(value) => setSelectedStatus(value as string | undefined)}
        placeholder="Hepsi"
        searchable={false}
      />
    </View>

    <View style={{ marginBottom: 20 }}>
      <Text style={{ fontSize: 12, color: colors.gray600, marginBottom: 4 }}>Bağlı Çalışan</Text>
      <Dropdown
        data={employees.map((e) => ({
          label: `${e.firstName} ${e.lastName}    -    ${e.registrationNumber}`,
          value: e.id,
        }))}
        value={selectedEmployeeId}
        onChange={(value) => setSelectedEmployeeId(value as number | undefined)}
        placeholder="Tüm Çalışanlar"
        listHeaderLabel="İsim Soyisim       -      Sicil No"
      />
    </View>

    <View style={{ flexDirection: 'row', gap: 10, marginTop: 20 }}>
      <View style={{ flex: 1 }}>
        <Button title="Temizle" size="small" variant="secondary" textColor={colors.gray800} onPress={handleClear} />
      </View>
      <View style={{ flex: 1 }}>
        <Button title="Uygula" size="small" onPress={handleApply} />
      </View>
    </View>
  </BottomSheet>
);
}