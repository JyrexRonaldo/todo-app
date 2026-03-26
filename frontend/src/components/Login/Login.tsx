function Login() {
  return (
    <div className="flex flex-col gap-3 rounded-[5px] bg-white p-7 font-josefin-sans drop-shadow-2xl">
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-[14px]/[100%]">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          className="rounded-[5px] border border-[#C8CBE7] p-[8px]"
          id=""
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-[14px]/[100%]">
          Password
        </label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          className="rounded-[5px] border border-[#C8CBE7] p-[8px]"
          id=""
        />
      </div>
      <button className="cursor-pointer rounded-[5px] bg-[#3A7CFD] p-[10px] text-white transition duration-300 hover:bg-blue-600">
        Login
      </button>
      <a
        className="cursor-pointer text-center text-[14px]/[100%] text-[#3A7CFD]"
        href=""
      >
        Don't have an account? Create one
      </a>
    </div>
  );
}

export default Login;
