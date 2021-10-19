import * as request from 'supertest';
import { Express } from 'express-serve-static-core';

import { createServer } from '../mock/server/mock-server';

import { bookDetails, inValidBookDetials } from '../mock/utils/book.util';

let server: Express;

beforeAll(async () => {
  server = await createServer();
});

describe('[Failure] GET BOOK BY ID /books/:book_id', () => {
  it('should pass invalid book_id to get book details', (done) => {
    request(server)
      .get(`/books/112233?byPassAuth=true`)
      .set('transaction-id', 'test')
      .set('authorization', null)
      .expect('Content-Type', 'application/json')
      .expect(500)
      .end((err, res) => {
        expect(res.status).toEqual(500);
        done();
      });
  });
});

describe('[Failure] CREATE /books', () => {
  it('should pass invalid data to create book', (done) => {
    request(server)
      .post(`/books?byPassAuth=true`)
      .set('transaction-id', 'test')
      .set('authorization', null)
      .send(inValidBookDetials())
      .expect('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res.status).toEqual(500);
        done();
      });
  });
});

describe('[Failure] UPDATE /books/:book_id', () => {
  it('should pass invalid data to update book', (done) => {
    request(server)
      .put(`/books/${bookDetails._id}?byPassAuth=true`)
      .set('transaction-id', 'test')
      .set('authorization', null)
      .send(inValidBookDetials())
      .expect('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res.status).toEqual(500);
        done();
      });
  });
});

describe('[Failure] DELETE BOOK /books/:book_id', () => {
  it('should pass invalid book_id to delete book', (done) => {
    request(server)
      .delete(`/books/1112222?byPassAuth=true`)
      .set('transaction-id', 'test')
      .set('authorization', null)
      .expect('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res.status).toEqual(500);
        done();
      });
  });
});
