import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  Button,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { useMutation } from '@apollo/client';
import { SIGNUP_MUTATION, LOGIN_MUTATION } from '../src/api/mutations/logInApi';
import {
  LoginData,
  SignUpResponse,
  LoginResponse,
  SignUpData,
} from '../src/types/logIn.types';

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');

  const [signUp] = useMutation<SignUpResponse, SignUpData>(SIGNUP_MUTATION, {
    onCompleted: (data) => {
      Toast.show({
        type: 'success',
        text1: 'Sign Up Successful',
        text2: `Welcome, ${data.user.name}`,
      });
      console.log('SignUp - Data:', data);
    },
    onError: (error) => {
      Toast.show({
        type: 'error',
        text1: 'Sign Up Failed',
        text2: error.message || 'An error occurred during sign up.',
      });
    },
  });

  const [login] = useMutation<LoginResponse, LoginData>(LOGIN_MUTATION, {
    onCompleted: (data) => {
      Toast.show({
        type: 'success',
        text1: 'Login Successful',
        text2: `Welcome back, ${data.user.email}`,
      });
      console.log('Login - Data:', data);
    },
    onError: (error) => {
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: error.message || 'An error occurred during login.',
      });
    },
  });

  const handleLogin = () => {
    login({ variables: { email, password } });
  };

  const handleSignUp = () => {
    signUp({ variables: { name, email, password } });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{isLogin ? 'Login' : 'Sign Up'}</Text>
      {!isLogin && (
        <TextInput
          style={styles.input}
          placeholder='Name'
          value={name}
          onChangeText={setName}
        />
      )}
      <TextInput
        style={styles.input}
        placeholder='Email'
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder='Password'
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button
        title={isLogin ? 'Login' : 'Sign Up'}
        onPress={isLogin ? handleLogin : handleSignUp}
      />
      <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
        <Text style={styles.toggleText}>
          {isLogin
            ? "Don't have an account? Sign Up"
            : 'Already have an account? Login'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
  toggleText: {
    marginTop: 15,
    color: 'blue',
    textAlign: 'center',
  },
});

export default Login;
