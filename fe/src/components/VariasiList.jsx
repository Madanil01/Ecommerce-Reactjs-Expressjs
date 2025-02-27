import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const VariasiList = ({ dataVariasi }) => {
  const [variasiData, setVariasiData] = useState([]); // State untuk menyimpan data variasi
  const [currentPage, setCurrentPage] = useState(1); // State untuk halaman saat ini
  const [variasiPerPage] = useState(5); // Jumlah variasi per halaman
  const { id } = useParams();
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const getProductById = async () => {
      try {
        const response = await axios.get(
          `https://react-be-theta.vercel.app/products/${id}`
        );
        const productData = response.data;
        // Setelah produk diambil, panggil fungsi untuk mengambil variasi berdasarkan productId
        getVariasiByProductId(productData.id);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };

    getProductById();
  }, [id]);

  // Fungsi untuk mengambil variasi berdasarkan productId
  const getVariasiByProductId = async (productId) => {
    try {
      const response = await axios.get(
        `https://react-be-theta.vercel.app/variasi/product/${productId}`
      );

      const sortedVariasiData = response.data.sort((a, b) => {
        return parseInt(a.memory, 10) - parseInt(b.memory, 10);
      });
      setVariasiData(sortedVariasiData); // Set data variasi ke dalam state
    } catch (error) {
      console.error("Gagal mengambil variasi:", error);
    }
  };

  // Fungsi untuk menghapus variasi berdasarkan uuid
  const deleteVariasi = async (uuid) => {
    try {
      await axios.delete(`https://react-be-theta.vercel.app/variasi/${uuid}`);
      // Perbarui daftar variasi setelah menghapus variasi
      setVariasiData((prevVariasiData) =>
        prevVariasiData.filter((variasi) => variasi.uuid !== uuid)
      );
    } catch (error) {
      console.error("Gagal menghapus variasi:", error);
    }
  };

  // Hitung nomor awal pada halaman saat ini
  const indexOfLastVariasi = currentPage * variasiPerPage;
  const indexOfFirstVariasi = indexOfLastVariasi - variasiPerPage + 1; // Nomor awal dimulai dari 1 pada halaman 2
  const currentVariasi = variasiData.slice(
    indexOfFirstVariasi - 1, // Kurangi 1 karena nomor awal dimulai dari 1
    indexOfLastVariasi
  );

  // Fungsi untuk mengubah halaman
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Fungsi untuk halaman berikutnya
  const nextPage = () => {
    if (currentPage < Math.ceil(variasiData.length / variasiPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Fungsi untuk halaman sebelumnya
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="font-montserrat">
      <table className="min-w-full table-auto bg-white mt-4 rounded-lg">
        <thead className="bg-purple-300">
          <tr>
            <th className="border p-2 text-white">No</th>
            <th className="border p-2 text-white">Category</th>
            <th className="border p-2 text-white">Color</th>
            <th className="border p-2 text-white">Stock</th>
            <th className="border p-2 text-white">Price</th>
            <th className="border p-2 text-white">Action</th>
          </tr>
        </thead>
        <tbody>
          {/* Tambahkan elemen tbody di sini */}
          {currentVariasi.map((variasi, index) => (
            <tr key={variasi.uuid}>
              <td className="border p-2">{indexOfFirstVariasi + index}</td>
              <td className="border p-2">{variasi.memory}</td>
              <td className="border p-2">{variasi.color}</td>
              <td className="border p-2">{variasi.stock}</td>
              <td className="border p-2">
                Rp. {variasi.price.toLocaleString()}
              </td>
              <td className="border p-2">
                <Link
                  to={`/admin/variasi/edit/${variasi.uuid}`}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                >
                  Edit
                </Link>
                <button
                  onClick={() => {
                    if (
                      window.confirm(
                        "Apakah Anda yakin ingin menghapus variasi ini?"
                      )
                    ) {
                      deleteVariasi(variasi.uuid);
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

      {/* Tampilkan tombol paginasi */}
      <ul className="flex justify-center mt-4">
        <li
          className={`cursor-pointer px-3 py-2 border border-gray-300 ${
            currentPage === 1 ? "bg-gray-200" : ""
          }`}
          onClick={prevPage}
        >
          Prev
        </li>
        {variasiData.length > variasiPerPage &&
          Array(Math.ceil(variasiData.length / variasiPerPage))
            .fill()
            .map((_, index) => (
              <li
                key={index}
                className={`cursor-pointer px-3 py-2 border border-gray-300 ${
                  currentPage === index + 1 ? "bg-gray-200" : ""
                }`}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </li>
            ))}
        <li
          className={`cursor-pointer px-3 py-2 border border-gray-300 ${
            currentPage === Math.ceil(variasiData.length / variasiPerPage)
              ? "bg-gray-200"
              : ""
          }`}
          onClick={nextPage}
        >
          Next
        </li>
      </ul>
    </div>
  );
};

export default VariasiList;
