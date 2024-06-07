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
import { createContactSchema } from '../validation/contacts.js';
import { updateContactSchema } from '../validation/contacts.js';
import { validateMongoId } from '../middlewares/validateMongoId.js';

const router = Router();
router.use('/contacts/:contactId', validateMongoId('contactId'));

router.get('/contacts', ctrlWrapper(getContactsController));

router.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));

router.post(
  '/contacts',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

router.delete('/contacts/:contactId', ctrlWrapper(deleteStudentController));

router.patch(
  '/contacts/:contactId',
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);

export default router;
