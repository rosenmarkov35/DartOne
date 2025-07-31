import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import searchImg from "../../images/search.svg";

export default function SearchBar() {
  const navigate = useNavigate();
  const [rotatedSearch, setRotatedSearch] = useState(false);
  const searchInputRef = useRef(null); // Create a ref for the input element

  function handleRotateSearch() {
    setRotatedSearch((prev) => !prev);
    if (!rotatedSearch && searchInputRef.current) {
      // Focus the input when opening
      searchInputRef.current.focus();
    }
  }

  function handleSubmitSearch(e) {
    e.preventDefault();
    const username = e.target.elements.search.value.trim();

    if (username) {
      navigate(`/account/${username}`);
    } else if (searchInputRef.current) {
      // Focus the input if the username is empty
      searchInputRef.current.focus();
    }
  }

  return (
    <>
      <form onSubmit={handleSubmitSearch}>
        <input
          ref={searchInputRef} // Attach the ref to the input
          name="search"
          placeholder="Username"
          className={`${
            rotatedSearch
              ? `w-24 opacity-35 pointer-events-auto`
              : `w-0 opacity-0 pointer-events-none`
          } h-8 transition-all bg-light-gray outline-none p-2 rounded-md ease-in-out duration-300 text-offwhite`}
        />
      </form>
      <button
        onClick={handleRotateSearch}
        className={`${
          rotatedSearch ? `rotate-45 scale-75` : `rotate-0`
        } transition-all w-[26px] md:ml-4 hidden md:inline`}
      >
        <img src={searchImg} alt="search" />
      </button>
    </>
  );
}
