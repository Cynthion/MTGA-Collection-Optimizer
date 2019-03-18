export interface AboutDto {
}

export interface AboutState extends AboutDto {
  isOpen: boolean;
}

export const initialAboutState: AboutState = {
  isOpen: false,
};
