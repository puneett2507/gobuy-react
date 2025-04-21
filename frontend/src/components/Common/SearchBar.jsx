import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";

const SearchBar = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [isOpen, setIsOpen] = useState(false);

	const handleSearchIcon = () => {
		setIsOpen(!isOpen);
	};

	const handleSearch = (e) => {
		e.preventDefault();
		console.log(searchTerm);
		setIsOpen(false);
	};

	return (
		<div className="">
			{isOpen ? (
				<form
					onSubmit={handleSearch}
					className="relative flex items-center justify-center w-full"
				>
					<div className="relative full">
						<input
							type="text"
							placeholder="Search"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="bg-gray-100 px-4 py-1 pl-2 pr-12 rounded-lg w-full focus:outline-none placeholder:text-gray-700"
						/>
						<button
							type="submit"
							className="absolute top-1 right-2 text-gray-500 hover:text-gray-800  cursor-pointer"
						>
							<IoSearchOutline className="h-6 w-6 " />
						</button>
					</div>
					<button onClick={handleSearchIcon}>
						<IoCloseOutline className="h-6 w-6 cursor-pointer" />
					</button>
				</form>
			) : (
				<button onClick={handleSearchIcon}>
					<IoSearchOutline className="h-6 w-6 text-gray-700 cursor-pointer" />
				</button>
			)}
		</div>
	);
};

export default SearchBar;
