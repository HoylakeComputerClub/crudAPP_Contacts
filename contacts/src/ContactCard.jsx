import React from 'react';
import './ContactCard.css';

function ContactCard({contact}) {
  return (
    <>
    <div className="contactCard">
        <h2>{contact.name}</h2>
        <p>{contact.email}</p>
        <div className="btnOne">Edit</div>
    </div>

    </>
  )
}

export default ContactCard