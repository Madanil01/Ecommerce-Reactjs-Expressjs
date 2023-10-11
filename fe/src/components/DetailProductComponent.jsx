import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updatePesananDetail } from "../features/authSlice";

const DetailProductComponent = ({ userUuid }) => {
  const [nameProduct, setNameProduct] = useState("");
  const [priceProduct, setPriceProduct] = useState("");
  const [urlProduct, setUrlProduct] = useState("");
  const [categoryProduct, setCategory] = useState("");
  const [productId, setProductId] = useState("");
  const [productUuid, setProductUuid] = useState("");
  const [selectedVariasi, setSelectedVariasi] = useState(""); // Menyimpan variasi yang dipilih
  const [variasiAllStock, setVariasiAllStock] = useState(0);
  const [variasiStock, setVariasiStock] = useState(0);
  const [variasiData, setVariasiData] = useState([]);
  const [variasiId, setVariasiId] = useState("0");
  const [selectedVariasiPrice, setSelectedVariasiPrice] = useState(0); // Harga variasi yang dipilih
  const [purchaseQuantity, setPurchaseQuantity] = useState(1); // Jumlah pembelian
  const [disableMinus, setDisableMinus] = useState(true);
  const [disablePlus, setDisablePlus] = useState(false);
  const [disableAddToCart, setDisableAddToCart] = useState(true);
  const [disableInStorePickup, setDisableInStorePickup] = useState(true);
  const [prevTotal, setPrevTotal] = useState("");
  const [msg, setMsg] = useState(""); // Menyimpan pesan kesalahan atau sukses
  const [isError, setIsError] = useState(false);
  const [isMessageVisible, setMessageVisible] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    // Mengambil jumlah stock variasi saat komponen dimuat
    const getVariasi = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/variasi?productId=${productId}`
        );

        // Memfilter variasi berdasarkan productId
        const variasiDenganProductId = response.data.filter(
          (variasi) => variasi.productId === productId
        );

        // Menghitung jumlah stock dari data variasi yang sesuai
        const totalStock = variasiDenganProductId.reduce(
          (acc, variasi) => acc + variasi.stock,
          0
        );

        setVariasiData(variasiDenganProductId);
        setVariasiId(variasiDenganProductId[0]?.id); // Mengambil id dari elemen pertama jika ada
        setVariasiAllStock(totalStock); // Menyimpan jumlah stock dalam state
      } catch (error) {
        console.error("Gagal mengambil variasi:", error);
      }
    };

    getVariasi();
  }, [productId]);

  // Penanganan perubahan pilihan variasi
  const handleVariasiChange = (e) => {
    const selectedVariasiId = e.target.value;
    console.log(selectedVariasiId);
    setSelectedVariasi(selectedVariasiId);

    if (selectedVariasiId === "0") {
      setVariasiStock(0);
      setSelectedVariasiPrice(0);
      setDisableAddToCart(true); // Menonaktifkan "Add to Cart" jika opsi kosong ("Select Varian") dipilih
      setDisableInStorePickup(true); // Set harga ke 0 jika opsi kosong ("Select Varian") dipilih
    } else {
      // Di sini Anda dapat menambahkan logika untuk mengatur harga variasi dan mengaktifkan "Add to Cart" jika diperlukan.
      const selectedVariasi = variasiData.find(
        (variasi) => variasi.id === parseInt(selectedVariasiId)
      );

      if (selectedVariasi) {
        setSelectedVariasiPrice(selectedVariasi.price);
        setVariasiStock(selectedVariasi.stock);
        setDisableAddToCart(false); // Mengaktifkan "Add to Cart" jika variasi dipilih
        setDisableInStorePickup(false); // Set harga ke harga variasi jika variasi dipilih
      }
    }
  };

  // Validasi jumlah pembelian
  useEffect(() => {
    setDisableMinus(purchaseQuantity <= 1);
    setDisablePlus(purchaseQuantity >= variasiStock);
  }, [purchaseQuantity, variasiStock]);

  const handleMinusClick = () => {
    if (purchaseQuantity > 1) {
      setPurchaseQuantity(purchaseQuantity - 1);
    }
  };

  const handlePlusClick = () => {
    if (purchaseQuantity < variasiStock) {
      setPurchaseQuantity(purchaseQuantity + 1);
    }
  };
  // submit pesanan
  const savePesanan = async () => {
    try {
      // Cek apakah pesanan dengan status 0 sudah ada
      const existingPesanan = await axios.get(
        `http://localhost:5000/pesananuser/${userUuid}`
      );

      if (existingPesanan.data === null) {
        // Jika tidak ada pesanan dengan status 0, maka buat pesanan baru
        const response = await axios.post("http://localhost:5000/pesanan", {
          userUuid: userUuid,
          total: purchaseQuantity * selectedVariasiPrice,
        });
        // response.data akan berisi data pesanan yang telah dibuat
        const pesananUuid = response.data.uuid;
        const total = response.data.total;
        savePesananDetail(pesananUuid, total);
      } else {
        const pesananUuid = existingPesanan.data.uuid;
        const total = existingPesanan.data.total;
        savePesananDetail(pesananUuid, total);
      }
    } catch (error) {
      console.error("Gagal membuat pesanan:", error);
    }
  };

  const savePesananDetail = async (pesananUuid, total) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/pesanandetailconst/${pesananUuid}`
      );
      const subtotal = purchaseQuantity * selectedVariasiPrice;
      let foundIndex = -1; // Inisialisasi indeks pencarian
      console.log(response.data);

      // Mencari indeks item yang cocok dengan productId dan variasiId
      for (let i = 0; i < response.data.length; i++) {
        if (
          response.data[i].productId == productId &&
          response.data[i].variasiId == selectedVariasi
        ) {
          foundIndex = i;
          break; // Keluar dari loop setelah item cocok ditemukan
        }
      }
      //update jumlah saja jika di temukan pesanan detail dengan variasi dan produk yang sama
      if (foundIndex !== -1) {
        if (
          variasiStock >=
          purchaseQuantity + response.data[foundIndex].jumlah
        ) {
          const pesananDetailUuid = response.data[foundIndex].uuid;
          const pesananDetailJumlah = response.data[foundIndex].jumlah;
          const pesananDetailtotal = response.data[foundIndex].subtotal;
          const newSubtotal = pesananDetailtotal + subtotal;
          await axios.patch(
            `http://localhost:5000/pesanandetail/${pesananDetailUuid}`,
            {
              pesananUuid: pesananUuid,
              productId: productId,
              variasiId: selectedVariasi,
              jumlah: pesananDetailJumlah + purchaseQuantity,
              hargaSatuan: selectedVariasiPrice,
              subtotal: pesananDetailtotal + subtotal,
            }
          );

          await axios.patch(`http://localhost:5000/pesanan/${pesananUuid}`, {
            total: newSubtotal,
            tanggalPesanan: new Date().toISOString(),
            // Menambahkan subtotal ke total yang ada
          });
          await updateTotalPesanan(pesananUuid);
          setMsg("Berhasil Menambahkan Ke keranjang");
          setMessageVisible(true);
          setIsError(false);
        } else {
          setMsg("Jumlah Pemsesanan Melebihi Stock.");
          setMessageVisible(true);
          setIsError(true);
        }
      }

      //buat pesanan detail baru jika tidak ketemu pesanan detail dengan produk dan variasi yang sama
      if (foundIndex === -1) {
        // Menambahkan pesanan detail
        await axios.post("http://localhost:5000/pesanandetail", {
          pesananUuid: pesananUuid,
          productId: productId, // Gantilah dengan nilai productId yang sesuai
          variasiId: selectedVariasi, // Variasi yang dipilih
          jumlah: purchaseQuantity,
          hargaSatuan: selectedVariasiPrice,
          subtotal: subtotal,
        });
        await updateTotalPesanan(pesananUuid);
        setMsg("Berhasil Menambahkan Ke keranjang");
        setMessageVisible(true);
        setIsError(false);
      }
      //update harga pesanan

      // Update total pada tabel pesanan
    } catch (error) {
      console.error("Gagal membuat pesanan detail:", error);
    }
  };

  const handleAddToCartClick = async (e) => {
    e.preventDefault();
    try {
      await savePesanan();

      // Dapatkan jumlah pesanan terbaru
      // const response = await axios.get(
      //   `http://localhost:5000/pesanan?userUuid=${userUuid}&statusPesanan=0`
      // );
      // const jumlahPesananDetail = response.data.length;

      // // Kirim pembaruan ke Redux
      // dispatch(updatePesananDetail(jumlahPesananDetail)); // Dispatch action di sini

      // setMsg("Pesanan berhasil ditambahkan ke keranjang!");
      // setMessageVisible(true);
      // setIsError(false); // Menandakan bahwa ini adalah pesan sukses
      // window.location.reload();
    } catch (error) {
      // setMsg("Gagal menambahkan pesanan ke keranjang.");
      // setMessageVisible(true);
      // setIsError(true); // Menandakan bahwa ini adalah pesan kesalahan
    }
  };
  const updateTotalPesanan = async (param) => {
    try {
      // Mengambil semua pesanandetail berdasarkan pesananUuid
      const pesananDetailResponse = await axios.get(
        `http://localhost:5000/pesanandetailconst/${param}`
      );

      const pesananDetailData = pesananDetailResponse.data;

      // Menghitung total pesanan berdasarkan jumlah subtotal pesanandetail
      let totalHargaPesanan = 0;
      for (const detail of pesananDetailData) {
        totalHargaPesanan += detail.subtotal;
      }

      // Memperbarui total pesanan pada tabel pesanan
      await axios.patch(`http://localhost:5000/pesanan/${param}`, {
        total: totalHargaPesanan,
      });

      console.log("Total pesanan yang diperbarui:", totalHargaPesanan);
    } catch (error) {
      console.error("Gagal memperbarui total pesanan:", error);
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

  return (
    <div className="border mt-10 mb-10 rounded-lg shadow-lg font-montserrat">
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
      <div className="grid p-4 grid-cols-1 md:grid-cols-2">
        <div className="max-w-[200px] md:max-w-lg flex items-center justify-center mx-auto">
          <img src={urlProduct} alt="product" className="" />
        </div>
        <div>
          <div className="text-lg md:text-4xl font-semibold mt-4 px-2">
            {nameProduct}
          </div>
          <div className="text-md mt-4 md:pt-12 px-2 md:text-xl">
            {variasiAllStock} (All varian stock)
          </div>
          <div className="text-md font-semibold mt-4 px-2 md:text-xl md:pt-6">
            Select varian :
          </div>

          {/* Membuat dropdown select untuk memilih variasi */}
          <div className="px-2">
            <select
              value={selectedVariasi}
              onChange={handleVariasiChange}
              className="border border-purple-500 rounded p-2 text-md mt-4 md:mt-8 shadow"
            >
              <option value="0">Select Varian</option>
              {variasiData.map((variasi) => (
                <option className="" key={variasi.id} value={variasi.id}>
                  {variasi.memory} - {variasi.color} - {variasi.stock} (stock)
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center mt-4 px-2">
            <button
              className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 transition-all ease-in-out duration-300"
              onClick={handleMinusClick}
              disabled={disableMinus}
            >
              -
            </button>
            <input
              type="number"
              className="border border-purple-500 rounded p-2 text-md ml-2 mr-2"
              value={purchaseQuantity}
              onChange={(e) => {
                const newValue = parseInt(e.target.value);
                if (
                  !isNaN(newValue) &&
                  newValue >= 1 &&
                  newValue <= variasiStock
                ) {
                  setPurchaseQuantity(newValue);
                }
              }}
            />
            <button
              className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 transition-all ease-in-out duration-300"
              onClick={handlePlusClick}
              disabled={disablePlus}
            >
              +
            </button>
          </div>
          <p className="text-lg px-2 md:text-3xl text-center mt-4 md:pt-8 font-semibold">
            Rp. {(purchaseQuantity * selectedVariasiPrice).toLocaleString()}
          </p>
          <div className="transition-all ease-in-out duration-300">
            <button
              className={`w-full py-2 mt-2 text-center flex items-center justify-center text-white bg-purple-500 hover:bg-purple-700 rounded-md transition-all ease-in-out duration-300 ${
                disableAddToCart ? "cursor-not-allowed" : ""
              }`}
              onClick={handleAddToCartClick}
              disabled={disableAddToCart}
            >
              Add to Cart
            </button>
            <button
              className={`w-full py-2 mt-2 text-center flex items-center justify-center text-white bg-gray-500 hover:bg-gray-700 rounded-md transition-all ease-in-out duration-300 ${
                disableInStorePickup ? "cursor-not-allowed" : ""
              }`}
              // onClick={handleInStorePickupClick}
              //disabled={disableInStorePickup}
            >
              In-Store Pickup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProductComponent;
