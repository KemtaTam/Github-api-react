import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { githubReducer } from "./github/github.slice";
import { githubApi } from "./github/github.api";

export const store = configureStore({
	reducer: {
		//в этом ключе будут хранится все необходимые данные, связанные с API
		[githubApi.reducerPath]: githubApi.reducer,
		github: githubReducer,
	},
	//добавляем middleware для работы с API?
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(githubApi.middleware),
});

//чтобы настроить refetchOnFocus
setupListeners(store.dispatch);

//чтобы типизировать store
export type RootState = ReturnType<typeof store.getState>
