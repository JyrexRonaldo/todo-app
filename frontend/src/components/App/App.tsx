import { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router";

function App() {
  const [mode, setMode] = useState("light");
  const [iconImgUrl, setIconImgUrl] = useState("/icon-moon.svg");
  const [bgImgUrl, setBgImgUrl] = useState("/bg-mobile-light.jpg");
  const [bgDesktopImgUrl, setBgDesktopImgUrl] = useState(
    "/bg-desktop-light.jpg",
  );
  const location = useLocation();
  const navigate = useNavigate();

  function handleDarkModeToggle() {
    if (mode === "light") {
      setMode("dark");
      setIconImgUrl("/icon-sun.svg");
      setBgImgUrl("/bg-mobile-dark.jpg");
      setBgDesktopImgUrl("/bg-desktop-dark.jpg");
    } else {
      setMode("light");
      setIconImgUrl("/icon-moon.svg");
      setBgImgUrl("/bg-mobile-light.jpg");
      setBgDesktopImgUrl("/bg-desktop-light.jpg");
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
