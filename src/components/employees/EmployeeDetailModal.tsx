import { Employee } from '@/components/employees/EmployeeRow';
import { Modal } from '@/components/ui/Modal/Modal';
import { getEmployeeById } from '@/services/employeeService';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';


type EmployeeDetailModalProps = {
    visible: boolean;
    onClose: () => void;
    employeeId: number | null;
};

function getInitials(firstName: string, lastName: string) {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
}

export function EmployeeDetailModal({ visible, onClose, employeeId }: EmployeeDetailModalProps) {
    const [employee, setEmployee] = useState<Employee | null>(null);

    useEffect(() => {
        async function fetchEmployee() {
            if (employeeId) {
                const result = await getEmployeeById(employeeId);
                setEmployee(result);
            }
        }
        fetchEmployee();
    }, [employeeId]);

    return (
        <Modal visible={visible} onClose={onClose} style={styles.modalSize}>
            {employee && (
                <View style={styles.card}>
                    <View style={styles.avatarSection}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>{getInitials(employee.firstName, employee.lastName)}</Text>
                        </View>
                        <Text style={styles.name}>{employee.firstName} {employee.lastName}</Text>
                        <Text style={styles.subtitle}>{employee.titleName} · {employee.departmentName}</Text>
                    </View>

                    <View style={styles.infoSection}>
                        <View style={styles.infoRow}>
                            <Ionicons name="card-outline" size={16} color="#999" />
                            <Text style={styles.infoLabel}>Sicil No</Text>
                            <Text style={styles.infoValue}>{employee.registrationNumber}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Ionicons name="mail-outline" size={16} color="#999" />
                            <Text style={styles.infoLabel}>Email</Text>
                            <Text style={styles.infoValue}>{employee.email}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Ionicons name="calendar-outline" size={16} color="#999" />
                            <Text style={styles.infoLabel}>İşe Giriş</Text>
                            <Text style={styles.infoValue}>{employee.hireDate}</Text>
                        </View>
                    </View>
                </View>
            )}
        </Modal>
    );
}

const styles = StyleSheet.create({
    card: {
        gap: 28,
    },
    avatarSection: {
        alignItems: 'center',
        gap: 6,
    },
    avatar: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: '#E6F1FB',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    avatarText: {
        fontSize: 24,
        fontWeight: '600',
        color: '#185FA5',
    },
    name: {
        fontSize: 18,
        fontWeight: '600',
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
    },
    infoSection: {
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 16,
        gap: 18,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    infoLabel: {
        fontSize: 13,
        color: '#666',
        width: 80,
    },
    infoValue: {
        fontSize: 13,
        color: '#333',
        flex: 1,
    },
    modalSize: {
        width: 390,

    },
});