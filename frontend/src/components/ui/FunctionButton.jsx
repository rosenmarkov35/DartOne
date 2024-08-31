export default function FunctionButton({ img, imgAlt, onPress }) {
  return (
    <button
      onClick={onPress}
      className={`w-8 h-8 flex justify-center items-center bg-zinc-200 mx-16 rounded-md outline outline-2 outline-zinc-300 shadow-md`}
    >
      <img src={img} alt={imgAlt} className="w-1/2" />
    </button>
  );
}
