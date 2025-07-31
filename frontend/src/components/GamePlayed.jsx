export default function GamePlayed({
  date,
  avgLeg,
  totalTurns,
  textColor = "text-offwhite",
  p = "p-0",
}) {
  return (
    <div
      className={`cursor-pointer flex flex-col justify-evenly items-center w-full h-1/6 mb-3 rounded-lg transition-all hover:scale-110 dark:bg-light-gray bg-dark-gray ${p} text-offwhite dark:text-dark-gray
      hover:bg-offwhite dark:hover:bg-offwhite hover:text-dark-gray`}
    >
      <h1 className="text-lg">{date}</h1>
      <div className="flex justify-evenly">
        <p className="text-sm mt-2">3-Dart Avg: {avgLeg}</p>
        {totalTurns ? (
          <p className="text-sm mt-2 ml-5">Turns: {totalTurns}</p>
        ) : undefined}  
      </div>
    </div>
  );
}
