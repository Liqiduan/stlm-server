// Initializes the `sftp` service on path `/sftp`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Sftp } from './sftp.class';
import hooks from './sftp.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'sftp': Sftp & ServiceAddons<any>;
  }
}

export default function (app: Application) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/sftp', new Sftp(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('sftp');

  service.hooks(hooks);
}
