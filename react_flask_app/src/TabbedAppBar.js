import {useState} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ContactApp from './ContactApp';
import Main from './Main';

export default function TabbedAppBar() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Home" />
        <Tab label="Contacts" />
      </Tabs>
      {value === 0 && <Main />}
      {value === 1 && <ContactApp />}
    </div>
  );
}
