import { Modal } from '@/components/ui/Modal/Modal';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

type ActivityLog = {
    id: number;
    username: string | null;
    targetName: string | null;
    action: string;
    description: string;
    isSuccess: boolean;
    failureReason: string | null;
    createdAt: string;
};

type ManagementActivityLogDetailModalProps = {
    visible: boolean;
    onClose: () => void;
    selectedActivityLog: ActivityLog | null;
};

function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleString('tr-TR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

function getActionStyle(action: string) {
    switch (action) {
        case 'Login':
            return { icon: 'log-in-outline' as const, bgColor: '#EAF3DE', iconColor: '#3B6D11' };
        case 'Logout':
            return { icon: 'log-out-outline' as const, bgColor: '#FAEEDA', iconColor: '#666' };
        case 'Create':
            return { icon: 'add-circle-outline' as const, bgColor: '#E6F1FB', iconColor: '#185FA5' };
        case 'Update':
            return { icon: 'create-outline' as const, bgColor: '#FAEEDA', iconColor: '#854F0B' };
        case 'Delete':
            return { icon: 'trash-outline' as const, bgColor: '#FBEAEA', iconColor: '#C0392B' };
        case 'Read':
            return { icon: 'eye-outline' as const, bgColor: '#EEEDFE', iconColor: '#666' };
        default:
            return { icon: 'ellipse-outline' as const, bgColor: '#f0f0f0', iconColor: '#666' };
    }
}

export function ManagementActivityLogDetailModal({ visible, onClose, selectedActivityLog }: ManagementActivityLogDetailModalProps) {
    return (
        
        <Modal visible={visible} onClose={onClose} style={styles.modalSize} scrollable={true}>
            {selectedActivityLog && (
                <View style={styles.card}>
                    <View style={styles.avatarSection}>
                        <View style={[styles.avatar, { backgroundColor: getActionStyle(selectedActivityLog.action).bgColor }]}>
                            <Ionicons
                                name={getActionStyle(selectedActivityLog.action).icon}
                                size={26}
                                color={getActionStyle(selectedActivityLog.action).iconColor}
                            />
                        </View>
                        <Text style={styles.actionName}>{selectedActivityLog.action}</Text>
                        <Text style={styles.statusText}>{selectedActivityLog.isSuccess ? 'Başarılı' : 'Başarısız'}</Text>
                    </View>

                    <View style={styles.infoSection}>
                        <View style={styles.infoRow}>
                            <Ionicons name="person-outline" size={16} color="#999" />
                            <Text style={styles.infoLabel}>Kullanıcı</Text>
                            <Text style={styles.infoValue}>{selectedActivityLog.username || '-'}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Ionicons name="pricetag-outline" size={16} color="#999" />
                            <Text style={styles.infoLabel}>Hedef</Text>
                            <Text style={styles.infoValue}>{selectedActivityLog.targetName || '-'}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Ionicons name="checkmark-circle-outline" size={16} color="#999" />
                            <Text style={styles.infoLabel}>Durum</Text>
                            <Text style={styles.infoValue}>{selectedActivityLog.isSuccess ? 'Başarılı' : 'Başarısız'}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Ionicons name="calendar-outline" size={16} color="#999" />
                            <Text style={styles.infoLabel}>Tarih</Text>
                            <Text style={styles.infoValue}>{formatDate(selectedActivityLog.createdAt)}</Text>
                        </View>
                    </View>

                    <View style={styles.descriptionSection}>
                        <Text style={styles.descriptionLabel}>Açıklama</Text>
                        <Text style={styles.descriptionText}>{selectedActivityLog.description}</Text>
                    </View>

                    {selectedActivityLog.failureReason && (
                        <View style={styles.descriptionSection}>
                            <Text style={styles.descriptionLabel}>Hata Nedeni</Text>
                            <Text style={[styles.descriptionText, { color: '#C0392B' }]}>{selectedActivityLog.failureReason}</Text>
                        </View>
                    )}
                </View>
            )}
        </Modal>
    );
}

const styles = StyleSheet.create({
    card: {
        gap: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
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
        width: 80,
    },
    infoValue: {
        fontSize: 13,
        color: '#333',
        flex: 1
    },
    descriptionSection: {
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 16,
    },
    descriptionLabel: {
        fontSize: 12,
        color: '#666',
        marginBottom: 6,
    },
    descriptionText: {
        fontSize: 14,
        color: '#333',
        lineHeight: 20,
    },
    modalSize: {
        width: 390,
    },
    avatarSection: {
        alignItems: 'center',
        gap: 4,
    },
    avatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    actionName: {
        fontSize: 16,
        fontWeight: '600',
    },
    statusText: {
        fontSize: 13,
        color: '#666',
    },
});