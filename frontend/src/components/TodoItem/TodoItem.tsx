type TodoItemProps = {
  taskName: string;
};

function TodoItem({ taskName }: TodoItemProps) {
  return (
    <div className="flex h-[48px] min-w-[327px] items-center px-[20.11px] py-[16px] text-[12px]/[100%] first:rounded-t-[5px]">
      <div className="flex min-w-[286.79px] justify-between">
        <div className="flex items-center gap-[16px]">
          <input type="checkbox" name="" id="" />
          <p>{taskName}</p>
        </div>
        <button>
          <img src="/icon-cross.svg" alt="" />
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
