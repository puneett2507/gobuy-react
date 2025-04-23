const seletedProduct = {
	name: "Stylish Jacket",
	price: 120,
	originalPrice: 150,
	description:
		"Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima asperiores ea corrupti animi accusamus excepturi eaque illum sunt voluptas expedita, minus perspiciatis, odio pariatur vero consequatur saepe, laboriosam architecto voluptatum.",
	brand: "Levis",
	material: "Leather",
	sizes: ["S", "M", "L", "XL"],
	colors: ["Red", "Black"],
	images: [
		{
			url: "https://picsum.photos/500/500?random=1",
			altText: "Stylish Jacket 1",
		},
		{
			url: "https://picsum.photos/500/500?random=2",
			altText: "Stylish Jacket 2",
		},
	],
};

const ProductDetails = () => {
	return (
		<div className="p-6">
			<div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
				<div className="flex flex-col md:flex-row">
					{/* product thumbnails */}
					<div className="flex flex-col space-y-4 mr-6">
						{seletedProduct.images.map((image, index) => (
							<img
								key={index}
								src={image.url}
								alt={image.altText}
								className="h-20 w-20 object-cover rounded-lg cursor-pointer"
							/>
						))}
					</div>

					{/* main image */}
					<div className="w-1/2">
						<div className="mb-4">
							<img
								src={seletedProduct.images[0]?.url}
								alt="Product Thumbnail"
								className="w-full h-auto object-cover rounded-lg "
							/>
						</div>
					</div>

					{/* product details */}
					<div className="w-1/2 ml-10">
						{/* product name */}
						<h1 className="text-2xl font-semibold mb-2">
							{seletedProduct.name}
						</h1>

						{/* product price */}
						<div className="flex items-baseline gap-2">
							<p className="text-xl text-gray-700 mb-2">
								${seletedProduct.price}
							</p>
							<p className="text-sm text-gray-600 mb-1 line-through">
								{seletedProduct.originalPrice &&
									`$${seletedProduct.originalPrice}`}
							</p>
						</div>

						{/* product description */}
						<p className="text-black mb-4">{seletedProduct.description}</p>

						{/* product colors */}
						<div className="mb-4">
							<p className="text-black font-medium mb-2">Colors:</p>
							<div className="flex gap-2 ">
								{seletedProduct.colors.map((color) => (
									<div>{color}</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetails;
