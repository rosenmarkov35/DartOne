export default function Header({ title, children }) {
    return (
        <div className="text-6xl flex flex-col justify-center text-center text-gray-600 hover:text-gray-800">
            <h1 className="mt-4 mb-2 font-semibold text-white cursor-default">{title}</h1>
            <h3 className="mt-2 mb-2 font-semibold text-3xl text-white cursor-default">{children}</h3>
        </div>
    )
}