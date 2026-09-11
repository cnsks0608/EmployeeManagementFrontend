import { StyleSheet } from 'react-native';

export const employeesStyles = StyleSheet.create({
    container: {
        flex: 1,
    },

    searchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingTop: 10,
        gap: 4,

    },
    searchInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        padding: 10,
    },
    resultCount: {
        marginHorizontal: 10,
        marginBottom: 25,
        marginTop: 8,
        color: '#666',
    },
    tableWrapper: {
        // sabit genişlik kaldırıldı, içerik kendi genişliğini alacak
    },
    iconGroup: {
        flexDirection: 'row',
        gap: -8,
    },
    searchInputWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        paddingHorizontal: 10,
       
    },
    searchInputFlex: {
        flex: 1,
        paddingVertical: 10,
    },
});