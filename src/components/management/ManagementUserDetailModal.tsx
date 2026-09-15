import { Button } from '@/components/ui/Button/Button';
import { Modal } from '@/components/ui/Modal/Modal';
import { getUserById } from '@/services/userService';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type ManagementUser = {
    id: number;
    username: string;
    email: string;
    roleId: number;
    roleName: string;
    employeeId: number;
    employeeRegistrationNumber: string;
    rowStatus: string;
};

type ManagementUserDetailModalProps = {
    visible: boolean;
    onClose: () => void;
    userId: number | null;
    onEdit: () => void;
    onDelete: () => void;
    onReactivate: () => void;
};

export function ManagementUserDetailModal({ visible, onClose, userId, onEdit, onDelete, onReactivate }: ManagementUserDetailModalProps) {
    const [user, setUser] = useState<ManagementUser | null>(null);

    useEffect(() => {
        async function fetchUser() {
            if (userId) {
                try {
                    const result = await getUserById(userId);
                    setUser(result);
                } catch (error) {
                    setUser(null);
                }
            }
        }
        fetchUser();
    }, [userId, visible]);

    function getInitials(username: string) {
        return username.slice(0, 2).toUpperCase();
    }

    function getStatusLabel(rowStatus: string) {
        if (rowStatus === 'Deleted') return 'Silinmiş';
        return 'Aktif';
    }

    return (
        <Modal visible={visible} onClose={onClose} style={styles.modalSize}>
            {user && (
                <View style={styles.card}>
                    <View style={styles.avatarSection}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>{getInitials(user.username)}</Text>
                        </View>
                        <Text style={styles.name}>{user.username}</Text>
                        <Text style={styles.subtitle}>{user.roleName}</Text>
                    </View>

                    <View style={styles.infoSection}>
                        <View style={styles.infoRow}>
                            <Ionicons name="mail-outline" size={16} color="#999" />
                            <Text style={styles.infoLabel}>Email</Text>
                            <Text style={styles.infoValue}>{user.email}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Ionicons name="card-outline" size={16} color="#999" />
                            <Text style={styles.infoLabel}>Bağlı Çalışan</Text>
                            <Text style={styles.infoValue}>{user.employeeRegistrationNumber}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Ionicons name="checkmark-circle-outline" size={16} color="#999" />
                            <Text style={styles.infoLabel}>Durum</Text>
                            <Text style={styles.infoValue}>{getStatusLabel(user.rowStatus)}</Text>
                        </View>
                    </View>

                    <View style={styles.buttonRow}>
                        {user?.rowStatus === 'Deleted' ? (
                            <View style={styles.buttonFull}>
                                <Button title="Aktif Et" size="small" color="#EAF3DE" textColor="#3B6D11" onPress={onReactivate} />
                            </View>
                        ) : (
                            <>
                                <View style={styles.buttonHalf}>
                                    <Button title="Düzenle" size="small" variant="secondary" textColor="#333" onPress={onEdit} />
                                </View>
                                <View style={styles.buttonHalf}>
                                    <Button title="Sil" size="small" color="#FBEAEA" textColor="#C0392B" onPress={onDelete} />
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
    card: {
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
        gap: 14,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    infoLabel: {
        fontSize: 13,
        color: '#666',
        width: 100,
    },
    infoValue: {
        fontSize: 13,
        color: '#333',
        flex: 1,
    },
    modalSize: {
        width: 370,
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