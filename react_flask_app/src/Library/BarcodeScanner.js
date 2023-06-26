import React from 'react';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';

function BarCodeScanner({visible, onScan, onError}) {
  const [data, setData] = React.useState('Not Found');

  const handleScan = (result) => {
    if (result) {
      onScan(result.text); // Call the onScan prop function with the scanned data
      setData(result.text);
    }
  };

  return (
    <>
      {visible && (
        <BarcodeScannerComponent
          width={300}
          height={300}
          onUpdate={(err, result) => {
            if (err) {
              onError(err);
              setData('Not Found');
            } else {
              handleScan(result);
            }
          }}
        />
      )}
    </>
  );
}

export default BarCodeScanner;
