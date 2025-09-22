export interface Photo {
  id: number;
  albumId: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface CreatePhotoRequest {
  albumId: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface UpdatePhotoRequest {
  id: number;
  albumId?: number;
  title?: string;
  url?: string;
  thumbnailUrl?: string;
}

export type PhotoId = Photo['id'];
export type AlbumId = Photo['albumId'];
