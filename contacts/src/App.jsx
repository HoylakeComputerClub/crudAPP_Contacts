import { useEffect, useState } from 'react'
import axios from 'axios';
import './App.css'
import ContactCard from './ContactCard';

function App() {
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3333/contacts")
    .then((res) => {
      setContacts(res.data);
    })
  })

  return (
    <>
    <h1>Contacts</h1>
     {contacts.map(contact => {
        return <ContactCard key={contact.id} contact={contact} />
     })}
    </>
  )
}

export default App
