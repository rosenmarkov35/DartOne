import { useState } from "react";
import axios from "axios";
import InputField from "../ui/InputField";
import { Link } from "react-router-dom";    

export default function SignInForm() {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  return (
    <>
      <main className="flex flex-col items-center h-screen w-screen">
        <div className="flex flex-col justify-evenly items-center mt-12 dark:bg-dark-gray bg-offwhite h-4/6 w-1/3 rounded-2xl">
          <h1 className="dark:text-offwhite text-dark-gray text-4xl font-bold">
            Sign in
          </h1>
          <InputField
            type={"text"}
            name={"username"}
            placeholder={"Username"}
          ></InputField>
          <InputField
            type={"text"}
            name={"password"}
            placeholder={"Password"}
          ></InputField>
          <button className="bg-dark-gray dark:bg-offwhite text-offwhite
           dark:text-dark-gray hover:text-violet-400 transition-all text-xl p-2 px-4 rounded-md">
            Sign in
          </button>
          <Link to={'/account/sign-up'} className="transition-all text-violet-500 -mt-8 hover:text-violet-800">Don't have an account?</Link>
        </div>
      </main>
    </>
  );
}
