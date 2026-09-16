import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants/colors';


export type ManagementEmployee = {
    id: number;
    registrationNumber: string;
    firstName: string;
    lastName: string;
    email: string;
    salary: number;
    hireDate: string;
    titleId: number;
    titleName: string;
    departmentName: string;
    rowStatus: string;
};

type ManagementEmployeeRowProps = {
    employee: ManagementEmployee;
    onPress?: () => void;
    isSelected?: boolean;
};

function getStatusLabel(rowStatus: number | string) {
    if (rowStatus === 1 || rowStatus === 'Created') return 'Oluşturulmuş';
    if (rowStatus === 2 || rowStatus === 'Updated') return 'Güncellenmiş';
    if (rowStatus === 3 || rowStatus === 'Deleted') return 'Silinmiş';
    return 'Bilinmiyor';
}

function getRowStyle(rowStatus: string, isSelected?: boolean) {
    if (isSelected) return styles.rowSelected;
    if (rowStatus === 'Deleted') return styles.rowDeleted;
    if (rowStatus === 'Created') return styles.rowCreated;
    if (rowStatus === 'Updated') return styles.rowUpdated;

    return styles.row;
}

export function ManagementEmployeeTableHeader() {
    return (
        <View style={styles.headerRow}>
            <Text style={styles.headerCell} numberOfLines={1}>İsim-Soyisim</Text>
            <Text style={styles.headerCell} numberOfLines={1}>Sicil No</Text>
            <Text style={styles.headerCell} numberOfLines={1}>Departman</Text>
            <Text style={styles.headerCell} numberOfLines={1}>Unvan</Text>
            <Text style={styles.headerCell} numberOfLines={1}>Email</Text>
            <Text style={styles.headerCell} numberOfLines={1}>Maaş</Text>
            <Text style={styles.headerCell} numberOfLines={1}>İşe Giriş</Text>
            <Text style={styles.headerCell} numberOfLines={1}>Durum</Text>
        </View>
    );
}

export function ManagementEmployeeRow({ employee, onPress, isSelected }: ManagementEmployeeRowProps) {
    return (
        <Pressable style={getRowStyle(employee.rowStatus, isSelected)} onPress={onPress}>
            <Text style={[styles.cell, styles.column]} numberOfLines={1}>{employee.firstName} {employee.lastName}</Text>
            <Text style={[styles.cell1, styles.column]} numberOfLines={1}>{employee.registrationNumber}</Text>
            <Text style={[styles.cell1, styles.column]} numberOfLines={1}>{employee.departmentName}</Text>
            <Text style={[styles.cell1, styles.column]} numberOfLines={2}>{employee.titleName}</Text>
            <Text style={[styles.cell1, styles.column]} numberOfLines={1}>{employee.email}</Text>
            <Text style={[styles.cell1, styles.column]} numberOfLines={1}>{employee.salary.toLocaleString()} ₺</Text>
            <Text style={[styles.cell1, styles.column]} numberOfLines={1}>{employee.hireDate}</Text>
            <Text style={[styles.cell1, styles.column]} numberOfLines={1}>{getStatusLabel(employee.rowStatus)}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    headerCell: {
        width: 140,
        height: 44,
        lineHeight: 44,
        paddingHorizontal: 8,
        fontSize: 14,
        fontWeight: 'bold',
        textAlignVertical: 'center',
    },

    headerRow: {
        flexDirection: 'row',
        backgroundColor: colors.tableHeaderBg,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray400,
    },

    row: {
        flexDirection: 'row',
        backgroundColor: colors.white,
        borderBottomWidth: 1,
        borderColor: colors.borderDark,
        paddingBottom: 4,
    },

    rowSelected: {
        backgroundColor: colors.rowSelectedBg,
        flexDirection: 'row',
    },

    column: {
        borderRightWidth: 1,
        borderRightColor: colors.borderDark,
    },

    cell: {
        width: 140,
        height: 44,
        paddingHorizontal: 8,
        fontSize: 14,
        color: colors.textNavy,
        lineHeight: 44,
    },

    cell1: {
        width: 140,
        height: 44,
        paddingHorizontal: 8,
        fontSize: 14,
        color: colors.black,
        lineHeight: 44,
    },

    rowCreated: {
        flexDirection: 'row',
        backgroundColor: colors.successBg,
        borderBottomWidth: 1,
        borderColor: colors.borderDark,
        paddingBottom: 4,
    },
    rowUpdated: {
        flexDirection: 'row',
        backgroundColor: colors.warningBg,
        borderBottomWidth: 1,
        borderColor: colors.borderDark,
        paddingBottom: 4,
    },
    rowDeleted: {
        flexDirection: 'row',
        backgroundColor: colors.dangerBg,
        borderBottomWidth: 1,
        borderColor: colors.borderDark,
        paddingBottom: 4,
    },

});