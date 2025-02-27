import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";

const CardProduct = ({ searchQuery, handleSearch }) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    getProducts();
  }, [currentPage, searchQuery]);

  const getProducts = async () => {
    try {
      const response = await axios.get(
        "https://react-be-theta.vercel.app/products"
      );
      let filteredProducts = response.data;

      if (searchQuery) {
        filteredProducts = filteredProducts.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      setProducts(filteredProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedProducts = products.slice(startIndex, endIndex);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="font-montserrat">
      <div className="mt-20 mb-8 flex justify-end">
        <p className="py-2 lg:px-0 mr-4 lg:mr-0">Search </p>
        <input
          type="text"
          placeholder="Search by product name..."
          className="border border-purple-400 p-2 rounded-md w-full lg:w-[30%]"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[2rem] max-w-sm mx-auto md:max-w-none md:mx-0 mt-4">
        {displayedProducts.map((product, index) => (
          <div key={product.uuid} className="shadow-xl">
            <div className="h-[15rem] mb-4 relative overflow-hidden group trasition">
              <div className="border border-purple-400 hover:border-purple-700 w-full h-full flex justify-center items-center rounded-xl">
                <div className="w-[25rem] mx-auto flex justify-center items-center">
                  <img
                    className="max-h-[10rem] max-w-[10rem] group-hover:scale-110 transition duration-300"
                    src={product.url}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-start items-center mb-2 px-4">
              <h1 className=" text-purple-700 font-semibold text-xl">
                {product.name}
              </h1>
              {/* Display the product name */}
            </div>
            <div className="flex justify-start items-center mb-4 px-4">
              <h1 className="text-black">
                Rp {product.price.toLocaleString()}
              </h1>
              {/* Display the product price */}
            </div>

            <Link
              to={`/products/detail/${product.uuid}`}
              className="text-white"
            >
              <div className="px-4">
                <div className="flex justify-center items-center mb-2 w-full border py-2 px-2 rounded-lg bg-purple-400 group trasition duration-300 hover:bg-purple-700">
                  Add to cart
                </div>
              </div>
            </Link>
            {/* Display the product price */}
          </div>
        ))}
      </div>
      <div className="py-5 mb-24">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default CardProduct;
