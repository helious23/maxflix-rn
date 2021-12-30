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

interface IVideo {
  results: {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: Date;
    id: string;
  }[];
}

type IMovieDetailResonse = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  videos: IVideo;
  images: {
    backdrops: string[];
    logos: string[];
    posters: string[];
  };
};

type ITvDetailResponse = {
  backdrop_path: string;
  created_by: {
    id: number;
    credit_id: string;
    name: string;
    gender: number;
    profile_path: string;
  }[];
  episode_run_time: number[];
  first_air_date: Date;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: Date;
  last_episode_to_air: {
    air_date: Date;
    episode_number: number;
    id: number;
    name: string;
    overview: string;
    production_code: string;
    season_number: number;
    still_path: string;
    vote_average: number;
    vote_count: number;
  };
  name: string;
  next_episode_to_air: {
    air_date: Date;
    episode_number: number;
    id: number;
    name: string;
    overview: string;
    production_code: string;
    season_number: number;
    still_path: string;
    vote_average: number;
    vote_count: number;
  };
  networks: {
    name: string;
    id: number;
    logo_path: string;
    origin_country: string;
  }[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  seasons: {
    air_date: Date;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
  }[];
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
  videos: IVideo;
  images: {
    backdrops: string[];
    logos: string[];
    posters: string[];
  };
};

export type IDetailResponse = IMovieDetailResonse & ITvDetailResponse;

export const moviesApi = {
  trending: ({ pageParam }: { pageParam: string | undefined }) =>
    fetch(
      `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=ko-KR&page=${
        pageParam ?? 1
      }&region=kr`
    ).then((response) => response.json()),
  upcoming: ({ pageParam }: { pageParam: string | undefined }) =>
    fetch(
      `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=ko-KR&page=${pageParam}`
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
  trending: ({ pageParam }: { pageParam: string | undefined }) =>
    fetch(
      `${BASE_URL}/trending/tv/week?api_key=${API_KEY}&language=ko-KR&page=${
        pageParam ?? 1
      }`
    ).then((response) => response.json()),
  airingToday: ({ pageParam }: { pageParam: string | undefined }) =>
    fetch(
      `${BASE_URL}/tv/airing_today?api_key=${API_KEY}&language=ko-KR&page=${pageParam}`
    ).then((response) => response.json()),
  topRated: ({ pageParam }: { pageParam: string | undefined }) =>
    fetch(
      `${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=ko-KR&page=${pageParam}`
    ).then((response) => response.json()),
  search: ({ queryKey }: QueryFunctionContext) => {
    const [_, query] = queryKey;
    return fetch(
      `${BASE_URL}/search/tv?api_key=${API_KEY}&language=ko-KR&page=1&include_adult=false&query=${query}`
    ).then((response) => response.json());
  },
  detail: ({ queryKey }: QueryFunctionContext) => {
    const [_, id] = queryKey;
    return fetch(
      `${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=ko-KR&append_to_response=videos%2Cimages`
    ).then((response) => response.json());
  },
};
