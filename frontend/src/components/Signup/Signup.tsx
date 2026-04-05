import { Link } from "react-router";
import { useState } from "react";
import { useNavigate } from "react-router";

type BackendErrorsType = string[] | null;

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [backendErrors, setBackendErrors] = useState<BackendErrorsType>(null);
  let passwordVerification = null;
  const navigate = useNavigate();

  async function handleSignUpButton(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    e.preventDefault();
    // if (email === "" || password === "" || confirmPassword === "") {
    //   setErrorMessage("Various fields cannot be empty");
    //   return;
    // }
    // if (password !== confirmPassword) {
    //   return;
    // }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_HOME_DOMAIN}/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        },
      );
      const data = await response.json();

      if (response.status === 400) {
        setBackendErrors(data);
      }

      if (response.status === 500) {
        setErrorMessage(data.message);
      }

      localStorage.setItem("userToken", `${data.token}`);
      localStorage.setItem("userId", `${data.userId}`);
      if (response.ok) {
        setErrorMessage("");
        setTimeout(() => {
          navigate("/");
        }, 250);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleEmailInput(
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) {
    setEmail(e.target.value);
    if (email !== "" || password !== "" || confirmPassword !== "") {
      setErrorMessage("");
      return;
    }
  }

  function handlePasswordInput(
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) {
    setPassword(e.target.value);
    if (email !== "" || password !== "" || confirmPassword !== "") {
      setErrorMessage("");
      return;
    }
  }

  function handleConfirmPasswordInput(
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) {
    setConfirmPassword(e.target.value);
    if (email !== "" || password !== "" || confirmPassword !== "") {
      setErrorMessage("");
      return;
    }
  }

  if (password != confirmPassword) {
    passwordVerification = "Password do not match!";
  } else {
    passwordVerification = null;
  }

  console.log(backendErrors);

  const backErr = backendErrors?.map((err, index) => (
    <p className="text-sm text-red-400" key={index}>{err}</p>
  ));

  return (
    <form className="flex flex-col gap-3 rounded-[5px] bg-white p-7 font-josefin-sans drop-shadow-2xl dark:bg-[#25273D] dark:text-[#E3E4F1]">
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-[14px]/[100%]">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          className="rounded-[5px] border border-[#C8CBE7] p-[8px] dark:border-[#393A4B] dark:bg-[#171823]"
          id="email"
          value={email}
          onChange={handleEmailInput}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-[14px]/[100%]">
          Create Password
        </label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          className="rounded-[5px] border border-[#C8CBE7] p-[8px] dark:border-[#393A4B] dark:bg-[#171823]"
          id="password"
          autoComplete="true"
          value={password}
          onChange={handlePasswordInput}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="confirm-password" className="text-[14px]/[100%]">
          Confirm Password
        </label>
        <input
          type="password"
          name="confirm-password"
          placeholder="Confirm your password"
          className="rounded-[5px] border border-[#C8CBE7] p-[8px] dark:border-[#393A4B] dark:bg-[#171823]"
          id="confirm-password"
          autoComplete="true"
          value={confirmPassword}
          onChange={handleConfirmPasswordInput}
        />
        {backErr}
        <p className="text-sm text-red-400">{passwordVerification}</p>
        <p className="text-sm text-red-400">{errorMessage}</p>
      </div>
      <button
        onClick={handleSignUpButton}
        className="cursor-pointer rounded-[5px] bg-[#3A7CFD] p-[10px] text-white transition duration-300 hover:bg-blue-600 active:scale-105 dark:bg-blue-600 dark:hover:bg-[#3A7CFD]"
      >
        Create New Account
      </button>
      <Link
        className="cursor-pointer text-center text-[14px]/[100%] text-[#3A7CFD] transition duration-300 hover:text-blue-400 hover:underline dark:text-[#E3E4F1]"
        to="/login"
      >
        Already have an account? Login
      </Link>
    </form>
  );
}

export default Signup;
