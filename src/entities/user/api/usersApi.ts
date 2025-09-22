import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { User, CreateUserRequest, UpdateUserRequest } from '../model/types';

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
    tagTypes: ['Users', 'User'],
    endpoints: (builder) => ({
        getUsers: builder.query<User[], void>({
            query: () => 'users',
            providesTags: (result) =>
                result
                    ? [
                        ...result.map((user) => ({ type: 'User' as const, id: user.id })),
                        { type: 'Users' as const, id: 'LIST' },
                    ]
                    : [{ type: 'Users' as const, id: 'LIST' }],
        }),
        getUserById: builder.query<User, number>({
            query: (id) => `users/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'User', id }],
        }),
    }),
});

export const { useGetUsersQuery, useGetUserByIdQuery } = usersApi;


