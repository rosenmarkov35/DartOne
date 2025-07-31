import { useState } from 'react';

const HoverCard = ({title,}) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width * 50 - 10;
    const y = (e.clientY - rect.top) / rect.height * 50 - 10;
    setTilt({ x, y });
  };

  return (
    <div
    onMouseLeave={() => {setTilt({x: 0, y: 0});}}
      onMouseMove={handleMouseMove}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
        transition: 'transform 0.1s',
        boxShadow: `${tilt.x / 10}px ${tilt.y / 10}px 50px 0 rgba(0, 0, 0, 0.4)`,
      }}
      className="bg-zinc-800 rounded-md w-64 h-96 p-4 hover:scale-105 transition-transform duration-300"
    >
      <div
        className="bg-gradient-to-br from-zinc-700 to-zinc-900 rounded-md h-full w-full p-4 shadow-inner"
        style={{
          boxShadow: `${tilt.x / 20}px ${tilt.y / 20}px 30px 0 rgba(255, 255, 255, 0.2)`,
        }}
      >
        <h3 className="text-lg font-medium text-white">{title}</h3>
        <p className="text-gray-300">This card will tilt and shine based on your mouse position.</p>
      </div>
    </div>
  );
};

export default HoverCard;