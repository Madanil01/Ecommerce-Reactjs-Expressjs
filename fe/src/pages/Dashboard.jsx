import React, { useEffect } from "react";
import Layout from "./Layout";
import Welcome from "../components/Welcome";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth); // Anda perlu mengambil informasi peran pengguna dari state

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

  return (
    <Layout>
      <Welcome />
    </Layout>
  );
};

export default Dashboard;
