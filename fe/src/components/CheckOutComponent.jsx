import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CheckOutComponent = ({ pesananUuid }) => {
  const [pesanan, setPesanan] = useState([]);
  const [newUserUuid, setNewUserUuid] = useState("");
  const [pesananTotal, setPesananTotal] = useState("");
  const [pesananDetailData, setPesananDetailData] = useState([]);
  const [productId, setProductId] = useState("");
  const [total, setTotal] = useState("");
  const [productData, setProductData] = useState([]);
  const [variasiData, setVariasiData] = useState([]);
  const [msg, setMsg] = useState(""); // Menyimpan pesan kesalahan atau sukses
  const [isError, setIsError] = useState(false);
  const [isMessageVisible, setMessageVisible] = useState(false);
  const [totalButton, setTotalButton] = useState(true);
  useEffect(() => {
    getPesanan();
  }, []); // Add pesananUuid as a dependency

  const getPesanan = async () => {
    try {
      const response = await axios.get(
        `https://react-be-theta.vercel.app/pesanan/${pesananUuid}`
      );
      getPesananDetailByPesananUuid(response.data.uuid);
      setTotal(response.data.total);
      // Access the data property of the response
    } catch (error) {
      console.error("Error fetching pesanan:", error);
    }
  };

  const getPesananDetailByPesananUuid = async (param) => {
    try {
      const response = await axios.get(
        `https://react-be-theta.vercel.app/pesanandetailconst/${param}`
      );
      //   console.log(response.data);
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
  const getProductData = async (productId) => {
    try {
      const response = await axios.get(
        `https://react-be-theta.vercel.app/productsconst/${productId}`
      );
      //   console.log(response.data);
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
      //   console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching variasi data:", error);
      return null;
    }
  };
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
        <div className="flex justify-center items-centerpx-4 py-4">
          <div className="text-3xl mt-4 mb-4 font-semibold">Detail Pesanan</div>
        </div>
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
              </tr>
            ))}
            <tr className="text-xl font-semibold">
              <td className="col"></td>
              <td className="col"></td>
              <td className="col"></td>
              <td className="px-6 py-4 text-center">Total :</td>
              <td className="mx-6 py-4 text-center w-full">
                Rp. {total.toLocaleString()}
              </td>
              {/* <td className="text-center">
                <Link
                  to={`/checkout/${pesananUuid}`}
                  className={`py-4 px-2 bg-purple-300 text-white mb-4 rounded-lg hover:bg-purple-700 ${
                    totalButton ? "hidden" : ""
                  }`}
                >
                  Check Out
                </Link>
              </td> */}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CheckOutComponent;
