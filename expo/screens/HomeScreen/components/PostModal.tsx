import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet } from 'react-native';
import { Post, Tag } from '../../../src/types/post.types';

interface PostModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (title: string, content: string, author: string, tags: Tag[]) => void;
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
  const [author, setAuthor] = useState('');
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content.document[0].children[0].text);
      setAuthor(post.author.name);
      setTags(post.tags);
    } else {
      setTitle('');
      setContent('');
      setAuthor('');
      setTags([]);
    }
  }, [post]);

  const handleSave = () => {
    onSave(title, content, author, tags);
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
          />
          <TextInput
            style={styles.input}
            placeholder='Author'
            value={author}
            onChangeText={setAuthor}
          />
          <TextInput
            style={styles.input}
            placeholder='Tags (comma separated)'
            value={tags.map((tag) => tag.name).join(', ')}
            onChangeText={(text) => {
              const tagNames = text.split(',').map((name) => name.trim());
              const updatedTags = tagNames.map((name) => {
                const existingTag = tags.find((tag) => tag.name === name);
                return existingTag ? existingTag : { id: '', name };
              });
              setTags(updatedTags);
            }}
          />
          <View style={styles.modalButtons}>
            <Button title='Save' onPress={handleSave} />
            <Button title='Cancel' onPress={onClose} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default PostModal;
