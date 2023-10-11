import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FormAddVariasi = () => {
  const { dataVariasi } = useParams();
  const [memory, setMemory] = useState("");
  const [color, setColor] = useState("");
  const [stock, setStock] = useState("");
  const [colorData, setColorData] = useState([]);
  const [memoryData, setMemoryData] = useState([]);
  const [price, setPrice] = useState("");
  const [msg, setMsg] = useState("");
  const [productId, setProductId] = useState("");
  const [productUuid, setProductUuid] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const [isMessageVisible, setMessageVisible] = useState(false);
  const [message, setMessage] = useState("");

  const [nameProduct, setNameProduct] = useState("");
  const [priceProduct, setPriceProduct] = useState("");
  const [urlProduct, setUrlProduct] = useState("");
  const [categoryProduct, setCategory] = useState("");
  const [variasiStock, setVariasiStock] = useState(0); // State untuk jumlah stock variasi

  useEffect(() => {
    // Mengambil jumlah stock variasi saat komponen dimuat
    const getVariasi = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/variasi?productId=${productId}`
        );
        // Menghitung jumlah stock dari data variasi
        const totalStock = response.data.reduce(
          (acc, variasi) => acc + variasi.stock,
          0
        );
        setVariasiStock(totalStock); // Menyimpan jumlah stock dalam state
      } catch (error) {
        console.error("Gagal mengambil variasi:", error);
      }
    };

    getVariasi();
  }, [productId]);

  useEffect(() => {
    const getProductById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/products/${id}`
        );
        setProductId(response.data.id);
        setProductUuid(response.data.uuid);
        setNameProduct(response.data.name);
        setPriceProduct(response.data.price);
        setUrlProduct(response.data.url);
        getCategoryById(response.data.categoryId);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getProductById();
  }, [id]);

  const getCategoryById = async (categoryId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/category/${categoryId}`
      );
      setCategory(response.data.name);
    } catch (error) {
      console.error("Gagal mengambil kategori:", error);
    }
  };

    useEffect(() => {
      // Mengambil daftar kategori saat komponen dimuat
      const getColor = async () => {
        try {
          const response = await axios.get("http://localhost:5000/colors");
          setColorData(response.data); // Menyimpan daftar kategori dalam state
        } catch (error) {
          console.error("Gagal mengambil color:", error);
        }
      };

      getColor();
    }, []);
  
  useEffect(() => {
    // Mengambil daftar kategori saat komponen dimuat
    const getMemory = async () => {
      try {
        const response = await axios.get("http://localhost:5000/memorys");
        setMemoryData(response.data); // Menyimpan daftar kategori dalam state
      } catch (error) {
        console.error("Gagal mengambil memory:", error);
      }
    };
    getMemory();
  }, []);

  const saveVariasi = async () => {
    try {
      const response = await axios.post("http://localhost:5000/variasi", {
        memory: memory,
        price: price,
        productId: productId,
        productUuid: productUuid,
        color: color,
        stock: stock,
      });
      navigate(`/admin/variasi/${id}`);
      setMessage(response.data.msg);
      setMessageVisible(true);
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  useEffect(() => {
    let timer;
    if (isMessageVisible) {
      timer = setTimeout(() => {
        setMessageVisible(false);
        setMessage("");
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [isMessageVisible]);

  return (
    <div className="mt-16 grid md:grid-cols-2 gap-2 font-montserrat">
      <div
        id="message-popup"
        className={`fixed top-20 right-4 p-4 bg-blue-700 text-white rounded-md shadow-lg z-50 ${
          isMessageVisible ? "block" : "hidden"
        }`}
      >
        {message}
      </div>
      <div className="border flex items-center justify-center bg-white rounded">
        <div className="px-5">
          <h1 className="font-semibold text-xl text-center">Detail Product</h1>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="max-w-[200px]">
              <img src={urlProduct} />
            </div>
            <div>
              <table>
                <tr className="px-4">
                  <td className="p-2 font-semibold">Name</td>
                  <td className="p-2 font-semibold">:</td>
                  <td className="p-2">{nameProduct}</td>
                </tr>
                <tr className="px-4">
                  <td className="p-2 font-semibold">Price</td>
                  <td className="p-2 font-semibold">:</td>
                  <td className="p-2">Rp. {priceProduct.toLocaleString()}</td>
                </tr>
                <tr className="px-4">
                  <td className="p-2 font-semibold">Category</td>
                  <td className="p-2 font-semibold">:</td>
                  <td className="p-2">{categoryProduct}</td>
                </tr>
                <tr className="px-4">
                  <td className="p-2 font-semibold">All Stock</td>
                  <td className="p-2 font-semibold">:</td>
                  <td className="p-2">{variasiStock}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="border border-purple-400 bg-white">
        <div className="">
          <div className="card-content">
            <div className="content">
              <form onSubmit={saveVariasi}>
                <p className="has-text-centered">{msg}</p>
                <div className="field">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Memory
                  </label>
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={memory}
                    onChange={(e) => setMemory(e.target.value)}
                  >
                    <option value="">Select Memory</option>
                    {memoryData.map((data) => (
                      <option key={data.id} value={data.name}>
                        {data.size}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Category
                  </label>
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                  >
                    <option value="">Select Color</option>
                    {colorData.map((data) => (
                      <option key={data.id} value={data.name}>
                        {data.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label className="label">Stock</label>
                  <div className="control">
                    <input
                      type="number"
                      className="input shadow"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      placeholder="Stock"
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Price</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input shadow"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="Price"
                    />
                  </div>
                </div>

                <div className="field">
                  <div className="control">
                    <button
                      type="submit"
                      className="w-full py-2 mt-2 bg-purple-300 text-white font-semibold rounded-lg hover:bg-purple-700 transition-all duration-300"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAddVariasi;
