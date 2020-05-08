import { UnyoPost, UnyoList } from "@/apis/vehicles/@types";

export interface Methods {
  get: {
    resBody: UnyoList;
  };
  post: {
    reqBody: { unyo: string; vehicle: string };
    resBody: UnyoPost;
  };
}
