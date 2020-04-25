import { Service, NedbServiceOptions } from 'feathers-nedb';
import { Application } from '../../declarations';
import {Logfile} from '../../types/LogfileType'

export class Logfiles extends Service<Logfile> {
  constructor(options: Partial<NedbServiceOptions>, app: Application) {
    super(options);
  }
};
