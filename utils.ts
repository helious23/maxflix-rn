export const makeImgpath = (img: string, width: string = "w500"): string =>
  `https://image.tmdb.org/t/p/${width}${img}`;
