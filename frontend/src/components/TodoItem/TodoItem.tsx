type TodoItemProps = {
  taskName: string;
  todoId: number
  deleteHandler: (todoId: number) => Promise<void>
};

function TodoItem({ taskName, todoId, deleteHandler }: TodoItemProps) {

  return (
    <div className="group flex h-[48px] items-center px-[20.11px] py-[16px] first:rounded-t-[5px]">
      <div className="flex w-full items-center gap-[16px]">
        <input
          className="custom-hover relative h-[20px] w-[20px] appearance-none rounded-[50%] border border-[#979797] align-[-2px] text-white before:invisible before:absolute before:top-[-1px] before:right-[-1px] before:block before:size-[20px] before:rounded-full before:bg-linear-135 before:from-[hsl(192,100%,67%)] before:to-[hsl(280,87%,65%)] after:invisible after:absolute after:top-[-1px] after:left-[3.5px] after:block after:text-[13px] after:content-['✓'] checked:before:visible checked:after:visible dark:border-[#393A4B]"
          type="checkbox"
          name=""
          id=""
        />
        <p className="w-[220px] flex-1 truncate font-josefin-sans text-[12px]/[100%] tracking-[-0.25px] text-[#494C6B] sm:text-[18px]/[100%] dark:text-[#E3E4F1]">
          {taskName}
        </p>
        <button className="opacity-0 group-hover:opacity-100" onClick={() => {deleteHandler(todoId)}}>
          <img src="/icon-cross.svg" alt="" />
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
