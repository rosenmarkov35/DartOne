export default function Button({ variant, children, ...props }) {
  return (
    <button
      {...props}
      className={`transition-all hover:outline-none text-lg font-semibold
      hover:bg-dark-gray dark:hover:bg-offwhite hover:shadow-zinc-400  dark:hover:text-dark-gray
      hover:text-offwhite
        shadow-lg px-8 rounded-md h-4/5 ${
          variant === "active"
            ? `bg-dark-gray dark:bg-offwhite outline-none dark:text-violet-600 text-violet-400`
            : `bg-offwhite dark:bg-dark-gray text-dark-gray dark:text-offwhite outline-1 dark:outline-offwhite outline`
        }`}
    >
      {children}
    </button>
  );
}
