import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/Product_card/ProductCard';
import useFetchJson from '../hooks/useFetchJson';

export default function Home() {
  const { data, loading, error } = useFetchJson('/data/data01.json');
  const {
    data: extraData,
    loading: extraLoading,
    error: extraError,
  } = useFetchJson('/data/data002.json');

  // Normalize first data (array or empty array)
  const products1 = Array.isArray(data) ? data : [];

  // Normalize second data (object) into array
  const products2 =
    extraData && typeof extraData === 'object' && !Array.isArray(extraData)
      ? Object.values(extraData)
      : [];

  // Combine both product arrays
  const combinedProducts = [...products1, ...products2];

  // Filters state
  const [filters, setFilters] = useState({ brand: '', gender: '', category: '' });

  const slugify = (name: string) =>
    name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9\-]/g, '');

  // Extract unique filter options from combined products
  const uniqueBrands = Array.from(new Set(combinedProducts.map((p) => p.brand))).filter(Boolean);
  const uniqueGenders = Array.from(new Set(combinedProducts.map((p) => p.gender))).filter(Boolean);
  const uniqueCategories = Array.from(new Set(combinedProducts.map((p) => p.category))).filter(
    Boolean
  );

  // Filter products by brand, gender, category
  const filteredProducts = combinedProducts.filter((product) => {
    const brandMatch = !filters.brand || product.brand === filters.brand;
    const genderMatch = !filters.gender || product.gender === filters.gender;
    const categoryMatch = !filters.category || product.category === filters.category;
    return brandMatch && genderMatch && categoryMatch;
  });

  if (loading || extraLoading) return <p className="text-center mt-8">Loading...</p>;
  if (error || extraError)
    return <p className="text-center text-red-500 mt-8">Error loading data. Please try again.</p>;
  if (combinedProducts.length === 0) return <p className="text-center mt-8">No products found.</p>;

  return (
    <div className="p-6 flex flex-col lg:flex-row gap-6">
      {/* Filter Panel */}
      <div className="w-full lg:w-64 bg-gray-100 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Filter Products</h2>

        {/* Brand filter */}
        <div className="mb-4">
          <label className="block mb-1 font-medium" htmlFor="brand-filter">
            Brand
          </label>
          <select
            id="brand-filter"
            className="w-full p-2 border rounded"
            value={filters.brand}
            onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
          >
            <option value="">All Brands</option>
            {uniqueBrands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        {/* Gender filter */}
        <div className="mb-4">
          <label className="block mb-1 font-medium" htmlFor="gender-filter">
            Gender
          </label>
          <select
            id="gender-filter"
            className="w-full p-2 border rounded"
            value={filters.gender}
            onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
          >
            <option value="">All Genders</option>
            {uniqueGenders.map((gender) => (
              <option key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </select>
        </div>

        {/* Category filter */}
        <div>
          <label className="block mb-1 font-medium" htmlFor="category-filter">
            Category
          </label>
          <select
            id="category-filter"
            className="w-full p-2 border rounded"
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          >
            <option value="">All Categories</option>
            {uniqueCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold text-center mb-6">Featured Products</h1>
        {/* <ProductScroller products={filteredProducts.slice(0, 10)} /> */}
        {filteredProducts.length === 0 ? (
          <p className="text-center mt-8">No products match your filters.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product, idx) => (
              <Link
                to={`/product/${product.slug || slugify(product.name)}`}
                key={product.slug || `${product.id}-${idx}`}
                className="transition-transform transform hover:scale-105"
              >
                <ProductCard key={product.id} product={product} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
