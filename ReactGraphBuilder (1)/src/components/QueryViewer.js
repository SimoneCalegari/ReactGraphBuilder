import React from 'react';

export default function QueryViewer({ queries }) {
  return (
    <div style={{ padding: '1rem', background: '#f0f0f0' }}>
      <h3>Query Generate</h3>
      <pre>
        {queries.map((q, i) => (
          <div key={i}>{q}</div>
        ))}
      </pre>
    </div>
  );
}
