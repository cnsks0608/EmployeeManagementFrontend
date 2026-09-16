import { Button } from '@/components/ui/Button/Button';
import { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { colors } from '@/constants/colors';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const [pageInput, setPageInput] = useState(currentPage.toString());

  useEffect(() => {
    setPageInput(currentPage.toString());
  }, [currentPage]);

  function handleGoToPage() {
    const page = Number(pageInput);
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  }

  return (
    <View style={styles.container}>
      <Button
        title="<"
        size="small"
        color={colors.transparent}
        textColor={colors.gray800}
        disabled={currentPage === 1}
        onPress={() => onPageChange(currentPage - 1)}
      />

      <TextInput
        value={pageInput}
        placeholder={`/ ${totalPages}`}
        onChangeText={setPageInput}
        onSubmitEditing={handleGoToPage}
        keyboardType="number-pad"
        style={styles.pageInput}
      />

      <Button
        title=">"
        size="small"
        color={colors.transparent}
        textColor={colors.gray800}
        disabled={currentPage === totalPages}
        onPress={() => onPageChange(currentPage + 1)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 6,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    backgroundColor: colors.gray100,
  },
  pageInput: {
    width: 44,
    borderWidth: 1,
    borderColor: colors.gray400,
    borderRadius: 6,
    padding: 6,
    textAlign: 'center',
  },
  totalText: {
    color: colors.gray600,
  },
});