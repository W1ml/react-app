import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Post, CreatePostRequest, UpdatePostRequest } from '../model/types';

export const postsApi = createApi({
    reducerPath: 'postsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
    tagTypes: ['Posts', 'Post', 'UserPosts'],
    endpoints: (builder) => ({
        getPosts: builder.query<Post[], void>({
            query: () => 'posts',
            providesTags: (result) =>
                result
                    ? [
                        ...result.map((post) => ({ type: 'Post' as const, id: post.id })),
                        { type: 'Posts' as const, id: 'LIST' },
                    ]
                    : [{ type: 'Posts' as const, id: 'LIST' }],
        }),
        getPostsByUser: builder.query<Post[], number>({
            query: (userId) => `posts?userId=${userId}`,
            providesTags: (result, _error, userId) =>
                result
                    ? [
                        ...result.map((post) => ({ type: 'Post' as const, id: post.id })),
                        { type: 'UserPosts' as const, id: userId },
                    ]
                    : [{ type: 'UserPosts' as const, id: userId }],
        }),
        getPostById: builder.query<Post, number>({
            query: (postId) => `posts/${postId}`,
            providesTags: (_result, _error, id) => [{ type: 'Post', id }],
        }),
        createPost: builder.mutation<Post, CreatePostRequest>({
            query: (newPost) => ({
                url: 'posts',
                method: 'POST',
                body: newPost,
            }),
            invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
        }),
        updatePost: builder.mutation<Post, UpdatePostRequest>({
            query: ({ id, ...patch }) => ({
                url: `posts/${id}`,
                method: 'PATCH',
                body: patch,
            }),
            invalidatesTags: (_result, _error, { id }) => [{ type: 'Post', id }],
        }),
        deletePost: builder.mutation<void, number>({
            query: (id) => ({
                url: `posts/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (_result, _error, id) => [{ type: 'Post', id }],
        }),
    }),
});

export const { 
    useGetPostsQuery, 
    useGetPostsByUserQuery, 
    useGetPostByIdQuery,
    useCreatePostMutation,
    useUpdatePostMutation,
    useDeletePostMutation
} = postsApi;


