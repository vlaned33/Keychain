export interface Child {
  text: string;
}

export interface Block {
  type: string;
  children: Child[];
}

export interface Content {
  document: Block[];
}

export interface Tag {
  id: string;
  name: string;
}

export interface Post {
  id: string;
  title: string;
  content: Content;
  author: {
    id: string;
    name: string;
  };
  tags: Tag[];
}
