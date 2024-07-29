import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Post, Tag } from '../../../src/types/post.types';

interface PostItemProps {
  post: Post;
  onEdit: (post: Post) => void;
  onDelete: (id: string) => void;
}

const PostItem: React.FC<PostItemProps> = ({ post, onEdit, onDelete }) => {
  return (
    <View style={styles.postItem}>
      <Text style={styles.postTitle}>{post.title}</Text>
      <View>
        {post.content.document.map((block, index) =>
          block.children.map((child, childIndex) => (
            <Text key={`${index}-${childIndex}`}>{child.text}</Text>
          ))
        )}
      </View>
      <Text>Author: {post.author.name}</Text>
      <Text>Tags: {post.tags.map((tag: Tag) => tag.name).join(', ')}</Text>
      <View style={styles.buttonContainer}>
        <Button title='Update' onPress={() => onEdit(post)} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title='Delete' onPress={() => onDelete(post.id)} />
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
  },
});

export default PostItem;
