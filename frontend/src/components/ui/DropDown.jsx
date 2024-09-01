export default function DropDown({ handleScoreChange, points, isHovered, children, ...props }) {
  return (
    <>
      <div
        {...props}
        className={`w-48 dark:bg-offwhite dark:text-dark-gray text-offwhite bg-dark-gray relative text-center text-xl rounded-md flex justify-center shadow-lg
           `}
      >
        <div className={`flex h-10 justify-center items-center`}>{children}</div>
        <div className="absolute top-full left-0 dark:bg-offwhite bg-dark-gray">
            {points.map((point) => (
                <button className="w-8 h-8 bg-red-400" key={point} onClick={() => handleScoreChange(point)}>
                {point}
                </button>
            ))}
        </div>
      </div>
    </>
  );
}
