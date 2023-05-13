// import React, {useState} from 'react';
// import {QrReader} from 'react-qr-reader';

// function ScanISBN() {
//   const [isbn, setIsbn] = useState('');
//   const [error, setError] = useState(null);

//   const handleScan = (data) => {
//     if (data) {
//       setIsbn(data.trim());
//     }
//   };

//   const handleError = (err) => {
//     console.error(err);
//     setError(
//       'Failed to access your camera. Please allow camera access to scan.'
//     );
//   };

//   const handleScanClick = () => {
//     setIsbn('');
//     setError(null);
//   };

//   return (
//     <div>
//       <h1>Scan ISBN</h1>
//       <div>
//         <QrReader
//           delay={300}
//           onError={handleError}
//           onScan={handleScan}
//           style={{width: '100%'}}
//         />
//         <button onClick={handleScanClick}>Scan Again</button>
//         <div>
//           {error && <p>{error}</p>}
//           <input
//             type="text"
//             value={isbn}
//             onChange={(e) => setIsbn(e.target.value)}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ScanISBN;

import React, {useState} from 'react';
import {QrReader} from 'react-qr-reader';

function ScanISBN() {
  const [data, setData] = useState('No result');

  const handleScan = (result) => {
    if (result) {
      setData(result);
    }
  };

  const handleError = (error) => {
    console.error(error);
  };

  return (
    <>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{width: '100%'}}
      />
      <p>{data}</p>
    </>
  );
}

export default ScanISBN;
