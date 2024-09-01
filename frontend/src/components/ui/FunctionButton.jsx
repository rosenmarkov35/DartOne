export default function FunctionButton({ img, imgAlt, onPress }) {
  return (
    <button
      onClick={onPress}
      className={`w-8 h-8 flex justify-center items-center bg-offwhite mx-16 rounded-md outline outline-2 outline-dark-gray shadow-md`}
    >
      <img src={img} alt={imgAlt} className="w-1/2" />
    </button>
  );
}
