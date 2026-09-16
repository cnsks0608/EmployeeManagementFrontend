import { StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';

export const employeeFilterSheetStyles = StyleSheet.create({
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    color: colors.gray600,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.gray400,
    borderRadius: 8,
    padding: 8,
    fontSize: 14,
  },

  twoColumnRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  twoColumnField: {
    flex: 1,
  },
  dateRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  dateField: {
    flex: 1,
    alignItems: 'flex-start',
  },
  dateLabel: {
    fontSize: 12,
    color: colors.gray600,
    marginBottom: 6,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 40,
  },
  buttonHalf: {
    flex: 1,
  },
  inputWithClear: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray400,
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
});