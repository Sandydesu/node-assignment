import * as request from 'supertest';
import { Express } from 'express-serve-static-core';

import { createServer } from '../mock/server/mock-server';

import { bookDetails, invalidReviewDetails, reviewDetails } from '../mock/utils/review.util';

let server: Express;

beforeAll(async () => {
  server = await createServer();
});

describe('[Failure] GET /:book_id/reviews', () => {
  it('should pass invalid book_id to get review details', (done) => {
    request(server)
      .get(`/books/1122233/reviews?byPassAuth=true`)
      .expect('Content-Type', 'application/json')
      .set('authorization', null)
      .set('transaction-id', 'test')
      .end((err, res) => {
        expect(res.status).toEqual(500);
        done();
      });
  });
});

describe('[Failure] Create /:book_id/reviews', () => {
  it('should pass invalid data to create review', (done) => {
    request(server)
      .post(`/books/${bookDetails._id}/reviews?byPassAuth=true`)
      .expect('Content-Type', 'application/json')
      .set('authorization', null)
      .set('transaction-id', 'test')
      .send(invalidReviewDetails())
      .end((err, res) => {
        expect(res.status).toEqual(500);
        done();
      });
  });
});

describe('[Failure] Get /:book_id/reviews/:review_id', () => {
  it('should pass invalid reviewid to get reviews of book', (done) => {
    request(server)
      .get(`/books/${bookDetails._id}/reviews/111111?byPassAuth=true`)
      .expect('Content-Type', 'application/json')
      .set('authorization', null)
      .set('transaction-id', 'test')
      .end((err, res) => {
        expect(res.status).toEqual(500);
        done();
      });
  });
});

describe('[failure] Update /:book_id/reviews/:review_id', () => {
  it('should pass invalid data to update review', (done) => {
    request(server)
      .put(`/books/${bookDetails._id}/reviews/${reviewDetails._id}?byPassAuth=true`)
      .expect('Content-Type', 'application/json')
      .set('authorization', null)
      .set('transaction-id', 'test')
      .send(invalidReviewDetails())
      .end((err, res) => {
        expect(res.status).toEqual(500);
        done();
      });
  });
});

describe('[Failure] Delete /:book_id/reviews/:review_id', () => {
  it('should pass invalid data to delete review', (done) => {
    request(server)
      .delete(`/books/${bookDetails._id}/reviews/112233?byPassAuth=true`)
      .expect('Content-Type', 'application/json')
      .set('authorization', null)
      .set('transaction-id', 'test')
      .end((err, res) => {
        expect(res.status).toEqual(500);
        done();
      });
  });
});
