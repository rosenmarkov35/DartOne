import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../ui/InputField";

export default function SignUpForm() {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      const response = await axios.post("/api/signup/", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      console.log("User created successfully", response.data);
      // Redirect to login page or dashboard
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred during sign up"
      );
    }
  };

  return (
    <>
      <main className="flex flex-col items-center h-screen w-screen">
        <div className="flex flex-col items-center justify-evenly mt-12 dark:bg-dark-gray bg-offwhite h-3/4 w-1/3 rounded-2xl">
          <h1 className="dark:text-offwhite text-dark-gray -mt-4 text-4xl font-bold">
            Sign up
          </h1>
          <form
            className="flex flex-col justify-evenly gap-5 items-center w-4/5"
            onSubmit={handleSubmit}
          >
            <InputField
              onChange={handleChange}
              type={"text"}
              name={"username"}
              value={formData.username}
              placeholder={"Username"}
            ></InputField>
            <InputField
              onChange={handleChange}
              type={"text"}
              name={"email"}
              value={formData.email}
              placeholder={"Email"}
            ></InputField>
            <InputField
              onChange={handleChange}
              type={"text"}
              name={"password"}
              value={formData.password}
              placeholder={"Password"}
            ></InputField>
            <InputField
              onChange={handleChange}
              type={"text"}
              name={"confirm-password"}
              value={formData.confirmPassword}
              placeholder={"Confirm Password"}
            ></InputField>
            <button className="bg-dark-gray dark:bg-offwhite text-offwhite dark:text-dark-gray hover:text-violet-400 mt-5 transition-all text-xl p-2 px-4 rounded-md">
              Sign up
            </button>
            <Link
              to={"/account/sign-in"}
              className="transition-all mt-3 text-violet-500 hover:text-violet-800"
            >
              Already have an account?
            </Link>
          </form>
          <p className="min-h-6 text-red-500">{error && error}</p>
        </div>
      </main>
    </>
  );
}
