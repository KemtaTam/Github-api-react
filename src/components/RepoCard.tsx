import { useEffect, useState } from "react";
import { useActions } from "../hooks/actions";
import { useAppSelector } from "../hooks/redux";
import { IRepo } from "../models/models";

export const RepoCard = ({ repo }: { repo: IRepo }) => {
	const { addFavourite } = useActions();
	const { favourites } = useAppSelector((state) => state.github);
	const [isFavourite, setIsFavourite] = useState(false);
	const { removeFavourite } = useActions();

	useEffect(() => {
		setIsFavourite(!favourites.find((repoFav) => repo.id === repoFav.id) ? false : true);
	}, [favourites, repo.id]);

	const addToFavourite = () => {
		addFavourite(repo);
	};

	const removeFromFavourite = (id: number) => {
		removeFavourite(id);
	};

	return (
		<div className="border py-3 px-5 rounded mb-2 hover:shadow-md hover:bg-gray-100 transition-all">
			<a href={repo.html_url} target="_blank" rel="noreferrer">
				<h2 className="text-lg font-bold cursor-pointer">{repo.full_name}</h2>
			</a>
			<p className="text-sm mb-2">
				Forks: <span className="font-bold mr-2">{repo.forks}</span>
				Watchers: <span className="font-bold">{repo.watchers}</span>
			</p>
			<p className="text-sm font-thin">{repo?.description}</p>
			{!isFavourite && (
				<button
					className="py-2 px-4 bg-yellow-400 rounded hover:shadow-md transition-all"
					onClick={addToFavourite}>
					Add
				</button>
			)}
			{isFavourite && (
				<button
					className="py-1 px-3 bg-red-400 rounded hover:shadow-md transition-all"
					onClick={() => removeFromFavourite(repo.id)}>
					Remove
				</button>
			)}
		</div>
	);
};
