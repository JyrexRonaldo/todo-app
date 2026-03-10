import TodoItem from "../TodoItem/TodoItem";
import TabBar from "../TabBar/TabBar";
import { useState } from "react";

function App() {
  const [mode, setMode] = useState("light");
  const [iconImgUrl, setIconImgUrl] = useState("/icon-moon.svg");
  const [bgImgUrl, setBgImgUrl] = useState("/bg-mobile-light.jpg");
  const [bgDesktopImgUrl, setBgDesktopImgUrl] = useState(
    "/bg-desktop-light.jpg",
  );

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
        <div className="absolute top-[48px] h-screen w-full bg-red-600/0">
          <div className="mx-auto flex max-w-[540px] flex-col gap-[40px] px-[20px]">
            <div className="flex items-center justify-between">
              <p className="text-[30px] tracking-[0.4em] text-white">TODO</p>
              <img
                onClick={handleDarkModeToggle}
                src={`${iconImgUrl}`}
                alt=""
              />
            </div>
            <div className="flex flex-col gap-[16px] drop-shadow-2xl">
              <div className="flex h-[48px] items-center rounded-[5px] bg-white px-[20.11px] text-[12px]/[100%] dark:bg-[#25273D] dark:text-[#9495A5]">
                <div className="mr-[16px] h-[20px] w-[20px] rounded-[50%] border border-[#979797]"></div>
                <input
                  type="text"
                  placeholder="Create a new todo..."
                  name=""
                  id=""
                  className="w-full font-josefin-sans text-[12px]/[100%] outline-none"
                />
              </div>
              <div className="divide-y divide-[#C8CBE7] rounded-[5px] bg-white dark:divide-[#393A4B] dark:bg-[#25273D]">
                <TodoItem taskName="Complete online JavaScript course" />
                <TodoItem taskName="Jog around the park 3x" />
                <TodoItem taskName="10 minutes meditation" />
                <TodoItem taskName="Read for 1 hour" />
                <TodoItem taskName="Pick up groceries" />
                <TodoItem taskName="Complete Todo App on Frontend Mentor" />
                <div className="flex h-[48px] items-center rounded-b-[5px] bg-white px-[20.11px] py-[16px] text-[12px]/[100%] dark:bg-[#25273D]">
                  <div className="flex w-full items-center justify-between font-josefin-sans text-[#9495A5] dark:text-[#5B5E7E]">
                    <div className="text-[12px]/[100%] tracking-[-0.25px] hover:text-[#494C6B]">
                      5 items left
                    </div>
                    <div className="hidden sm:block">
                      <TabBar />
                    </div>
                    <div className="hover:text-[#494C6B] active:text-[#494C6B]">
                      Clear Completed
                    </div>
                  </div>
                </div>
              </div>
              <div className="sm:hidden">
                <TabBar />
              </div>
            </div>
            <p className="self-center font-josefin-sans text-[14px]/[100%] tracking-[-0.25px] text-[#9495A5] dark:text-[#5B5E7E]">
              Drag and drop to reorder list
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
