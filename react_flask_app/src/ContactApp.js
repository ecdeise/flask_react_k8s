// ContactApp.js
//import './ContactApp.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from './config.json';
import { Container, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton, makeStyles } from '@material-ui/core';
import { Delete as DeleteIcon, Edit as EditIcon, Save as SaveIcon, Cancel as CancelIcon } from '@material-ui/icons';



// function ContactForm({ onSubmit }) {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [address, setAddress] = useState('');
  // const useStyles = makeStyles((theme) => ({
  //   form: {
  //     display: 'flex',
  //     flexDirection: 'column',
  //     gap: theme.spacing(2),
  //     maxWidth: 800,
  //   },
  // }));
  const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      justifyContent: 'center',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing(1),
      //width: '50%',
      
    },
  }));
  
  function ContactForm({ onSubmit }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
  
    const classes = useStyles();
  
    const handleSubmit = (event) => {
      event.preventDefault();
      onSubmit({ name, email, phone, address });
      setName('');
      setEmail('');
      setPhone('');
      setAddress('');
    };
  
    return (
      <Container maxWidth="sm">
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <TextField
          label="Phone"
          variant="outlined"
          type="tel"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
        />
        <TextField
          label="Address"
          variant="outlined"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
        />
        <Button variant="contained" color="primary" type="submit">
          Save
        </Button>
      </form>
      </Container>
    );
  }

//   const handleSubmit = event => {
//     event.preventDefault();
//     onSubmit({ name, email, phone, address });
//     setName('');
//     setEmail('');
//     setPhone('');
//     setAddress('');
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Name:
//         <input type="text" value={name} onChange={event => setName(event.target.value)} />
//       </label>
//       <label>
//         Email:
//         <input type="email" value={email} onChange={event => setEmail(event.target.value)} />
//       </label>
//       <label>
//         Phone:
//         <input type="tel" value={phone} onChange={event => setPhone(event.target.value)} />
//       </label>
//       <label>
//         Address:
//         <input type="text" value={address} onChange={event => setAddress(event.target.value)} />
//       </label>
//       <button type="submit">Save</button>
//     </form>
//   );
// }

