import React, { useEffect, useState } from "react";
import LayoutUser from "./LayoutUser";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";
import CartUserComponent from "../../components/CartUserComponent";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    } else if (user && user.role === "admin") {
      navigate("/restrict");
    }
  }, [isError, navigate, user]);

  return (
    <LayoutUser>
      <CartUserComponent userUuid={user ? user.uuid : null} />
    </LayoutUser>
  );
};

export default HomePage;
