import React, { useEffect, useState } from 'react';
import { useMovieModel } from '../models/useMovieModel';
import { getLoggedInUser } from '../utils/useAccount';

import Contents from '../component/Container';

export default function Favorites() {
  const loggenInUser = getLoggedInUser();
  const { getMovies, movies } = useMovieModel();
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    getMovies();
  }, []);
  const { favorites, likes } = loggenInUser;

  // 할일: favorite 받아오는 걸 get요청으로 처리하기
  useEffect(() => {
    if (movies?.results) {
      const findFavorites = [];
      favorites?.forEach((favorite) => {
        const movie = movies.results.find((movie) => movie.id === favorite.id);
        if (movie) findFavorites.push(movie);
      });
      setFavoriteMovies(findFavorites);
    }
  }, [movies?.results]);

  // 할일: 컴포넌트 메인에서 재사용하기
  return <Contents movies={favoriteMovies} />;
}