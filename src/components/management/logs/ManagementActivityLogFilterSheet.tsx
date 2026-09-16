import { BottomSheet } from '@/components/ui/BottomSheet/BottomSheet';
import { Button } from '@/components/ui/Button/Button';
import { Dropdown } from '@/components/ui/Dropdown/Dropdown';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors } from '@/constants/colors';


type ActivityLogFilters = {
    username?: string;
    targetName?: string;
    action?: string;
    isSuccess?: boolean;
    startDate?: string;
    endDate?: string;
};

type ManagementActivityLogFilterSheetProps = {
    visible: boolean;
    onClose: () => void;
    onApply: (filters: ActivityLogFilters) => void;
};

export function ManagementActivityLogFilterSheet({ visible, onClose, onApply }: ManagementActivityLogFilterSheetProps) {
    const [username, setUsername] = useState('');
    const [targetName, setTargetName] = useState('');
    const [action, setAction] = useState<string | undefined>(undefined);
    const [isSuccess, setIsSuccess] = useState<boolean | undefined>(undefined);
    const [startDate, setStartDate] = useState<Date | undefined>(undefined);
    const [endDate, setEndDate] = useState<Date | undefined>(undefined);

    function formatDate(date: Date | undefined) {
        if (!date) return undefined;
        return date.toISOString().split('T')[0];
    }

    function handleApply() {
        onApply({
            username: username || undefined,
            targetName: targetName || undefined,
            action,
            isSuccess,
            startDate: formatDate(startDate),
            endDate: formatDate(endDate),
        });
        onClose();
    }

    function handleClear() {
        setUsername('');
        setTargetName('');
        setAction(undefined);
        setIsSuccess(undefined);
        setStartDate(undefined);
        setEndDate(undefined);
        onApply({});
        onClose();
    }

    return (
        <BottomSheet visible={visible} onClose={onClose} title="Filtrele">
            <View style={styles.field}>
                <Text style={styles.label}>Kullanıcı Adı</Text>
                <View style={styles.inputWithClear}>
                    <TextInput style={styles.inputFlex} placeholder="Kullanıcı Adı" value={username} onChangeText={setUsername} autoCapitalize="none" />
                    {username.length > 0 && (
                        <Pressable onPress={() => setUsername('')}>
                            <Ionicons name="close-circle" size={18} color={colors.gray500} />
                        </Pressable>
                    )}
                </View>
            </View>

            <View style={styles.field}>
                <Text style={styles.label}>Hedef</Text>
                <View style={styles.inputWithClear}>
                    <TextInput style={styles.inputFlex} placeholder="Hedef Adı" value={targetName} onChangeText={setTargetName} autoCapitalize="none" />
                    {targetName.length > 0 && (
                        <Pressable onPress={() => setTargetName('')}>
                            <Ionicons name="close-circle" size={18} color={colors.gray500} />
                        </Pressable>
                    )}
                </View>
            </View>

            <View style={styles.field}>
                <Text style={styles.label}>İşlem</Text>
                <Dropdown
                    data={[
                        { label: 'Tüm İşlemler', value: undefined },
                        { label: 'Login', value: 'Login' },
                        { label: 'Logout', value: 'Logout' },
                        { label: 'Create', value: 'Create' },
                        { label: 'Update', value: 'Update' },
                        { label: 'Delete', value: 'Delete' },
                        { label: 'Read', value: 'Read' },
                    ]}
                    value={action}
                    onChange={(value) => setAction(value as string | undefined)}
                    placeholder="Tüm İşlemler"
                    searchable={false}
                    maxHeight={250}
                />
            </View>

            <View style={styles.field}>
                <Text style={styles.label}>Durum</Text>
                <View style={{ flexDirection: 'row', gap: 8 }}>
                    <Pressable
                        onPress={() => setIsSuccess(isSuccess === true ? undefined : true)}
                        style={{
                            flex: 1,
                            backgroundColor: isSuccess === true ? colors.filterActiveBg : colors.transparent,
                            borderWidth: isSuccess === true ? 0 : 1,
                            borderColor: colors.borderDefault,
                            borderRadius: 8,
                            paddingVertical: 8,
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{ fontSize: 13, color: isSuccess === true ? colors.filterActiveText : colors.gray600, fontWeight: isSuccess === true ? '600' : '400' }}>Başarılı</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => setIsSuccess(isSuccess === false ? undefined : false)}
                        style={{
                            flex: 1,
                            backgroundColor: isSuccess === false ? colors.filterActiveBg : colors.transparent,
                            borderWidth: isSuccess === false ? 0 : 1,
                            borderColor: colors.borderDefault,
                            borderRadius: 8,
                            paddingVertical: 8,
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{ fontSize: 13, color: isSuccess === false ? colors.filterActiveText : colors.gray600, fontWeight: isSuccess === false ? '600' : '400' }}>Başarısız</Text>
                    </Pressable>
                </View>
            </View>

            <View style={[styles.field, styles.twoColumnRow]}>
                <View style={styles.twoColumnField}>
                    <Text style={styles.dateLabel}>Başlangıç Tarihi</Text>
                    <View style={styles.dateWithClear}>
                        <DateTimePicker
                            value={startDate || new Date()}
                            mode="date"
                            display="compact"
                            onChange={(event, date) => setStartDate(date)}
                        />
                        {startDate && (
                            <Pressable onPress={() => setStartDate(undefined)}>
                                <Ionicons name="close-circle" size={18} color={colors.gray500} />
                            </Pressable>
                        )}
                    </View>
                </View>
                <View style={styles.twoColumnField}>
                    <Text style={styles.dateLabel}>Bitiş Tarihi</Text>
                    <View style={styles.dateWithClear}>
                        <DateTimePicker
                            value={endDate || new Date()}
                            mode="date"
                            display="compact"
                            onChange={(event, date) => setEndDate(date)}
                        />
                        {endDate && (
                            <Pressable onPress={() => setEndDate(undefined)}>
                                <Ionicons name="close-circle" size={18} color={colors.gray500} />
                            </Pressable>
                        )}
                    </View>
                </View>
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

const styles = StyleSheet.create({
    field: {
        marginBottom: 20,
    },
    label: {
        fontSize: 12,
        color: colors.gray600,
        marginBottom: 4,
    },
    twoColumnRow: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 16,
    },
    twoColumnField: {
        flex: 1,
        alignItems: 'flex-start',
    },
    dateLabel: {
        fontSize: 12,
        color: colors.gray600,
        marginBottom: 6,
    },
    inputWithClear: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.borderDefault,
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
        marginTop: 20,
    },
    buttonHalf: {
        flex: 1,
    },
});




