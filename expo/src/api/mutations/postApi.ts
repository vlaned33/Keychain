import { gql } from '@apollo/client';

// Queries
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
      tags {
        id
        name
      }
    }
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
      tags {
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
        name
      }
      tags {
        name
      }
    }
  }
`;

export const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`;
