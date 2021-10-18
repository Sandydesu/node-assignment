/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import BookDetails from '../data/mock-book';
import ReviewDetails from '../data/mock-review';

export const createReview = () => {
  const review = { ...ReviewDetails };
  delete review._id;
  return {
    ...review,
  };
};

export const bookDetails = BookDetails;
export const reviewDetails = ReviewDetails;
