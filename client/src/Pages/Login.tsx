import React, { useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../contexts/authContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { setToken, expireDate } = useContext(AuthContext);

  const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    console.log("username,password", username, password);
    e.preventDefault();
    const {
      data: { token },
    } = await axios.post("http://localhost:4000/auth/login", {
      username,
      password,
    });
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem(
      "expireDate",
      expireDate ? expireDate.toString() : ""
    );
  };

  return (
    <div className="flex items-center justify-center min-h-scree">
      <div className="max-w-md w-full space-y-8">
        <form className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="inline-flex items-center px-4 py-2 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500 focus:outline-none"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
