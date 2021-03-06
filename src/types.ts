export type SecinfoKO = {
  pos: string;
  trains: TrainKO[];
};

export type TrainKO = {
  tr: string;
  sy: string;
  ki: boolean;
  dl: number;
  ik: string;
};

export type SecinfoS = {
  pos: string;
  trains: TrainS[];
};

export type TrainS = {
  tr: string;
  sy: string;
  ki: boolean;
  dl: number;
  ik: string;
  op: string;
};

export type listKO = {
  weekday: trsKO;
  holiday: trsKO;
};

export type trsKO = {
  [key: string]: {
    un: string;
    ik?: string;
    sy?: number;
  };
};

export type listS = {
  weekday: trsS;
  holiday: trsS;
};

export type trsS = {
  [key: string]: {
    tr: string;
    un: string;
    sy?: number;
    sy2?: number;
  };
};
