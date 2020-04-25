// Initializes the `logfiles` service on path `/logfiles`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Logfiles } from './logfiles.class';
import createModel from '../../models/logfiles.model';
import hooks from './logfiles.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'logfiles': Logfiles & ServiceAddons<any>;
  }
}

export default function (app: Application) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/logfiles', new Logfiles(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('logfiles');

  service.hooks(hooks);
}
