import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Post } from '../../../src/types/post.types';

interface PostItemProps {
  post: Post;
  onEdit?: (post: Post) => void;
  onDelete?: (id: string) => void;
}

const PostItem: React.FC<PostItemProps> = ({ post, onEdit, onDelete }) => {
  return (
    <View style={styles.postItem}>
      <Text style={styles.postTitle}>Title: {post.title}</Text>
      <View>
        {post.content.document.map((block, index) =>
          block.children.map((child, childIndex) => (
            <Text key={`${index}-${childIndex}`}>Content: {child.text}</Text>
          ))
        )}
      </View>
      <Text>Author: {post.author?.name}</Text>
      <View style={styles.buttonContainer}>
        {onEdit && <Button title='Update' onPress={() => onEdit(post)} />}
      </View>
      <View style={styles.buttonContainer}>
        {onDelete && (
          <Button title='Delete' onPress={() => onDelete(post.id)} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postItem: {
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  postTitle: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default PostItem;
