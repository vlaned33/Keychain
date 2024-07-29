import React, { useEffect, ReactNode } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../src/types/rootStackParamList.type';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const sessionToken = await AsyncStorage.getItem('sessionToken');
        if (!sessionToken) {
          navigation.navigate('Login');
        }
      } catch (error) {
        console.error('Error checking session token:', error);
        navigation.navigate('Login');
      }
    };

    checkSession();
  }, [navigation]);

  return (
    <View style={{ flex: 1 }}>
      {children ? children : <ActivityIndicator size='large' color='#0000ff' />}
    </View>
  );
};

export default PrivateRoute;
