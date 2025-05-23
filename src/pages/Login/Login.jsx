import React, { useContext } from "react";
import "./Login.scss";
import Input from "../../comp/input/Input";
import axios from "axios";
import UseForm from "../../UseForm";
import loginValidation from "../../validation/Login";
import { UserContext } from "../../../Context";

const Login = () => {

  const {getUserData} = useContext(UserContext)
  const formObj = {
    email: "harsh@pandozasolutions.com",
    password: "Harsh@123",
  };

  const loginForm = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}AuthController/Login`,
        values
      );
      if (response.status === 200) {
        const { token, uid,role } = response.data.data;
        localStorage.setItem("token", token);
        localStorage.setItem("id", uid);
        localStorage.setItem("role", role);
        getUserData(uid,token)
        window.location.href = "/";
      }

      
    } catch (error) {
      console.log(error);
      if (error.status === 404) {
        setError({ email: "Invalid credentials" });
      }
    }
  };

  const { handleChange, handleSubmit, values, error, setError } = UseForm(
    formObj,
    loginValidation,
    loginForm
  );

  return (
    <>
      <div className="parent login">
        <div className="cont login-cont">
          <div className="left bg-img-cover"></div>
          <form className="right" onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div className="form-row">
              <Input
                placeholder="email"
                label="Email"
                name="email"
                value={values.email}
                onchange={handleChange}
                error={error.email}
              />
            </div>
            <div className="form-row">
              <Input
                type="password"
                placeholder="password"
                label="Password"
                name="password"
                value={values.password}
                error={error.password}
                password={true}
                onchange={handleChange}
              />
            </div>
            <a href="/otp">Forgot Password?</a>
            <button class="btn login-btn" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
