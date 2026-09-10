const express = require('express');
const {
  getAllContacts,
  getSingleContact
} = require('../controllers/contacts');

const router = express.Router();

// Return all contacts.
router.get('/', getAllContacts);

// Return one contact using the id query parameter.
router.get('/single', getSingleContact);

module.exports = router;