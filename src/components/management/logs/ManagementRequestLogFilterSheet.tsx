import { BottomSheet } from '@/components/ui/BottomSheet/BottomSheet';
import { Button } from '@/components/ui/Button/Button';
import { Dropdown } from '@/components/ui/Dropdown/Dropdown';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors } from '@/constants/colors';

type RequestLogFilters = {
    httpMethod?: string;
    statusCode?: number;
    username?: string;
    startDate?: string;
    endDate?: string;
};

type ManagementRequestLogFilterSheetProps = {
    visible: boolean;
    onClose: () => void;
    onApply: (filters: RequestLogFilters) => void;
};

export function ManagementRequestLogFilterSheet({ visible, onClose, onApply }: ManagementRequestLogFilterSheetProps) {
    const [httpMethod, setHttpMethod] = useState<string | undefined>(undefined);
    const [statusCode, setStatusCode] = useState<number | undefined>(undefined);
    const [username, setUsername] = useState('');
    const [startDate, setStartDate] = useState<Date | undefined>(undefined);
    const [endDate, setEndDate] = useState<Date | undefined>(undefined);

    function formatDate(date: Date | undefined) {
        if (!date) return undefined;
        return date.toISOString().split('T')[0];
    }

    function handleApply() {
        onApply({
            httpMethod,
            statusCode,
            username: username || undefined,
            startDate: formatDate(startDate),
            endDate: formatDate(endDate),
        });
        onClose();
    }

    function handleClear() {
        setHttpMethod(undefined);
        setStatusCode(undefined);
        setUsername('');
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

            <View style={[styles.field, styles.twoColumnRow]}>
                <View style={styles.twoColumnField}>
                    <Text style={styles.label}>Metod</Text>
                    <Dropdown
                        data={[
                            { label: 'Tüm Metodlar', value: undefined },
                            { label: 'GET', value: 'GET' },
                            { label: 'POST', value: 'POST' },
                            { label: 'PUT', value: 'PUT' },
                            { label: 'DELETE', value: 'DELETE' },
                        ]}
                        value={httpMethod}
                        onChange={(value) => setHttpMethod(value as string | undefined)}
                        placeholder="Tüm Metodlar"
                        searchable={false}
                    />
                </View>
                <View style={styles.twoColumnField}>
                    <Text style={styles.label}>Durum Kodu</Text>
                    <Dropdown
                        data={[
                            { label: 'Tüm Kodlar', value: undefined },
                            { label: '200 - OK', value: 200 },
                            { label: '400 - Bad Request', value: 400 },
                            { label: '401 - Unauthorized', value: 401 },
                            { label: '404 - Not Found', value: 404 },
                            { label: '415 - Unsupported Media Type', value: 415 },
                            { label: '500 - Server Error', value: 500 },
                        ]}
                        value={statusCode}
                        onChange={(value) => setStatusCode(value as number | undefined)}
                        placeholder="Tüm Kodlar"
                        searchable={false}
                    />
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