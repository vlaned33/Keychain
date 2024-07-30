import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../src/types/rootStackParamList.type';
import { useMutation } from '@apollo/client';
import { REGISTER_MUTATION } from '../../src/api/mutations/logInApi';
import Toast from 'react-native-toast-message';
import { validateEmail } from '../../src/utils/validateEmail';
import { validatePassword } from '../../src/utils/validatePassword';
import { styles } from './RegisterScreen.styles';

const RegisterScreen: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [register, { loading }] = useMutation(REGISTER_MUTATION, {
    onCompleted: (data) => {
      Toast.show({
        type: 'success',
        text1: 'Registration Successful',
        text2: `Welcome, ${data.createUser.name}`,
      });
      navigation.navigate('Home');
    },
    onError: (error) => {
      Toast.show({
        type: 'error',
        text1: 'Registration Failed',
        text2: error.message || 'An error occurred during registration.',
      });
    },
  });

  const submitHandler = async () => {
    if (!validateEmail(email)) {
      Toast.show({
        type: 'error',
        text1: 'Email Error',
        text2: 'Please enter a valid email address.',
      });
      return;
    }

    if (!validatePassword(password)) {
      Toast.show({
        type: 'error',
        text1: 'Password Error',
        text2: 'Password must be at least 8 characters long.',
      });
      return;
    }

    if (password !== confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Password Error',
        text2: 'Passwords do not match.',
      });
      return;
    }

    try {
      await register({
        variables: { name, email, password },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder='Enter name'
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder='Enter email'
        value={email}
        onChangeText={setEmail}
        keyboardType='email-address'
      />
      <TextInput
        style={styles.input}
        placeholder='Enter password'
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder='Confirm password'
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <Button title='Register' onPress={submitHandler} disabled={loading} />
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;
