import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGamesByName } from "../../actions";
import "./Searchbar.css";

export default function SearchBar({ setCurrentPage, setHeader }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputOnChange(e) {
    e.preventDefault();
    setName(e.target.value);
    console.log(name);
  }
  function handleOnSubmit(e) {
    e.preventDefault();
    if (!name.trim()) {
      console.log("Error");
    } else {
      dispatch(getGamesByName(name));
      setHeader(`Search Results for ${e.target.value}`);
      setName("");
      setCurrentPage(1);
    }
  }
  function handleOnKeyPress(e) {
    if (e.key === "Enter") {
      handleOnSubmit(e);
    }
  }
  const gameState = useSelector((state) => state.allGames);
  return (
    <div className="container-searchbar">
      {gameState.length > 0 ? (
        <div className="container-searchbar">
          <input
            className="input-search"
            value={name}
            type="text"
            placeholder="Search games by name.."
            onChange={(e) => handleInputOnChange(e)}
            onKeyPress={(e) => handleOnKeyPress(e)}
          />
          <button
            className="button-search"
            type="submit"
            onClick={(e) => handleOnSubmit(e)}
          >
            Search
          </button>
        </div>
      ) : (
        <h1 className="spinner"></h1>
      )}
    </div>
  );
}
