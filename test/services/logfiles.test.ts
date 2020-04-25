import assert from 'assert';
import app from '../../src/app';

describe('\'logfiles\' service', () => {
  it('registered the service', () => {
    const service = app.service('logfiles');

    assert.ok(service, 'Registered the service');
  });
});
