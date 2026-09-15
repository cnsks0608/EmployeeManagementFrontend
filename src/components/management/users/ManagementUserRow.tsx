import { Pressable, StyleSheet, Text, View } from 'react-native';

export type ManagementUser = {
  id: number;
  username: string;
  email: string;
  roleId: number;
  roleName: string;
  employeeId: number;
  employeeRegistrationNumber: string;
  rowStatus: string;
};

type ManagementUserRowProps = {
  user: ManagementUser;
  onPress?: () => void;
  isSelected?: boolean;
};

function getStatusLabel(rowStatus: string) {
  if (rowStatus === 'Created') return 'Oluşturulmuş';
  if (rowStatus === 'Updated') return 'Güncellenmiş';
  if (rowStatus === 'Deleted') return 'Silinmiş';
  return 'Bilinmiyor';
}

function getRowStyle(rowStatus: string, isSelected?: boolean) {
  if (isSelected) return styles.rowSelected;
  if (rowStatus === 'Deleted') return styles.rowDeleted;
  if (rowStatus === 'Created') return styles.rowCreated;
  if (rowStatus === 'Updated') return styles.rowUpdated;
  return styles.row;
}

export function ManagementUserTableHeader() {
  return (
    <View style={styles.headerRow}>
      <Text style={styles.headerCell} numberOfLines={1}>Kullanıcı Adı</Text>
      <Text style={styles.headerCell} numberOfLines={1}>Email</Text>
      <Text style={styles.headerCell} numberOfLines={1}>Rol</Text>
      <Text style={styles.headerCell} numberOfLines={1}>Bağlı Çalışan</Text>
      <Text style={styles.headerCell} numberOfLines={1}>Durum</Text>
    </View>
  );
}

export function ManagementUserRow({ user, onPress, isSelected }: ManagementUserRowProps) {
  return (
    <Pressable style={getRowStyle(user.rowStatus, isSelected)} onPress={onPress}>
      <Text style={[styles.cell, styles.column]} numberOfLines={1}>{user.username}</Text>
      <Text style={[styles.cell1, styles.column]} numberOfLines={1}>{user.email}</Text>
      <Text style={[styles.cell1, styles.column]} numberOfLines={1}>{user.roleName}</Text>
      <Text style={[styles.cell1, styles.column]} numberOfLines={1}>{user.employeeRegistrationNumber}</Text>
      <Text style={[styles.cell1, styles.column]} numberOfLines={1}>{getStatusLabel(user.rowStatus)}</Text>
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
    height: 44,
    paddingHorizontal: 8,
    fontSize: 14,
    color: '#222764',
    lineHeight: 44,
  },

  cell1: {
    width: 140,
    height: 44,
    paddingHorizontal: 8,
    fontSize: 14,
    color: 'black',
    lineHeight: 44,
  },

  rowCreated: {
    flexDirection: 'row',
    backgroundColor: '#EAF3DE',
    borderBottomWidth: 1,
    borderColor: '#03021d',
    paddingBottom: 4,
  },
  rowUpdated: {
    flexDirection: 'row',
    backgroundColor: '#FFF8E1',
    borderBottomWidth: 1,
    borderColor: '#03021d',
    paddingBottom: 4,
  },
  rowDeleted: {
    flexDirection: 'row',
    backgroundColor: '#FBEAEA',
    borderBottomWidth: 1,
    borderColor: '#03021d',
    paddingBottom: 4,
  },
});
