import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import Userlist from "../components/Userlist";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";
import Categorylist from "../components/CategoryList";
import FormAddCategory from "../components/FormAddCategory";

const Category = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);
  const [updateCategoryList, setUpdateCategoryList] = useState(false);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
    if (user && user.role !== "admin") {
      navigate("/admin/dashboard");
    }
  }, [isError, user, navigate]);

   const triggerCategoryListUpdate = () => {
     setUpdateCategoryList(!updateCategoryList);
   };
  return (
    <Layout>
      <FormAddCategory triggerCategoryListUpdate={triggerCategoryListUpdate} />
      <Categorylist
        updateCategoryList={updateCategoryList}
        setUpdateCategoryList={setUpdateCategoryList}
      />
    </Layout>
  );
};

export default Category;
