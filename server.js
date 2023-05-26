const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const port = 3333;

const server = express();
server.use(bodyParser.json());
server.use(cors());


// data
const contacts = [
    {id: 1, name: "Bob", address: "123 My Road", phone: "555-6789", email: "bob@mail.com"},
    {id: 2, name: "Joe", address: "321 My Road", phone: "555-6339", email: "joe@mail.com"}
];

let contactId = contacts.length + 1;

const sendUserError = (msg, res) => {
    res.status(422);
    res.json({ Error: msg });
    return;
}


// CREATE
server.post("/contacts", (req, res) => {
    const { name, address, phone, email } = req.body;

    const newContact = { id: contactId, name, address, phone, email};

    contacts.push(newContact);
    contactId++;
    res.status(201).json(contacts);
})


// READ
server.get("/", (req, res) => {
    const greeting = {"message": "Hello from the api"}; 
    res.status(200).json(greeting);
})

server.get("/contacts", (req, res) => {
    const greeting = {"message": "Hello from the api"}; 
    res.status(200).json(contacts);
})

server.get("/contacts/:id", (req, res) => {
    const contact = contacts.filter(person => person.id.toString() === req.params.id)[0]
    res.status(200).json(contact);
})

// UPDATE
server.put("/contacts/:id", (req, res) => {
    const { id } = req.params;
   
    const { name, address, phone, email } = req.body;
    const findById = contact => {
        return contact.id == id;
    };

    const foundContact = contacts.find(findById);

    if (foundContact) {
        if (name) foundContact.name = name;
        if (address) foundContact.address = address;
        if (phone) foundContact.phone = phone;
        if (email) foundContact.email = email;
        return res.status(200).json(contacts);
    } else {
        return sendUserError("id not found in db", res);
    }
});




// DELETE

server.delete("/contacts/:id", (req, res) => {
    const { id } = req.params;
    const foundContact = contacts.find(contact => contact.id == id);

    if (foundContact) {
        // const contactRemoved = { ...foundContact };
        contacts = contacts.filter(contact => contact.id != id);
        res.status(200).json(contacts);
    } else {
        return sendUserError("id not found in db", res);
    }
})


server.listen(port, () => console.log(`server running on port: ${port}`));