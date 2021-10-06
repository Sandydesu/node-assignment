import { Router } from 'express';
import { createValidator } from 'express-joi-validation';

import { BookService } from '../services';

import { bookPostReqSchema, bookReqParamsSchema, bookUpdateReqSchema } from '../validators/request.validator';

const router = Router();
const validator = createValidator({ passError: true });

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

export default router;
