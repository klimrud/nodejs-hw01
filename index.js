const { Command } = require("commander");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require("./contacts.js");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await listContacts();
      console.table(allContacts);
      console.log("Request completed successfully!!!");
      return allContacts;

    case "get":
      const oneContact = await getContactById(id);
      if (!oneContact) {
        console.log(`No contact found for ${id}`);
      }
      console.log(`Contact with ${id} found !`, oneContact);
      return oneContact;

    case "add":
      const contactNew = await addContact(name, email, phone);
      console.log("Contact added successfully!");
      return contactNew;

    case "remove":
      const removeContactId = await removeContact(id);
      if (!removeContactId) {
        console.log(`No contact found for ${id}`);
      }
      console.log("Contact successfully deleted!", removeContactId);
      return removeContactId;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

const actionIndex = process.argv.indexOf("--action");
if (actionIndex !== -1) {
  const action = process.argv[actionIndex + 1];
  invokeAction({ action });
}

invokeAction(argv);

module.exports = invokeAction;
