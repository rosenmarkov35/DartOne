export default function SaveGame({ onSave }) {
  return (
    <button
      onClick={onSave}
      className="bg-violet-500 hover:bg-violet-600 hover:scale-110 transition-all p-2 mt-12 px-4 rounded-lg text-2xl text-offwhite font-bold"
    >
      Save Game
    </button>
  );
}
