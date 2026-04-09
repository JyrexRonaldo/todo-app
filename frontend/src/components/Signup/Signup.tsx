import { Link } from "react-router";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form";

type BackendErrorsType = string[] | null;

type SignUpFormType = {
  email: string;
  password: string;
  confirmPassword: string;
};

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<SignUpFormType>();
  const [backendErrors, setBackendErrors] = useState<BackendErrorsType>(null);
  const navigate = useNavigate();

  async function handleSignUpButton(email: string, password: string) {
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
        setBackendErrors(data.message);
      }

      localStorage.setItem("userToken", `${data.token}`);
      localStorage.setItem("userId", `${data.userId}`);
      if (response.ok) {
        // setErrorMessage("");
        setTimeout(() => {
          navigate("/");
        }, 250);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const backErr = backendErrors?.map((err, index) => (
    <p className="text-sm text-red-400" key={index}>
      {err}
    </p>
  ));

  const onSubmit: SubmitHandler<SignUpFormType> = (formData) => {
    console.log(formData);
    handleSignUpButton(formData.email, formData.password);
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3 rounded-[5px] bg-white p-7 font-josefin-sans drop-shadow-2xl dark:bg-[#25273D] dark:text-[#E3E4F1]"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-[14px]/[100%]">
          Email Address
        </label>
        <input
          type="email"
          {...register("email", {
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Please enter valid email address",
            },
            required: "Please enter email address",
          })}
          placeholder="Enter your email"
          className="rounded-[5px] border border-[#C8CBE7] p-[8px] dark:border-[#393A4B] dark:bg-[#171823]"
          id="email"
        />
        {errors.email && (
          <p className="text-sm text-red-400">{errors.email.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-[14px]/[100%]">
          Create Password
        </label>
        <input
          type="password"
          {...register("password", {
            minLength: {
              value: 6,
              message: "Password cannot be less than 6 characters",
            },
            required: "Please enter password address",
          })}
          placeholder="Enter your password"
          className="rounded-[5px] border border-[#C8CBE7] p-[8px] dark:border-[#393A4B] dark:bg-[#171823]"
          id="password"
          autoComplete="true"
        />
        {errors.password && (
          <p className="text-sm text-red-400">{errors.password.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="confirm-password" className="text-[14px]/[100%]">
          Confirm Password
        </label>
        <input
          type="password"
          {...register("confirmPassword", {
            minLength: {
              value: 6,
              message: "Password cannot be less than 6 characters",
            },
            required: "Please enter password address",
            validate: {
              passwordNotMatch: (values) => {
                if (getValues().password !== values) {
                  return "Password do not match!";
                }
                return true;
              },
            },
          })}
          placeholder="Confirm your password"
          className="rounded-[5px] border border-[#C8CBE7] p-[8px] dark:border-[#393A4B] dark:bg-[#171823]"
          id="confirm-password"
          autoComplete="off"
        />
        {backErr}
        {errors.confirmPassword && (
          <p className="text-sm text-red-400">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
      <button className="cursor-pointer rounded-[5px] bg-[#3A7CFD] p-[10px] text-white transition duration-300 hover:bg-blue-600 active:scale-105 dark:bg-blue-600 dark:hover:bg-[#3A7CFD]">
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
