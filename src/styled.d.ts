import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    textColor: string;
    timeCardColor: string;
    hazyTextColor: string;
    buttonWrapColor: string;
  }
}
