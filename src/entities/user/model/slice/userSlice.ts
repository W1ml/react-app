import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import type { User } from '../../UserTypes';

const usersAdapter = createEntityAdapter<User>({
    sortComparer: (a: User, b: User) => a.name.localeCompare(b.name),
});

const initialState = usersAdapter.getInitialState();

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        upsertManyUsers: usersAdapter.upsertMany,
        upsertOneUser: usersAdapter.upsertOne,
        removeUser: usersAdapter.removeOne,
        clearUsers: usersAdapter.removeAll,
    },
});

export const userReducer = userSlice.reducer;
export const { upsertManyUsers, upsertOneUser, removeUser, clearUsers } = userSlice.actions;
export const usersSelectors = usersAdapter.getSelectors(
    (state: { user: ReturnType<typeof userReducer> }) => state.user
);


