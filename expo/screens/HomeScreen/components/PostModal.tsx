import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  Modal,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import { Post, Tag } from '../../../src/types/post.types';
import { GET_AUTHORS } from '../../../src/api/mutations/postApi';
import { useLazyQuery } from '@apollo/client';
import { styles } from './PostModal.styles';

interface PostModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (
    title: string,
    content: string,
    authorName: string,
    authorId: string
  ) => void;
  post?: Post | null;
}

const PostModal: React.FC<PostModalProps> = ({
  visible,
  onClose,
  onSave,
  post,
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [isUserModalVisible, setIsUserModalVisible] = useState(false);

  const [fetchAuthors, { loading, data, error }] = useLazyQuery(GET_AUTHORS);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content.document[0].children[0].text);
      setAuthorName(post.author.name);
    } else {
      setTitle('');
      setContent('');
      setAuthorName('');
    }
  }, [post]);

  const handleSave = () => {
    onSave(title, content, authorName, authorId);
  };

  const handleSelectAuthor = (authorId: string, authorName: string) => {
    setAuthorName(authorName);
    setAuthorId(authorId);
    setIsUserModalVisible(false);
  };

  const handleOpenUserModal = () => {
    fetchAuthors({ variables: { where: { OR: [] } } });
    setIsUserModalVisible(true);
  };

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            {post ? 'Edit Post' : 'Create Post'}
          </Text>
          <TextInput
            style={styles.input}
            placeholder='Title'
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.input}
            placeholder='Content'
            value={content}
            onChangeText={setContent}
            multiline
            numberOfLines={4}
          />
          <TouchableOpacity onPress={handleOpenUserModal}>
            <View style={styles.authorButton}>
              <Text>{authorName || 'Select Author'}</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.modalButtons}>
            <Button title='Save' onPress={handleSave} />
            <Button title='Cancel' onPress={onClose} />
          </View>
        </View>
      </View>

      <Modal
        animationType='slide'
        transparent={true}
        visible={isUserModalVisible}
        onRequestClose={() => setIsUserModalVisible(false)}
      >
        <View style={styles.userModalContainer}>
          <View style={styles.userModalContent}>
            <Text style={styles.modalTitle}>Select Author</Text>
            {loading ? (
              <ActivityIndicator size='large' color='#0000ff' />
            ) : error ? (
              <Text>Error: {error.message}</Text>
            ) : (
              <FlatList
                data={data?.items || []}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => handleSelectAuthor(item.id, item.name)}
                  >
                    <View style={styles.userItem}>
                      <Text>{item.name}</Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            )}
            <Button
              title='Close'
              onPress={() => setIsUserModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </Modal>
  );
};

export default PostModal;
