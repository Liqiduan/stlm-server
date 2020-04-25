import assert from 'assert';
import app from '../../src/app';

describe('\'sftp\' service', () => {
  it('registered the service', () => {
    const service = app.service('sftp');

    assert.ok(service, 'Registered the service');
  });

	it('get the list of server', (done) => {
		const service = app.service('sftp');

		let command:none|SftpReq = null;

		service.create({
				user:'liqiduan',
				passwd:'1209qwpo',
				host:'localhost',
				path:'stlm-test-data'
		}).then((data) => {
			command = data;
		});

		service.on('update', (data, context) => {
			assert.equal(data.id, command.id);
			assert.ok(data.list.indexOf('stlm.csv') > -1);
			assert.ok(data.list.indexOf('stlm.csv.gz') > -1);
			done();
		});
	});

	it('read the content of file', (done) => {
		service.create({
			user:'liqiduan',
			passwd:'1209qwpo',
			host:'localhost',
			path:'stlm-test-data/stlm.csv'
		});

		service.on('update', (data, context) => {
			console.log(data);
			assert.equal(data.text, "2019-02-21 12:00:00,Info,Test Message")
			done();
		});
	});
});
