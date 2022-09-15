import { useEffect, useState } from "react";
import { RepoCard } from "../components/RepoCard";
import { useDebounce } from "../hooks/debounce";
import { useLazyGetUserReposQuery, useSearchUsersQuery } from "../store/github/github.api";

export const HomePage = () => {
	const [search, setSearch] = useState("");
	const [dropDown, setDropDown] = useState(false);
	const [dropDownRep, setDropDownRep] = useState(false);
	const debounced = useDebounce(search);

	const { isLoading, isError, data } = useSearchUsersQuery(debounced, {
		skip: debounced.length < 3, //при каких условиях запрос не будет отправлен
		refetchOnFocus: true, //чтобы при фокусе на странице запрос отправлялся снова
	});
	//первый элемент массива - функция, когда позволит загружать по запросу необходимые данные
	const [fetchRepos, { isLoading: isReposLoading, data: repos }] = useLazyGetUserReposQuery();

	useEffect(() => {
		setDropDown(debounced.length >= 3 && data?.length! > 0);
		setDropDownRep(debounced.length >= 3 && repos?.length! > 0);
	}, [debounced, data, repos]);

	const clickHandler = (login: string) => {
		fetchRepos(login);
		setDropDown(false);
	};

	const dataElemets = data?.map((user) => {
		return (
			<li
				key={user.id}
				className="py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer"
				onClick={() => clickHandler(user.login)}>
				{user.login}
			</li>
		);
	});
	const reposElements = repos?.map((repo) => {
		return (
			<li key={repo.id} className="py-2 px-4 transition-colors">
				<RepoCard repo={repo} />
			</li>
		);
	});

	return (
		<div className="flex justify-center pt-10 mx-auto h-screen w-screen">
			{isError && <div className="text-center text-red-600">Something went wrong...</div>}

			<div className="relative w-[560px]">
				<input
					className="border py-2 px-4 w-full h-[42px] mb-2"
					type="text"
					placeholder="Search for Github username..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>

				{dropDown && (
					<ul className="list-none absolute top-[42px] left-0 right-0 max-h-[200px] overflow-y-scroll shadow-md bg-white">
						{isLoading && <p className="text-center text-gray-600">Loading...</p>}
						{dataElemets}
					</ul>
				)}
				{dropDownRep && (
					<ul className="list-none absolute top-[42px] left-0 right-0 max-h-[400px] overflow-y-scroll shadow-md bg-white">
						{isReposLoading && <p className="text-center text-gray-600 ">Loading...</p>}
						{reposElements}
					</ul>
				)}
			</div>
		</div>
	);
};
