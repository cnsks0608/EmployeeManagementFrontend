import { StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';

export const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainer: {
    padding: 20,
    alignItems: 'center',
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primaryBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: {
    color: colors.primary,
    fontSize: 26,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.gray800,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: colors.gray600,
  },
  infoCard: {
    width: '100%',
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  cardTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.gray800,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  label: {
    fontSize: 13,
    color: colors.gray600,
  },
  value: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.gray800,
  },
  logoutWrapper: {
    width: '100%',
    marginTop: 8,
    alignItems: 'center',
  },
});