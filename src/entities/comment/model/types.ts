export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export interface CreateCommentRequest {
  postId: number;
  name: string;
  email: string;
  body: string;
}

export interface UpdateCommentRequest {
  id: number;
  postId?: number;
  name?: string;
  email?: string;
  body?: string;
}

export type CommentId = Comment['id'];
export type PostId = Comment['postId'];
