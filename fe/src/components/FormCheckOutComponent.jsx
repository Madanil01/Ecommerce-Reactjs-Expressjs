import axios from "axios";
import React, { useEffect, useState } from "react";

const FormCheckOutComponent = ({ userUuid, pesananUuid }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [nohp, setNohp] = useState("");
  const [alamat, setAlamat] = useState("");
  const [password, setPassword] = useState("");
  const [statusPesanan, setStatusPesanan] = useState("");
  useEffect(() => {
    getUser();
  }, []);
  const getUser = async () => {
    try {
      console.log(userUuid);
      const response = await axios.get(
        `https://react-be-theta.vercel.app/users/${userUuid}`
      );
      setUsername(response.data.username);
      setPassword("");
      setEmail(response.data.email);
      if (alamat != null || nohp != null) {
        setNohp(response.data.nohp);
        setAlamat(response.data.alamat);
      }
      setStatusPesanan(1);
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateUser = async () => {
    try {
      console.log(userUuid);

      // Check if 'alamat' and 'nohp' are not null before making the request
      if (alamat != null || nohp != null) {
        // Make sure 'password' is defined or set it to an empty string if it's not defined

        const response = await axios.patch(
          `https://react-be-theta.vercel.app/users/${userUuid}`,
          {
            username: username,
            email: email,
            nohp: nohp,
            alamat: alamat,
            password: password, // Include the hashed password in the request
          }
        );
        updateStatusPesanan();
        console.log(response.data);
      } else {
        console.log("Alamat atau No Hp Harus diisi");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const updateStatusPesanan = async () => {
    try {
      console.log(pesananUuid);
      const response = await axios.patch(
        `https://react-be-theta.vercel.app/pesanan/${pesananUuid}`,
        {
          statusPesanan: 1,
        }
      );
      console.log(statusPesanan);
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      updateUser();
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <div className="text-xl text-center font-semibold">Data Pengiriman* </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Username</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">No Hp</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={nohp}
                onChange={(e) => setNohp(e.target.value)}
                placeholder="08*******"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Alamat</label>
            <div className="control">
              <textarea
                type="text"
                className="field w-full border"
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
                placeholder="(Nama Penerima), Alamat Lengkap"
              />
            </div>
          </div>
          <div className="w-full flex justify-end">
            <button className="px-2 py-2 border rounded-lg bg-purple-300 text-white hover:bg-purple-700 w-full">
              Checkout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormCheckOutComponent;
