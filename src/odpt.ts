// Generated by https://quicktype.io

export interface Odpt {
  "@id": string;
  "@type": "odpt:Train";
  "dc:date": string;
  "@context": string;
  "dct:valid": string;
  "odpt:delay": number;
  "owl:sameAs": string;
  "odpt:railway": "odpt.Railway:Toei.Shinjuku";
  "odpt:operator": OdptOperator;
  "odpt:toStation": null | string;
  "odpt:trainType": OdptTrainType;
  "odpt:trainOwner": OdptOperator;
  "odpt:fromStation": string;
  "odpt:trainNumber": string;
  "odpt:originStation": string[];
  "odpt:railDirection": OdptDirection;
  "odpt:destinationStation": OdptDestinationStation[];
}

export enum OdptDestinationStation {
  Sasazuka = "odpt.Station:Keio.KeioNew.Sasazuka",
  Sakurajosui = "odpt.Station:Keio.KeioNew.Sakurajosui",
  HachimanYama = "odpt.Station:Keio.KeioNew.HachimanYama",
  Tsutsujigaoka = "odpt.Station:Keio.KeioNew.Tsutsujigaoka",
  KeioTamaCenter = "odpt.Station:Keio.Sagamihara.KeioTamaCenter",
  Hashimoto = "odpt.Station:Keio.Sagamihara.Hashimoto",
  Takahatafudo = "odpt.Station:Keio.Takao.Takahatafudo",
  TamaDobutsukoen = "odpt.Station:Keio.Takao.TamaDobutsukoen",
  Takaosanguchi = "odpt.Station:Keio.Takao.Takaosanguchi",
  KeioHachioji = "odpt.Station:Keio.Takao.KeioHachioji",
  Motoyawata = "odpt.Station:Toei.Shinjuku.Motoyawata",
  Mizue = "odpt.Station:Toei.Shinjuku.Mizue",
  Ojima = "odpt.Station:Toei.Shinjuku.Ojima",
  Iwamotocho = "odpt.Station:Toei.Shinjuku.Iwamotocho"
}

export enum OdptOperator {
  Keio = "odpt.Operator:Keio",
  Toei = "odpt.Operator:Toei"
}

export enum OdptDirection {
  E = "odpt.RailDirection:Eastbound",
  W = "odpt.RailDirection:Westbound"
}

export enum OdptTrainType {
  Local = "odpt.TrainType:Toei.Local",
  Express = "odpt.TrainType:Toei.Express"
}
