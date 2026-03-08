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
        <div className="fixed top-[48px] flex min-w-[327px] flex-col gap-[40px]">
          <div className="flex items-center justify-between">
            <p className="text-[30px] tracking-[0.4em] text-white">TODO</p>
            <img src="/icon-moon.svg" alt="" />
          </div>
          <div className="flex flex-col gap-[16px]">
            <div className="flex h-[48px] min-w-[327px] items-center rounded-[5px] bg-white px-[20.11px] text-[12px]/[100%]">
              <input
                type="text"
                placeholder="Create a new todo..."
                name=""
                id=""
              />
            </div>
            <div className="divide-y divide-[#C8CBE7] rounded-[5px] bg-white">
              <TodoItem taskName="Complete online JavaScript course" />
              <TodoItem taskName="Jog around the park 3x" />
              <TodoItem taskName="10 minutes meditation" />
              <TodoItem taskName="Read for 1 hour" />
              <TodoItem taskName="Pick up groceries" />
              <TodoItem taskName="Complete Todo App on Frontend Mentor" />
              <div className="flex h-[48px] min-w-[327px] items-center rounded-b-[5px] bg-white px-[20.11px] py-[16px] text-[12px]/[100%]">
                <div className="flex min-w-[286.79px] justify-between text-[#9495A5]">
                  <div className="text-[12px]/[100%] tracking-[-0.25px]">
                    5 items left
                  </div>
                  <div>Clear Completed</div>
                </div>
              </div>
            </div>
            <div className="flex h-[48px] min-w-[327px] items-center justify-center gap-[10px] rounded-[5px] bg-white font-josefin-sans text-[14px]/[100%] tracking-[-0.25px] text-[#9495A5]">
              <button className="hover:text-[#3A7CFD] active:text-[#3A7CFD]">
                All
              </button>
              <button className="hover:text-[#3A7CFD] active:text-[#3A7CFD]">
                Active
              </button>
              <button className="hover:text-[#3A7CFD] active:text-[#3A7CFD]">
                Completed
              </button>
            </div>
          </div>
          <p className="self-center text-[#9495A5]">
            Drag and drop to reorder list
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
