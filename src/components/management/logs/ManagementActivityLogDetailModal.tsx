import { Modal } from '@/components/ui/Modal/Modal';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants/colors';


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
            return { icon: 'log-in-outline' as const, bgColor: colors.logLoginBg, iconColor: colors.logLoginIcon };
        case 'Logout':
            return { icon: 'log-out-outline' as const, bgColor: colors.logLogoutBg, iconColor: colors.logLogoutIcon };
        case 'Create':
            return { icon: 'add-circle-outline' as const, bgColor: colors.logCreateBg, iconColor: colors.logCreateIcon };
        case 'Update':
            return { icon: 'create-outline' as const, bgColor: colors.logUpdateBg, iconColor: colors.logUpdateIcon};
        case 'Delete':
            return { icon: 'trash-outline' as const, bgColor: colors.logDeleteBg, iconColor: colors.logDeleteIcon };
        case 'Read':
            return { icon: 'eye-outline' as const, bgColor: colors.logReadBg, iconColor: colors.logReadIcon };
        default:
            return { icon: 'ellipse-outline' as const, bgColor: colors.logDefaultBg, iconColor: colors.logDefaultIcon };
    }
}

export function ManagementActivityLogDetailModal({ visible, onClose, selectedActivityLog }: ManagementActivityLogDetailModalProps) {
    return (
        
        <Modal visible={visible} onClose={onClose} style={styles.modalSize} scrollable={true}>
            {selectedActivityLog && (
                <View style={styles.detailContent}>
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
                            <Ionicons name="person-outline" size={16} color={colors.gray500} />
                            <Text style={styles.infoLabel}>Kullanıcı</Text>
                            <Text style={styles.infoValue}>{selectedActivityLog.username || '-'}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Ionicons name="pricetag-outline" size={16} color={colors.gray500} />
                            <Text style={styles.infoLabel}>Hedef</Text>
                            <Text style={styles.infoValue}>{selectedActivityLog.targetName || '-'}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Ionicons name="checkmark-circle-outline" size={16} color={colors.gray500} />
                            <Text style={styles.infoLabel}>Durum</Text>
                            <Text style={styles.infoValue}>{selectedActivityLog.isSuccess ? 'Başarılı' : 'Başarısız'}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Ionicons name="calendar-outline" size={16} color={colors.gray500} />
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
                            <Text style={[styles.descriptionText, { color: colors.dangerText }]}>{selectedActivityLog.failureReason}</Text>
                        </View>
                    )}
                </View>
            )}
        </Modal>
    );
}

const styles = StyleSheet.create({
    detailContent: {
        gap: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
    },
    infoSection: {
        borderTopWidth: 1,
        borderTopColor: colors.borderLight,
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
        flex: 1
    },
    descriptionSection: {
        borderTopWidth: 1,
        borderTopColor: colors.borderLight,
        paddingTop: 16,
    },
    descriptionLabel: {
        fontSize: 12,
        color: colors.gray600,
        marginBottom: 6,
    },
    descriptionText: {
        fontSize: 14,
        color: colors.gray800,
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
        color: colors.gray600,
    },
});