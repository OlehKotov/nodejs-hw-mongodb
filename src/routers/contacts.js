import {
  createContactController,
  deleteStudentController,
  getContactByIdController,
  getContactsController,
  patchContactController,
} from '../controllers/contacts.js';
import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';
import { validateMongoId } from '../middlewares/validateMongoId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { checkUserId } from '../middlewares/checkUserId.js';

const contactsRouter = Router();


contactsRouter.use('/:contactId', validateMongoId('contactId'));
contactsRouter.use(authenticate);

contactsRouter.get(
  '/',
  // checkUserId('userId'),
  ctrlWrapper(getContactsController),
);

contactsRouter.get(
  '/:contactId',
  // checkUserId('userId'),
  ctrlWrapper(getContactByIdController),
);

contactsRouter.post(
  '/',
  // checkUserId('userId'),
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

contactsRouter.delete(
  '/:contactId',
  // checkUserId('userId'),
  ctrlWrapper(deleteStudentController),
);

contactsRouter.patch(
  '/:contactId',
  checkUserId('userId'),
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);

export default contactsRouter;
