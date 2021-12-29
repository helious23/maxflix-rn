import { QueryFunctionContext } from "react-query";

const API_KEY = "83e4562556a8e370915aa2a360e7d4db";
const BASE_URL = "https://api.themoviedb.org/3";

export interface IMovie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface ITv {
  backdrop_path: string;
  first_air_date: Date;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

interface BaseResponse {
  page: number;
  total_pages: number;
  total_results: number;
}

export interface IMovieResponse extends BaseResponse {
  results: IMovie[];
}

export interface ITvResponse extends BaseResponse {
  results: ITv[];
}

export const moviesApi = {
  trending: () =>
    fetch(
      `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=ko-KR&page=1&region=kr`
    ).then((response) => response.json()),
  upcoming: () =>
    fetch(
      `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=ko-KR&page=1&region=kr`
    ).then((response) => response.json()),
  nowPlaying: () =>
    fetch(
      `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=ko-KR&page=1&region=kr`
    ).then((response) => response.json()),
  search: ({ queryKey }: QueryFunctionContext) => {
    const [_, query] = queryKey;
    return fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=ko-KR&page=1&region=kr&include_adult=false&query=${query}`
    ).then((response) => response.json());
  },
  detail: ({ queryKey }: QueryFunctionContext) => {
    const [_, id] = queryKey;
    return fetch(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=ko-KR&append_to_response=videos,images`
    ).then((response) => response.json());
  },
};

export const tvApi = {
  trending: () =>
    fetch(
      `${BASE_URL}/trending/tv/week?api_key=${API_KEY}&language=ko-KR&page=1&region=kr`
    ).then((response) => response.json()),
  airingToday: () =>
    fetch(
      `${BASE_URL}/tv/airing_today?api_key=${API_KEY}&language=ko-KR&page=1&region=kr`
    ).then((response) => response.json()),
  topRated: () =>
    fetch(
      `${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=ko-KR&page=1&region=kr`
    ).then((response) => response.json()),
  search: ({ queryKey }: QueryFunctionContext) => {
    const [_, query] = queryKey;
    return fetch(
      `${BASE_URL}/search/tv?api_key=${API_KEY}&language=ko-KR&page=1&region=kr&include_adult=false&query=${query}`
    ).then((response) => response.json());
  },
  detail: ({ queryKey }: QueryFunctionContext) => {
    const [_, id] = queryKey;
    return fetch(
      `${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=ko-KR&append_to_response=videos%2Cimages`
    ).then((response) => response.json());
  },
};
