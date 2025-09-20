import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Photo } from '../PhotoTypes';

export const photosApi = createApi({
    reducerPath: 'photosApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
    tagTypes: ['Photos', 'AlbumPhotos'],
    endpoints: (builder) => ({
        getPhotosByAlbum: builder.query<Photo[], number>({
            query: (albumId) => `photos?albumId=${albumId}`,
            providesTags: (result, _error, albumId) =>
                result
                    ? [
                        ...result.map((photo) => ({ type: 'Photos' as const, id: photo.id })),
                        { type: 'AlbumPhotos' as const, id: albumId },
                    ]
                    : [{ type: 'AlbumPhotos' as const, id: albumId }],
        }),
    }),
});

export const { useGetPhotosByAlbumQuery } = photosApi;