function ContactTable({ contacts, onDelete, onUpdate }) {
  const [editableContact, setEditableContact] = useState(null);

  const handleEdit = contact => {
    setEditableContact(contact);
  };

  const handleSave = () => {
    onUpdate(editableContact);
    setEditableContact(null);
  };

  const handleCancel = () => {
    setEditableContact(null);
  };

  const isEditable = contact => {
    return editableContact && editableContact.id === contact.id;
  };
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts.map(contact => (
            <TableRow key={contact.id}>
              <TableCell>
                {isEditable(contact) ? (
                  <TextField
                    value={editableContact.name}
                    onChange={e =>
                      setEditableContact({
                        ...editableContact,
                        name: e.target.value,
                      })
                    }
                  />
                ) : (
                  contact.name
                )}
              </TableCell>
              <TableCell>
                {isEditable(contact) ? (
                  <TextField
                    type="email"
                    value={editableContact.email}
                    onChange={e =>
                      setEditableContact({
                        ...editableContact,
                        email: e.target.value,
                      })
                    }
                  />
                ) : (
                  contact.email
                )}
              </TableCell>
              <TableCell>
                {isEditable(contact) ? (
                  <TextField
                    type="tel"
                    value={editableContact.phone}
                    onChange={e =>
                      setEditableContact({
                        ...editableContact,
                        phone: e.target.value,
                      })
                    }
                  />
                ) : (
                  contact.phone
                )}
              </TableCell>
              <TableCell>
                {isEditable(contact) ? (
                  <TextField
                    value={editableContact.address}
                    onChange={e =>
                      setEditableContact({
                        ...editableContact,
                        address: e.target.value,
                      })
                    }
                  />
                ) : (
                  contact.address
                )}
              </TableCell>
              <TableCell>
                {isEditable(contact) ? (
                  <>
                    <Button variant="contained" onClick={handleSave}>
                      Save
                    </Button>
                    <Button variant="contained" onClick={handleCancel}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => onDelete(contact)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => handleEdit(contact)}
                    >
                      Edit
                    </Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
  // return (
  //   <table>
  //     <thead>
  //       <tr>
  //         <th>Name</th>
  //         <th>Email</th>
  //         <th>Phone</th>
  //         <th>Address</th>
  //         <th>Action</th>
  //       </tr>
  //     </thead>
  //     <tbody>
  //       {contacts.map(contact => (
  //         <tr key={contact.id}>
  //           <td>{isEditable(contact) ? <input type="text" value={editableContact.name} onChange={e => setEditableContact({...editableContact, name: e.target.value})} /> : contact.name}</td>
  //           <td>{isEditable(contact) ? <input type="text" value={editableContact.email} onChange={e => setEditableContact({...editableContact, email: e.target.value})} /> : contact.email}</td>
  //           <td>{isEditable(contact) ? <input type="text" value={editableContact.phone} onChange={e => setEditableContact({...editableContact, phone: e.target.value})} /> : contact.phone}</td>
  //           <td>{isEditable(contact) ? <input type="text" value={editableContact.address} onChange={e => setEditableContact({...editableContact, address: e.target.value})} /> : contact.address}</td>
  //           <td>
  //             {isEditable(contact) ? (
  //               <>
  //                 <button onClick={handleSave}>Save</button>
  //                 <button onClick={handleCancel}>Cancel</button>
  //               </>
  //             ) : (
  //               <>
  //                 <button className="delete" onClick={() => onDelete(contact)}>Delete</button>
  //                 <button onClick={() => handleEdit(contact)}>Edit</button>
  //               </>
  //             )}
  //           </td>
  //         </tr>
  //       ))}
  //     </tbody>
  //   </table>
  // );
}


function ContactApp() {

  const [contacts, setContacts] = useState([]);

  // config for dev and prod - based on 
  // export NODE_ENV=development
  // To Confirm: echo $NODE_ENV

  const baseUrl = config[process.env.NODE_ENV].baseUrl;
  const endpointUrl = '/api/contacts';
  const url = `${baseUrl}${endpointUrl}`;

  useEffect(() => {
    console.log(`GET ${baseUrl}/api/contacts`);
    axios.get(`${baseUrl}/api/contacts`)
      .then(response => {
        console.log(`GET /api/contacts HTTP/1.1 ${response.status}`);
        console.log(response.data);
        return response;
      })
      .then(response => setContacts(response.data.contacts))
      .catch(error => console.error(error));
  }, []);

  const handleCreate = contact => {
    axios.post(`${baseUrl}/api/contacts`, contact)
      .then(response => {
        console.log(`POST /api/contacts HTTP/1.1 ${response.status}`);
        console.log(response.data);
        setContacts(contacts => [...contacts, response.data]);
      })
      .catch(error => console.error(error));
  };

  const handleUpdate = contact => {
    axios.put(`${baseUrl}/api/contacts/${contact.id}`, contact)
      .then(response => {
        console.log(`PUT /api/contacts/${contact.id} HTTP/1.1 ${response.status}`);
        console.log(response.data);
        const updatedContact = response.data;
        setContacts(contacts =>
          contacts.map(c => (c.id === updatedContact.id ? { ...c, ...updatedContact } : c))
        );
      })
      .catch(error => console.error(error));
  };
  

  const handleDelete = contact => {
    axios.delete(`${baseUrl}/api/contacts/${contact.id}`)
      .then(response => {
        console.log(`DELETE /api/contacts/${contact.id} HTTP/1.1 ${response.status}`);
        setContacts(contacts => contacts.filter(c => c.id !== contact.id));
      })
      .catch(error => console.error(error));
  };

  return (
    <>
      <h1>Contacts</h1>
      {<ContactForm onSubmit={handleCreate} />}
      {contacts ? <ContactTable contacts={contacts} onDelete={handleDelete} onUpdate={handleUpdate} /> : null}
      
    </>
  );
}

export default ContactApp;