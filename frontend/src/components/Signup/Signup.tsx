import { Link } from "react-router";

function Signup() {
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
        />
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
