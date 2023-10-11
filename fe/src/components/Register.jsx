import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RegisterUser, reset } from "../features/authSlice";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [messageInfo, setMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMessageVisible, setMessageVisible] = useState(false);
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if ((user || isSuccess) && user.role === "admin") {
      navigate("/admin/dashboard");
    }
    if ((user || isSuccess) && user.role === "user") {
      navigate("/home");
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const handleRegistration = (e) => {
    e.preventDefault();

    // Check if the password and confirmation password match

    dispatch(RegisterUser({ username, email, password, confPassword }));

    // Handle navigation upon successful registration
    if (!isError) {
      setMessage("Berhasil Membuat Akun");
      setMessageVisible(true);
      // You can replace "/login" with the appropriate URL
    }
    if (isError) {
      setMessage(message);
      setMessageVisible(true);
      navigate("/register"); // You can replace "/login" with the appropriate URL
    }

    // Dispatch the registration action with the user data
  };
  useEffect(() => {
    let timer;
    if (isMessageVisible) {
      timer = setTimeout(() => {
        setMessageVisible(false);
        setMessage("");
        if (!isError) {
          navigate("/");
        }
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [isMessageVisible]);

  return (
    <section className="hero is-fullheight is-fullwidth font-montserrat">
      <div
        id="message-popup"
        className={`fixed top-20 right-4 p-4 text-white rounded-md shadow-lg z-50 ${
          isMessageVisible
            ? "block opacity-100 transition-all ease-out duration-300"
            : "hidden opacity-0 transition-all ease-out  duration-300"
        } ${isError ? "bg-red-500" : "bg-green-500"}`}
      >
        {messageInfo}
      </div>
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-5 shadow-xl border">
              <form onSubmit={handleRegistration} className="px-4 py-4">
                <h1 className="text-[35px] text-center font-semibold text-purple-700">
                  Register
                </h1>
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
                  <label className="label">Password</label>
                  <div className="control">
                    <input
                      type="password"
                      className="input"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="******"
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Confirmation Password</label>
                  <div className="control">
                    <input
                      type="password"
                      className="input"
                      value={confPassword}
                      onChange={(e) => setConfPassword(e.target.value)}
                      placeholder="******"
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <p>
                    Sudah Punya Akun ?  
                    <a href="/" className="text-purple-700">
                      Login
                    </a>
                  </p>
                </div>
                <div className="field mt-5">
                  <button
                    type="submit"
                    className="border border-purple-700 w-full py-2 rounded-md font-semibold hover:bg-purple-700 text-purple-700 hover:text-white transition ease-in-out duration-200"
                  >
                    {isLoading ? "Loading..." : "Register"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
