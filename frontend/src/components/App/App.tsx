import TodoItem from "../TodoItem/TodoItem";

function App() {
  return (
    <>
      <div className="relative flex h-screen flex-col items-center bg-[#FAFAFA]">
        <picture className="w-full">
          <source srcSet="/bg-desktop-light.jpg" media="(width >= 640px)" />
          <img
            className="h-auto w-full object-cover"
            src="/bg-mobile-light.jpg"
            alt="MDN"
          />
        </picture>
        <div className="absolute top-[48px] h-screen w-full bg-red-600/0  ">
          <div className=" px-[20px] flex max-w-[540px] mx-auto flex-col gap-[40px]">
            <div className="flex items-center justify-between">
              <p className="text-[30px] tracking-[0.4em] text-white">TODO</p>
              <img src="/icon-moon.svg" alt="" />
            </div>
            <div className="flex flex-col gap-[16px]">
              <div className="flex h-[48px] items-center rounded-[5px] bg-white px-[20.11px] text-[12px]/[100%]">
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
                <div className="flex h-[48px] items-center rounded-b-[5px] bg-white px-[20.11px] py-[16px] text-[12px]/[100%]">
                  <div className="flex justify-between w-full text-[#9495A5]">
                    <div className="text-[12px]/[100%] tracking-[-0.25px]">
                      5 items left
                    </div>
                    <div>Clear Completed</div>
                  </div>
                </div>
              </div>
              <div className="flex h-[48px] items-center justify-center gap-[10px] rounded-[5px] bg-white font-josefin-sans text-[14px]/[100%] tracking-[-0.25px] text-[#9495A5]">
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
      </div>
    </>
  );
}

export default App;
