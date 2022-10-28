import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  getAllGames,
  getAllGenres,
  postNewGame,
  cleanGames,
  cleanGenre,
} from "../../actions";
import { Link, useHistory } from "react-router-dom";
import "./CreatedGame.css";

const isValidUrl = (url) => {
  try {
    new URL(url);
  } catch (e) {
    console.error(e);
    return false;
  }
  return true;
};

function validateInput(input) {
  var errors = {};
  if (!input.name) {
    errors.name = "Name is required";
  } else if (input.name.length > 100) {
    errors.name = "Name is too long (Max = 100 characters)";
  }
  if (!input.description) {
    errors.description = "Description is required";
  } else if (input.description.length > 1500) {
    errors.description = "Description is too long. (Max = 1500 characters)";
  }
  if (!input.rating) {
    errors.rating = "Rating is required";
  } else if (input.rating > 5 || input.rating < 0) {
    errors.rating = "Rating must range between 0 to 5";
  }
  if (!input.image) {
    errors.image = "Image URL is required";
  } else if (!isValidUrl(input.image)) {
    errors.image = "Not validated as URL";
  }
  if (!input.genres[0]) {
    errors.genres = "Minimun one Genre is required ";
  }
  if (!input.platforms[0]) {
    errors.platforms = "Minimun one Platform is required";
  }

  return errors;
}

export default function CreateGame() {
  const dispatch = useDispatch();
  const allGenres = useSelector((state) => state.genres);
  const allGames = useSelector((state) => state.allGames);
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const [input, setInput] = useState({
    name: "",
    description: "",
    released: "",
    rating: "",
    image: "",
    genres: [],
    platforms: [],
  });
  useEffect(() => {
    dispatch(getAllGames());
    dispatch(getAllGenres());
    return () => {
      dispatch(cleanGenre());
    };
  }, [dispatch]);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validateInput({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    console.log(input);
  }

  function handleSelect(e) {
    setInput({
      ...input,
      [e.target.name]: [...input[e.target.name], e.target.value],
    });
    setErrors(
      validateInput({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }
  // METODO SET
  function handleSubmit(e) {
    e.preventDefault();
    if (!input.name.trim()) {
      alert("Name is required");
    } else if (
      allGames.find((e) => e.name.toLowerCase() === input.name.toLowerCase())
    ) {
      alert(`The name ${input.name} already exist, please choose another one!`);
    } else if (!input.description) {
      alert("Your game need description");
    } else if (!input.rating || input.rating < 1 || input.rating > 5) {
      alert("Please insert a correct rating");
    } else if (!input.genres) {
      alert("Please insert at least one genre");
    } else if (input.genres.length === 0) {
      alert("Please use correctly genre");
    }
    // else if (input.genres.name == input.genres.name){
    //     alert("Genre duplicate")
    //
    else {
      dispatch(postNewGame(input));
      alert("Game created successfully!");
      setInput({
        name: "",
        description: "",
        released: "",
        rating: "",
        image: "",
        genres: [],
        platforms: [],
      });
      history.push("/home");
    }
  }

  // function handleDeletePlatforms(el) {

  //     setInput({
  //         ...input,
  //         platforms: input.platforms.filter(param => param !== el)
  //     })
  // }
  function handleDeleteGenres(el) {
    setInput({
      ...input,
      genres: input.genres.filter((param) => param !== el),
    });
  }
  return (
    <div className="containerCreate">
      <div className="container1">
        <div className="container2">
          <Link to="/home">
            <h1>Return home</h1>
          </Link>
        </div>
        <div className="container2">
          <h3>Create new game</h3>
        </div>
      </div>
      <div className="containerForm">
        <form id="form" onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label>Name:</label>
            <input
              required="name"
              className={errors.name && "danger"}
              type="text"
              value={input.name}
              name="name"
              placeholder="Name"
              onChange={(e) => handleChange(e)}
            />
            {errors.name && <p className="error-controlado"> {errors.name}</p>}
          </div>
          <div>
            <label>Rating: </label>
            <input
              required="rating"
              className={errors.rating && "danger"}
              type="text"
              value={input.rating}
              name="rating"
              placeholder="From 0 to 5"
              onChange={(e) => handleChange(e)}
            />
            {errors.rating && (
              <p className="error-controlado"> {errors.rating}</p>
            )}
          </div>
          <label>Image URL:</label>
          <input
            className={errors.image && "danger"}
            type="text"
            value={input.image}
            name="image"
            placeholder="URL"
            onChange={(e) => handleChange(e)}
          />
          <label>Released: </label>
          <input
            className={errors.released && "danger"}
            type="date-now"
            value={input.released}
            name="released"
            placeholder="
                        When it was created"
            onChange={(e) => handleChange(e)}
          />
          <label>Description: </label>
          <textarea
            className={errors.description && "danger"}
            type="text"
            value={input.description}
            name="description"
            placeholder="About game..."
            onChange={(e) => handleChange(e)}
          />
          {errors.description && (
            <p className="error-controlado"> {errors.description}</p>
          )}
          <label>Select Genres </label>
          <select
            required="genre"
            className={errors.genres && "danger"}
            name="genres"
            value="genres"
            onChange={(e) => handleSelect(e)}
          >
            <option hidden value="genre">
              Genres
            </option>
            {allGenres?.map((e) => (
              <option key={e.id} value={e.name}>
                {e.name}
              </option>
            ))}
          </select>
          <div className="genresForm">
            {input.genres.map((e) => (
              <div className="genreInput">
                <div>{e}</div>
                <div
                  className="minibutton"
                  onClick={() => {
                    handleDeleteGenres(e);
                  }}
                >
                  |X|
                </div>
              </div>
            ))}
          </div>
          {/* <label>Platforms: </label>
                        <select className={errors.platforms && 'danger'} name='platforms' onChange={e => handleSelect(e)}>
                            <option hidden value='selected'>Select</option>
                        {
                            allPlatforms?.map(e => (
                                <option key={e.id} value={e.name}>{e.name}</option>
                            ))
                        }
                        </select> */}
          {/* <div>{errors.platforms && (<p>{errors.platforms}</p>)}</div>
                        <div className="platformForm">
                            {input.platforms.map(e =>
                                <div className="platformInput">
                                    <div>
                                        {e}
                                    </div>
                                    <div className="minibutton" onClick={() => {
                                        handleDeletePlatforms(e)
                                    }}>X</div>
                                </div>)}
                        </div> */}
          <button className="createButton" type="submit">
            Create Game
          </button>
        </form>
      </div>
    </div>
  );
}
