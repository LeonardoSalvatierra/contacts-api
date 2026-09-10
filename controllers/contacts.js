const { getDB } = require('../db/connect');
const { ObjectId } = require('mongodb');

async function getAllContacts(req, res) {
  try {
    const contacts = await getDB()
      .collection('contacts')
      .find({})
      .toArray();

    res.status(200).json(contacts);
  } catch (error) {
    console.error('Failed to retrieve contacts:', error.message);
    res.status(500).json({ error: 'Failed to retrieve contacts' });
  }
}

async function getSingleContact(req, res) {
  const id = req.query.id;

  // Require a valid MongoDB ObjectId string.
  if (typeof id !== 'string' || !/^[a-fA-F0-9]{24}$/.test(id)) {
    return res.status(400).json({
      error: 'Provide a valid contact ID using ?id=...'
    });
  }

  try {
    const contact = await getDB()
      .collection('contacts')
      .findOne({ _id: new ObjectId(id) });

    if (!contact) {
      return res.status(404).json({
        error: 'Contact not found'
      });
    }

    return res.status(200).json(contact);
  } catch (error) {
    console.error('Failed to retrieve contact:', error.message);

    return res.status(500).json({
      error: 'Failed to retrieve contact'
    });
  }
}

module.exports = { getAllContacts, getSingleContact };