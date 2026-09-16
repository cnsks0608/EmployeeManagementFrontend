import { BottomSheet } from '@/components/ui/BottomSheet/BottomSheet';
import { Button } from '@/components/ui/Button/Button';
import { Dropdown } from '@/components/ui/Dropdown/Dropdown';
import { getAllDepartments, getTitlesByDepartmentId } from '@/services/companyService';
import { managementEmployeeFilterSheetStyles as styles } from '@/styles/management-employee-filter-sheet.styles';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useEffect, useState } from 'react';
import { Alert, Pressable, Text, TextInput, View } from 'react-native';
import { colors } from '@/constants/colors';


type Department = {
    id: number;
    name: string;
};

type Title = {
    id: number;
    name: string;
};

type ManagementEmployeeFilters = {
    email?: string;
    registrationNumber?: string;
    minSalary?: number;
    maxSalary?: number;
    startHireDate?: string;
    endHireDate?: string;
    departmentId?: number;
    titleId?: number;
    status?: string;
};

type ManagementEmployeeFilterSheetProps = {
    visible: boolean;
    onClose: () => void;
    onApply: (filters: ManagementEmployeeFilters) => void;
};

export function ManagementEmployeeFilterSheet({ visible, onClose, onApply }: ManagementEmployeeFilterSheetProps) {
    const [email, setEmail] = useState('');
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [minSalary, setMinSalary] = useState('');
    const [maxSalary, setMaxSalary] = useState('');
    const [startHireDate, setStartHireDate] = useState<Date | undefined>(undefined);
    const [endHireDate, setEndHireDate] = useState<Date | undefined>(undefined);
    const [departments, setDepartments] = useState<Department[]>([]);
    const [titles, setTitles] = useState<Title[]>([]);
    const [selectedDepartmentId, setSelectedDepartmentId] = useState<number | undefined>(undefined);
    const [selectedTitleId, setSelectedTitleId] = useState<number | undefined>(undefined);
    const [selectedStatus, setSelectedStatus] = useState<string | undefined>(undefined);
    const statusOptions = [
        { label: 'Aktif', value: 'active' },
        { label: 'Silinmiş', value: 'deleted' },
    ];


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
        const parsedMinSalary = minSalary ? Number(minSalary) : undefined;
        const parsedMaxSalary = maxSalary ? Number(maxSalary) : undefined;


        if (minSalary && isNaN(parsedMinSalary!)) {
            Alert.alert('Hata', 'Maaş geçerli bir sayı olmalı.');
            return;
        }

        if (maxSalary && isNaN(parsedMaxSalary!)) {
            Alert.alert('Hata', 'Maaş geçerli bir sayı olmalı.');
            return;
        }

        onApply({
            email,
            registrationNumber,
            minSalary: parsedMinSalary,
            maxSalary: parsedMaxSalary,
            startHireDate: formatDate(startHireDate),
            endHireDate: formatDate(endHireDate),
            departmentId: selectedDepartmentId,
            titleId: selectedTitleId,
            status: selectedStatus || 'all',
        });
        onClose();
    }

    function handleClear() {
        setEmail('');
        setRegistrationNumber('');
        setMinSalary('');
        setMaxSalary('');
        setStartHireDate(undefined);
        setEndHireDate(undefined);
        setSelectedDepartmentId(undefined);
        setSelectedTitleId(undefined);
        setSelectedStatus(undefined);
        onApply({});
        onClose();
    }

    return (
        <BottomSheet visible={visible} onClose={onClose} title="Filtrele">
            <View style={styles.field}>
                <Text style={styles.label}>Email</Text>
                <View style={styles.inputWithClear}>
                    <TextInput style={styles.inputFlex} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address"
                        autoCapitalize="none" />
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


            <View style={[styles.field, styles.twoColumnRow]}>
                <View style={styles.twoColumnField}>
                    <Text style={styles.label}>Min Maaş</Text>
                    <View style={styles.inputWithClear}>
                        <TextInput style={styles.inputFlex} placeholder="Min" value={minSalary} onChangeText={setMinSalary} keyboardType="number-pad" />
                        {minSalary.length > 0 && (
                            <Pressable onPress={() => setMinSalary('')}>
                                <Ionicons name="close-circle" size={18} color={colors.gray500} />
                            </Pressable>
                        )}
                    </View>
                </View>
                <View style={styles.twoColumnField}>
                    <Text style={styles.label}>Max Maaş</Text>
                    <View style={styles.inputWithClear}>
                        <TextInput style={styles.inputFlex} placeholder="Max" value={maxSalary} onChangeText={setMaxSalary} keyboardType="number-pad" />
                        {maxSalary.length > 0 && (
                            <Pressable onPress={() => setMaxSalary('')}>
                                <Ionicons name="close-circle" size={18} color={colors.gray500} />
                            </Pressable>
                        )}
                    </View>
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
                        maxHeight={290}
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
                        maxHeight={290}
                    />
                </View>
            </View>

            <View style={styles.field}>
                <Text style={styles.label}>Durum</Text>
                <Dropdown
                    data={statusOptions}
                    value={selectedStatus}
                    onChange={(value) => setSelectedStatus(value as string | undefined)}
                    placeholder="Hepsi"
                    searchable={false}
                />
            </View>

            <View style={styles.buttonRow}>
                <View style={styles.buttonHalf}>
                    <Button title="Temizle" size="small" variant="secondary" textColor={colors.gray800} onPress={handleClear} />
                </View>
                <View style={styles.buttonHalf}>
                    <Button title="Uygula" size="small" onPress={handleApply} />
                </View>
            </View>
        </BottomSheet>
    );
}