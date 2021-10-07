import { NextFunction, Request, Response } from 'express';

import { HttpHandler } from '../helper';

import BookModel from '../models/Book';
import ReviewModel from '../models/Review';
import PublisherModel from '../models/Publisher';

import { IBook } from '../interfaces';

import { ERROR_MSGS, SUCCESS_MSGS } from '../constants/message.constants';
import { STATUS_CODES } from '../constants/api.constants';

class BookService {
  async getBooks(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const books = await BookModel.getBooks();
      const results = await Promise.all(
        books.map(async (book: IBook) => {
          const b = {
            book_id: book._id,
            name: book.name,
            author: book.author,
            price: book.price,
            reviews: [],
            publisher: {},
          };

          const reviews = await ReviewModel.getReviews(
            { _id: { $in: book.reviews } },
            { review_id: '$_id', _id: 0, reviewer: 1, message: 1 },
          );

          const publisher = await PublisherModel.getPublisher(book.publisher, {
            publisher_id: '$_id',
            _id: 0,
            name: 1,
            location: 1,
          });

          b.reviews = reviews;
          b.publisher = publisher;
          return b;
        }),
      );
      if (results.length) {
        HttpHandler.send(req, res, SUCCESS_MSGS.Books, results);
      } else {
        HttpHandler.sendError(STATUS_CODES.NotFound, `Books are ${ERROR_MSGS.NotAvailable}`, next);
      }
    } catch (err) {
      return HttpHandler.sendError(STATUS_CODES.BadRequest, err.message, next);
    }
  }

  async getBook(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const book = await BookModel.getBook(req.params.book_id);
      const b = {
        book_id: book._id,
        name: book.name,
        author: book.author,
        price: book.price,
        reviews: [],
        publisher: {},
      };
      const reviews = await ReviewModel.getReviews(
        { _id: { $in: book.reviews } },
        { review_id: '$_id', _id: 0, reviewer: 1, message: 1 },
      );

      const publisher = await PublisherModel.getPublisher(book.publisher, {
        publisher_id: '$_id',
        _id: 0,
        name: 1,
        location: 1,
      });
      b.reviews = reviews;
      b.publisher = publisher;
      if (b.book_id) {
        HttpHandler.send(req, res, SUCCESS_MSGS.BooksById, b);
      } else {
        HttpHandler.sendError(STATUS_CODES.NotFound, ERROR_MSGS.InvalidBookId, next);
      }
    } catch (err) {
      return HttpHandler.sendError(STATUS_CODES.BadRequest, err.message, next);
    }
  }

  async createBook(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const book = { ...req.body };
      const review = await ReviewModel.createReviews(book.reviews);
      const publisher = await PublisherModel.createPublisher(book.publisher);
      const reviews_id = review.map((doc) => doc._id);
      book.reviews = [...reviews_id];
      book.publisher = publisher._id;
      const results = await BookModel.createBook(book);
      if (results._id) {
        HttpHandler.send(req, res, SUCCESS_MSGS.CreateBook, results);
      } else {
        HttpHandler.sendError(STATUS_CODES.Conflict, `${ERROR_MSGS.UnabletoCreate} book`, next);
      }
    } catch (err) {
      return HttpHandler.sendError(STATUS_CODES.BadRequest, err.message, next);
    }
  }

  async updateBook(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const book = { ...req.body };
      const id = req.params.book_id;
      if (book.publisher) {
        await PublisherModel.updatePublisher(book.publisher);
      }
      delete book.reviews;
      delete book.publisher;
      const updatedBook = await BookModel.updateBook(id, book);
      if (updatedBook._id) {
        HttpHandler.send(req, res, SUCCESS_MSGS.UpdateBook, updatedBook);
      } else {
        HttpHandler.sendError(STATUS_CODES.Conflict, `${ERROR_MSGS.Unabletoupdate} book`, next);
      }
    } catch (err) {
      return HttpHandler.sendError(STATUS_CODES.BadRequest, err.message, next);
    }
  }

  async deleteBook(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.book_id;
      const deletedBook = await BookModel.deleteBook(id);
      if (deletedBook._id) {
        HttpHandler.send(req, res, SUCCESS_MSGS.DeleteBook, deletedBook);
      } else {
        HttpHandler.sendError(STATUS_CODES.Conflict, `${ERROR_MSGS.UnabletoDelete} book`, next);
      }
    } catch (err) {
      return HttpHandler.sendError(STATUS_CODES.InternalServerError, err.message, next);
    }
  }
}

export default new BookService();
