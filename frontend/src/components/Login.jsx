import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppState";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const { login } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
    const { email, password } = formData;
    const response = await login(email, password);
    if (response.success) {
      setFormData({
        email: "",
        password: "",
      });
      alert(response.message);
      navigate("/");
    } else {
      alert(response.message);
    }
  };

  return (
    <>
      <div style={{ height: "80vh" }}>
        <div className="container h-100 w-100 d-flex align-items-center justify-content-center mt-5">
          <div className="row w-100 justify-content-center">
            <div className="col-lg-6 col-12">
              <form onSubmit={handleSubmit}>
                <h1 className="mb-3">Login</h1>
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
                <div className="d-flex justify-content-between align-items-center">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                  <Link to={"/register"}>Don't have account click here</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
