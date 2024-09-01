export default function InputField({ type, name, placeholder, ...props }) {
  return (
    <input {...props}
      type={type}
      name={name}
      placeholder={placeholder}
      className="rounded-lg dark:bg-offwhite bg-dark-gray dark:placeholder-dark-gray
       placeholder-offwhite placeholder-opacity-45 text-offwhite dark:text-dark-gray h-12 w-full p-4 focus:ring-violet-500 focus:ring-2 focus:outline-none"
    />
  );
}
