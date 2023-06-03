const { readFile, writeFile } = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join("db", "./contacts.json");

const listContacts = async () => {
  const data = await readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (id) => {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === id);
  return result || null;
};

const removeContact = async (id) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return null;
  }
  console.log("index", index);
  const [result] = contacts.splice(index, 1);
  await writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const contactNew = { id: nanoid(), name, email, phone };
  console.log("contactNew", contactNew);

  const result = contacts.push(contactNew);
  await writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}

module.exports = { listContacts, getContactById, addContact, removeContact };
