import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";

const ProductList = ({ searchQuery, handleSearch }) => {
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
      console.log(response.data);

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

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(
        `https://react-be-theta.vercel.app/products/${productId}`
      );
      getProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="font-montserrat">
      <div className="mb-4 grid lg-cols-1 md:grid-cols-2 justify-start mt-10">
        <div>
          <Link
            to="/admin/products/add"
            className="py-2 px-2 text-white rounded-lg bg-purple-300 hover:bg-purple-700"
          >
            Add New
          </Link>
        </div>
        <div className="flex">
          <div className="">
            <p className="py-2 lg:px-0 mr-4 lg:mr-0">Search </p>
          </div>
          <div className="w-full">
            <input
              type="text"
              placeholder="Search by product name..."
              className="border border-purple-400 p-2 rounded-md w-full"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>
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
            <div className="px-4">
              <div className="flex justify-center items-center mb-2 w-full group trasition duration-30 gap-2">
                <Link
                  to={`/admin/products/edit/${product.uuid}`}
                  className="w-full button is-small is-info py-2 rounded-lg"
                >
                  Edit{" "}
                </Link>
                <button
                  onClick={() => {
                    if (
                      window.confirm(
                        "Apakah Anda yakin ingin menghapus produk ini?"
                      )
                    ) {
                      deleteProduct(product.uuid);
                    }
                  }}
                  className="w-full button is-small is-danger py-2 rounded-lg"
                >
                  Delete
                </button>
                {/* Display the product price */}
              </div>
            </div>
            <div className="px-4">
              <Link
                to={`/admin/variasi/${product.uuid}`}
                className="w-full button is-small is-success py-2 rounded-lg"
              >
                + Variasi{" "}
              </Link>
            </div>
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

export default ProductList;

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const ProductList = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     getProducts();
//   }, []);

//   const getProducts = async () => {
//     const response = await axios.get("https://react-be-theta.vercel.app/products");
//     setProducts(response.data);
//     console.log(response.data);
//   };

// const deleteProduct = async (productId) => {
//   await axios.delete(`https://react-be-theta.vercel.app/products/${productId}`);
//   getProducts();
// };

//   return (
//     <div>
//       <h1 className="title mt-4">Products</h1>
//       {/* <h2 className="subtitle">List of Products</h2>
//       <Link to="/admin/products/add" className="button is-primary mb-2">
//         Add New
//       </Link>
//       <table className="table is-striped is-fullwidth">
//         <thead>
//           <tr>
//             <th>No</th>
//             <th>Product Name</th>
//             <th>Price</th>
//             <th>Created By</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map((product, index) => (
//             <tr key={product.uuid}>
//               <td>{index + 1}</td>
//               <td>{product.name}</td>
//               <td>{product.price}</td>
//               <td>{product.user.name}</td>
//               <td>
//                 <Link
//                   to={`/admin/products/edit/${product.uuid}`}
//                   className="button is-small is-info"
//                 >
//                   Edit
//                 </Link>
//                 <button
//                   onClick={() => deleteProduct(product.uuid)}
//                   className="button is-small is-danger"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table> */}
//     </div>
//   );
// };

// export default ProductList;
