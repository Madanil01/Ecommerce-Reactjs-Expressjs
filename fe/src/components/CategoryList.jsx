import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Categorylist = ({ updateCategoryList, setUpdateCategoryList }) => {
  const [category, setCategory] = useState([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [hasUpdated, setHasUpdated] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (isInitialLoad || updateCategoryList) {
      getCategory();
      setIsInitialLoad(false);
      setHasUpdated(true); // Set hasUpdated ke true setelah pembaruan pertama kali
    }

    // Hanya panggil getCategory jika hasUpdated true
    if (hasUpdated) {
      getCategory();
    }
  }, [updateCategoryList]);

  const getCategory = async () => {
    const response = await axios.get(
      "https://react-be-theta.vercel.app/category"
    );
    setCategory(response.data);
  };

  const deleteCategory = async (categoryId) => {
    await axios.delete(
      `https://react-be-theta.vercel.app/category/${categoryId}`
    );
    setUpdateCategoryList(!updateCategoryList); // Memperbarui updateCategoryList
  };

  return (
    <div className="md:w-[50%] font-montserrat">
      <h2 className="text-xl font-semibold mt-10 mb-4">List of Categories</h2>
      <Link
        to="/admin/category/add"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
      >
        Add New
      </Link>
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full table-auto bg-white">
          <thead>
            <tr>
              <th className="border px-4 py-2">No</th>
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {category.map((category, index) => (
              <tr key={category.uuid}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{category.name}</td>
                <td className="border px-4 py-2">
                  <Link
                    to={`/admin/users/category/${category.uuid}`}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          "Apakah Anda yakin ingin menghapus category ini?"
                        )
                      ) {
                        deleteCategory(category.uuid);
                      }
                    }}
                    className="px-4 py-2 ml-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Categorylist;
