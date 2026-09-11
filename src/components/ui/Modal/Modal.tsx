import { Pressable, Modal as RNModal, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';
// reactNative in kendi modal componentiyle karışmaması için onu rnmodal olarak import ettik
import { useEffect, useState } from 'react';

type ModalProps = {
  visible: boolean;
  onClose: () => void;
  title?: string | null;
  children: React.ReactNode;  // her modalın içeriği birbirinden farklı olacağı için içeriği 
  style?: StyleProp<ViewStyle>;
};

export function Modal({ visible, onClose, title, children, style }: ModalProps) {
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
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={[styles.content, style]} onPress={(e) => e.stopPropagation()}>
          {titleVisible && title && <Text style={styles.title}>{title}</Text>}
          {children}
        </Pressable>
      </Pressable>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    
  },
  content: {
    backgroundColor: 'white',
    padding: 35,
    borderRadius: 12,
    gap:12,
  },
});

// overlay -> arkayı hafif görebildiğimiz modalın arka planı 
// content -> asıl modal, içine children ile istediğimizi koyarız 