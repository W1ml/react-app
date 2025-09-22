export interface Album {
  id: number;
  userId: number;
  title: string;
}

export interface CreateAlbumRequest {
  userId: number;
  title: string;
}

export interface UpdateAlbumRequest {
  id: number;
  userId?: number;
  title?: string;
}

export type AlbumId = Album['id'];
export type UserId = Album['userId'];
