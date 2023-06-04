const fs = require('fs/promises');
const path = require("path");
const { nanoid } = require("nanoid");


const contactsPath = path.join(__dirname, "./db/contacts.json");

const listContacts = async () => {
  const contactsList = await fs.readFile(contactsPath);
  return JSON.parse(contactsList);
}

const getContactById = async (id) => {
  const contacts = await listContacts();
  const contactByID = contacts.find(contact => contact.id === id);
  return contactByID;
}

const removeContact = async (id) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === id);

  if (index === -1) {
    return null;
  }

  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();

  const newContact = {
    id: nanoid(),
    name,
    email,
    phone
  };

  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact; 
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
};


