import { gql } from '@apollo/client';

export const REGISTER_MUTATION = gql`
  mutation Register($name: String!, $email: String!, $password: String!) {
    createUser(data: { name: $name, email: $email, password: $password }) {
      id
      name
      email
      password {
        isSet
      }
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation AuthenticateUserWithPassword($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        sessionToken
      }
      ... on UserAuthenticationWithPasswordFailure {
        message
      }
    }
  }
`;

export const DELETE_MUTATION = gql`
  mutation DeletePost($where: PostWhereUniqueInput!) {
    deletePost(where: $where) {
      id
      title
      content {
        document
      }
      author {
        id
        name
      }
      tags {
        id
        name
      }
    }
  }
`;
