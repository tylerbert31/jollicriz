"use client";
import React, { useState } from "react";
import { showToast } from "@/util/sweetalert2/toast";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import BrowserModel from "@/lib/models/browser_model";

const cookies = new Cookies();

const LoginForm = () => {
  const [username, setUser] = useState("");
  const [password, setPass] = useState("");
  const [isLoading, loading] = useState(false);
  const router = useRouter();

  const login = async (e) => {
    e.preventDefault();

    loading(true);
    const log = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    }).then((res) => res.json());

    if (log.status === 200) {
      showToast("success", "Success");
      cookies.set(BrowserModel.authCookieName, log.hash, {
        path: "/",
        secure: true,
      });
      setTimeout(() => {
        router.push("/home");
      }, 1300);
    } else {
      showToast("error", "Account Invalid");
      loading(false);
    }
  };
  return (
    <form className="space-y-4" onSubmit={login}>
      <div>
        <label
          className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          htmlFor="username"
        >
          Username
        </label>
        <input
          className="block w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-50 dark:focus:border-indigo-400 dark:focus:ring-indigo-400 dark:border-gray-800"
          id="username"
          placeholder="Enter your username"
          required
          type="text"
          onChange={(e) => {
            setUser(e.target.value);
          }}
          disabled={isLoading}
        />
      </div>
      <div>
        <label
          className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="block w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-50 dark:focus:border-indigo-400 dark:focus:ring-indigo-400 dark:border-gray-800"
          id="password"
          placeholder="Enter your password"
          required
          type="password"
          onChange={(e) => setPass(e.target.value)}
          disabled={isLoading}
        />
      </div>
      <button
        className={`w-full rounded-md bg-gray-600 py-2 px-4 ${
          isLoading ? "opacity-40" : ""
        } text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-indigo-400 dark:focus:ring-offset-gray-900`}
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
