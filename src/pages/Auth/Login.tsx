import { useState } from "react";
import LoginForm from "../../components/LoginForm";

import { useLogin } from "../../hooks/useLogin";
import { Navigate, useNavigate } from "react-router-dom";
const isAuthenticated = () => Boolean(localStorage.getItem("token"));
const Login = () => {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const loginMutation = useLogin();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    loginMutation.mutate(
      { email, password },
      {
        onSuccess: (data) => {
          localStorage.setItem("token", data.token);
          navigate("/dashboard");
        },
        onError: () => {
          setError("Invalid email or password");
        },
      }
    );
  };
    if (isAuthenticated()) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="bg-[url('/login-bg.png')] min-h-screen">
      <div className="flex items-center justify-around min-h-screen bg-black/40 ">
        <h1 className="text-white font-semibold text-[32px] leading-10 tracking-[2%] bg-[#1A1A1A1A] w-fit">
          Welcome to the <br /> Crowd Management System
        </h1>
        <LoginForm
          onSumbit={handleSubmit}
          handleUsernameChange={setUsername}
          handlePasswordChange={setPassword}
          error={error}
          isLoading={loginMutation.isPending}
        />
      </div>
    </div>
  );
};

export default Login;
