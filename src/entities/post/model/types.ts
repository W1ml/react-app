export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface CreatePostRequest {
  title: string;
  body: string;
  userId: number;
}

export interface UpdatePostRequest {
  id: number;
  title?: string;
  body?: string;
  userId?: number;
}

export type PostId = Post['id'];
