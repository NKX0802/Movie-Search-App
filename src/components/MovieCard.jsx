const MovieCard = ({
  movie: { title, vote_average, poster_path, release_date, original_language },
}) => {
  // const stars = vote_average ? Math.round(vote_average / 2) : 0;
  return (
    <div className="movie-card">
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
            : "/no-movie.png"
        }
        alt={title}
      />
      <div>
        <h3 className="mt-2">{title}</h3>
        <div className="content">
          <div className="rating">
            <img src="star.svg" alt="Star Icon" />
            {/* Make into one decimal */}
            <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
          </div>
          {/* <div className="flex flex-row">
            {Array.from({ length: stars }, (_, i) => (
              <img key={i} src="star.svg" alt="star" />
            ))}
          </div> */}
          <span>●</span>
          <p className="lang">{original_language}</p>
          {/* Only show year */}
          <p className="year">
            {release_date ? release_date.split("-")[0] : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
