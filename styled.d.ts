import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    mainBgColor: string;
    textColor: string;
    posterTitleTextColor: string;
    posterOverviewColor: string;
    defaultGrey: string;
    searchInputBgColor: string;
    searchInputBorderColor: string;
  }
}
