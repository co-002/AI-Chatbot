import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppState";
import { useNavigate } from "react-router-dom";

function Register() {
  const { register } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;
    const response = await register(name, email, password);
    if (response.success) {
      setFormData({
        name: "",
        email: "",
        password: "",
      });
      alert(response.message);
      navigate("/login");
    } else {
      alert("Registeration failed");
    }
  };

  return (
    <>
      <div style={{ height: "80vh" }}>
        <div className="container h-100 w-100 d-flex align-items-center justify-content-center mt-5">
          <div className="row w-100 justify-content-center">
            <div className="col-lg-6 col-12">
              <form onSubmit={handleSubmit}>
                <h1 className="mb-3">Register</h1>
                <div className="mb-3">
                  <label htmlFor="nameInput" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    id="nameInput"
                    aria-describedby="emailHelp"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <div id="emailHelp" className="form-text">
                    We'll never share your email with anyone else.
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
