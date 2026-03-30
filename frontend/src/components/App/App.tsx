import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";

function App() {
  const [mode, setMode] = useState(localStorage.getItem("theme") || "light");
  let iconImgUrl = "";
  let bgImgUrl = "";
  let bgDesktopImgUrl = "";

  const location = useLocation();
  const navigate = useNavigate();

  function handleDarkModeToggle() {
    if (mode === "light") {
      localStorage.setItem("theme", "dark");
      setMode("dark");
    } else {
      localStorage.setItem("theme", "light");
      setMode("light");
    }
  }

  function handleLogout() {
    localStorage.clear();
    navigate("/login");
  }

  useEffect(() => {
    if (mode === "light") {
      document.body.classList.remove("dark");
    } else {
      document.body.classList.add("dark");
    }
    return () => {
      document.body.classList.remove("your-class-name");
    };
  }, [mode]);

  if (mode === "light") {
    iconImgUrl = "/icon-moon.svg";
    bgImgUrl = "/bg-mobile-light.jpg";
    bgDesktopImgUrl = "/bg-desktop-light.jpg";
  } else {
    iconImgUrl = "/icon-sun.svg";
    bgImgUrl = "/bg-mobile-dark.jpg";
    bgDesktopImgUrl = "/bg-desktop-dark.jpg";
  }

  return (
    <>
      <div
        className={`${mode} relative flex h-screen flex-col items-center bg-[#FAFAFA] dark:bg-[#171823]`}
      >
        <picture className="w-full">
          <source srcSet={`${bgDesktopImgUrl}`} media="(width >= 640px)" />
          <img
            className="h-auto w-full object-cover"
            src={`${bgImgUrl}`}
            alt="MDN"
          />
        </picture>
        <div className="absolute h-screen w-full bg-red-600/0">
          <div className="mx-auto mt-[48px] flex max-w-[540px] flex-col gap-[40px] px-[20px]">
            <div className="flex items-center justify-between">
              <p className="text-[30px] tracking-[0.4em] text-white">TODO</p>
              <div className="flex items-center gap-3">
                {location.pathname === "/login" ||
                location.pathname === "/signup" ? null : (
                  <button
                    className="font-josefin-sans text-[12px]/[100%] text-white"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                )}
                <img
                  onClick={handleDarkModeToggle}
                  src={`${iconImgUrl}`}
                  alt=""
                  className="transition duration-150 active:rotate-360"
                />
              </div>
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
