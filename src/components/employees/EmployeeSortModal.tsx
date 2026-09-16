import { Modal } from '@/components/ui/Modal/Modal';
import { StyleSheet } from 'react-native';
import { Dropdown } from '../ui/Dropdown/Dropdown';

type SortOption = {
    sortBy: string | undefined;
    sortDirection: string | undefined;
};

type EmployeeSortModalProps = {
    visible: boolean;
    onClose: () => void;
    onApply: (option: SortOption) => void;
    currentSortBy?: string;
    currentSortDirection?: string;
};

const sortOptions = [
    { label: 'Varsayılan Sıralama', sortBy: undefined, sortDirection: undefined },
    { label: 'İsim (A-Z)', sortBy: 'name', sortDirection: 'asc' },
    { label: 'İsim (Z-A)', sortBy: 'name', sortDirection: 'desc' },
    { label: 'İşe Giriş (Eski-Yeni)', sortBy: 'hireDate', sortDirection: 'asc' },
    { label: 'İşe Giriş (Yeni-Eski)', sortBy: 'hireDate', sortDirection: 'desc' },
];


export function EmployeeSortModal({ visible, onClose, onApply, currentSortBy, currentSortDirection }: EmployeeSortModalProps) {
    const currentIndex = sortOptions.findIndex(
        (option) => option.sortBy === currentSortBy && option.sortDirection === currentSortDirection
    );
    function handleChange(index: number | undefined) {
        if (index === undefined) {
            onApply({ sortBy: undefined, sortDirection: undefined });
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
                    value: option.sortBy === undefined ? undefined : index,
                }))}
                value={currentIndex > 0 ? currentIndex : undefined}
                onChange={(value) => handleChange(value as number|undefined)}
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


