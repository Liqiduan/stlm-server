import { Service, NedbServiceOptions } from 'feathers-nedb';
import { Application } from '../../declarations';

interface HostsType {
	name: string,
	host: string,
	username: string,
	password: string
}

export class Hosts extends Service<HostsType> {
  constructor(options: Partial<NedbServiceOptions>, app: Application) {
    super(options);
  }
};
