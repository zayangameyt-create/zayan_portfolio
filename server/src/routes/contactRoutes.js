import { Router } from 'express';
import { submitContact } from '../controllers/contactController.js';
import { contactLimiter } from '../middleware/rateLimiters.js';

const contactRouter = Router();

contactRouter.post('/', contactLimiter, submitContact);

export default contactRouter;
