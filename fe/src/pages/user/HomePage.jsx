import React, { useEffect, useState } from "react";
import LayoutUser from "./LayoutUser";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";
import CarouselComponent from "../../components/CarouselComponen";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  const colorOptions = [
    {
      id: 1,
      color: "Pink",
      code: "#f4cccc",
      image: "/images/home/home1.jpg",
    },
    {
      id: 2,
      color: "White",
      code: "#ffffff",
      image: "/images/home/home2.jpg",
    },
    {
      id: 3,
      color: "Green",
      code: "#ceffb3",
      image: "/images/home/home3.jpg",
    },
    {
      id: 4,
      color: "Blue",
      code: "#c0dbf4",
      image: "/images/home/home4.jpg",
    },
    {
      id: 5,
      color: "Black",
      code: "#292929",
      image: "/images/home/home5.jpg",
    },
    // Tambahkan warna-warna lainnya
  ];

  const [activeColor, setActiveColor] = useState(null);

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

  // Fungsi untuk mengembalikan semua gambar
  const handleShowAllImages = () => {
    setActiveColor(null); // Set activeColor menjadi null untuk menampilkan semua gambar
  };

  return (
    <LayoutUser>
      <CarouselComponent />
      <div>
        {/*start section Image */}
        <div className="flex items-center justify-center mt-20">
          <h1 className="md:text-5xl text-3xl font-semibold mb-8">Iphone 15</h1>
        </div>
        <div className="w-full">
          <div className="mt-14 transition-opacity duration-300 ease-in-out">
            {activeColor ? (
              <img
                src={activeColor.image}
                alt={`iPhone 15 ${activeColor.color}`}
                className={`mx-auto w-16 md:w-64 h-auto transform transition-transform ${
                  activeColor === activeColor
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95"
                }`}
                style={{
                  transition:
                    "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
                }} // Tambahkan properti transition
              />
            ) : (
              <div className="flex justify-center">
                {colorOptions.map((color) => (
                  <img
                    key={color.id}
                    src={color.image}
                    alt={`iPhone 15 ${color.color}`}
                    className="mx-2 w-16 md:w-64 h-auto"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        {/*end section Image */}
        <div className="flex justify-center items-center mt-8 mb-8">
          <div className="flex space-x-6">
            {colorOptions.map((color) => (
              <button
                key={color.id}
                className={`px-4 py-4 rounded-full focus:outline-indigo-400 ${
                  activeColor === color ? "border border-purple-300" : ""
                }`}
                style={{ backgroundColor: color.code, color: "#ffffff" }}
                onClick={() => setActiveColor(color)}
              ></button>
            ))}
          </div>
          {activeColor && (
            // Tombol "Kembali" untuk menampilkan semua gambar
            <button
              className="px-4 py-1 ml-4 text-xs md:text-base rounded-full bg-purple-400 text-white focus:outline-none"
              onClick={handleShowAllImages}
            >
              All Varian
            </button>
          )}
        </div>
        {/*end section Image */}

        {/*start section macbook */}
        <div className="flex items-center justify-center mt-32">
          <h1 className="md:text-5xl text-3xl font-semibold ">MacBook</h1>
        </div>
        <div className="flex justify-center items-center">
          <img
            src="/images/home/macbook.jpg"
            className="mx-2 w-72 md:w-[1500px] h-auto"
          />
        </div>
        {/*end section macbook */}
      </div>
    </LayoutUser>
  );
};

export default HomePage;
