import axios from "axios";
import React, { useState, useEffect } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

const CartUserComponent = ({ userUuid }) => {
  const [pesanan, setPesanan] = useState([]);
  const [newUserUuid, setNewUserUuid] = useState("");
  const [pesananUuid, setPesananUuid] = useState("");
  const [pesananTotal, setPesananTotal] = useState("");
  const [pesananDetailData, setPesananDetailData] = useState([]);
  const [productId, setProductId] = useState("");
  const [productData, setProductData] = useState([]);
  const [variasiData, setVariasiData] = useState([]);
  const [msg, setMsg] = useState(""); // Menyimpan pesan kesalahan atau sukses
  const [isError, setIsError] = useState(false);
  const [isMessageVisible, setMessageVisible] = useState(false);
  const [totalButton, setTotalButton] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    getPesananByUserUuid();
  }, [userUuid]);

  const getProductData = async (productId) => {
    try {
      const response = await axios.get(
        `https://react-be-theta.vercel.app/productsconst/${productId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching product data:", error);
      return null;
    }
  };

  const getVariasiData = async (productId, variasiId) => {
    try {
      const response = await axios.get(
        `https://react-be-theta.vercel.app/variasiconst/${variasiId}?productId=${productId}&`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching variasi data:", error);
      return null;
    }
  };

  const getPesananByUserUuid = async () => {
    try {
      const pesananStatusNol = await axios.get(
        `https://react-be-theta.vercel.app/pesananuser/${userUuid}`
      );
      // Periksa apakah pesananStatusNol.data ada dan memiliki panjang lebih dari 0
      if (pesananStatusNol.data.statusPesanan === 0) {
        setPesanan(pesananStatusNol.data);
        setPesananUuid(pesananStatusNol.data.uuid);
        setNewUserUuid(pesananStatusNol.data.userUuid);
        setPesananTotal(pesananStatusNol.data.total);
        getPesananDetail(pesananStatusNol.data.uuid);
      } else {
        // Handle kasus ketika pesananStatusNol.data kosong
        console.error("Data pesanan kosong.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getPesananDetail = async (param) => {
    try {
      const response = await axios.get(
        `https://react-be-theta.vercel.app/pesanandetailconst/${param}`
      );
      console.log(response.data);
      if (response.data.length > 0) {
        setPesananDetailData(response.data);
        setTotalButton(false);

        const productPromises = response.data.map((pesananDetail) =>
          getProductData(pesananDetail.productId)
        );

        const variasiPromises = response.data.map((pesananDetail) =>
          getVariasiData(pesananDetail.productId, pesananDetail.variasiId)
        );

        Promise.all([...productPromises, ...variasiPromises]).then(
          (responses) => {
            const productData = responses.slice(0, response.data.length);
            const variasiData = responses.slice(response.data.length);
            setProductData(productData);
            setVariasiData(variasiData);
          }
        );
      }
    } catch (error) {
      console.error("Error fetching detail data:", error);
    }
  };

  const deletePesananByUserUUid = async () => {
    try {
      await axios.delete(
        `https://react-be-theta.vercel.app/pesananuseruuid/${newUserUuid}`
      );
    } catch (error) {
      console.error("Error delete pesanan:", error);
    }
  };

  const deletePesananDetail = async (pesananDetailUuid) => {
    try {
      const response = await axios.delete(
        `https://react-be-theta.vercel.app/pesanandetail/${pesananDetailUuid}`
      );
      const updateTotalPesanan = pesananTotal - response.data.subtotal;
      if (updateTotalPesanan === 0) {
        deletePesananByUserUUid(userUuid);
        getPesananDetail();
        setTotalButton(true);
        window.location.reload();
      } else {
        setPesananTotal(updateTotalPesanan);
        await axios.patch(
          `https://react-be-theta.vercel.app/pesanan/${pesananUuid}`,
          {
            total: updateTotalPesanan,
            tanggalPesanan: new Date().toISOString(),
            // Menambahkan subtotal ke total yang ada
          }
        );
        getPesananDetail();
      }
      setMessageVisible(true);
      setMsg("Pesanan Berhasil dihapus...");
      setIsError(false);
    } catch (error) {
      console.error("Error delete pesanan detail:", error);
    }
  };

  useEffect(() => {
    let timer;
    if (isMessageVisible) {
      timer = setTimeout(() => {
        setMessageVisible(false);
        setMsg("");
        if (isError === false) {
          window.location.reload();
        }
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [isMessageVisible]);

  console.log(variasiData);
  return (
    <div className="mt-10 font-montserrat">
      <div
        id="message-popup"
        className={`fixed top-20 right-4 p-4 text-white rounded-md shadow-lg z-50 ${
          isMessageVisible
            ? "block opacity-100 transition-all ease-out duration-300"
            : "hidden opacity-0 transition-all ease-out  duration-300"
        } ${isError ? "bg-red-500" : "bg-green-500"}`}
      >
        {msg}
      </div>
      <div className="border shadow-lg w-full overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th
                scope="col"
                className="px-6 py-3 bg-gray-50 text-center text-base font-semibold text-gray-700 uppercase tracking-wider"
              >
                Image
              </th>
              <th
                scope="col"
                className="px-6 py-3 bg-gray-50 text-center text-base font-semibold text-gray-700 uppercase tracking-wider"
              >
                Color
              </th>
              <th
                scope="col"
                className="px-6 py-3 bg-gray-50 text-center text-base font-semibold text-gray-700 uppercase tracking-wider"
              >
                Memory
              </th>
              <th
                scope="col"
                className="px-6 py-3 bg-gray-50 text-center text-base font-semibold text-gray-700 uppercase tracking-wider"
              >
                Jumlah
              </th>
              <th
                scope="col"
                className="px-6 py-3 bg-gray-50 text-center text-base font-semibold text-gray-700 uppercase tracking-wider"
              >
                Harga/Pcs
              </th>
              <th
                scope="col"
                className="px-6 py-3 bg-gray-50 text-center text-base font-semibold text-gray-700 uppercase tracking-wider"
              >
                Subtotal
              </th>
              <th
                scope="col"
                className="px-6 py-3 bg-gray-50 text-center text-base font-semibold text-gray-700 uppercase tracking-wider"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pesananDetailData.map((pesananDetail, index) => (
              <tr key={pesananDetail.uuid}>
                <td className="px-6 py-4 text-center  whitespace-nowrap">
                  <img
                    className="min-w-[100px]"
                    src={productData[index]?.url}
                  />
                </td>
                <td className="px-4 py-4 text-center whitespace-nowrap">
                  {variasiData[index]?.color || "Color Not Available"}
                </td>
                <td className="px-4 py-4 text-center whitespace-nowrap">
                  {variasiData[index]?.memory || "Memory Not Available"}
                </td>
                <td className="px-4 py-4 text-center  whitespace-nowrap">
                  {pesananDetail.jumlah}
                </td>
                <td className="px-4 py-4 text-center whitespace-nowrap">
                  Rp. {pesananDetail.hargaSatuan.toLocaleString()}
                </td>
                <td className="px-4 py-4 text-center whitespace-nowrap">
                  Rp. {pesananDetail.subtotal.toLocaleString()}
                </td>
                <td className="px-4 py-4 text-center whitespace-nowrap">
                  <button
                    onClick={() => {
                      if (
                        window.confirm("Apakah Anda yakin ingin pesanan ini??")
                      ) {
                        deletePesananDetail(pesananDetail.uuid);
                      }
                    }}
                    className="p-2 bg-red-500 text-white rounded-lg"
                  >
                    <IoTrashOutline />
                  </button>
                </td>
              </tr>
            ))}
            <tr className="text-xl font-semibold">
              <td className="col"></td>
              <td className="col"></td>
              <td className="col"></td>
              <td className="col"></td>
              <td className="px-6 py-4 text-center">Total :</td>
              <td className="mx-6 py-4 text-center w-full">
                Rp. {pesananTotal.toLocaleString()}
              </td>
              <td className="text-center">
                <Link
                  to={`/checkout/${pesananUuid}`}
                  className={`py-4 px-2 bg-purple-300 text-white mb-4 rounded-lg hover:bg-purple-700 ${
                    totalButton ? "hidden" : ""
                  }`}
                >
                  Check Out
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CartUserComponent;
