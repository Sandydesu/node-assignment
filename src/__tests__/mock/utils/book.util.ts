/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import BookDetails from '../data/mock-book';
import ReviewDetails from '../data/mock-review';
import PublishDetails from '../data/mock-publisher';

export const createBook = () => {
  const book = { ...BookDetails };
  const review = { ...ReviewDetails };
  const publish = { ...PublishDetails };

  delete book._id;
  delete review._id;
  delete publish._id;

  return {
    ...book,
    reviews: [{ ...review }],
    publisher: { ...publish },
  };
};

export const updateBook = () => {
  const book = { ...BookDetails };
  book['book_id'] = book._id;
  const publish = { ...PublishDetails };
  publish['publisher_id'] = publish._id;

  delete book._id;
  delete book.reviews;
  delete publish._id;

  return {
    ...book,
    publisher: { ...publish },
  };
};

export const bookDetails = BookDetails;
export const reviewDetails = ReviewDetails;
export const publishDetails = PublishDetails;
