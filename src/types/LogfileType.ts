import {Id} from "@feathersjs/feathers";

export interface Logfile {
  _id?: Id;
  belongHost: Id;
  type: string;
  filename: string;
  path: string;
}

