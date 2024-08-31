export default function Button({ variant, children, ...props }) {
  return (
    <button
      {...props}
      className={`transition-all hover:outline-none text-lg font-semibold
      hover:shadow-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 
        shadow-lg px-8 rounded-md h-3/5 ${
          variant === "active"
            ? `bg-zinc-800 outline-none shadow-zinc-400 text-violet-400`
            : `bg-zinc-200 text-zinc-800 shadow-violet-200 outline-violet-300 outline outline-2`
        }`}
    >
      {children}
    </button>
  );
}
