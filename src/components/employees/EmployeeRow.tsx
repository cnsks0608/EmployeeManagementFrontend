import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants/colors';


export type Employee = {
  id: number;
  registrationNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  hireDate: string;
  titleId: number;
  titleName: string;
  departmentName: string;
};

type EmployeeRowProps = {
  employee: Employee;
  onPress?: () => void;
  isSelected?: boolean;
};

export function EmployeeTableHeader() {
  return (
    <View style={styles.headerRow}>
      <Text style={styles.headerCell} numberOfLines={1}>İsim-Soyisim</Text>
      <Text style={styles.headerCell} numberOfLines={1} >Sicil No</Text>
      <Text style={styles.headerCell} numberOfLines={1}>Departman</Text>
      <Text style={styles.headerCell} numberOfLines={1}>Unvan</Text>
      <Text style={styles.headerCell} numberOfLines={1}>Email</Text>
      <Text style={styles.headerCell} numberOfLines={1}>İşe Giriş</Text>
    </View>
  );
}
export function EmployeeRow({ employee, onPress, isSelected }: EmployeeRowProps) {
  return (
    <Pressable style={[styles.row, isSelected && styles.rowSelected]} onPress={onPress}>
      <Text style={[styles.cell, styles.column]} numberOfLines={1}>{employee.firstName} {employee.lastName}</Text>
      <Text style={[styles.cell1, styles.column]} numberOfLines={1}>{employee.registrationNumber}</Text>
      <Text style={[styles.cell1, styles.column]} numberOfLines={1}>{employee.departmentName}</Text>
      <Text style={[styles.cell1, styles.column]} numberOfLines={2}>{employee.titleName}</Text>
      <Text style={[styles.cell1, styles.column]} numberOfLines={1}>{employee.email}</Text>
      <Text style={[styles.cell1, styles.column]} numberOfLines={1}>{employee.hireDate}</Text>
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
    backgroundColor: colors.grayHeader,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray400,
  },

  row: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderColor: colors.navyDark,
    paddingBottom: 4,
  },

  rowSelected: {
    backgroundColor: colors.graySelected,
  },

  column: {
    borderRightWidth: 1,
    borderRightColor: colors.navyDark,
  },

  cell: {
    width: 140,
    height: 44,
    paddingHorizontal: 8,
    fontSize: 14,
    color: colors.navyPrimary,
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

});