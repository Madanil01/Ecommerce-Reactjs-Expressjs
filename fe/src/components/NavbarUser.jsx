import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../logo.png";
import { useDispatch, useSelector } from "react-redux";
import {
  LogOut,
  reset,
  getMe,
  updatePesananDetail,
} from "../features/authSlice"; // Pastikan Anda mengimpor action creator yang diperlukan
import { IoCart } from "react-icons/io5";
import axios from "axios";
import { addToCart } from "../features/cardSlice";

const NavbarUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [button, setButton] = useState(false);
  const [userName, setUserName] = useState("");
  const [userUuid, setUserUuid] = useState("");
  const [pesananUuid, setPesananUuid] = useState("");
  const [jumlahPesananDetail, setJumlahPesananDetail] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  useEffect(() => {
    // Panggil getMe saat komponen dimuat
    dispatch(getMe())
      .then((response) => {
        // Tampilkan respons dalam konsol
        console.log("Respons dari getMe:", response);
        const username = response.payload.username;
        const userUuid = response.payload.uuid;
        setUserUuid(userUuid);
        getPesananByUserUuid(userUuid);
        setUserName(username);
        setButton(true);
      })
      .catch((error) => {
        // Tangani kesalahan jika diperlukan
        console.error("Kesalahan saat memanggil getMe:", error);
      });
    // getPesanan()
  }, [dispatch]);

  const getPesananByUserUuid = async (param) => {
    try {
      const response = await axios.get(
        `https://react-be-theta.vercel.app/pesananuser/${param}`
      );
      if(response.data != null){
       if (response.data.statusPesanan === 0) {
         setPesananUuid(response.data.uuid);
         console.log(response.data.uuid);
         getPesananDetail(response.data.uuid); // Panggil getPesananDetail dengan pesananUuid yang didapat
       }
      }
      
    } catch (error) {
      console.error("Kesalahan saat mengambil pesanan:", error);
    }
  };

 const getPesananDetail = async (param) => {
   try {
     const response = await axios.get(
       `http://localhost:5000/pesanandetailconst/${param}`
     );

     // Periksa apakah respons berisi data
     if (Array.isArray(response.data)) {
       const jumlahBaris = response.data.length;
       setJumlahPesananDetail(jumlahBaris); // Set jumlahPesananDetail sesuai dengan jumlah data
     } else {
       setJumlahPesananDetail(0); // Set jumlahPesananDetail ke 0 jika tidak ada data atau respons bukan array
     }
   } catch (error) {
     console.error("Kesalahan saat mengambil pesanan detail:", error);
   }
 };


  return (
    <div className="font-montserrat">
      <nav className="relative flex flex-wrap items-center justify-between  py-3 bg-white mb-3 z-10 shadow">
        <div className="container mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <a
              className="text-2xl md:text-3xl font-bold leading-relaxed inline-block mr-4 px-2 py-2 whitespace-nowrap text-purple-700"
              href="#pablo"
            >
              Product&co
            </a>
            <button
              className="text-purple-700 cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto justify-center items-center">
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-md leading-snug text-purple-700 hover:opacity-75"
                  href="/home"
                >
                  {/* <i className="fab fa-facebook-square text-lg leading-lg text-purple-700 opacity-75"></i> */}
                  <span className="ml-2">Home</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-md leading-snug text-purple-700 hover:opacity-75"
                  href="/products"
                >
                  {/* <i className="fab fa-twitter text-lg leading-lg text-purple-700 opacity-75"></i> */}
                  <span className="ml-2">Product</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-md leading-snug text-purple-700 hover:opacity-75"
                  href="#pablo"
                >
                  {/* <i className="fab fa-pinterest text-lg leading-lg text-purple-700 opacity-75"></i> */}
                  <span className="ml-2">Transaction</span>
                </a>
              </li>
              <li className="nav-item">
                <Link
                  className="px-3 py-2 flex items-center text-md leading-snug text-purple-700 hover:opacity-75"
                  to={`/cart/${userUuid}`}
                >
                  <div className="flex justify-center items-center">
                    <IoCart />
                    <span
                      className={`ml-2 py-1 px-2 justify-center items-center bg-red-600 text-white text-xs font-semibold rounded-full ${
                        jumlahPesananDetail > 0 ? "" : "hidden"
                      }`}
                    >
                      {jumlahPesananDetail}
                    </span>
                  </div>
                </Link>
              </li>
              <li className="nav-item lg:flex items lg:ml-8">
                {/* <a
                  className={
                    "px-3 py-2 items-center text-md uppercase font-bold leading-snug text-purple-700 hover:opacity-75  border border-purple-700 rounded-md" +
                    (button ? "flex" : " hidden")
                  }
                  href="/login"
                >
                  <span className="">Login</span>
                </a> */}
              </li>
              <li>
                <div className="relative inline-block text-left">
                  <button
                    onClick={toggleDropdown}
                    type="button"
                    className="px-4 py-2 text-md font-medium bg-purple-400 hover:bg-purple-700 text-white rounded-md focus:outline-none focus-visible:ring focus-visible:ring-gray-400 focus-visible:ring-opacity-50"
                  >
                    {userName}
                  </button>

                  {isOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
                      <ul>
                        <li className="px-4 py-2 text-gray-700 hover:bg-gray-100">
                          <button type="submit">Profile</button>
                        </li>
                        <li className="px-4 py-2 text-gray-700 hover:bg-gray-100">
                          <button type="submit" onClick={logout}>
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavbarUser;
