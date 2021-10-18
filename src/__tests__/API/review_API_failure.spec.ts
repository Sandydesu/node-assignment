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

describe('[Failure] GET /:book_id/reviews', () => {
  it('should return 400 when something went wrong', (done) => {
    (BookModel.getReviewsByBook as jest.Mock).mockRejectedValue(new Error());

    request(server)
      .get(`/books/${bookDetails._id}/reviews?byPassAuth=true`)
      .expect('Content-Type', 'application/json')
      .set('authorization', null)
      .set('transaction-id', 'test')
      .expect(400)
      .end((err, res) => {
        expect(res.body.statusCode).toEqual(400);
        done();
      });
  });

  it('should return 404 review is unavailable', (done) => {
    (BookModel.getReviewsByBook as jest.Mock).mockResolvedValue({ ...bookDetails });
    (ReviewModel.getReviews as jest.Mock).mockResolvedValue([]);

    request(server)
      .get(`/books/${bookDetails._id}/reviews?byPassAuth=true`)
      .expect('Content-Type', 'application/json')
      .set('authorization', null)
      .set('transaction-id', 'test')
      .expect(404)
      .end((err, res) => {
        expect(res.body.statusCode).toEqual(404);
        done();
      });
  });
});

describe('[Failure] Create /:book_id/reviews', () => {
  it('should return 400 when unable to create review', (done) => {
    (ReviewModel.createReview as jest.Mock).mockRejectedValue(new Error());

    request(server)
      .post(`/books/${bookDetails._id}/reviews?byPassAuth=true`)
      .expect('Content-Type', 'application/json')
      .set('authorization', null)
      .set('transaction-id', 'test')
      .send(createReview())
      .expect(400)
      .end((err, res) => {
        expect(res.body.statusCode).toEqual(400);
        done();
      });
  });

  it('should return 409 when unable to update review details of book', (done) => {
    (BookModel.updateReview as jest.Mock).mockResolvedValue({});
    (ReviewModel.createReview as jest.Mock).mockResolvedValue({});

    request(server)
      .post(`/books/${bookDetails._id}/reviews?byPassAuth=true`)
      .expect('Content-Type', 'application/json')
      .set('authorization', null)
      .set('transaction-id', 'test')
      .send(createReview())
      .expect(409)
      .end((err, res) => {
        expect(res.body.statusCode).toEqual(409);
        done();
      });
  });
});

describe('[Failure] Get /:book_id/reviews/:review_id', () => {
  it('should return 400 when review details are not correct', (done) => {
    (BookModel.getReviewsByBook as jest.Mock).mockRejectedValue(new Error());

    request(server)
      .get(`/books/${bookDetails._id}/reviews/${reviewDetails._id}?byPassAuth=true`)
      .expect('Content-Type', 'application/json')
      .set('authorization', null)
      .set('transaction-id', 'test')
      .expect(400)
      .end((err, res) => {
        expect(res.body.statusCode).toEqual(400);
        done();
      });
  });

  it('should return 404 when review details not available', (done) => {
    (BookModel.getReviewsByBook as jest.Mock).mockResolvedValue({ ...bookDetails });
    (ReviewModel.getReview as jest.Mock).mockResolvedValue({});

    request(server)
      .get(`/books/${bookDetails._id}/reviews/${reviewDetails._id}?byPassAuth=true`)
      .expect('Content-Type', 'application/json')
      .set('authorization', null)
      .set('transaction-id', 'test')
      .expect(404)
      .end((err, res) => {
        expect(res.body.statusCode).toEqual(404);
        done();
      });
  });

  it('should return 404 review id not match with book', (done) => {
    (BookModel.getReviewsByBook as jest.Mock).mockResolvedValue({ ...bookDetails });
    (ReviewModel.getReview as jest.Mock).mockResolvedValue({});

    request(server)
      .get(`/books/${bookDetails._id}/reviews/615ed8098525c65c40a97670?byPassAuth=true`)
      .expect('Content-Type', 'application/json')
      .set('authorization', null)
      .set('transaction-id', 'test')
      .expect(404)
      .end((err, res) => {
        expect(res.body.statusCode).toEqual(404);
        done();
      });
  });
});

