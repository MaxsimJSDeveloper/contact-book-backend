import createHttpError from 'http-errors';

import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  updateContact,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
  });

  res.status(200).json({
    status: 200,
    message: `Success!`,
    data: contacts,
  });
};

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  const contact = await createContact(req.body);

  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await deleteContact(contactId);

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }
  res.send({ status: 200, massage: 'Contact deleted', data: contact });
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await updateContact(contactId, req.body);

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  return res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result.contact,
  });
};
