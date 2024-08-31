import { Link } from "react-router-dom";


export default function Navbar() {
  return (
    <nav className="h-16 bg-white dark:bg-zinc-800 dark:text-gray-300 flex text-center justify-center items-center w-full">
        <Link className="text-xl mx-3 min-w-16 rounded-md hover:text-2xl hover:text-purple-500 transition-all" to="#">About</Link>
        <Link className="text-xl mx-3 min-w-16 rounded-md hover:text-2xl hover:text-purple-500 transition-all" to="/">Home</Link>
        <Link className="text-2xl mx-3 min-w-16 font-bold rounded-md hover:text-3xl hover:text-purple-500 transition-all" to="/quickplay">Quickplay</Link>
        <Link className="text-xl mx-3 min-w-16 rounded-md hover:text-2xl hover:text-purple-500 transition-all" to="/features">Features</Link>
        <Link className="text-xl mx-3 min-w-16 rounded-md hover:text-2xl hover:text-purple-500 transition-all" to="/account">Account</Link>
    </nav>
  );
}