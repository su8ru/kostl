// Generated by https://quicktype.io

export interface body {
  up: Up[];
  TS: TS[];
  TB: TB[];
}

export interface TB {
  id: string;
  sn: Sn;
  ps: P[];
}

export interface TS {
  id: string;
  sn: Sn;
  ps: P[];
}

export interface P {
  tr: string;
  sy: string;
  ki: string;
  bs: string;
  dl: string;
  ik: string;
  ik_tr: string;
  inf: string;
}

export enum Sn {
  I = "I",
  K = "K",
  S = "S"
}

export interface Up {
  dt: Dt[];
  st: string;
}

export interface Dt {
  yy: string;
  mt: string;
  dy: string;
  hh: string;
  mm: string;
  ss: string;
}
