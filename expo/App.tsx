import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import Login from './screens/Login';
import ApolloProviderSetup from './src/api/apolloClient/ApolloProviderSetup';

const App = () => {
  return (
    <ApolloProviderSetup>
      <NavigationContainer>
        <Login />
        <Toast />
      </NavigationContainer>
    </ApolloProviderSetup>
  );
};

export default App;
