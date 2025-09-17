// client/src/pages/ToolTwoPage.jsx
import React from 'react';

const ToolTwoPage = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Tool Two: Text Analyzer</h1>
      <p>Here's another page for a different tool!</p>
      <div style={{ border: '1px dashed #28a745', padding: '30px', margin: '20px auto', maxWidth: '600px' }}>
        {/*
          Example: A text analysis component
          import TextAnalyzer from '../components/TextAnalyzer';
          <TextAnalyzer />
        */}
        <p>Implement your text analyzer (word count, character count, sentiment analysis via an external API, etc.) here.</p>
      </div>
    </div>
  );
};

export default ToolTwoPage;