import { Service, NedbServiceOptions } from 'feathers-nedb';
import { Application } from '../../declarations';
import {Host} from '../../types/HostType';

export class Hosts extends Service<Host> {
  constructor(options: Partial<NedbServiceOptions>, app: Application) {
    super(options);
  }
};
