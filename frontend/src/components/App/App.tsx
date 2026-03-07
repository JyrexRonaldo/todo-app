import TodoItem from "../TodoItem/TodoItem";

function App() {
  return (
    <>
      <div className="flex h-screen flex-col items-center bg-[#FAFAFA]">
        <picture className="self-stretch">
          <source srcSet="/bg-desktop-light.jpg" media="(width >= 640px)" />
          <img
            className="h-auto w-full object-cover"
            src="/bg-mobile-light.jpg"
            alt="MDN"
          />
        </picture>
        <div className="fixed top-[48px] mx-[24px] mt-[48px] flex min-w-[327px] flex-col gap-[40px]">
          <div className="flex justify-between">
            <p>TODO</p>
            <img src="/icon-moon.svg" alt="" />
          </div>
          <div>
            <input
              type="text"
              placeholder="Create a new todo..."
              name=""
              id=""
            />
            <div>
              <TodoItem taskName="jog around the park 3x" />
              <TodoItem taskName="10 minutes meditation" />
              <TodoItem taskName="Read for 1 hour" />
              <TodoItem taskName="Pick up groceries" />
              <TodoItem taskName="Complete Todo App on Frontend Mentor" />
            </div>
            <div className="flex h-[48px] min-w-[327px] items-center justify-center gap-[10px] bg-white">
              <button>All</button>
              <button>Active</button>
              <button>Completed</button>
            </div>
          </div>
          <p>Drag and drop to reorder list</p>
        </div>
      </div>
    </>
  );
}

export default App;
