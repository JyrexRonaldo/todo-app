import TodoItem from "../TodoItem/TodoItem";
import TabBar from "../TabBar/TabBar";
import { useState, useEffect } from "react";

function App() {
  const [mode, setMode] = useState("light");
  const [iconImgUrl, setIconImgUrl] = useState("/icon-moon.svg");
  const [bgImgUrl, setBgImgUrl] = useState("/bg-mobile-light.jpg");
  const [bgDesktopImgUrl, setBgDesktopImgUrl] = useState(
    "/bg-desktop-light.jpg",
  );
  const [todoTitle, setTodoTitle] = useState("");
  const [allTodos, setAllTodos] = useState<
    Array<{
      id: number;
      title: string;
    }>
  >([]);

  function handleTodoInput(
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) {
    setTodoTitle(e.target.value);
  }

  async function handleAddTodo(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_HOME_DOMAIN}/api/todos`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // Authorization: `${localStorage.getItem('userToken')}`,
            },
            body: JSON.stringify({
              title: `${todoTitle}`,
            }),
          },
        );

        const data: Array<{
          id: number;
          title: string;
        }> = await response.json();
        // if (allTodos !== null) {
        console.log(data, "line 45");
        setAllTodos([...allTodos, ...data]);
        // }
      } catch (error) {
        console.log(error);
      }
      setTodoTitle("");
    }
  }

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

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_HOME_DOMAIN}/api/todos`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        const data: Array<{
          id: number;
          title: string;
        }> = await response.json();

        setAllTodos(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const todoElements = allTodos.map(
    (element: { id: number; title: string }) => {
      const title = element.title;
      return <TodoItem key={self.crypto.randomUUID()} taskName={title} />;
    },
  );

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
              <img
                onClick={handleDarkModeToggle}
                src={`${iconImgUrl}`}
                alt=""
                className="transition duration-150 active:rotate-360"
              />
            </div>
            <div className="flex flex-col gap-[16px] drop-shadow-2xl">
              <div className="flex h-[48px] items-center rounded-[5px] bg-white px-[20.11px] text-[12px]/[100%] dark:bg-[#25273D] dark:text-[#9495A5]">
                <div className="mr-[16px] h-[20px] w-[20px] rounded-[50%] border border-[#979797] dark:border-[#393A4B]"></div>
                <input
                  type="text"
                  placeholder="Create a new todo..."
                  name=""
                  id=""
                  onKeyUp={handleAddTodo}
                  onChange={handleTodoInput}
                  value={todoTitle}
                  className="w-full font-josefin-sans text-[12px]/[100%] outline-none sm:text-[18px]/[100%]"
                />
              </div>
              <div className="divide-y divide-[#C8CBE7] rounded-[5px] bg-white dark:divide-[#393A4B] dark:bg-[#25273D]">
                {allTodos[0] ? (
                  todoElements
                ) : (
                  <div className="flex h-[58px] items-center justify-center">
                    <p className="font-josefin-sans text-[12px]/[100%] tracking-[-0.25px] text-[#9495A5] sm:text-[18px]/[100%] dark:text-[#5B5E7E]">
                      No todos here!
                    </p>
                  </div>
                )}

                <div className="flex h-[48px] items-center rounded-b-[5px] bg-white px-[20.11px] py-[16px] text-[12px]/[100%] dark:bg-[#25273D]">
                  <div className="flex w-full items-center justify-between font-josefin-sans text-[#9495A5] dark:text-[#5B5E7E]">
                    <div className="text-[12px]/[100%] tracking-[-0.25px] sm:text-[14px]">
                      5 items left
                    </div>
                    <div className="hidden sm:block">
                      <TabBar />
                    </div>
                    <div className="text-[12px]/[100%] tracking-[-0.25px] hover:text-[#494C6B] active:text-[#3A7CFD] sm:text-[14px] dark:hover:text-[#C8CBE7]">
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
