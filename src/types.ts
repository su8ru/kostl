export type SecinfoKO = {
  pos: string;
  trains: TrainsKO;
};

export type TrainsKO = {
  tr: string;
  sy: string;
  ki: boolean;
  dl: number;
  ik: string;
}[];

export type SecinfoS = {
  pos: string;
  trains: TrainsS;
};

export type TrainsS = {
  tr: string;
  sy: string;
  ki: boolean;
  dl: number;
  ik: string;
  op: string;
}[];
