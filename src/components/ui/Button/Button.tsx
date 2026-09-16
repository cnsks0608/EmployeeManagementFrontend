import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
// Activity indicator -> React Native'in hazır "dönen yükleniyor ikonu" component'i
import { Ionicons } from '@expo/vector-icons';
import { colors} from '@/constants/colors';

type ButtonProps = {
    title?: string;
    icon?: keyof typeof Ionicons.glyphMap;
    iconSize?: number;
    iconColor?: string;
    textColor?: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'danger' | 'success';
    color?: string;
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    loading?: boolean;
};

export function Button({ title, icon, iconSize = 20,
    iconColor = colors.white,  textColor = colors.white, onPress, variant = 'primary', color, size = 'medium', disabled, loading}: ButtonProps) {
    return (
        <Pressable
            onPress={onPress}
            disabled={disabled || loading} // disabled veya loading doluysa tıklanamaz yapmak için 
            style={[
                styles.base,  // yuvarlak, köşe, padding vb
                styles[variant],
                styles[size],
                color && { backgroundColor: color },  // color boşsa background colora hiç bakılmaz 
            ]}
        >
            {loading ? (
                <ActivityIndicator color={colors.white} /> // loading true ise yükleniyor ikonu gösterilir
            ) : (
                <View style={styles.contentRow}>
                    {icon && <Ionicons name={icon} size={iconSize} color={iconColor} />}
                    {title && <Text style={[styles.text, { color: textColor }]}>{title}</Text>}
                </View>
            )}

        </Pressable>
    );
}

const styles = StyleSheet.create({
    base: {
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    text: {
        color: colors.white,
        fontWeight: '600',
    },
    contentRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    // Variant
    primary: {
        backgroundColor: colors.buttonPrimaryBg,
    },
    secondary: {
        backgroundColor: colors. buttonSecondaryBg,
    },
    danger: {
        backgroundColor: colors.buttonDangerBg,
    },
    success: {
        backgroundColor: colors.buttonSuccessBg,
    },

    // Size 
    small: {
        height:40,
        paddingVertical: 6,
        paddingHorizontal: 16,
    },
    medium: {
        width:250,
        height:40,
        paddingVertical: 6,
        paddingHorizontal: 16,
    },
    large: {
        width:350,
        height:40,
        paddingVertical: 6,
        paddingHorizontal: 16,
    },

});
