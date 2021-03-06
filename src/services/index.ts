import { Application } from '../declarations';
import hosts from './hosts/hosts.service';
import logfiles from './logfiles/logfiles.service';
import logs from './logs/logs.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application) {
  app.configure(hosts);
  app.configure(logfiles);
  app.configure(logs);
}
