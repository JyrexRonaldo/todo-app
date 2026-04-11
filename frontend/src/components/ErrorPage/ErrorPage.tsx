import { Link } from "react-router";

const theme = localStorage.getItem("theme");

const ErrorPage = () => {
  return (
    <div
      className={`${theme} flex h-screen items-center justify-center bg-[#FAFAFA] text-center font-josefin-sans text-[#494C6B] dark:bg-[#25273D] dark:text-[#E3E4F1]`}
    >
      <div>
        <h1>Oh no, this route doesn't exist!</h1>
        <Link to="/" className="hover:text-[#3A7CFD]">
          You can go back to the home page by clicking here, though!
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
