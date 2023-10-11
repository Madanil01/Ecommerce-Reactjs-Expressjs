import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Users from "./pages/Users";
import Products from "./pages/Products";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import HomePage from "./pages/user/HomePage";
import DetailProduct from "./pages/user/DetailProduct";
import CartUser from "./pages/user/CartUser";
import RestrictPage from "./pages/restrict/RestrictPage";
import ProductPage from "./pages/user/ProductPage";
import AddVariasi from "./pages/AddVariasi";
import Category from "./pages/Category";
import EditVariasi from "./pages/EditVariasi";
import Register from "./components/Register";
import CheckOut from './pages/user/CheckOut';

function App() {
  return (
    <div>
      <BrowserRouter >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="register" element={<Register />} />

          <Route path="/restrict" element={<RestrictPage />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/users/add" element={<AddUser />} />
          <Route path="/admin/users/edit/:id" element={<EditUser />} />
          <Route path="/admin/products" element={<Products />} />
          <Route path="/admin/products/add" element={<AddProduct />} />
          <Route path="/admin/products/edit/:id" element={<EditProduct />} />

          <Route path="/admin/variasi/:id" element={<AddVariasi />} />
          <Route path="/admin/variasi/edit/:id" element={<EditVariasi />} />

          <Route path="/admin/category" element={<Category />} />
          {/* <Route path="/admin/category/add" element={<AddCategory />} /> */}

          {/* user route */}
          <Route path="/home" element={<HomePage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/products/detail/:id" element={<DetailProduct />} />
          <Route path="/cart/:id" element={<CartUser />} />
          <Route path="/checkout/:id" element={<CheckOut />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
