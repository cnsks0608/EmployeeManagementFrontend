import { Dropdown } from '@/components/ui/Dropdown/Dropdown';
import { Modal } from '@/components/ui/Modal/Modal';
import { StyleSheet } from 'react-native';

type SortOption = {
  sortDirection: string | undefined;
};

type ManagementActivityLogSortModalProps = {
  visible: boolean;
  onClose: () => void;
  onApply: (option: SortOption) => void;
  currentSortDirection?: string;
};

const sortOptions = [
  { label: 'Tarih (Yeni-Eski)', sortDirection: undefined },
  { label: 'Tarih (Eski-Yeni)', sortDirection: 'asc' },
];

export function ManagementActivityLogSortModal({ visible, onClose, onApply, currentSortDirection }: ManagementActivityLogSortModalProps) {
  const currentIndex = sortOptions.findIndex(
    (option) => option.sortDirection === currentSortDirection
  );

  function handleChange(index: number | undefined) {
    if (index === undefined) {
      onApply({ sortDirection: undefined });
    } else {
      const selectedOption = sortOptions[index];
      onApply(selectedOption);
    }
    onClose();
  }

  return (
    <Modal visible={visible} onClose={onClose} title="Sırala" style={styles.modalSize}>
      <Dropdown
        data={sortOptions.map((option, index) => ({
          label: option.label,
          value: option.sortDirection === undefined ? undefined : index,
        }))}
        value={currentIndex > 0 ? currentIndex : undefined}
        onChange={(value) => handleChange(value as number | undefined)}
        placeholder="Sıralama seçin"
        searchable={false}
      />
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalSize: {
    width: 280,
  },
});