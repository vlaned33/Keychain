import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      title
      content {
        document
      }
      author {
        id
        name
      }
    }
  }
`;

export const GET_AUTHORS = gql`
  query RelationshipSelect($where: UserWhereInput!) {
    items: users(where: $where) {
      id
      name
    }
    count: usersCount(where: $where)
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost($data: PostCreateInput!) {
    createPost(data: $data) {
      id
      title
      content {
        document
      }
      author {
        id
        name
      }
    }
  }
`;

export const UPDATE_POST = gql`
  mutation UpdatePost($where: PostWhereUniqueInput!, $data: PostUpdateInput!) {
    updatePost(where: $where, data: $data) {
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

export const DELETE_POST = gql`
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
