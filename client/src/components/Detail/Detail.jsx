import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetail, getClean } from "../../actions";
import "./Detail.css";

export default function Detail(props) {
  console.log(props);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetail(props.match.params.username));
    return () => {
      dispatch(getClean());
    };
  }, [props.match.params.username, dispatch]);

  const DetailState = useSelector((state) => state.gameDetail);
  return (
    <div className="detailContainer">
      <div>
        <a>
          <Link to="/home">
            <h1>Return Home</h1>
          </Link>
        </a>
      </div>
      {DetailState.length > 0 ? (
        <div className="allbox">
          <div>
            <header>{`Details of "${DetailState[0].name}"`}</header>
          </div>
          <div className="detailContainer">
            {DetailState[0].image ? (
              <img
                src={DetailState[0].image}
                alt="Not found"
                width="100%"
                height="520px"
              />
            ) : (
              <img src="" alt="Not found" width="" height="" />
            )}

            <div className="">
              <h1>Genres: </h1>
              {DetailState[0].genres.length ? (
                <p>
                  {DetailState[0].genres.name
                    ? DetailState[0].genres
                    : DetailState[0].genres}
                </p>
              ) : (
                <p>No genres assigned to game</p>
              )}

              <h1>Platforms: </h1>
              {DetailState[0].platforms.length ? (
                <p>
                  {DetailState[0].platforms.name
                    ? DetailState[0].platforms
                    : DetailState[0].platforms}
                </p>
              ) : (
                <p>No platforms registered</p>
              )}

              <h1>Released: </h1>
              <p>{DetailState[0].released}</p>

              <h1>Rating:</h1>
              <p>{`★ ${DetailState[0].rating}`}</p>
            </div>
          </div>

          <h1>About the game:</h1>
          {DetailState[0].description.length ? (
            <p>
              {DetailState[0].description
                .replace(/<\/?[^>]+>/gi, "")
                .replace(/&#39;/g, "'")}
            </p>
          ) : (
            <p>No description</p>
          )}
        </div>
      ) : (
        <h1 className="spinner"></h1>
      )}
    </div>
  );
}
