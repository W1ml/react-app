import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Todo } from '../TodoTypes';

export const todosApi = createApi({
    reducerPath: 'todosApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
    tagTypes: ['Todos', 'UserTodos'],
    endpoints: (builder) => ({
        getTodosByUser: builder.query<Todo[], number>({
            query: (userId) => `todos?userId=${userId}`,
            providesTags: (result, _error, userId) =>
                result
                    ? [
                        ...result.map((todo) => ({ type: 'Todos' as const, id: todo.id })),
                        { type: 'UserTodos' as const, id: userId },
                    ]
                    : [{ type: 'UserTodos' as const, id: userId }],
        }),
    }),
});

export const { useGetTodosByUserQuery } = todosApi;


