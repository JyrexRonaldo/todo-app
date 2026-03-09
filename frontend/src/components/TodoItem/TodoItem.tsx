type TodoItemProps = {
  taskName: string;
};

function TodoItem({ taskName }: TodoItemProps) {
  return (
    <div className="flex h-[48px] min-w-[327px] items-center px-[20.11px] py-[16px] first:rounded-t-[5px]">
      <div className="flex min-w-[286.79px] justify-between">
        <div className="flex items-center gap-[16px]">
          <input
            className="relative h-[20px] w-[20px] appearance-none rounded-[50%] border border-[#979797] align-[-2px] text-white before:invisible before:absolute before:top-[-1px] before:right-[-1px] before:block before:size-[20px] before:rounded-full before:bg-linear-135 before:from-[hsl(192,100%,67%)] before:to-[hsl(280,87%,65%)] after:invisible after:absolute after:top-[-1px] after:left-[3.5px] after:block after:text-[13px] after:content-['✓'] checked:before:visible checked:after:visible"
            type="checkbox"
            name=""
            id=""
          />
          <p className="font-josefin-sans text-[12px]/[100%] tracking-[-0.25px] text-[#494C6B]">
            {taskName}
          </p>
        </div>
        <button>
          <img src="/icon-cross.svg" alt="" />
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
