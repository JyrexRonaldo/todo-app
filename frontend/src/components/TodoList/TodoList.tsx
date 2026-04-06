import TabBar from "../TabBar/TabBar";
import { useState, useEffect } from "react";
import TodoItem from "../TodoItem/TodoItem";
import { DragDropProvider } from "@dnd-kit/react";
import { isSortable } from "@dnd-kit/react/sortable";

type AllTodos = {
  id: number;
  text: string;
  completed: boolean;
  position: number;
}[];

function TodoList() {
  const [todoText, setTodoText] = useState("");
  const [allTodos, setAllTodos] = useState<AllTodos>([]);
  const [list, setList] = useState("all");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_HOME_DOMAIN}/api/todos?userId=${localStorage.getItem("userId")}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${localStorage.getItem("userToken")}`,
            },
          },
        );

        const data: AllTodos = await response.json();

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
              Authorization: `${localStorage.getItem("userToken")}`,
            },
            body: JSON.stringify({
              userId: `${localStorage.getItem("userId")}`,
              text: `${todoText}`,
              position: allTodos.length,
            }),
          },
        );

        const data: AllTodos = await response.json();
        setAllTodos([...allTodos, ...data]);
      } catch (error) {
        console.log(error);
      }
      setTodoText("");
    }
  }

  async function handleDeleteTodo(todoId: number) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_HOME_DOMAIN}/api/todos/${todoId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("userToken")}`,
          },
        },
      );

      const responseData = await response.json();
      const remainingTodos = allTodos.filter(
        (element) => element.id !== responseData[0].id,
      );
      remainingTodos.forEach((element, index) => (element.position = index));
      setAllTodos([...remainingTodos]);
      updateItemPosition();
    } catch (error) {
      console.log(error);
    }
  }

  async function updateItemPosition() {
    const positions = allTodos.map((element) => {
      return { todoId: element.id, position: element.position };
    });

    try {
      const response = await fetch(
        `${import.meta.env.VITE_HOME_DOMAIN}/api/todos`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("userToken")}`,
          },
          body: JSON.stringify({
            positions,
          }),
        },
      );

      await response.json();
    } catch (error) {
      console.log(error);
    }
  }

  async function clearCompletedHandler() {
    console.log("cleared");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_HOME_DOMAIN}/api/todos`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("userToken")}`,
          },
        },
      );

      const data = await response.json();
      setAllTodos(allTodos.filter((todoItem) => !data.includes(todoItem.id)));
    } catch (error) {
      console.log(error);
    }
  }

  async function handleInput(completeStatus: boolean, todoId: number) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_HOME_DOMAIN}/api/todos/${todoId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("userToken")}`,
          },
          body: JSON.stringify({
            completeStatus: completeStatus,
          }),
        },
      );

      const data = await response.json();
      const updatedItemIndex = allTodos.findIndex(
        (todo) => todo.id === data.todo.id,
      );
       allTodos.splice(updatedItemIndex, 1, data.todo)
      // console.log(updatedItemIndex);
      // console.log(data.todo);
      // console.log(allTodos);
      // setAllTodos([...allTodos, data.todo]);
      // console.log(updatedTodoList)
      console.log(allTodos)
      setAllTodos([...allTodos]);
    } catch (error) {
      console.log(error);
    }
  }

  let todoElements = null;

  if (list === "all") {
    todoElements = allTodos
      .sort((a, b) => a.position - b.position)
      .map((element, index) => {
        return (
          <TodoItem
            key={element.id}
            taskName={element.text}
            todoId={element.id}
            deleteHandler={handleDeleteTodo}
            status={element.completed}
            id={element.id}
            index={index}
            handleStatusInput={handleInput}
          />
        );
      });
  } else if (list === "active") {
    todoElements = allTodos
      .filter((element) => element.completed === false)
      .sort((a, b) => a.position - b.position)
      .map((element, index) => {
        return (
          <TodoItem
            key={element.id}
            taskName={element.text}
            todoId={element.id}
            deleteHandler={handleDeleteTodo}
            status={element.completed}
            id={element.id}
            index={index}
            handleStatusInput={handleInput}
          />
        );
      });
  } else if (list === "completed") {
    todoElements = allTodos
      .filter((element) => element.completed === true)
      .sort((a, b) => a.position - b.position)
      .map((element, index) => {
        return (
          <TodoItem
            key={element.id}
            taskName={element.text}
            todoId={element.id}
            deleteHandler={handleDeleteTodo}
            status={element.completed}
            id={element.id}
            index={index}
            handleStatusInput={handleInput}
          />
        );
      });
  }

  return (
    <>
      <DragDropProvider
        onDragEnd={async (event) => {
          if (event.canceled) return;

          const { source } = event.operation;

          if (isSortable(source)) {
            const { initialIndex, index } = source;

            if (initialIndex !== index) {
              const newItems = [...allTodos];
              const [removed] = newItems.splice(initialIndex, 1);
              newItems.splice(index, 0, removed);
              newItems.forEach((item, index) => (item.position = index));
              await updateItemPosition();
              setAllTodos(newItems);
            }
          }
        }}
      >
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
                  {allTodos.length} items left
                </div>
                <div className="hidden sm:block">
                  <TabBar list={list} setList={setList} />
                </div>
                <button
                  onClick={clearCompletedHandler}
                  className="text-[12px]/[100%] tracking-[-0.25px] hover:text-[#494C6B] active:text-[#3A7CFD] sm:text-[14px] dark:hover:text-[#C8CBE7]"
                >
                  Clear Completed
                </button>
              </div>
            </div>
          </div>
          <div className="sm:hidden">
            <TabBar list={list} setList={setList} />
          </div>
        </div>
        <p className="self-center font-josefin-sans text-[14px]/[100%] tracking-[-0.25px] text-[#9495A5] dark:text-[#5B5E7E]">
          Drag and drop to reorder list
        </p>
      </DragDropProvider>
    </>
  );
}

export default TodoList;
