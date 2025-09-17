// client/src/pages/ToolOnePage.jsx
import React from 'react';

const ToolOnePage = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Tool One: Calculator</h1>
      <p>This is where you'll implement your first amazing tool!</p>
      <div style={{ border: '1px dashed #007bff', padding: '30px', margin: '20px auto', maxWidth: '600px' }}>
        {/*
          Example: A simple Calculator component
          import Calculator from '../components/Calculator';
          <Calculator />
        */}
        <p>Implement your calculator UI and logic here.</p>
        <p>You can interact with Firebase Firestore here to save user preferences or calculations history if needed.</p>
      </div>
    </div>
  );
};

export default ToolOnePage;