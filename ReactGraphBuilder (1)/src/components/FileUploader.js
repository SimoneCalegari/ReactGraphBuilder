import React from 'react';

export default function FileUploader({ onNodesGenerated }) {
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = async (evt) => {
      const data = new Uint8Array(evt.target.result);
      const XLSX = await import('xlsx');
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      const headers = json[0];
      const rows = json.slice(1);
      const nodes = rows.map((row, index) => ({
        id: `node-${index}`,
        data: { label: row[0] || 'Node' },
        position: { x: Math.random() * 400, y: Math.random() * 400 },
      }));
      onNodesGenerated(nodes);
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <input type="file" accept=".xlsx" onChange={handleFileUpload} />
    </div>
  );
}
