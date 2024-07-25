import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { createApolloClient } from './apolloClient';

const apolloClient = createApolloClient();

const ApolloProviderSetup: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

export default ApolloProviderSetup;
