import { EFieldEvent, EStatusEvent } from './enums';

export const statusEvent: Record<EStatusEvent, string> = {
  PROCESSING: 'Đang diễn ra',
  ENDED: 'Kết thúc',
  INCOMMING: 'Sắp diễn ra',
};

export const fieldEvent: Record<EFieldEvent, string> = {
  CULTURE: 'Văn hoá',
  ENTERTAINMENT: 'Giải trí',
  SPORT: 'Thể thao',
  TRAVEL: 'Du lịch',
};
