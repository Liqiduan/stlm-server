import { Service, NedbServiceOptions } from 'feathers-nedb';
import { Application } from '../../declarations';
import {Id} from '@feathersjs/feathers';

interface LogfilesType {
	_id?:Id,
	belongHost: Id,
	type:string,
	filename: string,
	path: string,
}

export class Logfiles extends Service<LogfilesType> {
  constructor(options: Partial<NedbServiceOptions>, app: Application) {
    super(options);
  }
};
