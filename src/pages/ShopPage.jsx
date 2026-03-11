import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../store/thunks/productThunks";
import {
  setCategoryId,
  setSort,
  setFilter,
  setOffset, setLimit
} from "../store/actions/productActions";

import ProductCard from "../components/ProductCard";

export default function ShopPage() {
  const dispatch = useDispatch();
  const { gender, categoryName, categoryId } = useParams();

  const productState = useSelector((state) => state.product);

  const {
    productList,
    listFetchState,
    sort,
    filter,
    limit,
    offset,
    total,
  } = productState;

  const categories = useSelector(
    (state) => state.category.categories
  );

  // Kategori değişince store’a yaz
  useEffect(() => {
    dispatch(setCategoryId(categoryId || null));
  }, [categoryId, dispatch]);

  // Fetch
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch, categoryId, sort, filter, offset, limit]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [offset, limit]);

  // Gender filtre
  const genderCategoryIds = gender
    ? (categories || [])
        .filter((cat) => cat.gender === gender)
        .map((cat) => cat.id)
    : [];

  let filteredProducts = productList;

  if (!categoryId && gender && genderCategoryIds.length > 0) {
    filteredProducts = productList.filter((product) =>
      genderCategoryIds.includes(product.category?.id)
    );
  }

  // Pagination hesapları
  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.floor(offset / limit) + 1;

  const handlePageChange = (pageNumber) => {
    const newOffset = (pageNumber - 1) * limit;
    dispatch(setOffset(newOffset));
  };

  return (
    <section className="flex flex-col gap-6 px-4 py-6">

      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold">
          {categoryName ? categoryName : "Shop"}
        </h1>

        <p className="text-gray-500 text-sm">
          {categoryId
            ? `${gender} - Category ID: ${categoryId}`
            : gender
            ? `${gender} products`
            : "All products"}
        </p>
      </div>

      {/* Sort & Filter */}
      <div className="flex gap-4 items-center">
        <select
          value={sort}
          onChange={(e) => dispatch(setSort(e.target.value))}
          className="border p-2"
        >
          <option value="">Sort</option>
          <option value="price:asc">Price: Low to High</option>
          <option value="price:desc">Price: High to Low</option>
          <option value="rating:asc">Rating: Low to High</option>
          <option value="rating:desc">Rating: High to Low</option>
        </select>

        <select
  value={limit}
  onChange={(e) => dispatch(setLimit(Number(e.target.value)))}
  className="border p-2"
>
  <option value={25}>25</option>
  <option value={50}>50</option>
  <option value={100}>100</option>
</select>


        <input
          type="text"
          placeholder="Search product..."
          value={filter}
          onChange={(e) => dispatch(setFilter(e.target.value))}
          className="border p-2"
        />
      </div>

      {/* Loading */}
      {listFetchState === "FETCHING" && (<p>Loading...</p>)}

      {/* Error */}
      {listFetchState === "FAILED" && (
        <p className="text-red-500">Failed to load products.</p>
      )}

      {/* No Products */}
      {listFetchState === "FETCHED" && filteredProducts.length === 0 && (
        <p>No products found in this category.</p>
      )}

      {/* Product Grid */}
      {listFetchState === "FETCHED" && filteredProducts.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              
              {/* Prev */}
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-3 py-1 border rounded disabled:opacity-40"
              >
                Prev
              </button>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, index) => {
                const pageNumber = index + 1;

                return (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`px-3 py-1 border rounded ${
                      currentPage === pageNumber
                        ? "bg-black text-white"
                        : ""
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}

              {/* Next */}
              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-3 py-1 border rounded disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}

