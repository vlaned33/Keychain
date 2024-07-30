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
import { Post } from '../../src/types/post.types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, CommonActions } from '@react-navigation/native';

const HomeScreen: React.FC = () => {
  const { data, loading, error, refetch } = useQuery(GET_POSTS);
  const navigation = useNavigation();

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
    deletePost({ variables: { where: { id } } })
      .then(() => {
        Toast.show({ type: 'success', text1: 'Post Deleted' });
        refetch();
      })
      .catch((error) => {
        Toast.show({ type: 'error', text1: 'Error', text2: error.message });
      });
  };

  const handleSavePost = async (
    title: string,
    content: string,
    authorName: string,
    authorId: string
  ) => {
    const contentDocument = [
      {
        type: 'paragraph',
        children: [{ text: content }],
      },
    ];

    if (currentPost) {
      await updatePost({
        variables: {
          where: { id: currentPost.id },
          data: {
            title,
            content: contentDocument,
            author: { connect: { id: authorId} },
          },
        },
      });
    } else {
      await createPost({
        variables: {
          data: {
            title,
            content: contentDocument,
            author: { connect: { id: authorId } },
          },
        },
      });
    }

    refetch();
    setModalVisible(false);
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('sessionToken');
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        })
      );
    } catch (error) {
      console.error('Error logging out:', error);
    }
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
      <View style={styles.btn}>
        <Button title='Logout' onPress={handleLogout} />
      </View>
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

  btn: {
    paddingTop: 20,
  },
});

export default HomeScreen;
