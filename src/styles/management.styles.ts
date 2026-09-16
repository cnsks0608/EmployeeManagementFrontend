import { StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';

export const managementStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 12,
  },
  navigationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBoxBlue: {
    backgroundColor: colors.primaryBg,
  },
  iconBoxGreen: {
    backgroundColor: colors.successBg,
  },
  iconBoxAmber: {
    backgroundColor: colors.warningBg,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  cardSubtitle: {
    fontSize: 12,
    color: colors.gray600,
    marginTop: 2,
  },
});