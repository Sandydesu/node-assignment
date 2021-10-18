import * as request from 'supertest';
import { Express } from 'express-serve-static-core';

import { createServer } from '../mock/server/mock-server';

let server: Express;

beforeAll(async () => {
  server = await createServer();
});

describe('GET /token', () => {
  it('should return 200 & get acces token', (done) => {
    request(server)
      .get(`/token`)
      .expect('Content-Type', 'application/json')
      .expect(200)
      .end((err, res) => {
        expect(res.body.access_token).toBeDefined();
        done();
      });
  });
});
