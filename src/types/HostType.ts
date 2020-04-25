import {Id} from "@feathersjs/feathers";

export interface Host {
  _id?: Id;
	name: string,
	host: string,
	username: string,
	password: string
}

