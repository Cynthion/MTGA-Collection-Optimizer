export interface AboutDto {
  appName: string;
  version: string;
}

export interface AboutState extends AboutDto {
  isOpen: boolean;
}

export const initialAboutState: AboutState = {
  appName: 'MTGA Collection Optimizer',
  version: '1.0.0',
  isOpen: false,
};
