export default function FilterPanel({
  filters,
  setFilters,
  availableBrands,
  availableColors,
}: {
  filters: { brand: string; color: string };
  setFilters: (filters: any) => void;
  availableBrands: string[];
  availableColors: string[];
}) {
  return (
    <div className="w-64 p-4 bg-gray-100 rounded-lg">
      <h2 className="text-lg font-bold mb-2">Filter</h2>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Brand</label>
        <select
          value={filters.brand}
          onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
          className="w-full p-2 border rounded"
        >
          <option value="">All</option>
          {availableBrands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1 font-semibold">Color</label>
        <select
          value={filters.color}
          onChange={(e) => setFilters({ ...filters, color: e.target.value })}
          className="w-full p-2 border rounded"
        >
          <option value="">All</option>
          {availableColors.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
