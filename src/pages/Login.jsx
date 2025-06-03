import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  // If user already logged in, redirect immediately
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        const res = await axios.post("http://localhost:5000/auth/google", {
          code: codeResponse.code,
        });
        localStorage.setItem("user", JSON.stringify(res.data));
        navigate("/dashboard");
      } catch (error) {
        console.error("Login failed", error);
      }
    },
    flow: "auth-code", // important for auth-code flow
  });

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <button
        onClick={() => login()}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
