import { EFieldEvent, EStatusEvent } from 'src/common/utils/enums';

export interface ICreateOne {
  title: string;
  description: string;
  image: string;
  status: EStatusEvent;
  field: EFieldEvent;
  link: string;
}

export interface IUpdateOne {
  id: string;
  title?: string;
  description?: string;
  image?: string;
  status?: EStatusEvent;
  field?: EFieldEvent;
  link?: string;
}

export interface IGetQuery {
  keyword?: string;
  status?: EStatusEvent;
  field?: EFieldEvent;
}
