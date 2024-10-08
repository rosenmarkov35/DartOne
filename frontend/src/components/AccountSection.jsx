import { Link } from "react-router-dom";

export default function AccountSection({
  height = "h-1/6",
  items = "start",
  justify = "justify-normal",
  flexCol = true,
  title,
  children,
  linkTo,
}) {
  return (
    <Link to={linkTo}
      className={`hover:scale-107 transition-all w-full ${height} rounded-2xl dark:bg-offwhite
       bg-dark-gray dark:text-dark-gray text-offwhite
        flex ${flexCol ? `flex-col` : ``} ${justify} px-4 py-2 items-${items}`}
    >
      <h1 className="text-2xl">{title}</h1>
      {children}
    </Link>
  );
}
