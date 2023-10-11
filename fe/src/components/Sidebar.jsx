import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoPerson, IoPricetag, IoHome, IoLogOut, IoAddCircle } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div className="font-montserrat">
      <aside className="bg-white w-full min-h-screen p-2 mt-4">
        <ul className="">
          <li className="flex px-4 shadow mb-5 border border-purple-300 gap">
            <NavLink
              to="/admin/dashboard"
              className="text-gray-800 w-full hover:text-purple-400 flex items-center text-md"
            >
              <div className="w-[60px] mr-2">
                <img src="https://static.vecteezy.com/system/resources/previews/015/584/182/original/online-shop-logo-design-free-vector.jpg" />
              </div>
              <div>
                <h1 className="text-xl font-semibold">Admin</h1>
                <h1 className="text-xs">Admin</h1>
              </div>
            </NavLink>
          </li>
          <li className="flex py-2 px-4">
            <NavLink
              to="/admin/dashboard"
              className="text-gray-800 hover:text-purple-400 flex items-center text-md"
            >
              <IoHome className="mr-2" /> Dashboard
            </NavLink>
          </li>
          <li className="flex py-2 px-4">
            <NavLink
              to="/admin/products"
              className="text-gray-800 hover:text-purple-400 flex items-center text-md"
            >
              <IoPricetag className="mr-2" /> Products
            </NavLink>
          </li>
          <li className="flex py-2 px-4">
            <NavLink
              to="/admin/category"
              className="text-gray-800 hover:text-purple-400 flex items-center text-md"
            >
              <IoAddCircle className="mr-2" /> Category
            </NavLink>
          </li>
          <li className="flex py-2 px-4">
            <NavLink
              to="/admin/category"
              className="text-gray-800 hover:text-purple-400 flex items-center text-md"
            >
              <IoAddCircle className="mr-2" /> Warna 
            </NavLink>
          </li>
          <li className="flex py-2 px-4">
            <NavLink
              to="/admin/category"
              className="text-gray-800 hover:text-purple-400 flex items-center text-md"
            >
              <IoAddCircle className="mr-2" /> Memory
            </NavLink>
          </li>
        </ul>
        {user && user.role === "admin" && (
          <div>
            <ul className="">
              <li className="flex py-2 px-4">
                <NavLink
                  to="/admin/users"
                  className="text-gray-800 hover:text-purple-400 flex items-center text-md"
                >
                  <IoPerson className="mr-2" /> Users
                </NavLink>
              </li>
            </ul>
          </div>
        )}
        <ul className="mt-4">
          <li className="flex py-2">
            <button
              onClick={logout}
              className="bg-purple-300 hover:bg-purple-700 border border-purple-200 w-full text-white hover:text-black py-2 px-4 rounded-lg flex items-center justify-center"
            >
              <IoLogOut className="mr-2" /> Logout
            </button>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
