import { Router } from 'express';

import BookRouter from './Book';
import ReviewRouter from './Review';

const router = Router();

router.use('/books', BookRouter);
router.use('/reviews', ReviewRouter);

export default router;
