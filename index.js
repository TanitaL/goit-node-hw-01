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




// Second method

// const argv = require("yargs").argv;

// const invokeAction = async ({ action, id, name, email, phone }) => {
//     switch (action) {
//         case "list":
//             const contactList = await listContacts();
//             console.table(contactList)
//             // return contactList;

//         case "get":
//             const getContact = await getContactById(id);
//             // console.table(getContact || null);
//             return getContact || null;

//         case "add":
//             const newContact = await addContact({ id, name, email, phone });
//             // console.table(newContact);
//             return newContact;

//         case "remove":
//             const removedContact = await removeContact(id);
//             // console.table(removedContact);
//             return removedContact;

//         default:
//             console.warn("\x1B[31m Unknown action type!");
//     }
// }

// invokeAction(argv);

// invokeAction({action: "list"})
// invokeAction({action: "get", id: "AeHIrLTr6JkxGE6SN-0Rw"});
// invokeAction({action: "add", name: "Mark Simpson", email: "mark@mark.com", phone: "(111) 111-1111"})
// invokeAction({action: "remove", id: "6XGfqyxcvBH2i6OixvJ82"})

// const actionIndex = process.argv.indexOf("--action");
// if (actionIndex !== -1) {
//     const action = process.argv[actionIndex + 1];
//     invokeAction({action})
// }
