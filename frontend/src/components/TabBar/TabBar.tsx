function TabBar() {
  return (
    <div className="flex h-[48px] items-center justify-center gap-[10px] rounded-[5px] bg-white font-josefin-sans text-[14px]/[100%] tracking-[-0.25px] text-[#9495A5] *:hover:text-[#494C6B] dark:bg-[#25273D] dark:text-[#5B5E7E]">
      <button className="active:text-[#3A7CFD]">All</button>
      <button className="active:text-[#3A7CFD]">Active</button>
      <button className="active:text-[#3A7CFD]">Completed</button>
    </div>
  );
}

export default TabBar;
