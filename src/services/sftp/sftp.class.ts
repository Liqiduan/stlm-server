import { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers';
import { Application } from '../../declarations';

import Client, {ClientTypes} from "ssh2"

interface SftpReq {
	id?:Id,
	user:string,
	passwd:string,
	path:string,
	host:string
}

interface SftpResp {
	id?:Id,
	list:string[]
}

interface ServiceOptions {}

export class Sftp implements ServiceMethods<SftpReq | SftpResp> {
  app: Application;
  options: ServiceOptions;
	client: ClientTypes;
	id: Id;

  constructor (options: ServiceOptions = {}, app: Application) {
    this.options = options;
    this.app = app;
		this.client = new Client();
		this.id = 0;
  }

  async find (): Promise<SftpResp[]> {
    return [];
  }

  async get (id: Id, params?: Params): Promise<SftpReq | SftpResp> {
    return { id };
  }

  async create (data: SftpReq): Promise<SftpReq> {
		data.id = this.id;
		this.id += 1;

		this.client.on('ready', () => {
			this.client.sftp((err, sftp) => {
				if (err) throw err;

				sftp.readdir(data.path, (err, list) => {
					if (err) throw err;

					let result = []
					for (var i of list) {
						result.push(i.filename);
					};

					this.update(0, {
						id: data.id,
						list:result
					});

					this.client.end();
				});
			});
		}).connect({
			host:data.host,
			port:22,
			username: data.user,
			password: data.passwd
		});

    return data;
  }

  async update (id: NullableId, data: SftpReq | SftpResp, params?: Params): Promise<Data> {
		this.emit('update', data, data);
    return data;
  }

  async patch (id: NullableId, data: SftpReq | SftpResp, params?: Params): Promise<Data> {
    return data;
  }

  async remove (id: NullableId, params?: Params): Promise<SftpReq | SftpResp> {
    return { id };
  }
}
