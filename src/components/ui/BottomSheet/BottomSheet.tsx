import GorhomBottomSheet, { BottomSheetBackdrop, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useEffect, useRef } from 'react';
import { StyleSheet, Text } from 'react-native';

type BottomSheetProps = {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
};

export function BottomSheet({ visible, onClose, title, children }: BottomSheetProps) {
  const sheetRef = useRef<GorhomBottomSheet>(null);

  useEffect(() => {
    visible ? sheetRef.current?.expand() : sheetRef.current?.close();
  }, [visible]);

  return (
    <GorhomBottomSheet
      ref={sheetRef}
      index={-1} 
      snapPoints={['100%']}
      enablePanDownToClose
      onClose={onClose}
      backdropComponent={(props) => (
        <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
      )}
    >
      <BottomSheetScrollView style={styles.content}>
        {title && <Text style={styles.title}>{title}</Text>}
        {children}
      </BottomSheetScrollView>
    </GorhomBottomSheet>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
    gap: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});