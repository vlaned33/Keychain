import { ApolloClient, InMemoryCache } from '@apollo/client';

export const createApolloClient = () => {
  return new ApolloClient({
    uri: 'http://192.168.100.138:4000/api/graphql',
    cache: new InMemoryCache(),
  });
};
