import * as request from 'supertest';
import { Express } from 'express-serve-static-core';

import { createServer } from '../mock/server/mock-server';

import BookModel from '../../models/Book';
import ReviewModel from '../../models/Review';
import PublisherModel from '../../models/Publisher';

import { bookDetails, publishDetails, reviewDetails, createBook, updateBook } from '../mock/utils/book.util';

jest.mock('../../models/Book');
jest.mock('../../models/Review');
jest.mock('../../models/Publisher');

let server: Express;

beforeAll(async () => {
  server = await createServer();
});

describe('[Success] GET /books', () => {
  it('should get list of books', (done) => {
    (BookModel.getBooks as jest.Mock).mockResolvedValue([{ ...bookDetails }]);
    (ReviewModel.getReviews as jest.Mock).mockResolvedValue([{ ...reviewDetails }]);
    (PublisherModel.getPublisher as jest.Mock).mockResolvedValue({ ...publishDetails });

    request(server)
      .get(`/books?byPassAuth=true`)
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

describe('[Success] CREATE /books', () => {
  it('should create a book', (done) => {
    (BookModel.createBook as jest.Mock).mockResolvedValue({ ...bookDetails });
    (ReviewModel.createReviews as jest.Mock).mockResolvedValue([{ ...reviewDetails }]);
    (PublisherModel.createPublisher as jest.Mock).mockResolvedValue({ ...publishDetails });

    request(server)
      .post(`/books?byPassAuth=true`)
      .set('transaction-id', 'test')
      .set('authorization', null)
      .send(createBook())
      .expect('Content-Type', 'application/json')
      .expect(200)
      .end((err, res) => {
        expect(res.body.statusCode).toEqual(200);
        expect(res.body.message).toEqual('Successfully created a new book');
        done();
      });
  });
});

describe('[Success] GET BOOK BY ID /books/:book_id', () => {
  it('should get book by id', (done) => {
    (BookModel.getBook as jest.Mock).mockResolvedValue({ ...bookDetails });
    (ReviewModel.getReviews as jest.Mock).mockResolvedValue([{ ...reviewDetails }]);
    (PublisherModel.getPublisher as jest.Mock).mockResolvedValue({ ...publishDetails });

    request(server)
      .get(`/books/${bookDetails._id}?byPassAuth=true`)
      .set('transaction-id', 'test')
      .set('authorization', null)
      .expect('Content-Type', 'application/json')
      .expect(200)
      .end((err, res) => {
        expect(res.body.statusCode).toEqual(200);
        expect(res.body.data.book_id).toEqual(bookDetails._id);
        expect(res.body.message).toEqual('Successfully returned a book');
        done();
      });
  });
});

describe('[Success] UPDATE BOOK /books/:book_id', () => {
  it('should update a book', (done) => {
    (BookModel.updateBook as jest.Mock).mockResolvedValue({ ...bookDetails });
    (PublisherModel.updatePublisher as jest.Mock).mockResolvedValue({ ...publishDetails });

    request(server)
      .put(`/books/${bookDetails._id}?byPassAuth=true`)
      .set('transaction-id', 'test')
      .set('authorization', null)
      .send(updateBook())
      .expect('Content-Type', 'application/json')
      .expect(200)
      .end((err, res) => {
        expect(res.body.statusCode).toEqual(200);
        expect(res.body.message).toEqual('Successfully updated a book');
        done();
      });
  });
});

describe('[Success] DELETE BOOK /books/:book_id', () => {
  it('should delete a book', (done) => {
    (BookModel.deleteBook as jest.Mock).mockResolvedValue({ ...bookDetails });

    request(server)
      .delete(`/books/${bookDetails._id}?byPassAuth=true`)
      .set('transaction-id', 'test')
      .set('authorization', null)
      .expect('Content-Type', 'application/json')
      .expect(200)
      .end((err, res) => {
        expect(res.body.statusCode).toEqual(200);
        expect(res.body.message).toEqual('Successfully deleted a book');
        done();
      });
  });
});
