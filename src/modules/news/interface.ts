export interface ICreateOne {
  image: string;
  title: string;
  content: string;
  category: string;
}

export interface IUpdateOne extends ICreateOne {
  id: string;
}
