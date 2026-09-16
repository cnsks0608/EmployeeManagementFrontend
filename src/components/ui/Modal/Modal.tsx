import { Dimensions, Pressable, Modal as RNModal, ScrollView, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
// reactNative in kendi modal componentiyle karışmaması için onu rnmodal olarak import ettik
import { useEffect, useState } from 'react';
import { colors } from '@/constants/colors';


const screenHeight = Dimensions.get('window').height;


type ModalProps = {
  visible: boolean;
  onClose: () => void;
  title?: string | null;
  children: React.ReactNode;  // her modalın içeriği birbirinden farklı olacağı için içeriği 
  style?: StyleProp<ViewStyle>;
  scrollable?: boolean;
};

export function Modal({ visible, onClose, title, children, style, scrollable = false }: ModalProps) {
  const [titleVisible, setTitleVisible] = useState(true);

  useEffect(() => {
    // başlığın karakter sayısı hesaplanır (boşukları almadan)
    // 0 çıkarsa titleVisible false olur 
    const cleanedTitle = title?.trim();
    const titleLength = cleanedTitle?.length;
    titleLength == 0 ? setTitleVisible(false) : setTitleVisible(true)
  }, [title])

  return (         // modal açıldığında arkadaki ekran şeffaf bir şekilde görünür, 
    <RNModal visible={visible} transparent={true} animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        {/* arka plandaki karartılmış alana tıklanınca modal kapanır, content'in ARKASINDA durduğu için content'e tıklamalar buraya hiç ulaşmaz */}
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <View style={[styles.content, style]}>
          {titleVisible && title && <Text style={styles.title}>{title}</Text>}
          {scrollable ? (
            <ScrollView style={[styles.scrollContent, {  maxHeight: screenHeight * 0.6  }]} contentContainerStyle={{ flexGrow: 1 }}>
              {children}
            </ScrollView>
          ) : (
            children
          )}
        </View>
      </View>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.overlay,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'

  },
  content: {
    backgroundColor: colors.white,
    padding: 35,
    borderRadius: 12,
    gap: 12,
    overflow: 'hidden'
  },
  scrollContent: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

// overlay -> arkayı hafif görebildiğimiz modalın arka planı 
// content -> asıl modal, içine children ile istediğimizi koyarız