import assert from 'assert';
import app from '../../src/app';

describe('\'hosts\' service', () => {
  it('registered the service', () => {
    const service = app.service('hosts');

    assert.ok(service, 'Registered the service');
  });
});
