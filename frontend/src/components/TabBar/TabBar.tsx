import clsx from "clsx";

function TabBar({
  list,
  setList,
}: {
  list: string;
  setList: React.Dispatch<React.SetStateAction<string>>;
}) {
  function handleActiveButton(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    console.log(e.currentTarget.dataset.value);
    setList(e.currentTarget.dataset.value as string);
  }
  function handleAllButton(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    console.log(e.currentTarget.dataset.value);
    setList(e.currentTarget.dataset.value as string);
  }
  function handleCompletedButton(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    console.log(e.currentTarget.dataset.value);
    setList(e.currentTarget.dataset.value as string);
  }

  return (
    <div className="flex h-[48px] items-center justify-center gap-[10px] rounded-[5px] bg-white font-josefin-sans text-[14px]/[100%] tracking-[-0.25px] text-[#9495A5] *:hover:text-[#494C6B] dark:bg-[#25273D] dark:text-[#5B5E7E] *:dark:hover:text-[#C8CBE7]">
      <button
        onClick={handleActiveButton}
        data-value="all"
        className={clsx(list === "all" && "text-[#3A7CFD]")}
      >
        All
      </button>
      <button
        onClick={handleAllButton}
        data-value="active"
        className={clsx(list === "active" && "text-[#3A7CFD]")}
      >
        Active
      </button>
      <button
        onClick={handleCompletedButton}
        data-value="completed"
        className={clsx(list === "completed" && "text-[#3A7CFD]")}
      >
        Completed
      </button>
    </div>
  );
}

export default TabBar;
