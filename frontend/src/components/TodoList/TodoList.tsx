import TabBar from "../TabBar/TabBar";
import { useState, useEffect } from "react";
import TodoItem from "../TodoItem/TodoItem";

function TodoList() {
  const [todoText, setTodoText] = useState("");
  const [allTodos, setAllTodos] = useState<
    Array<{
      id: number;
      text: string;
    }>
  >([]);

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
          text: string;
        }> = await response.json();

        setAllTodos(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  function handleTodoInput(
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) {
    setTodoText(e.target.value);
  }

  async function handleAddTodo(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      if (todoText.trim() === "") {
        return;
      }
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
              userId: `${self.crypto.randomUUID()}`,
              text: `${todoText}`,
              position: Math.floor(Math.random() * 10000000),
            }),
          },
        );

        const data: Array<{
          id: number;
          text: string;
        }> = await response.json();
        // if (allTodos !== null) {
        console.log(data, "line 45");
        setAllTodos([...allTodos, ...data]);
        // }
      } catch (error) {
        console.log(error);
      }
      setTodoText("");
    }
  }

  const todoElements = allTodos.map((element: { id: number; text: string }) => {
    const text = element.text;
    return <TodoItem key={self.crypto.randomUUID()} taskName={text} />;
  });

  return (
    <>
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
            value={todoText}
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
    </>
  );
}

export default TodoList;
