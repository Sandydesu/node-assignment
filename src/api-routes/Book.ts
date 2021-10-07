import { Router } from 'express';
import { createValidator } from 'express-joi-validation';

import { BookService, ReviewService } from '../services';

import { bookPostReqSchema, bookReqParamsSchema, bookUpdateReqSchema } from '../validators/book-request';
import { reviewReqParamsSchema, reviewPostReqSchema, reviewGetReqParamsSchema } from '../validators/review-request';

const router = Router();
const validator = createValidator({ passError: true });

/**
 * Books
 */
router.get('', BookService.getBooks);
router.post('', validator.body(bookPostReqSchema), BookService.createBook);

router.get('/:book_id', validator.params(bookReqParamsSchema), BookService.getBook);
router.put(
  '/:book_id',
  validator.params(bookReqParamsSchema),
  validator.body(bookUpdateReqSchema),
  BookService.updateBook,
);
router.delete('/:book_id', validator.params(bookReqParamsSchema), BookService.deleteBook);

/**
 * Reviews
 */
router.get('/:book_id/reviews', validator.params(reviewReqParamsSchema), ReviewService.getAllReviewsByBook);
router.post(
  '/:book_id/reviews',
  validator.params(reviewReqParamsSchema),
  validator.body(reviewPostReqSchema),
  ReviewService.createReview,
);

router.get('/:book_id/reviews/:review_id', validator.params(reviewGetReqParamsSchema), ReviewService.getReview);

router.put(
  '/:book_id/reviews/:review_id',
  validator.params(reviewGetReqParamsSchema),
  validator.body(reviewPostReqSchema),
  ReviewService.updateReview,
);

router.delete(
  '/:book_id/reviews/:review_id',
  validator.params(reviewGetReqParamsSchema),
  ReviewService.deleteReview,
);

export default router;
