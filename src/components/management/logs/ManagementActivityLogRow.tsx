import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants/colors';


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

function getRowStyle(isSuccess: boolean, isSelected?: boolean) {
  if (isSelected) return styles.rowSelected;
  if (isSuccess) return styles.rowSuccess;
  return styles.rowFailed;
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
    <Pressable style={getRowStyle(log.isSuccess, isSelected)} onPress={onPress}>
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
    height: 56,
    paddingHorizontal: 8,
    paddingVertical: 6,
    fontSize: 14,
    color: colors.black,
    lineHeight: 20,
  },
  cellTall: {
    width: 200,
    height: 56,
    paddingHorizontal: 8,
    paddingVertical: 6,
    fontSize: 14,
    color: colors.black,
    lineHeight: 20,
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