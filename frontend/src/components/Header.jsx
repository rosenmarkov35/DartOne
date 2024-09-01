export default function Header({ title, children }) {
    return (
        <div className="flex flex-col justify-center text-center">
            <h1 className="mt-4 mb-2 text-6xl font-semibold text-offwhite cursor-default">{title}</h1>
            <h3 className="mt-2 mb-2 font-semibold text-3xl text-offwhite cursor-default">{children}</h3>
        </div>
    )
}