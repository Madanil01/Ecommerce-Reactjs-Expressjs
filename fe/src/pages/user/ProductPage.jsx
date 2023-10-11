import React, { useEffect } from "react";
import LayoutUser from "./LayoutUser";
import Welcome from "../../components/Welcome";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";
import CardProduct from "../../components/CardProduct";
import { useState } from "react";
import { motion, useAnimation } from "framer-motion";

const ProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    // Periksa peran pengguna di sini
    if (isError) {
      navigate("/"); // Redirect jika ada kesalahan autentikasi
    } else if (user && user.role === "admin") {
      // Ubah "user" dengan properti yang sesuai pada objek pengguna Anda
      navigate("/restrict"); // Redirect jika pengguna adalah "user"
    }
  }, [isError, navigate, user]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Inisialisasi kontrol animasi
  const controls = useAnimation();

  // Membuat efek animasi masuk saat halaman dimuat
  useEffect(() => {
    controls.start({ opacity: 1, y: 0, transition: { duration: 0.5 } });
  }, [controls]);

  return (
    <LayoutUser>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={controls}
        className="animate__animated animate__fadeIn"
      >
        <CardProduct searchQuery={searchQuery} handleSearch={handleSearch} />
      </motion.div>
    </LayoutUser>
  );
};

export default ProductPage;
