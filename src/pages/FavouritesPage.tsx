import { useActions } from "../hooks/actions";
import { useAppSelector } from "../hooks/redux";

export const FavouritesPage = () => {
	const { favourites } = useAppSelector((state) => state.github);
	const { removeFavourite } = useActions();

	if (!favourites.length) return <p className="text-center">No items</p>;

	const removeFromFavourite = (id: number) => {
		removeFavourite(id);
	};

	return (
		<ul className="mt-4 ml-6 list-decimal">
			{favourites.map((repo) => {
				console.log(repo.name);
				return (
					<li className="mb-2" key={repo.id}>
						<span className="font-bold mr-2">
							{repo.name} ({repo.owner.login}):
						</span>
						<a
							className="text-cyan-500"
							href={repo.html_url}
							target="_blank"
							rel="noreferrer">
							{repo.html_url}
						</a>
						<button
							className="ml-3 py-1 px-3 bg-red-400 rounded hover:shadow-md transition-all"
							onClick={() => removeFromFavourite(repo.id)}>
							Remove
						</button>
					</li>
				);
			})}
		</ul>
	);
};
