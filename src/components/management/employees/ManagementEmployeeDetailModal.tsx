import { Button } from '@/components/ui/Button/Button';
import { Modal } from '@/components/ui/Modal/Modal';
import { getEmployeeById } from '@/services/employeeService';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants/colors';

type ManagementEmployee = {
    id: number;
    registrationNumber: string;
    firstName: string;
    lastName: string;
    email: string;
    salary: number;
    hireDate: string;
    titleId: number;
    titleName: string;
    departmentName: string;
    rowStatus: string;
};

type ManagementEmployeeDetailModalProps = {
    visible: boolean;
    onClose: () => void;
    employeeId: number | null;
    onEdit: () => void;
    onDelete: () => void;
    onReactivate: () => void;
};

export function ManagementEmployeeDetailModal({ visible, onClose, employeeId, onEdit, onDelete, onReactivate }: ManagementEmployeeDetailModalProps) {
    const [employee, setEmployee] = useState<ManagementEmployee | null>(null);


    useEffect(() => {
        async function fetchEmployee() {
            if (employeeId) {
                const result = await getEmployeeById(employeeId);
                setEmployee(result);
            }
        }
        fetchEmployee();
    }, [employeeId, visible]);

    function getInitials(firstName: string, lastName: string) {
        return `${firstName[0]}${lastName[0]}`.toUpperCase();
    }

    function getStatusLabel(rowStatus: string) {
        if (rowStatus === 'Deleted') return 'Silinmiş';
        return 'Aktif';
    }

    return (
        <Modal visible={visible} onClose={onClose} style={styles.modalSize}>
            {employee && (
                <View style={styles.detailContent}>
                    <View style={styles.avatarSection}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>{getInitials(employee.firstName, employee.lastName)}</Text>
                        </View>
                        <Text style={styles.name}>{employee.firstName} {employee.lastName}</Text>
                        <Text style={styles.subtitle}>{employee.titleName} · {employee.departmentName}</Text>
                    </View>

                    <View style={styles.infoSection}>
                        <View style={styles.infoRow}>
                            <Ionicons name="card-outline" size={16} color={colors.gray500} />
                            <Text style={styles.infoLabel}>Sicil No</Text>
                            <Text style={styles.infoValue}>{employee.registrationNumber}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Ionicons name="mail-outline" size={16} color={colors.gray500} />
                            <Text style={styles.infoLabel}>Email</Text>
                            <Text style={styles.infoValue}>{employee.email}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Ionicons name="cash-outline" size={16} color={colors.gray500} />
                            <Text style={styles.infoLabel}>Maaş</Text>
                            <Text style={styles.infoValue}>{employee.salary.toLocaleString()} ₺</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Ionicons name="calendar-outline" size={16} color={colors.gray500} />
                            <Text style={styles.infoLabel}>İşe Giriş</Text>
                            <Text style={styles.infoValue}>{employee.hireDate}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Ionicons name="checkmark-circle-outline" size={16} color={colors.gray500} />
                            <Text style={styles.infoLabel}>Durum</Text>
                            <Text style={styles.infoValue}>{getStatusLabel(employee.rowStatus)}</Text>
                        </View>
                    </View>

                    <View style={styles.buttonRow}>
                        {employee?.rowStatus === 'Deleted' ? (
                            <View style={styles.buttonFull}>
                                <Button title="Aktif Et" size="small" color={colors.successBg} textColor={colors.success} onPress={onReactivate} />
                            </View>
                        ) : (
                            <>
                                <View style={styles.buttonHalf}>
                                    <Button title="Düzenle" size="small" variant="secondary" textColor={colors.gray800} onPress={onEdit} />
                                </View>
                                <View style={styles.buttonHalf}>
                                    <Button title="Sil" size="small" color={colors.dangerBg} textColor={colors.dangerText} onPress={onDelete} />
                                </View>
                            </>
                        )}
                    </View>
                </View>
            )}
        </Modal>
    );
}


const styles = StyleSheet.create({
    detailContent: {
        gap: 20,
    },
    avatarSection: {
        alignItems: 'center',
        gap: 6,
    },
    avatar: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: colors.primaryBg,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    avatarText: {
        fontSize: 24,
        fontWeight: '600',
        color: colors.primary,
    },
    name: {
        fontSize: 18,
        fontWeight: '600',
    },
    subtitle: {
        fontSize: 14,
        color: colors.gray600,
    },
    infoSection: {
        borderTopWidth: 1,
        borderTopColor: colors.gray300,
        paddingTop: 16,
        gap: 14,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    infoLabel: {
        fontSize: 13,
        color: colors.gray600,
        width: 80,
    },
    infoValue: {
        fontSize: 13,
        color: colors.gray800,
        flex: 1,
    },
    modalSize: {
        width: 390,
    },

    buttonRow: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 20,
    },
    buttonHalf: {
        flex: 1,
    },
    buttonFull: {
        flex: 1,
    },
});