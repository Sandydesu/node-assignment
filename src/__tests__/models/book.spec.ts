import BookModel from '../../models/Book';

import { BookSchemaModel } from '../../schemas';

import bookDetails from '../mock/data/mock-book';

jest.mock('../../schemas');

const bookSchema = {
  name: 'five Book',
  author: ['five book author'],
  price: '$1.99',
  reviews: ['615ed8098525c65c40a9767f'],
  publisher: '615ed72c42dc405c8875d04e',
};

describe('Books Model', () => {
  it('get books', (done) => {
    (BookSchemaModel.find as jest.Mock).mockResolvedValue([{ ...bookDetails }]);
    BookModel.getBooks().then((value) => {
      expect(value.length).toEqual(1);
      done();
    });
  });

  it('get book', (done) => {
    (BookSchemaModel.findOne as jest.Mock).mockResolvedValue({ ...bookDetails });
    BookModel.getBook(bookDetails._id).then((value) => {
      expect(value._id).toEqual(bookDetails._id);
      done();
    });
  });

  it('create book', (done) => {
    (BookSchemaModel.create as jest.Mock).mockResolvedValue({ ...bookDetails });
    const book = new BookSchemaModel(bookSchema);
    BookModel.createBook(book).then((value) => {
      expect(value._id).toEqual(bookDetails._id);
      done();
    });
  });

  it('update book', (done) => {
    (BookSchemaModel.findOneAndUpdate as jest.Mock).mockResolvedValue({ ...bookDetails });
    const book = new BookSchemaModel(bookSchema);
    BookModel.updateBook(bookDetails._id, book).then((value) => {
      expect(value._id).toEqual(bookDetails._id);
      done();
    });
  });

  it('delete book', (done) => {
    (BookSchemaModel.findOneAndDelete as jest.Mock).mockResolvedValue({ ...bookDetails });
    BookModel.deleteBook(bookDetails._id).then((value) => {
      expect(value._id).toEqual(bookDetails._id);
      done();
    });
  });

  it('get reviews', (done) => {
    (BookSchemaModel.findOne as jest.Mock).mockResolvedValue({ reviews: bookDetails.reviews });
    BookModel.getReviewsByBook(bookDetails._id).then((value) => {
      expect(value.reviews.length).toEqual(bookDetails.reviews.length);
      done();
    });
  });

  it('update reviews', (done) => {
    (BookSchemaModel.findOneAndUpdate as jest.Mock).mockResolvedValue({ ...bookDetails });
    BookModel.updateReview(bookDetails._id, bookDetails.reviews[0]).then((value) => {
      expect(value.reviews.length).toEqual(bookDetails.reviews.length);
      done();
    });
  });

  it('remove review from book', (done) => {
    (BookSchemaModel.findOneAndUpdate as jest.Mock).mockResolvedValue({ ...bookDetails });
    BookModel.deleteReview(bookDetails._id, bookDetails.reviews[0]).then((value) => {
      expect(value.reviews.length).toEqual(bookDetails.reviews.length);
      done();
    });
  });
});
