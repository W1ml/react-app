import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Comment } from '../CommentTypes';

export const commentsApi = createApi({
    reducerPath: 'commentsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
    tagTypes: ['Comments', 'PostComments'],
    endpoints: (builder) => ({
        getCommentsByPost: builder.query<Comment[], number>({
            query: (postId) => `posts/${postId}/comments`,
            providesTags: (result, _error, postId) =>
                result
                    ? [
                        ...result.map((comment) => ({ type: 'Comments' as const, id: comment.id })),
                        { type: 'PostComments' as const, id: postId },
                    ]
                    : [{ type: 'PostComments' as const, id: postId }],
        }),
    }),
});

export const { useGetCommentsByPostQuery } = commentsApi;


