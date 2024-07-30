import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import ApolloProviderSetup from './src/api/apolloClient/ApolloProviderSetup';

import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import PrivateRoute from './components/PrivateRoute';

const Stack = createNativeStackNavigator();

const linking = {
  prefixes: ['app://'],
  config: {
    screens: {
      Register: 'register',
      Login: 'login',
      Home: 'home',
    },
  },
};

const App = () => {
  return (
    <ApolloProviderSetup>
      <NavigationContainer linking={linking}>
        <Stack.Navigator initialRouteName='Register'>
          <Stack.Screen name='Register' component={RegisterScreen} />
          <Stack.Screen
            options={{
              headerLeft: () => null,
            }}
            name='Login'
            component={LoginScreen}
          />
          <Stack.Screen name='Home'>
            {() => (
              <PrivateRoute>
                <HomeScreen />
              </PrivateRoute>
            )}
          </Stack.Screen>
        </Stack.Navigator>
        <Toast />
      </NavigationContainer>
    </ApolloProviderSetup>
  );
};

export default App;
