import TodoItem from "../TodoItem/TodoItem";
import TabBar from "../TabBar/TabBar";

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
        <div className="absolute top-[48px] h-screen w-full bg-red-600/0">
          <div className="mx-auto flex max-w-[540px] flex-col gap-[40px] px-[20px]">
            <div className="flex items-center justify-between">
              <p className="text-[30px] tracking-[0.4em] text-white">TODO</p>
              <img src="/icon-moon.svg" alt="" />
            </div>
            <div className="flex flex-col gap-[16px] drop-shadow-2xl">
              <div className="flex h-[48px] items-center rounded-[5px] bg-white px-[20.11px] text-[12px]/[100%]">
                <div className="mr-[16px] h-[20px] w-[20px] rounded-[50%] border border-[#979797]"></div>
                <input
                  type="text"
                  placeholder="Create a new todo..."
                  name=""
                  id=""
                  className="w-full text-[12px]/[100%] outline-none"
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
                  <div className="flex w-full items-center justify-between text-[#9495A5]">
                    <div className="text-[12px]/[100%] tracking-[-0.25px]">
                      5 items left
                    </div>
                    <div className="hidden sm:block">
                      <TabBar />
                    </div>
                    <div>Clear Completed</div>
                  </div>
                </div>
              </div>
              <div className="sm:hidden">
                <TabBar />
              </div>
            </div>
            <p className="self-center text-[14px]/[100%] tracking-[-0.25px] text-[#9495A5]">
              Drag and drop to reorder list
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
