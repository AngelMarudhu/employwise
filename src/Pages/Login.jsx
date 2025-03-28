import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../Feature/authFeature";
import { setLoginError } from "../Redux/authSlice";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const { isLoading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setLoginError(null));
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password.length < 6) {
      dispatch(
        setLoginError({ error: "Password must be at least 6 characters long" })
      );
      return;
    }

    dispatch(loginUser(formData));
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border-2 border-white rounded-sm p-5 md:p-5 w-full m-4 md:w-1/2 bg-[#1e1e2c]">
        {isLoading ? (
          <h1 className="text-2xl text-white text-center p-3">Logging....</h1>
        ) : (
          <h1 className="text-2xl text-white text-center p-3">Employwise</h1>
        )}
        <form
          action=""
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 m-auto"
        >
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
            value={formData.email}
            required={true}
            className="p-2 border-1 rounded-md text-white bg-[#f29f67]"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
            value={formData.password}
            required={true}
            className="p-2 border-1 rounded-md text-bg text-white bg-[#f29f67]"
          />
          <button
            className="p-2 border text-white w-30 m-auto rounded-lg cursor-pointer "
            type="submit"
          >
            Login
          </button>
        </form>

        {error && <p className="text-red-500">{error?.error}</p>}
      </div>
    </div>
  );
};

export default Login;
