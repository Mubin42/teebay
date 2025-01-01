import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import createProductSlice from '@/store/slices/createProductSlice';

export const store = configureStore({
	reducer: {
		product: createProductSlice,
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(),

	devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

store.subscribe(() => {});

setupListeners(store.dispatch);
