import { Router } from 'express';

import BookService from '../services/book';
const router = Router();

router.get('', BookService.getBooks);
router.post('', BookService.createBook);

router.get('/:book_id', BookService.getBook);
router.put('/:book_id', BookService.updateBook);
router.delete('/:book_id', BookService.deleteBook);

export default router;
