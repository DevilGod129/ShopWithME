import { useParams, Link } from 'react-router-dom';
import useFetchJson from '../hooks/useFetchJson';

export default function ProductDetail() {
  const { slug } = useParams();
  const { data: data1, loading: loading1, error: error1 } = useFetchJson('/data/data01.json');
  const { data: data2, loading: loading2, error: error2 } = useFetchJson('/data/data002.json');

  if (loading1 || loading2) return <p className="text-center mt-8">Loading...</p>;
  if (error1 || error2)
    return <p className="text-center text-red-500 mt-8">Error loading product data.</p>;

  const slugify = (name: string) =>
    name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9\-]/g, '');

  const products1 = Array.isArray(data1) ? data1.map((p) => ({ ...p, slug: slugify(p.name) })) : [];
  const products2 =
    data2 && typeof data2 === 'object' && !Array.isArray(data2)
      ? Object.values(data2).map((p: any) => ({ ...p, slug: slugify(p.name) }))
      : [];

  const combinedProducts = [...products1, ...products2];

  const product = combinedProducts.find((p) => p.slug === slug);
  if (!product) return <p className="text-center mt-8">Product not found.</p>;

  let mainImage = '/placeholder.jpg';
  if (product.imageURL) {
    mainImage = product.imageURL;
  } else if (typeof product.images === 'string') {
    mainImage = product.images.split(' | ')[0];
  }
  // Test codee:
  console.log('Loaded product:', product);
  console.log('ImageURL:', product.imageURL);
  console.log('Images:', product.images);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <img src={mainImage} alt={product.name} className="w-full max-h-96 object-contain mb-4" />
      <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
      <h2 className="text-lg text-gray-500 mb-2 italic">{product.sub_title}</h2>
      <p className="text-gray-600">
        {product.brand} | {product.color}
      </p>
      <p className="text-green-600 font-bold text-xl mt-2">${product.price}</p>
      <p className="mt-2">
        Available Sizes:{' '}
        {Array.isArray(product.available_sizes)
          ? product.available_sizes.join(', ')
          : product.available_sizes}
      </p>
      <Link to="/" className="text-blue-500 hover:underline mt-4 inline-block">
        ← Back to Products
      </Link>
    </div>
  );
}
