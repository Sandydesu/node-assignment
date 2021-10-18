import * as request from 'supertest';
import { Express } from 'express-serve-static-core';

import { createServer } from '../mock/server/mock-server';

import BookModel from '../../models/Book';
import ReviewModel from '../../models/Review';

import { createReview, bookDetails, reviewDetails } from '../mock/utils/review.util';

jest.mock('../../models/Book');
jest.mock('../../models/Review');

let server: Express;

beforeAll(async () => {
  server = await createServer();
});

describe('[Success] GET /:book_id/reviews', () => {
  it('should return reviews of a book', (done) => {
    (BookModel.getReviewsByBook as jest.Mock).mockResolvedValue({ ...bookDetails });
    (ReviewModel.getReviews as jest.Mock).mockResolvedValue([{ ...reviewDetails }]);

    request(server)
      .get(`/books/${bookDetails._id}/reviews?byPassAuth=true`)
      .expect('Content-Type', 'application/json')
      .set('authorization', null)
      .set('transaction-id', 'test')
      .expect(200)
      .end((err, res) => {
        expect(res.body.statusCode).toEqual(200);
        expect(res.body.data.length).toEqual(1);
        done();
      });
  });
});

describe('[Success] Create /:book_id/reviews', () => {
  it('should create a review for book', (done) => {
    (BookModel.updateReview as jest.Mock).mockResolvedValue({ ...bookDetails });
    (ReviewModel.createReview as jest.Mock).mockResolvedValue({ ...reviewDetails });

    request(server)
      .post(`/books/${bookDetails._id}/reviews?byPassAuth=true`)
      .expect('Content-Type', 'application/json')
      .set('authorization', null)
      .set('transaction-id', 'test')
      .send(createReview())
      .expect(200)
      .end((err, res) => {
        expect(res.body.statusCode).toEqual(200);
        expect(res.body.data._id).toEqual(reviewDetails._id);
        done();
      });
  });
});

describe('[Success] Get /:book_id/reviews/:review_id', () => {
  it('should return review of a book', (done) => {
    (BookModel.getReviewsByBook as jest.Mock).mockResolvedValue({ ...bookDetails });
    (ReviewModel.getReview as jest.Mock).mockResolvedValue({ ...reviewDetails });

    request(server)
      .get(`/books/${bookDetails._id}/reviews/${reviewDetails._id}?byPassAuth=true`)
      .expect('Content-Type', 'application/json')
      .set('authorization', null)
      .set('transaction-id', 'test')
      .expect(200)
      .end((err, res) => {
        expect(res.body.statusCode).toEqual(200);
        expect(res.body.data._id).toEqual(reviewDetails._id);
        done();
      });
  });
});

describe('[Success] Update /:book_id/reviews/:review_id', () => {
  it('should update review', (done) => {
    (BookModel.getReviewsByBook as jest.Mock).mockResolvedValue({ ...bookDetails });
    (ReviewModel.updateReview as jest.Mock).mockResolvedValue({ ...reviewDetails });

    request(server)
      .put(`/books/${bookDetails._id}/reviews/${reviewDetails._id}?byPassAuth=true`)
      .expect('Content-Type', 'application/json')
      .set('authorization', null)
      .set('transaction-id', 'test')
      .send(createReview())
      .expect(200)
      .end((err, res) => {
        expect(res.body.statusCode).toEqual(200);
        expect(res.body.data._id).toEqual(reviewDetails._id);
        done();
      });
  });
});

describe('[Success] Delete /:book_id/reviews/:review_id', () => {
  it('should delete review', (done) => {
    (BookModel.getReviewsByBook as jest.Mock).mockResolvedValue({ ...bookDetails });
    (BookModel.deleteReview as jest.Mock).mockResolvedValue({ ...bookDetails });
    (ReviewModel.deleteReview as jest.Mock).mockResolvedValue({ ...reviewDetails });

    request(server)
      .delete(`/books/${bookDetails._id}/reviews/${reviewDetails._id}?byPassAuth=true`)
      .expect('Content-Type', 'application/json')
      .set('authorization', null)
      .set('transaction-id', 'test')
      .expect(200)
      .end((err, res) => {
        expect(res.body.statusCode).toEqual(200);
        expect(res.body.data._id).toEqual(reviewDetails._id);
        done();
      });
  });
});
