import { Button } from '@/components/ui/Button/Button';
import { Modal } from '@/components/ui/Modal/Modal';
import { chatStyles } from '@/styles/chat.styles';
import { useState } from 'react';
import { Text, View } from 'react-native';

export default function ChatScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={chatStyles.container}>
      <Text>Chat Ekranı</Text>

      <Button title="Modal'ı Aç" size='small' onPress={() => setModalVisible(true)} />

      <Modal visible={modalVisible} onClose={() => setModalVisible(false)} title="">
        <Text>Merhaba, ben bir modal'ım!</Text>
        <Button title="Kapat" color="green" size='small' onPress={() => setModalVisible(false)} />
      </Modal>
    </View>
  );
}
