import { Pressable, StyleSheet, Text, View } from 'react-native';

export type ActivityLog = {
    id: number;
    username: string | null;  // backenddeki nullable ın karşılığı 
    targetName: string | null;
    action: string;
    description: string;
    isSuccess: boolean;
    failureReason: string | null;
    createdAt: string;
};

type ManagementActivityLogRowProps = {
    log: ActivityLog;
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

export function ManagementActivityLogTableHeader() {
    return (
        <View style={styles.headerRow}>
            <Text style={styles.headerCell} numberOfLines={1}>Kullanıcı</Text>
            <Text style={styles.headerCell} numberOfLines={1}>Hedef</Text>
            <Text style={styles.headerCell} numberOfLines={1}>İşlem</Text>
            <Text style={styles.headerCell} numberOfLines={1}>Durum</Text>
            <Text style={styles.headerCell} numberOfLines={1}>Açıklama</Text>
            <Text style={styles.headerCell} numberOfLines={1}>Tarih</Text>
        </View>
    );
}

export function ManagementActivityLogRow({ log, onPress, isSelected }: ManagementActivityLogRowProps) {
    return (
        <Pressable style={[styles.row, isSelected && styles.rowSelected]} onPress={onPress}>
            <Text style={[styles.cell, styles.column]} numberOfLines={1}>{log.username || '-'}</Text>
            <Text style={[styles.cell, styles.column]} numberOfLines={1}>{log.targetName || '-'}</Text>
            <Text style={[styles.cell, styles.column]} numberOfLines={1}>{log.action}</Text>
            <Text style={[styles.cell, styles.column]} numberOfLines={1}>{log.isSuccess ? 'Başarılı' : 'Başarısız'}</Text>
            <Text style={[styles.cellTall, styles.column]} numberOfLines={2}>{log.description}</Text>
            <Text style={[styles.cell]} numberOfLines={1}>{formatDate(log.createdAt)}</Text>
        </Pressable>
    );
}


const styles = StyleSheet.create({
  headerCell: {
    width: 160,
    height: 44,
    lineHeight: 44,
    paddingHorizontal: 8,
    fontSize: 14,
    fontWeight: 'bold',
    textAlignVertical: 'center',
  },

  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#d8d7d7',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },

  row: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: '#03021d',
    paddingBottom: 4,
  },
  rowSelected: {
    flexDirection: 'row',
    backgroundColor: '#dbdbd6',
    borderBottomWidth: 1,
    borderColor: '#03021d',
    paddingBottom: 4,
  },
  column: {
    borderRightWidth: 1,
    borderRightColor: '#03021d',
  },
  cell: {
    width: 140,
    height: 56,
    paddingHorizontal: 8,
    paddingVertical: 6,
    fontSize: 14,
    color: 'black',
    lineHeight: 20,
  },
  cellTall: {
    width: 200,
    height: 56,
    paddingHorizontal: 8,
    paddingVertical: 6,
    fontSize: 14,
    color: 'black',
    lineHeight: 20,
  },
});