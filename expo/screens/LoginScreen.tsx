import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../src/api/mutations/logInApi';
import Toast from 'react-native-toast-message';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../src/types/rootStackParamList.type';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [login, { loading, error }] = useMutation(LOGIN_MUTATION, {
    onCompleted: async (data) => {
      if (
        data.authenticateUserWithPassword.__typename ===
        'UserAuthenticationWithPasswordSuccess'
      ) {
        const sessionToken = data.authenticateUserWithPassword.sessionToken;

        if (sessionToken) {
          await AsyncStorage.setItem('sessionToken', sessionToken);

          Toast.show({
            type: 'success',
            text1: 'Login Successful',
            text2: 'Welcome back!',
          });
          navigation.navigate('Home');
        } else {
          Toast.show({
            type: 'error',
            text1: 'Login Error',
            text2: 'No session token received.',
          });
        }
      } else if (
        data.authenticateUserWithPassword.__typename ===
        'UserAuthenticationWithPasswordFailure'
      ) {
        Toast.show({
          type: 'error',
          text1: 'Login Failed',
          text2: data.authenticateUserWithPassword.message,
        });
      }
    },
    onError: (error) => {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message,
      });
    },
  });

  const handleLogin = () => {
    login({
      variables: { email, password },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder='Email'
        value={email}
        onChangeText={setEmail}
        keyboardType='email-address'
        autoCapitalize='none'
      />
      <TextInput
        style={styles.input}
        placeholder='Password'
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title='Login' onPress={handleLogin} disabled={loading} />
      {error && <Text style={styles.errorText}>Error: {error.message}</Text>}
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Already have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
  link: {
    marginTop: 15,
    textAlign: 'center',
    color: 'blue',
  },
});

export default LoginScreen;
