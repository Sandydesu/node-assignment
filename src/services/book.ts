import { Request, Response } from 'express';

import { HttpHandler } from '../helper';

import BookModel from '../models/Book';
import ReviewModel from '../models/Review';
import PublisherModel from '../models/Publisher';

import { IBook } from '../interfaces';

import { SUCCESS_MSGS } from '../constants/message.constants';

class BookService {
  async getBooks(req: Request, res: Response): Promise<void> {
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
          { review_id: '$_id', _id: 0, reviwer: 1, message: 1 },
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
    HttpHandler.send(req, res, SUCCESS_MSGS.Books, results);
  }

  async getBook(req: Request, res: Response): Promise<void> {
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
      { review_id: '$_id', _id: 0, reviwer: 1, message: 1 },
    );

    const publisher = await PublisherModel.getPublisher(book.publisher, {
      publisher_id: '$_id',
      _id: 0,
      name: 1,
      location: 1,
    });
    b.reviews = reviews;
    b.publisher = publisher;
    HttpHandler.send(req, res, SUCCESS_MSGS.BooksById, b);
  }

  async createBook(req: Request, res: Response): Promise<void> {
    const book = { ...req.body };
    const review = await ReviewModel.createReviews(book.reviews);
    const publisher = await PublisherModel.createPublisher(book.publisher);
    const reviews_id = review.map((doc) => doc._id);
    book.reviews = [...reviews_id];
    book.publisher = publisher._id;
    const results = await BookModel.createBook(book);
    HttpHandler.send(req, res, SUCCESS_MSGS.CreateBook, results);
  }

  async updateBook(req: Request, res: Response): Promise<void> {
    const book = { ...req.body };
    const id = req.params.book_id;
    if (book.publisher) {
      await PublisherModel.updatePublisher(book.publisher);
    }
    delete book.reviews;
    delete book.publisher;
    const updatedBook = await BookModel.updateBook(id, book);
    HttpHandler.send(req, res, SUCCESS_MSGS.UpdateBook, updatedBook);
  }

  async deleteBook(req: Request, res: Response): Promise<void> {
    const id = req.params.book_id;
    const deletedBook = await BookModel.deleteBook(id);
    HttpHandler.send(req, res, SUCCESS_MSGS.DeleteBook, deletedBook);
  }
}

export default new BookService();
