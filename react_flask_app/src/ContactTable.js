import React, {useState} from 'react';
import {
  Container,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@material-ui/core';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from '@material-ui/icons';
import useStyles from './Styles';

function ContactTable({contacts, onDelete, onUpdate}) {
  const [editableContact, setEditableContact] = useState(null);
  const classes = useStyles();

  const handleEdit = (contact) => {
    setEditableContact(contact);
  };

  const handleSave = () => {
    onUpdate(editableContact);
    setEditableContact(null);
  };

  const handleCancel = () => {
    setEditableContact(null);
  };

  const isEditable = (contact) => {
    return editableContact && editableContact.id === contact.id;
  };
  return (
    <TableContainer component={Paper} style={{width: '100%'}}>
      <Table>
        <TableHead className={classes.th}>
          <TableRow>
            <TableCell className={classes.boldCell}>Name</TableCell>
            <TableCell className={classes.boldCell}>Email</TableCell>
            <TableCell className={classes.boldCell}>Phone</TableCell>
            <TableCell className={classes.boldCell}>Address</TableCell>
            <TableCell className={classes.boldCell}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts.map((contact, index) => (
            <TableRow
              key={contact.id}
              className={index % 2 === 0 ? classes.evenRow : classes.oddRow}
            >
              <TableCell>
                {isEditable(contact) ? (
                  <TextField
                    value={editableContact.name}
                    onChange={(e) =>
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
                    onChange={(e) =>
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
                    onChange={(e) =>
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
                    onChange={(e) =>
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
                    <Button
                      className={classes.Button}
                      color="primary"
                      startIcon={<AddIcon />}
                      onClick={handleSave}
                      style={{marginRight: '10px'}} // Add margin-right
                      size="small"
                    >
                      Save
                    </Button>
                    <Button
                      className={classes.Button}
                      color="secondary"
                      startIcon={<CancelIcon />}
                      onClick={handleCancel}
                      size="small"
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      className={classes.Button}
                      color="primary"
                      startIcon={<EditIcon />}
                      onClick={() => handleEdit(contact)}
                      style={{marginRight: '10px'}} // Add margin-right
                      size="small"
                    >
                      Edit
                    </Button>

                    <Button
                      className={classes.Button}
                      color="secondary"
                      startIcon={<DeleteIcon />}
                      onClick={() => onDelete(contact)}
                      size="small"
                    >
                      Delete
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
}

export default ContactTable;
