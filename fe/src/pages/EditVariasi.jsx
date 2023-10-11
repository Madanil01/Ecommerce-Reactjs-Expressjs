import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";
import FormEditVariasi from "../components/FormEditVariasi";
import Layout from "./Layout";

const EditVariasi = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
    if (user && user.role !== "admin") {
      navigate("/dashboard");
    }
  }, [isError, user, navigate]);
    return (
      <Layout>
        <h1 className="mt-[40px] font-semibold text-3xl">Variasi</h1>
        <h2 className="subtitle">Edit Variasi</h2>
        <FormEditVariasi />
      </Layout>
    );
};

export default EditVariasi;
