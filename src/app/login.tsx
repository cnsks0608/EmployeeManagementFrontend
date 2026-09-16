import { Button } from '@/components/ui/Button/Button';
import { login } from '@/services/authService';
import { loginStyles } from '@/styles/login.styles';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { colors } from '@/constants/colors';


export default function LoginScreen() {
  const [mailOrUsername, setMailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  async function handleLogin() {

    try {
      const data = await login(mailOrUsername, password);
      await SecureStore.setItemAsync('token', data.token);
      Toast.show({
        type: 'success',
        text1: 'Hoş Geldiniz',
        text2: 'Giriş başarılı.',
      });
      router.replace('/(tabs)/employees');
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Giriş Başarısız',
        text2: error.message,
      });
    }
  }

    return (
      <View style={loginStyles.container}>
        <Text style={loginStyles.title}>Giriş Yap</Text>

        <TextInput
          style={loginStyles.input}
          placeholder="Kullanıcı adı veya email"
          value={mailOrUsername}
          onChangeText={setMailOrUsername} // kullanıcı herhangi bir değişiklik yaptığında mailOrUsername stateine kaydedilir 
          autoCapitalize="none" // otomatik harf büyütmeyi vs devredışı bırakırız
        />

        <View style={loginStyles.passwordContainer}>
          <TextInput
            style={loginStyles.passwordInput}
            placeholder="Şifre"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword} // showpassword statei true ise şifreyi gösterir değilse göstermez
          />
          <Pressable onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? 'eye-off' : 'eye'}
              size={22}
              color={colors.gray600}
            />
          </Pressable>
        </View>
        <View style={{ flex: 1, flexDirection: "row", justifyContent: 'center', }}>
          <Button title="Giriş Yap" onPress={handleLogin} size="large" />
        </View>
      </View>
    );
  }
