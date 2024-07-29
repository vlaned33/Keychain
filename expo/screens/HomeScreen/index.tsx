import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { useQuery, useMutation } from '@apollo/client';
import {
  GET_POSTS,
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
} from '../../src/api/mutations/postApi';
import Toast from 'react-native-toast-message';
import PostItem from './components/PostItem';
import PostModal from './components/PostModal';
import { Post, Tag } from '../../src/types/post.types';

const HomeScreen: React.FC = () => {
  const { data, loading, error, refetch } = useQuery(GET_POSTS);

  const [createPost] = useMutation(CREATE_POST, {
    onCompleted: () => {
      Toast.show({ type: 'success', text1: 'Post Created' });
      refetch();
      setModalVisible(false);
    },
    onError: (err) => {
      Toast.show({ type: 'error', text1: 'Error', text2: err.message });
    },
  });

  const [updatePost] = useMutation(UPDATE_POST, {
    onCompleted: () => {
      Toast.show({ type: 'success', text1: 'Post Updated' });
      refetch();
      setModalVisible(false);
    },
    onError: (err) => {
      Toast.show({ type: 'error', text1: 'Error', text2: err.message });
    },
  });

  const [deletePost] = useMutation(DELETE_POST, {
    onCompleted: () => {
      Toast.show({ type: 'success', text1: 'Post Deleted' });
      refetch();
    },
    onError: (err) => {
      Toast.show({ type: 'error', text1: 'Error', text2: err.message });
    },
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [currentPost, setCurrentPost] = useState<Post | null>(null);

  const handleCreatePost = () => {
    setCurrentPost(null);
    setModalVisible(true);
  };

  const handleEditPost = (post: Post) => {
    setCurrentPost(post);
    setModalVisible(true);
  };

  const handleDeletePost = (id: string) => {
    deletePost({ variables: { id } });
  };

  const handleSavePost = async (
    title: string,
    content: string,
    author: string,
    tags: Tag[]
  ) => {
    if (currentPost) {
      await updatePost();
    } else {
      await createPost({
        variables: {
          data: {
            title,
            content: { document: content },
            author: { connect: { id: author } },
            tags: { connect: tags.map((tag) => ({ id: tag.id })) },
          },
        },
      });
      Toast.show({ type: 'success', text1: 'Post Created' });
    }
    refetch();
    setModalVisible(false);
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Posts</Text>
      <FlatList
        data={data.posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PostItem
            post={item}
            onEdit={handleEditPost}
            onDelete={handleDeletePost}
          />
        )}
      />
      <Button title='Create Post' onPress={handleCreatePost} />
      <PostModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSavePost}
        post={currentPost}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default HomeScreen;
