export interface UnyoPost {
  unyo: string;
  vehicle: string;
  created_at: string;
  id: number;
}

export interface UnyoList {
  [key: string]: {
    vehicle: string;
    created_at: string;
  }[];
}
