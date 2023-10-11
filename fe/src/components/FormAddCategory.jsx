import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddCategory = ({ triggerCategoryListUpdate }) => {
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const saveCategory = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/category", {
        name: name,
      });
      navigate("/admin/category");
      setMsg("Berhasil tambah category");
      triggerCategoryListUpdate();
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div className="w-[50%] font-montserrat">
      <h1 className="title mt-10">Category</h1>
      <h2 className="subtitle mt-4">Add Category</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={saveCategory}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Category</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Category"
                  />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Add
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAddCategory;
