import {Id} from "@feathersjs/feathers";

export interface Log {
  _id?: Id;
  type: string;
  text: string;
  time: Date;
}

