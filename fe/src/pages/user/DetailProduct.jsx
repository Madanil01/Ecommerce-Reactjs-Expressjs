import React, { useEffect } from "react";
import LayoutUser from "./LayoutUser";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";
import DetailProductComponent from "../../components/DetailProductComponent";

const DetailProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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


  return (
    <LayoutUser userUuid={user ? user.uuid : null}>
      <DetailProductComponent userUuid={user ? user.uuid : null} />
    </LayoutUser>
  );
};

export default DetailProduct;
