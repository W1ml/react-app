import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Album } from '../AlbumTypes';

export const albumsApi = createApi({
    reducerPath: 'albumsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
    tagTypes: ['Albums', 'UserAlbums', 'Album'],
    endpoints: (builder) => ({
        getAlbumsByUser: builder.query<Album[], number>({
            query: (userId) => `albums?userId=${userId}`,
            providesTags: (result, _error, userId) =>
                result
                    ? [
                        ...result.map((album) => ({ type: 'Albums' as const, id: album.id })),
                        { type: 'UserAlbums' as const, id: userId },
                    ]
                    : [{ type: 'UserAlbums' as const, id: userId }],
        }),
        getAlbumById: builder.query<Album, number>({
            query: (id) => `albums/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'Album', id }],
        }),
    }),
});

export const { useGetAlbumsByUserQuery, useGetAlbumByIdQuery } = albumsApi;


