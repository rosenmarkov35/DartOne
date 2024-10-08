import { useState } from "react";
import axios from "axios";
import InputField from "../ui/InputField";
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'
import { useAuth } from "../../contexts/authContext";

export default function SignInForm() {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [localAuthState, setLocalAuthState] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  axios.defaults.headers.common['X-CSRFToken'] = Cookies.get('csrftoken');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(formData.username, formData.password);
    if (success) {
        setLocalAuthState(true); // Immediately update local state
        navigate('/');
    } else {
        setError('An error occured during login.')
    }
};

  return (
    <>
      <main className="flex flex-col items-center h-full w-full">
        <div className="flex flex-col justify-evenly items-center mt-12 dark:bg-dark-gray py-8 bg-offwhite h-full xl:w-1/3 w-3/4 sm:w-1/2 rounded-2xl">
          <h1 className="dark:text-offwhite text-dark-gray mb-12 text-4xl font-bold">
            Sign in
          </h1>
          <form className="flex flex-col justify-evenly gap-5 items-center w-4/5" onSubmit={handleSubmit}>
            <InputField
              type={"text"}
              onChange={handleChange}
              name={"username"}
              placeholder={"Username"}
            ></InputField>
            <InputField
              type={"password"}
              onChange={handleChange}
              name={"password"}
              placeholder={"Password"}
            ></InputField>
            <button
              type="submit"
              className="bg-dark-gray dark:bg-offwhite text-offwhite
           dark:text-dark-gray hover:text-violet-400 transition-all text-xl my-8 p-2 px-4 rounded-md"
            >
              Sign in
            </button>
          </form>
          <Link
            to={"/account/signup"}
            className="transition-all text-violet-500 -mt-3 hover:text-violet-800"
          >
            Don't have an account?
          </Link>
          <p className="min-h-6 text-red-500">{error && error}</p>
        </div>
      </main>
    </>
  );
}
