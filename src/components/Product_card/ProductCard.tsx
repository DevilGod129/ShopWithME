type Product = {
  name: string;
  brand: string;
  color: string;
  price: number;
  imageURL?: string;
  images?: string;
  available_sizes?: string;
  sub_title?: string;
};

export default function ProductCard({ product }: { product: Product }) {
  // Fallback image logic
  let mainImage = '/placeholder.jpg';
  if (product.imageURL) {
    mainImage = product.imageURL;
  } else if (typeof product.images === 'string') {
    mainImage = product.images.split(' | ')[0];
  }

  return (
    <div className="border rounded-2xl shadow-md overflow-hidden bg-white">
      <img
        src={mainImage}
        alt={product.name || 'Product Image'}
        className="w-full h-60 object-cover object-center"
      />

      <div className="p-4">
        <h2 className="text-xl font-semibold mb-1 truncate">{product.name}</h2>

        {product.sub_title && (
          <p className="text-sm italic text-gray-500 mb-1">{product.sub_title}</p>
        )}

        <p className="text-gray-600 text-sm">
          {product.brand}
          {product.color ? ` | ${product.color}` : ''}
        </p>

        <p className="text-green-600 font-bold mt-2 text-lg">${product.price}</p>

        {product.available_sizes && (
          <p className="text-sm text-gray-500 mt-1">Sizes: {product.available_sizes}</p>
        )}
      </div>
    </div>
  );
}
