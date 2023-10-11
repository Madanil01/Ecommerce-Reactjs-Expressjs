import React, { useEffect } from "react";
import Layout from "./Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";
import ProductList from "../components/ProductList";
import { useState } from "react";

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    // Periksa peran pengguna di sini
    if (isError) {
      navigate("/"); // Redirect jika ada kesalahan autentikasi
    } else if (user && user.role === "user") {
      // Ubah "user" dengan properti yang sesuai pada objek pengguna Anda
      navigate("/restrict"); // Redirect jika pengguna adalah "user"
    }
  }, [isError, navigate, user]);
    const handleSearch = (query) => {
      setSearchQuery(query);
    };

  return (
    <Layout>
      <h1 className="mt-[40px] font-semibold text-3xl">Products</h1>
      <h2 className="subtitle">List of Products</h2>
      <ProductList searchQuery={searchQuery} handleSearch={handleSearch} />
    </Layout>
  );
};

export default Products;
