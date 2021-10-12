import { Router } from 'express';
import { createValidator } from 'express-joi-validation';

import BookRouter from './Book';

import AuthenticateService from '../services/authentication';

import authMiddleWare from '../middlewares/auth';

import { reqHeaderSchema } from '../validators/req-header';

const router = Router();
const validator = createValidator({ passError: true });

router.get('/', (req, res) => res.send('Books api'));
router.get('/token', AuthenticateService.getAccessToken);
router.use('/books', validator.headers(reqHeaderSchema), authMiddleWare, BookRouter);

export default router;
