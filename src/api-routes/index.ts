import { Router } from 'express';

import BookRouter from './Book';

const router = Router();
router.get('/', (req, res) => res.send("Books api"));
router.use('/books', BookRouter);

export default router;
