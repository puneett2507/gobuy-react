import { AiOutlineDelete } from "react-icons/ai";

const CartContents = () => {
	const cartProducts = [
		{
			productId: 1,
			name: "T-shirt",
			size: "M",
			color: "Red",
			quantity: 1,
			price: 15,
			image: "https://picsum.photos/200?random=1",
		},
		{
			productId: 2,
			name: "Shirt",
			size: "L",
			color: "Blue",
			quantity: 1,
			price: 15,
			image: "https://picsum.photos/200?random=2",
		},
		{
			productId: 3,
			name: "T-shirt",
			size: "M",
			color: "Red",
			quantity: 1,
			price: 15,
			image: "https://picsum.photos/200?random=3",
		},
		{
			productId: 4,
			name: "T-shirt",
			size: "M",
			color: "Red",
			quantity: 1,
			price: 15,
			image: "https://picsum.photos/200?random=4",
		},
		{
			productId: 5,
			name: "T-shirt",
			size: "M",
			color: "Red",
			quantity: 1,
			price: 15,
			image: "https://picsum.photos/200?random=5",
		},
	];

	return (
		<div>
			{cartProducts.map((product, index) => (
				<div
					key={index}
					className="flex items-start justify-between py-4 border-b "
				>
					<div className="flex items-start">
						<img
							src={product.image}
							alt={product.name}
							className="w-20 h-24 rounded object-cover mr-4"
						/>
						<div>
							<h3>{product.name}</h3>
							<p className="text-sm text-gray-500">
								Size: {product.size} | Color: {product.color}
							</p>
							{/* quantity buttons */}
							<div className="flex items-center mt-2">
								<button className="border rounded text-base font-medium px-2 py-1">
									-
								</button>
								<span className="mx-4">{product.quantity}</span>
								<button className="border rounded text-base font-medium px-2 py-1">
									+
								</button>
							</div>
						</div>
					</div>
					{/* price */}
					<div>
						<p className="font-medium">${product.price}</p>
						<AiOutlineDelete className="h-6 w-6 mt-2 text-red-600 cursor-pointer" />
					</div>
				</div>
			))}
		</div>
	);
};

export default CartContents;
