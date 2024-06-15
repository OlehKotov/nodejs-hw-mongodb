
import createHttpError from 'http-errors';

import { ContactsCollection } from '../db/contact.js';

export const checkUserId =
  (userIdParam) =>
  async (req, res, next) => {


        if (!req.user || !req.user._id) {
            return next(createHttpError(401, 'User is not authenticated'));
        }
        const userId = req.user._id;
        const contact = await ContactsCollection.findOne({_id: userIdParam, userId: userId,});

        if (!contact) {
         return next(createHttpError(403, "User not found"));
        }
        next();
    };


