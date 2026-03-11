import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/thunks/productThunks";

import ProductCard from "../components/ProductCard";

export default function ProductListPage () {
    const dispatch = useDispatch ();

const {
productList,
fetchState,
} = useSelector ((state) => state.product);

useEffect(() => {
    dispatch(fetchProducts());
}, [dispatch]);

if(fetchState === "FETCHING") {
    return <p>Loading products...</p>;
}
if(fetchState === "FAILED") {
    return <p>Failed to load products</p>
}

return (
    <div>
        <h1>Shop All Products</h1>

<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {productList.map((product) => (
            <ProductCard key= {product.id} product={product} />
        ))}



    </div>

    
    </div>
);


}