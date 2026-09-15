import { Modal } from '@/components/ui/Modal/Modal';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

type RequestLog = {
    id: number;
    httpMethod: string;
    path: string;
    queryString: string | null;
    requestBody: string | null;
    statusCode: number;
    username: string | null;
    createdAt: string;
};

type ManagementRequestLogDetailModalProps = {
    visible: boolean;
    onClose: () => void;
    selectedRequestLog: RequestLog | null;
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

function getMethodStyle(httpMethod: string) {
    switch (httpMethod) {
        case 'GET':
            return { icon: 'download-outline' as const, bgColor: '#E6F1FB', iconColor: '#185FA5' };
        case 'POST':
            return { icon: 'add-circle-outline' as const, bgColor: '#EAF3DE', iconColor: '#3B6D11' };
        case 'PUT':
            return { icon: 'create-outline' as const, bgColor: '#FAEEDA', iconColor: '#854F0B' };
        case 'DELETE':
            return { icon: 'trash-outline' as const, bgColor: '#FBEAEA', iconColor: '#C0392B' };
        default:
            return { icon: 'ellipse-outline' as const, bgColor: '#f0f0f0', iconColor: '#666' };
    }
}

export function ManagementRequestLogDetailModal({ visible, onClose, selectedRequestLog }: ManagementRequestLogDetailModalProps) {
    return (
        <Modal visible={visible} onClose={onClose} style={styles.modalSize} scrollable={true}>
            {selectedRequestLog && (
                <View style={styles.card}>
                    <View style={styles.avatarSection}>
                        <View style={[styles.avatar, { backgroundColor: getMethodStyle(selectedRequestLog.httpMethod).bgColor }]}>
                            <Ionicons
                                name={getMethodStyle(selectedRequestLog.httpMethod).icon}
                                size={26}
                                color={getMethodStyle(selectedRequestLog.httpMethod).iconColor}
                            />
                        </View>
                        <Text style={styles.actionName}>{selectedRequestLog.httpMethod}</Text>
                        <Text style={styles.statusText}>{selectedRequestLog.statusCode}</Text>
                    </View>

                    <View style={styles.infoSection}>
                        <View style={styles.infoRow}>
                            <Ionicons name="person-outline" size={16} color="#999" />
                            <Text style={styles.infoLabel}>Kullanıcı</Text>
                            <Text style={styles.infoValue}>{selectedRequestLog.username || '-'}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Ionicons name="link-outline" size={16} color="#999" />
                            <Text style={styles.infoLabel}>Yol</Text>
                            <Text style={styles.infoValue}>{selectedRequestLog.path}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Ionicons name="calendar-outline" size={16} color="#999" />
                            <Text style={styles.infoLabel}>Tarih</Text>
                            <Text style={styles.infoValue}>{formatDate(selectedRequestLog.createdAt)}</Text>
                        </View>
                    </View>

                    {selectedRequestLog.queryString && (
                        <View style={styles.descriptionSection}>
                            <Text style={styles.descriptionLabel}>Query String</Text>
                            <Text style={styles.descriptionText}>{selectedRequestLog.queryString}</Text>
                        </View>
                    )}

                    {selectedRequestLog.requestBody && (
                        <View style={styles.descriptionSection}>
                            <Text style={styles.descriptionLabel}>İstek İçeriği</Text>
                            <Text style={styles.descriptionText}>{selectedRequestLog.requestBody}</Text>
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
        flex: 1,
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
});