export interface ICreateBanner {
  image: string;
  title: string;
  description: string;
  link: string;
}

export interface IUpdateBanner extends ICreateBanner {
  id: string;
}
