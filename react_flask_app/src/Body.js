import React from 'react';

function Body({Component = () => null}) {
  return <main>{<Component />}</main>;
}

export default Body;

// import React from 'react';
// import ContactApp from './ContactApp';

// function Body() {
//   return <main>{/* <ContactApp /> */}</main>;
// }

// export default Body;
