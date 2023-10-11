import LayoutUser from "./LayoutUser";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getMe } from "../../features/authSlice";
import axios from "axios";
import CheckOutComponent from "../../components/CheckOutComponent";
import FormCheckOutComponent from "../../components/FormCheckOutComponent";
import RekeningTransferComponens from "../../components/RekeningTransferComponens";

const CheckOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);
  const pesananUuid = useParams(); // Use destructuring to get the parameter

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
      <CheckOutComponent pesananUuid={pesananUuid.id} />
      <div className="grid grid-cols-1 md:grid-cols-2 mt-10 bord1er shadow-lg py-4 px-4 mb-10">
        <FormCheckOutComponent
          userUuid={user.uuid}
          pesananUuid={pesananUuid.id}
        />
        <RekeningTransferComponens />
      </div>
    </LayoutUser>
  );
};

export default CheckOut;
