import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getCurrentUserController } from '../controllers/user.js';

const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getCurrentUserController));

export default router;
