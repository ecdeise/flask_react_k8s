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
