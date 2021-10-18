import * as request from 'supertest';
import { Express } from 'express-serve-static-core';

import { createServer } from '../mock/server/mock-server';

import BookModel from '../../models/Book';
import ReviewModel from '../../models/Review';
import PublisherModel from '../../models/Publisher';

import { bookDetails, createBook, publishDetails, reviewDetails, updateBook } from '../mock/utils/book.util';

jest.mock('../../models/Book');
jest.mock('../../models/Review');
jest.mock('../../models/Publisher');

let server: Express;

beforeAll(async () => {
  server = await createServer();
});

describe('[Failure] GET /books', () => {
  it('should throw 400 error', (done) => {
    (BookModel.getBooks as jest.Mock).mockRejectedValue(new Error());
    request(server)
      .get(`/books?byPassAuth=true`)
      .set('authorization', null)
      .set('transaction-id', 'test')
      .expect('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res.body.statusCode).toEqual(400);
        done();
      });
  });

  it('should return 404 not found', (done) => {
    (BookModel.getBooks as jest.Mock).mockResolvedValue([]);
    request(server)
      .get(`/books?byPassAuth=true`)
      .set('authorization', null)
      .set('transaction-id', 'test')
      .expect('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res.body.statusCode).toEqual(404);
        done();
      });
  });
});

describe('[Failure] GET BOOK BY ID /books/:book_id', () => {
  it('should throw 400 error', (done) => {
    (BookModel.getBook as jest.Mock).mockRejectedValue(new Error());

    request(server)
      .get(`/books/${bookDetails._id}?byPassAuth=true`)
      .set('transaction-id', 'test')
      .set('authorization', null)
      .expect('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res.body.statusCode).toEqual(400);
        done();
      });
  });

  it('should return 404 not found', (done) => {
    (BookModel.getBook as jest.Mock).mockResolvedValue({});

    request(server)
      .get(`/books/${bookDetails._id}?byPassAuth=true`)
      .set('transaction-id', 'test')
      .set('authorization', null)
      .expect('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res.body.statusCode).toEqual(404);
        done();
      });
  });
});

describe('[Failure] CREATE /books', () => {
  it('should throw 400 error', (done) => {
    (BookModel.createBook as jest.Mock).mockRejectedValue(new Error());
    (ReviewModel.createReviews as jest.Mock).mockResolvedValue([{ ...reviewDetails }]);
    (PublisherModel.createPublisher as jest.Mock).mockResolvedValue({ ...publishDetails });

    request(server)
      .post(`/books?byPassAuth=true`)
      .set('transaction-id', 'test')
      .set('authorization', null)
      .send(createBook())
      .expect('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res.body.statusCode).toEqual(400);
        done();
      });
  });

  it('should return 409 when book unable to create', (done) => {
    (BookModel.createBook as jest.Mock).mockResolvedValue({});
    (ReviewModel.createReviews as jest.Mock).mockResolvedValue([{ ...reviewDetails }]);
    (PublisherModel.createPublisher as jest.Mock).mockResolvedValue({ ...publishDetails });

    request(server)
      .post(`/books?byPassAuth=true`)
      .set('transaction-id', 'test')
      .set('authorization', null)
      .send(createBook())
      .expect('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res.body.statusCode).toEqual(409);
        done();
      });
  });
});

describe('[Failure] UPDATE /books/:book_id', () => {
  it('should return 400 error', (done) => {
    (BookModel.updateBook as jest.Mock).mockRejectedValue(new Error());
    (PublisherModel.updatePublisher as jest.Mock).mockResolvedValue({ ...publishDetails });

    request(server)
      .put(`/books/${bookDetails._id}?byPassAuth=true`)
      .set('transaction-id', 'test')
      .set('authorization', null)
      .send(updateBook())
      .expect('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res.body.statusCode).toEqual(400);
        done();
      });
  });

  it('should return 409 when unable to update book', (done) => {
    (BookModel.updateBook as jest.Mock).mockResolvedValue({});
    const book = updateBook();
    delete book.publisher;

    request(server)
      .put(`/books/${bookDetails._id}?byPassAuth=true`)
      .set('transaction-id', 'test')
      .set('authorization', null)
      .send(book)
      .expect('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res.body.statusCode).toEqual(409);
        done();
      });
  });
});

describe('[Failure] DELETE BOOK /books/:book_id', () => {
  it('should return 500 error', (done) => {
    (BookModel.deleteBook as jest.Mock).mockRejectedValue(new Error());

    request(server)
      .delete(`/books/${bookDetails._id}?byPassAuth=true`)
      .set('transaction-id', 'test')
      .set('authorization', null)
      .expect('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res.body.statusCode).toEqual(500);
        done();
      });
  });

  it('should return 409 when book already deleated', (done) => {
    (BookModel.deleteBook as jest.Mock).mockResolvedValue({});

    request(server)
      .delete(`/books/${bookDetails._id}?byPassAuth=true`)
      .set('transaction-id', 'test')
      .set('authorization', null)
      .expect('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res.body.statusCode).toEqual(409);
        done();
      });
  });
});
