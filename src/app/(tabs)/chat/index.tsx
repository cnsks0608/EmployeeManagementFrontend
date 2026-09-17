import { useState, useRef } from 'react';
import { askChat } from '@/services/chatService';
import { View, Text, Pressable, TextInput, ScrollView, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/constants/colors';

type Message = {
  id: string;
  text: string;
  fromUser: boolean;
};


export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);


  async function handleSend() {
    const trimmedText = inputText.trim();  // kullanıcı sadece boşluklardan oluşan bir mesaj göndermesin diye 
    if (!trimmedText) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: trimmedText,
      fromUser: true,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await askChat(trimmedText);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.answer,
        fromUser: false,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Bir hata oluştu, lütfen tekrar deneyin.',
        fromUser: false,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }

  function MessageBubble({ message }: { message: Message }) {
    return (
      <View style={[styles.bubbleRow, message.fromUser ? styles.bubbleRowUser : styles.bubbleRowBot]}>
        <View style={message.fromUser ? styles.bubbleUser : styles.bubbleBot}>
          <Text style={message.fromUser ? styles.bubbleTextUser : styles.bubbleTextBot}>
            {message.text}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <Ionicons name="chatbubbles" size={18} color={colors.primary} />
        </View>
        <View>
          <Text style={styles.headerTitle}>Barsan Asistan</Text>
          <Text style={styles.headerSubtitle}>Size yardımcı olmak için burada</Text>
        </View>
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isLoading && (
          <View style={[styles.bubbleRow, styles.bubbleRowBot]}>
            <View style={styles.bubbleBot}>
              <Text style={styles.typingText}>Yazıyor...</Text>
            </View>
          </View>
        )}
      </ScrollView>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Bir soru sorun..."
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={handleSend}
        />
        <Pressable style={styles.sendButton} onPress={handleSend}>
          <Ionicons name="send" size={16} color={colors.white} />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  headerIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primaryBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.gray800,
  },
  headerSubtitle: {
    fontSize: 11,
    color: colors.gray600,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    gap: 12,
  },
  bubbleRow: {
    flexDirection: 'row',
  },
  bubbleRowUser: {
    justifyContent: 'flex-end',
  },
  bubbleRowBot: {
    justifyContent: 'flex-start',
  },
  bubbleUser: {
    maxWidth: '78%',
    backgroundColor: colors.primary,
    borderRadius: 14,
    borderBottomRightRadius: 4,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom:20,
  },
  bubbleBot: {
    maxWidth: '78%',
    backgroundColor: colors.gray100,
    borderRadius: 14,
    borderBottomLeftRadius: 4,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom:20,
  },
  bubbleTextUser: {
    fontSize: 13,
    color: colors.white,
    lineHeight: 19,
  },
  bubbleTextBot: {
    fontSize: 13,
    color: colors.gray800,
    lineHeight: 19,
  },
  typingText: {
    fontSize: 13,
    color: colors.gray600,
    fontStyle: 'italic',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    backgroundColor: colors.gray100,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 13,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});