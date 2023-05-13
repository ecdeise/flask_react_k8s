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
          width={200}
          height={200}
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

// import React from 'react';
// import BarcodeScannerComponent from 'react-qr-barcode-scanner';

// function BarCodeScanner() {
//   const [data, setData] = React.useState('Not Found');

//   return (
//     <>
//       <BarcodeScannerComponent
//         width={500}
//         height={500}
//         onUpdate={(err, result) => {
//           if (result) setData(result.text);
//           else setData('Not Found');
//         }}
//       />
//       <p>ISBN-13 {data}</p>
//     </>
//   );
// }

// export default BarCodeScanner;