describe('[failure] Update /:book_id/reviews/:review_id', () => {
  it('should return 400 when failed to update review', (done) => {
    (BookModel.getReviewsByBook as jest.Mock).mockRejectedValue(new Error());

    request(server)
      .put(`/books/${bookDetails._id}/reviews/${reviewDetails._id}?byPassAuth=true`)
      .expect('Content-Type', 'application/json')
      .set('authorization', null)
      .set('transaction-id', 'test')
      .send(createReview())
      .expect(400)
      .end((err, res) => {
        expect(res.body.statusCode).toEqual(400);
        done();
      });
  });
  it('should return 409 when failed to update review', (done) => {
    (BookModel.getReviewsByBook as jest.Mock).mockResolvedValue({ ...bookDetails });
    (ReviewModel.updateReview as jest.Mock).mockResolvedValue({});

    request(server)
      .put(`/books/${bookDetails._id}/reviews/${reviewDetails._id}?byPassAuth=true`)
      .expect('Content-Type', 'application/json')
      .set('authorization', null)
      .set('transaction-id', 'test')
      .send(createReview())
      .expect(409)
      .end((err, res) => {
        expect(res.body.statusCode).toEqual(409);
        done();
      });
  });

  it('should return 404 when review id not match with book', (done) => {
    (BookModel.getReviewsByBook as jest.Mock).mockResolvedValue({ ...bookDetails });

    request(server)
      .put(`/books/${bookDetails._id}/reviews/615ed8098525c65c40a97670?byPassAuth=true`)
      .expect('Content-Type', 'application/json')
      .set('authorization', null)
      .set('transaction-id', 'test')
      .send(createReview())
      .expect(404)
      .end((err, res) => {
        expect(res.body.statusCode).toEqual(404);
        done();
      });
  });
});

describe('[Failure] Delete /:book_id/reviews/:review_id', () => {
  it('should return 400 when unable to delete review', (done) => {
    (BookModel.getReviewsByBook as jest.Mock).mockRejectedValue(new Error());

    request(server)
      .delete(`/books/${bookDetails._id}/reviews/${reviewDetails._id}?byPassAuth=true`)
      .expect('Content-Type', 'application/json')
      .set('authorization', null)
      .set('transaction-id', 'test')
      .expect(400)
      .end((err, res) => {
        expect(res.body.statusCode).toEqual(400);
        done();
      });
  });

  it('should return 409 when failed to delete review', (done) => {
    (BookModel.getReviewsByBook as jest.Mock).mockResolvedValue({ ...bookDetails });
    (BookModel.deleteReview as jest.Mock).mockResolvedValue({ ...bookDetails });
    (ReviewModel.deleteReview as jest.Mock).mockResolvedValue({});

    request(server)
      .delete(`/books/${bookDetails._id}/reviews/${reviewDetails._id}?byPassAuth=true`)
      .expect('Content-Type', 'application/json')
      .set('authorization', null)
      .set('transaction-id', 'test')
      .expect(409)
      .end((err, res) => {
        expect(res.body.statusCode).toEqual(409);
        done();
      });
  });
  it('should return 404 when review id not matched for book', (done) => {
    (BookModel.getReviewsByBook as jest.Mock).mockResolvedValue({ ...bookDetails });

    request(server)
      .delete(`/books/${bookDetails._id}/reviews/615ed8098525c65c40a97670?byPassAuth=true`)
      .expect('Content-Type', 'application/json')
      .set('authorization', null)
      .set('transaction-id', 'test')
      .expect(404)
      .end((err, res) => {
        expect(res.body.statusCode).toEqual(404);
        done();
      });
  });
});
