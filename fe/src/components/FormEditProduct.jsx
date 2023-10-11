import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FormAddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState("");
  const [categoryId, setCategoryId] = useState(""); // State untuk kategori produk
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const [preview, setPreview] = useState("");
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState("")
  const { id } = useParams();

  useEffect(() => {
    const getProductById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/products/${id}`
        );
        setName(response.data.name);
        setPrice(response.data.price);
        setCategoryId(response.data.categoryId);
        setUrl(response.data.url)
        setFile(response.data.image);
        
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getProductById();
  }, [id]);

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };
  useEffect(() => {
    // Mengambil daftar kategori saat komponen dimuat
    const getCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/category");
        setCategories(response.data); // Menyimpan daftar kategori dalam state
      } catch (error) {
        console.error("Gagal mengambil kategori:", error);
      }
    };

    getCategories();
  }, []);

  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("categoryId", categoryId);
      formData.append("url", url);
      formData.append("file", file);
      for (let pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }

      await axios.patch(`http://localhost:5000/products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/admin/products");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div className="font-montserrat">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-20 md:w-[50%]">
        <div className="mb-4">
          <form onSubmit={updateProduct}>
            <p className="text-center text-red-500">{msg}</p>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name
              </label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Product Name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Price
              </label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Category
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Image Old
                </label>
                <img src={url} className="max-w-[150px]" />
              </div>
              <div className="w-full">
                <div className="mb-4">
                  <label className=" text-gray-700 text-sm font-bold mb-2">
                    Image Update
                  </label>
                  <input
                    type="file"
                    className="py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    onChange={loadImage}
                  />
                </div>
                <div>
                  {preview ? (
                    <figure className="image is-128x128">
                      <img src={preview} alt="Preview Image" />
                    </figure>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <div className="mb-4 mt-8">
              <div>
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Save
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormAddProduct;
