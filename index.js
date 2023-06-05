const contacts = require("./contacts");
const { listContacts, getContactById, removeContact, addContact } = contacts;
  
const { Command } = require("commander");
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
            const contactList = await listContacts();
            return contactList;

        case "get":
            const getContact = await getContactById(id);
            return getContact || null;

        case "add":
            const newContact = await addContact({ id, name, email, phone });
            return newContact;

        case "remove":
            const removedContact = await removeContact(id);
            return removedContact;

        default:
            console.warn("\x1B[31m Unknown action type!");
    }
}

invokeAction(argv);