// DetailNowPlaying.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getDetailMovie } from "./redux/actions/movieDetailActions";
import Footer from "./Footer";

export default function DetailNowPlaying() {
  const navigate = useNavigate();
  let location = useLocation();
  const dispatch = useDispatch();
  const movieDetail = useSelector((state) => state?.detail?.movieDetail);
  console.log(
    "state",
    useSelector((state) => state)
  );
  const movieId = location?.state?.id;

  useEffect(() => {
    if (movieId) {
      dispatch(getDetailMovie(movieId));
    }
  }, [dispatch, movieId]);

  return (
    <div className="bg-gray-900 min-h-screen">
      {movieDetail ? (
        <div className="bg-cover bg-fixed bg-no-repeat bg-gray-500 bg-blend-multiply h-auto">
          <div className="flex justify-center container mx-auto py-20 gap-10 items-center backdrop-blur-sm">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movieDetail?.poster_path}`}
              className="w-auto h-auto rounded-lg"
              alt={movieDetail?.title}
            />
            <div className="text-white font-sans bg-gray-600/75 rounded-xl shadow-lg p-10">
              <div className="p-4">
                <h2 className="text-3xl font-semibold mb-2">
                  {movieDetail?.title}
                </h2>
                <p className="text-lg mb-4 border-b-2 pb-4">
                  {movieDetail?.overview}
                </p>
                <p className="text-lg mb-2">
                  Release Date: {movieDetail?.release_date}
                </p>
                <p className="text-lg mb-2">
                  Vote Average:{" "}
                  {parseFloat(movieDetail?.vote_average).toFixed(1)}/10
                </p>
                <p className="text-lg mb-2">
                  Popularity: {movieDetail?.popularity}
                </p>
                <p className="text-lg mb-2">Votes: {movieDetail?.vote_count}</p>
                <button
                  className="px-4 py-2 font-sans bg-white border border-solid border-gray-400 text-black rounded-md shadow-md hover:bg-gray-200 focus:outline-none focus:ring focus:ring-gray-300"
                  onClick={() => {
                    navigate("/now-playing");
                  }}
                >
                  <span className="align-middle font-semibold">
                    Back to Now Playing
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
      <Footer />
    </div>
  );
}
