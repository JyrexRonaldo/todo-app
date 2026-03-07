type TodoItemProps = {
  taskName: string;
};

function TodoItem({ taskName }: TodoItemProps) {
  return (
    <div className="flex h-[48px] w-[327px] items-center justify-center bg-white text-[12px]/[100%]">
      <div className="flex h-[20px] w-[286.79] items-center justify-center">
        <input type="checkbox" name="" id="" />
        <p>{taskName}</p>
        <button>
          <img src="/icon-cross.svg" alt="" />
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
