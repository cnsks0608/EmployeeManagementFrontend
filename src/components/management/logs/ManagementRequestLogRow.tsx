import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants/colors';


export type RequestLog = {
    id: number;
    httpMethod: string;
    path: string;
    queryString: string | null;
    requestBody: string | null;
    statusCode: number;
    username: string | null;
    createdAt: string;
};

type ManagementRequestLogRowProps = {
    log: RequestLog;
    onPress?: () => void;
    isSelected?: boolean;
};

function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleString('tr-TR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

function isRequestSuccessful(statusCode: number) {
    return statusCode >= 200 && statusCode < 400;
}

function getRowStyle(statusCode: number, isSelected?: boolean) {
    if (isSelected) return styles.rowSelected;
    return isRequestSuccessful(statusCode) ? styles.rowSuccess : styles.rowFailed;
}

export function ManagementRequestLogTableHeader() {


    return (
        <View style={styles.headerRow}>
            <Text style={styles.headerCell} numberOfLines={1}>Kullanıcı</Text>
            <Text style={styles.headerCell} numberOfLines={1}>Metod</Text>
            <Text style={styles.headerCell} numberOfLines={1}>Yol</Text>
            <Text style={styles.headerCell} numberOfLines={1}>Durum Kodu</Text>
            <Text style={styles.headerCell} numberOfLines={1}>Tarih</Text>
        </View>
    );
}

export function ManagementRequestLogRow({ log, onPress, isSelected }: ManagementRequestLogRowProps) {
    return (
        <Pressable style={getRowStyle(log.statusCode, isSelected)} onPress={onPress}>
            <Text style={[styles.cell, styles.column]} numberOfLines={1}>{log.username || '-'}</Text>
            <Text style={[styles.cell, styles.column]} numberOfLines={1}>{log.httpMethod}</Text>
            <Text style={[styles.cell, styles.column]} numberOfLines={1}>{log.path}</Text>
            <Text style={[styles.cell, styles.column]} numberOfLines={1}>{log.statusCode}</Text>
            <Text style={[styles.cell]} numberOfLines={1}>{formatDate(log.createdAt)}</Text>
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
        borderBottomColor: colors.borderDefault,
    },

    row: {
        flexDirection: 'row',
        backgroundColor: colors.white,
        borderBottomWidth: 1,
        borderColor: colors.borderDark,
        paddingBottom: 4,
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
        color: colors.black,
        lineHeight: 44,
    },
    rowSuccess: {
        flexDirection: 'row',
        backgroundColor: colors.rowSuccessBg,
        borderBottomWidth: 1,
        borderColor: colors.borderDark,
        paddingBottom: 4,
    },
    rowFailed: {
        flexDirection: 'row',
        backgroundColor: colors.rowFailedBg,
        borderBottomWidth: 1,
        borderColor: colors.borderDark,
        paddingBottom: 4,
    },
    rowSelected: {
        flexDirection: 'row',
        backgroundColor: colors.rowSelectedBg,
        borderBottomWidth: 1,
        borderColor: colors.borderDark,
        paddingBottom: 4,
    },
});