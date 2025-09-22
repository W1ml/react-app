import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import type { Post } from '../../PostTypes';

const postsAdapter = createEntityAdapter<Post>({
    sortComparer: (a: Post, b: Post) => a.title.localeCompare(b.title),
});

const initialState = postsAdapter.getInitialState();

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        upsertManyPosts: postsAdapter.upsertMany,
        upsertOnePost: postsAdapter.upsertOne,
        removePost: postsAdapter.removeOne,
        clearPosts: postsAdapter.removeAll,
    },
});

export const postReducer = postSlice.reducer;
export const { upsertManyPosts, upsertOnePost, removePost, clearPosts } = postSlice.actions;
export const postsSelectors = postsAdapter.getSelectors(
    (state: { post: ReturnType<typeof postReducer> }) => state.post
);


