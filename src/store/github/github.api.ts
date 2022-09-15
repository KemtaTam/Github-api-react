import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser, ServerResponse, IRepo } from "./../../models/models";

export const githubApi = createApi({
	reducerPath: "github/api",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://api.github.com/",
	}),
	refetchOnFocus: true,
	endpoints: (build) => ({
		searchUsers: build.query<IUser[], string>({
			//searchUsers - название эндпоинта
			query: (search: string) => ({
				url: "search/users",
				params: {
					//параметры запроса
					q: search, //users?q=KemtaTam
					per_page: 10, //количество элементов на странице
				},
			}),
			//колбек, с помощью которого можно преобразовать данные, полученные с сервера
			transformResponse: (response: ServerResponse<IUser>) => response.items,
		}),
		getUserRepos: build.query<IRepo[], string>({
			query: (login: string) => ({
				url: `users/${login}/repos`,
			}),
		}),
	}),
});

export const { useSearchUsersQuery, useLazyGetUserReposQuery } = githubApi;
// lazy говорит о том, что мы можем сделать get запрос когда захотим
