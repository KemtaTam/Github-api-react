import { IRepo } from './../../models/models';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const FAV = "fav";

interface GithubState {
	favourites: Array<IRepo>;
}
const initialState: GithubState = {
	//если ничего нет, то пустая строка
	favourites: JSON.parse(localStorage.getItem(FAV) ?? "[]"), //вернуть localStorage.getItem(FAV) if он !== null | indefined
};

//слайс тот же самый редьюсер
export const githubSlice = createSlice({
	name: "github",
	initialState,
	reducers: {
		addFavourite(state, action: PayloadAction<IRepo>) {
			state.favourites.push(action.payload);
			localStorage.setItem(FAV, JSON.stringify(state.favourites)); //чтобы привести к строке
		},
		removeFavourite(state, action: PayloadAction<number>) {
			state.favourites = state.favourites.filter((repo) => repo.id !== action.payload);
			localStorage.setItem(FAV, JSON.stringify(state.favourites));
		},
	},
});

export const githubActions = githubSlice.actions;
export const githubReducer = githubSlice.reducer;
