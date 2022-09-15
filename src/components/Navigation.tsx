import { NavLink } from "react-router-dom";

export const Navigation = () => {
	return (
		<nav className="flex justify-between items-center h-[50px] px-5 shadow-md bg-gray-500 text-white">
			<h3 className="font-bold">Github Search</h3>
			<ul className="flex">
				<li>
					<NavLink to={"/"} className="mr-2">
						HomePage
					</NavLink>
				</li>
				<li>
					<NavLink to={"/favourites"}>Favourites</NavLink>
				</li>
			</ul>
		</nav>
	);
};
