import { FlatList, StyleSheet } from 'react-native';

type GridProps<T> = {    // Employee, User vb durumları için generic tanımladık 
    data: T[]; // T tipinde birden fazla öge (Employee listesi, User listesi gibi)
    renderItem: (item: T) => React.ReactNode;  // herbir ögeyi (item) al, ekranda nasıl görüneceğini döndür
    onEndReached?: () => void;  // kullanıcı listenin sonuna yaklaşınca çalışsacak fonksiyon
};

export function Grid<T>({ data, renderItem, onEndReached }: GridProps<T>) {
    return (
        <FlatList
            data={data}
            renderItem={({ item }) => renderItem(item)}
            keyExtractor={(_, index) => index.toString()}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.5} // ne kadar yaklaşınca tetiklensi demek -> ekranın yarısına geldiğimizde
            contentContainerStyle={styles.container}
        />
        // FlatList'ten gelen item'ı alıp, dışarıdan gelen renderItem fonksiyonuna iletmek.
        // Her öğe için bana bir kimlik numarası ver, ben de sırasını (index) kullanacağım
        // _ öğenin kendisi aslında ama orada önemsemediğimiz için _ yazabiliyoruz 
    );
}


const styles = StyleSheet.create({
    container: {
        
    },
});