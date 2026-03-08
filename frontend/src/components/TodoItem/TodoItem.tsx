type TodoItemProps = {
  taskName: string;
};

function TodoItem({ taskName }: TodoItemProps) {
  return (
    <div className="flex h-[48px] min-w-[327px] items-center px-[20.11px] py-[16px] first:rounded-t-[5px]">
      <div className="flex min-w-[286.79px] justify-between">
        <div className="flex items-center gap-[16px]">
          <input type="checkbox" name="" id="" />
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
